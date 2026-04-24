import { CITIES_WEATHER, MANDI_PRICES } from '../data/realData';

const CITY_LOOKUP = Object.fromEntries(
  CITIES_WEATHER.map((city) => [city.city.toLowerCase(), city])
);

const DISTRICT_BY_CITY = {
  hyderabad: 'Hyderabad',
  warangal: 'Warangal',
  karimnagar: 'Karimnagar',
  nizamabad: 'Nizamabad',
  vijayawada: 'Krishna',
  guntur: 'Guntur',
  visakhapatnam: 'Visakhapatnam',
  tirupati: 'Tirupati',
  kurnool: 'Kurnool',
  nellore: 'Nellore',
};

const WEATHER_CODES = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Fog', icon: '🌫️' },
  48: { label: 'Rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦' },
  53: { label: 'Drizzle', icon: '🌦' },
  55: { label: 'Dense drizzle', icon: '🌧' },
  61: { label: 'Light rain', icon: '🌦' },
  63: { label: 'Rain', icon: '🌧' },
  65: { label: 'Heavy rain', icon: '🌧' },
  71: { label: 'Light snow', icon: '🌨' },
  73: { label: 'Snow', icon: '🌨' },
  75: { label: 'Heavy snow', icon: '❄️' },
  80: { label: 'Rain showers', icon: '🌦' },
  81: { label: 'Rain showers', icon: '🌦' },
  82: { label: 'Violent showers', icon: '⛈' },
  95: { label: 'Thunderstorm', icon: '⛈' },
  96: { label: 'Thunderstorm with hail', icon: '⛈' },
  99: { label: 'Thunderstorm with hail', icon: '⛈' },
};

const FALLBACK_WEATHER = {
  clear: { label: 'Clear sky', icon: '☀️' },
  cloudy: { label: 'Partly cloudy', icon: '⛅' },
};

const getWeatherDescription = (code) => WEATHER_CODES[code] || FALLBACK_WEATHER.clear;

export const describeWeatherCode = (code) => getWeatherDescription(code);

const buildWeatherApiUrl = (lat, lon) => {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    timezone: 'auto',
    forecast_days: '7',
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
      'wind_gusts_10m',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'rain_sum',
      'uv_index_max',
      'wind_speed_10m_max',
    ].join(','),
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
    timeformat: 'iso8601',
  });

  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
};

const distanceKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const deltaLat = toRad(lat2 - lat1);
  const deltaLon = toRad(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};

export function getNearestSupportedCity(lat, lon) {
  return CITIES_WEATHER.reduce((nearest, city) => {
    const dist = distanceKm(lat, lon, city.lat, city.lon);
    if (!nearest || dist < nearest.distanceKm) {
      return { ...city, distanceKm: Math.round(dist) };
    }
    return nearest;
  }, null);
}

const toWeatherModel = ({ baseCity, current, daily, source, raw }) => {
  const todayHigh = daily.temperature_2m_max?.[0] ?? baseCity.temp;
  const todayLow = daily.temperature_2m_min?.[0] ?? baseCity.feels;
  const rain7day = Array.isArray(daily.rain_sum)
    ? daily.rain_sum.slice(0, 7).reduce((sum, value) => sum + (Number(value) || 0), 0)
    : baseCity.rain7day;
  const condition = getWeatherDescription(current.weather_code || daily.weather_code?.[0]);

  return {
    city: baseCity.city,
    state: baseCity.state,
    lat: baseCity.lat,
    lon: baseCity.lon,
    temp: Math.round(current.temperature_2m ?? baseCity.temp),
    feels: Math.round(current.apparent_temperature ?? baseCity.feels),
    humidity: Math.round(current.relative_humidity_2m ?? baseCity.humidity),
    wind: Math.round(current.wind_speed_10m ?? baseCity.wind),
    condition: condition.label,
    icon: condition.icon,
    rain7day: Math.round(rain7day),
    uv: Math.round(daily.uv_index_max?.[0] ?? baseCity.uv),
    high: Math.round(todayHigh),
    low: Math.round(todayLow),
    source,
    raw,
  };
};

export async function fetchWeatherByCity(cityName) {
  const city = CITY_LOOKUP[cityName.toLowerCase()];
  if (!city) {
    throw new Error(`Unknown city: ${cityName}`);
  }

  try {
    const response = await fetch(buildWeatherApiUrl(city.lat, city.lon));
    if (!response.ok) {
      throw new Error(`Weather request failed: ${response.status}`);
    }

    const data = await response.json();
    return toWeatherModel({
      baseCity: city,
      current: data.current || {},
      daily: data.daily || {},
      source: 'Open-Meteo',
      raw: data,
    });
  } catch {
    const fallback = CITY_LOOKUP[cityName.toLowerCase()];
    return toWeatherModel({
      baseCity: fallback,
      current: {},
      daily: {},
      source: 'Local fallback',
      raw: null,
    });
  }
}

export async function fetchWeatherByCoords(lat, lon, cityLabel = 'Your Location') {
  const nearest = getNearestSupportedCity(lat, lon) || {
    city: cityLabel,
    state: 'BOTH',
    lat,
    lon,
    temp: 30,
    feels: 33,
    humidity: 60,
    wind: 10,
    rain7day: 0,
    uv: 7,
  };

  const baseCity = {
    ...nearest,
    city: cityLabel,
    lat,
    lon,
  };

  try {
    const response = await fetch(buildWeatherApiUrl(lat, lon));
    if (!response.ok) {
      throw new Error(`Weather request failed: ${response.status}`);
    }

    const data = await response.json();
    const weather = toWeatherModel({
      baseCity,
      current: data.current || {},
      daily: data.daily || {},
      source: 'Open-Meteo (GPS)',
      raw: data,
    });

    return {
      ...weather,
      nearestSupportedCity: nearest.city,
      nearestSupportedDistrict: DISTRICT_BY_CITY[(nearest.city || '').toLowerCase()] || nearest.city,
      nearestDistanceKm: nearest.distanceKm,
    };
  } catch {
    return {
      ...toWeatherModel({
        baseCity,
        current: {},
        daily: {},
        source: 'Local fallback (GPS)',
        raw: null,
      }),
      nearestSupportedCity: nearest.city,
      nearestSupportedDistrict: DISTRICT_BY_CITY[(nearest.city || '').toLowerCase()] || nearest.city,
      nearestDistanceKm: nearest.distanceKm,
    };
  }
}

export function buildFarmerAdvisories(weather, context = {}) {
  const actions = [];
  const crop = (context.crop || '').toLowerCase();
  const stage = (context.stage || '').toLowerCase();

  if (context.district) {
    actions.push(`District context: ${context.district}. Follow local KVK and agriculture department advisories for this weather window.`);
  }

  if (weather.rain7day >= 40) {
    actions.push('Harvest mature crops in the next 24 hours and keep produce under cover.');
    actions.push('Open field drains immediately to prevent root rot and waterlogging.');
  } else if (weather.rain7day >= 15) {
    actions.push('Avoid top-dressing urea 24 hours before forecast rain.');
    actions.push('Plan fungicide spray in rain-free windows only.');
  }

  if (weather.temp >= 38) {
    actions.push('Irrigate at early morning or late evening to reduce heat stress.');
    actions.push('Avoid pesticide spraying during peak heat (11 AM to 4 PM).');
  }

  if (weather.humidity >= 80) {
    actions.push('Scout for fungal disease every day in paddy/chilli/cotton fields.');
    actions.push('Use preventive fungicide only as per label dose and local extension advice.');
  }

  if (weather.wind >= 25) {
    actions.push('Postpone foliar spray if wind speed is above 25 km/h to avoid drift loss.');
  }

  if (weather.uv >= 9) {
    actions.push('Schedule field work before 11 AM and after 4 PM; ensure water breaks for workers.');
  }

  if (crop === 'paddy') {
    if (weather.rain7day >= 20) {
      actions.push('Paddy: strengthen bunds and keep drainage channels open to avoid submergence damage.');
    }
    if (stage === 'tillering') {
      actions.push('Paddy tillering: split nitrogen dose and avoid full application just before rain.');
    }
    if (stage === 'flowering') {
      actions.push('Paddy flowering: maintain shallow water layer and avoid moisture stress during panicle emergence.');
    }
  }

  if (crop === 'cotton') {
    if (weather.temp >= 36) {
      actions.push('Cotton: use short irrigation cycles to reduce flower and boll shedding under heat stress.');
    }
    if (stage === 'squaring') {
      actions.push('Cotton squaring: scout twice weekly for sucking pests and manage with threshold-based sprays only.');
    }
  }

  if (crop === 'chilli') {
    if (weather.humidity >= 75) {
      actions.push('Chilli: increase surveillance for die-back and fruit rot; keep canopy aerated.');
    }
    if (stage === 'fruiting') {
      actions.push('Chilli fruiting: maintain consistent irrigation and avoid sudden wet-dry cycles to reduce fruit drop.');
    }
  }

  if (crop === 'maize' && stage === 'whorl') {
    actions.push('Maize whorl stage: inspect for FAW egg masses and frass every morning, then act quickly if threshold is crossed.');
  }

  if (actions.length === 0) {
    actions.push('Conditions are stable. Continue irrigation, nutrient, and pest schedule normally.');
  }

  return actions;
}

export function buildWeatherAlerts(weatherList) {
  const alerts = [];
  const now = new Date();
  const ts = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  weatherList.forEach((weather) => {
    if (weather.rain7day >= 40) {
      alerts.push({
        type: 'danger',
        icon: '🌧',
        title: `Heavy Rain Risk — ${weather.city}`,
        body: `Forecast rain for next 7 days is ${weather.rain7day}mm. Drain fields, protect harvested produce, and avoid nitrogen top dressing before rain spells.`,
        time: ts,
        source: weather.source,
      });
    }

    if (weather.temp >= 38) {
      alerts.push({
        type: 'warning',
        icon: '🌡',
        title: `Heat Stress Alert — ${weather.city}`,
        body: `Current temperature is ${weather.temp}°C. Shift irrigation to dawn/evening and avoid mid-day spray operations.`,
        time: ts,
        source: weather.source,
      });
    }

    if (weather.humidity >= 80) {
      alerts.push({
        type: 'warning',
        icon: '🦠',
        title: `High Humidity Disease Risk — ${weather.city}`,
        body: `Humidity is ${weather.humidity}%. Increase scouting frequency for blast, blight, and die-back symptoms.`,
        time: ts,
        source: weather.source,
      });
    }

    if (weather.wind >= 25) {
      alerts.push({
        type: 'info',
        icon: '💨',
        title: `Strong Wind Advisory — ${weather.city}`,
        body: `Wind is ${weather.wind} km/h. Delay spray operations and secure nursery covers or loose structures.`,
        time: ts,
        source: weather.source,
      });
    }
  });

  if (!alerts.length) {
    alerts.push({
      type: 'success',
      icon: '✅',
      title: 'No severe weather risk right now',
      body: 'Current weather across selected cities is within normal operational range for routine farm work.',
      time: ts,
      source: 'Open-Meteo',
    });
  }

  return alerts.slice(0, 8);
}

export async function fetchMarketPrices({ resourceId, apiKey, filters = {}, limit = 100 } = {}) {
  if (!resourceId || !apiKey) {
    return MANDI_PRICES;
  }

  const url = new URL(`https://api.data.gov.in/resource/${resourceId}`);
  url.searchParams.set('api-key', apiKey);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', String(limit));

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(`filters[${key}]`, String(value));
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Market request failed: ${response.status}`);
  }

  const payload = await response.json();
  return payload.records || [];
}

export { CITY_LOOKUP };