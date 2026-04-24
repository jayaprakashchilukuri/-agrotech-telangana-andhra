import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CITIES_WEATHER, WEATHER_FORECAST } from '../data/realData';
import { buildFarmerAdvisories, describeWeatherCode, fetchWeatherByCity, fetchWeatherByCoords } from '../services/agriApi';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState(CITIES_WEATHER[0]);
  const [liveCity, setLiveCity] = useState(CITIES_WEATHER[0]);
  const [liveTempsByCity, setLiveTempsByCity] = useState({});
  const [lastUpdated, setLastUpdated] = useState('');
  const [loadingLive, setLoadingLive] = useState(false);
  const [weatherError, setWeatherError] = useState('');
  const [gpsNote, setGpsNote] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('paddy');
  const [cropStage, setCropStage] = useState('general');
  const [state, setStateF] = useState('ALL');

  const cities = state === 'ALL' ? CITIES_WEATHER : CITIES_WEATHER.filter(c => c.state === state);

  const loadCityWeather = async (cityName = city.city) => {
    setLoadingLive(true);
    setWeatherError('');
    try {
      const weather = await fetchWeatherByCity(cityName);
      setLiveCity(weather);
      setLastUpdated(new Date().toLocaleTimeString('en-IN'));
    } catch {
      setWeatherError('Could not refresh live weather right now. Showing the latest available data.');
    } finally {
      setLoadingLive(false);
    }
  };

  useEffect(() => {
    loadCityWeather(city.city);
  }, [city.city]);

  useEffect(() => {
    let mounted = true;

    const loadCityTemperatures = async () => {
      const weatherList = await Promise.all(CITIES_WEATHER.map((entry) => fetchWeatherByCity(entry.city)));
      if (!mounted) return;

      const map = weatherList.reduce((acc, item) => {
        acc[item.city] = item.temp;
        return acc;
      }, {});

      setLiveTempsByCity(map);
      setLastUpdated(new Date().toLocaleTimeString('en-IN'));
    };

    loadCityTemperatures();
    const timer = setInterval(() => {
      loadCityTemperatures();
      loadCityWeather(city.city);
    }, 300000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [city.city]);

  const rainData = WEATHER_FORECAST.map((day, index) => ({
    day: day.day,
    rain: liveCity?.raw?.daily?.precipitation_probability_max?.[index] ?? day.rain,
    high: liveCity?.raw?.daily?.temperature_2m_max?.[index] ?? day.high,
    low: liveCity?.raw?.daily?.temperature_2m_min?.[index] ?? day.low,
    code: liveCity?.raw?.daily?.weather_code?.[index],
  }));

  const getAdvisory = (c) => {
    if (c.rain7day > 20) return { msg: '⚠️ Heavy rain expected. Check field drainage. Delay fertilizer application.', color: 'warning' };
    if (c.temp > 36)     return { msg: '🌡 Very hot conditions. Irrigate early morning or evening. Avoid pesticide spray.', color: 'danger' };
    if (c.humidity > 80) return { msg: '💧 High humidity. Watch for fungal diseases (blast in paddy, die-back in chilli).', color: 'warning' };
    return { msg: '✅ Good farming conditions. Proceed with normal field activities.', color: 'success' };
  };

  const adv = getAdvisory(liveCity);

  const farmerActions = buildFarmerAdvisories(liveCity, {
    crop: selectedCrop,
    stage: cropStage,
    district: liveCity.nearestSupportedDistrict || liveCity.city,
  });

  const cropAdvisories = [
    { crop: '🌾 Paddy', advice: liveCity.rain7day > 20 ? 'Heavy rain this week — check for BLB and blast. Drain waterlogged fields.' : 'Good conditions. Apply top-dress nitrogen if at tillering stage.' },
    { crop: '🌿 Cotton', advice: liveCity.temp > 35 ? 'Hot weather — increase irrigation frequency. Monitor for jassids.' : 'Normal conditions. Scout for bollworm at square formation.' },
    { crop: '🌶 Chilli', advice: liveCity.humidity > 75 ? 'High humidity — apply Mancozeb preventively. Watch for die-back.' : 'Proceed with normal irrigation and pest monitoring.' },
    { crop: '🌽 Maize', advice: 'Scout for Fall Armyworm in whorl stage. Check for FAW egg masses early morning.' },
  ];

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setGpsNote('Geolocation is not available in this browser.');
      return;
    }

    setGpsNote('Detecting your location...');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const weather = await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude, 'Your Location');
        setLiveCity(weather);
        const nearestNote = weather.nearestSupportedCity
          ? `Live for your location (nearest city: ${weather.nearestSupportedCity}, nearest district: ${weather.nearestSupportedDistrict}, ${weather.nearestDistanceKm} km).`
          : 'Live for your location.';
        setGpsNote(nearestNote);
        setLastUpdated(new Date().toLocaleTimeString('en-IN'));
      },
      () => {
        setGpsNote('Location permission denied. Select a city manually from the list.');
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  return (
    <div className="weather-page animate-fadeUp">
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / Weather</div>
        <h1>🌤 Weather & Farming Forecast</h1>
        <p>IMD-based weather data for Telangana & AP districts. Agricultural advisories updated daily.</p>
      </div>

      {/* State Filter */}
      <div className="chip-tabs" style={{ marginBottom: 16 }}>
        {[['ALL','🇮🇳 All Cities'],['TG','🌿 Telangana'],['AP','🌾 Andhra Pradesh']].map(([v,l]) => (
          <button key={v} className={`chip${state === v ? ' active' : ''}`} onClick={() => setStateF(v)}>{l}</button>
        ))}
        <button className="chip" onClick={useMyLocation}>📍 Use My Location</button>
        <button className="chip" onClick={() => loadCityWeather(city.city)} disabled={loadingLive}>🔄 Refresh Weather</button>
      </div>
      {gpsNote && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>{gpsNote}</div>}
      {lastUpdated && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>Live weather auto-refresh: every 5 min | Last updated at {lastUpdated}</div>}
      {weatherError && (
        <div className="card" style={{ padding: 10, marginBottom: 10, color: '#b45309', fontSize: 13 }}>
          {weatherError}
        </div>
      )}

      <div className="grid-2" style={{ gap: 10, marginBottom: 12 }}>
        <div className="input-group">
          <label className="input-label">Crop Context</label>
          <select className="input" value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
            <option value="paddy">Paddy</option>
            <option value="cotton">Cotton</option>
            <option value="chilli">Chilli</option>
            <option value="maize">Maize</option>
          </select>
        </div>
        <div className="input-group">
          <label className="input-label">Crop Stage</label>
          <select className="input" value={cropStage} onChange={(e) => setCropStage(e.target.value)}>
            <option value="general">General</option>
            <option value="tillering">Tillering</option>
            <option value="flowering">Flowering</option>
            <option value="squaring">Squaring</option>
            <option value="whorl">Whorl</option>
            <option value="fruiting">Fruiting</option>
          </select>
        </div>
      </div>

      {/* City Selector */}
      <div className="city-grid">
        {cities.map(c => (
          <button
            key={c.city}
            className={`city-chip${city.city === c.city ? ' active' : ''}`}
            onClick={() => setCity(c)}
          >
            <span className="cc-icon">{c.icon}</span>
            <div>
              <div className="cc-city">{c.city}</div>
              <div className="cc-temp">{city.city === c.city ? `${liveCity.temp}°C` : `${liveTempsByCity[c.city] ?? c.temp}°C`}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Weather Card */}
      <div className="weather-main-card">
        <div className="wmc-left">
          <div className="wmc-city">{liveCity.city}, {liveCity.state === 'TG' ? 'Telangana' : liveCity.state === 'AP' ? 'Andhra Pradesh' : 'Your Region'}</div>
          <div className="wmc-temp">{liveCity.temp}<span className="wmc-deg">°C</span></div>
          <div className="wmc-cond">{liveCity.icon} {liveCity.condition} {loadingLive ? '• updating...' : ''}</div>
          <div className="wmc-meta-row">
            <div className="wmc-meta"><span>💧</span> {liveCity.humidity}% Humidity</div>
            <div className="wmc-meta"><span>💨</span> {liveCity.wind} km/h Wind</div>
            <div className="wmc-meta"><span>🌡</span> Feels {liveCity.feels}°C</div>
            <div className="wmc-meta"><span>☀️</span> UV Index {liveCity.uv}</div>
          </div>
          {liveCity.rain7day > 0 && (
            <div className="wmc-rain-note">🌧 {liveCity.rain7day}mm rain expected this week ({liveCity.source})</div>
          )}
        </div>
        <div className="wmc-right">
          <div className={`farming-advisory alert alert-${adv.color}`}>
            <span style={{fontSize:20}}>🌾</span>
            <div>
              <div className="alert-title">Farming Advisory</div>
              <div className="alert-body">{adv.msg}</div>
            </div>
          </div>
          {/* Crop Advisories */}
          <div className="crop-adv-list">
            {cropAdvisories.map((ca, i) => (
              <div key={i} className="ca-item">
                <div className="ca-crop">{ca.crop}</div>
                <div className="ca-advice">{ca.advice}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="card weather-forecast-card">
        <div style={{ padding:'16px 18px 12px', borderBottom:'1px solid var(--border)' }}>
          <div style={{ fontWeight:800, fontSize:15 }}>📅 7-Day Forecast — {liveCity.city}</div>
        </div>
        <div className="forecast-row">
          {rainData.map((d,i) => (
            <div key={i} className={`fc-item${i===0?' today':''}`}>
              <div className="fci-day">{i === 0 ? 'Today' : d.day}</div>
              <div className="fci-icon">{d.code != null ? describeWeatherCode(d.code).icon : '⛅'}</div>
              <div className="fci-cond">{d.code != null ? describeWeatherCode(d.code).label : 'Forecast'}</div>
              <div className="fci-temps">
                <span className="fci-high">{d.high}°</span>
                <span className="fci-low">{d.low}°</span>
              </div>
              {d.rain > 10 && (
                <div className="fci-rain">💧 {d.rain}%</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rain & Temp Chart */}
      <div className="grid-2" style={{ gap: 16, marginTop: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight:800, fontSize:14, marginBottom:16 }}>🌧 Rainfall Probability (%)</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={rainData}>
              <XAxis dataKey="day" tick={{ fontSize:11, fill:'#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:11, fill:'#64748b' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip formatter={v => [`${v}%`, 'Rain chance']} contentStyle={{ fontSize:12, borderRadius:8 }} />
              <Bar dataKey="rain" fill="#0ea5e9" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight:800, fontSize:14, marginBottom:16 }}>🌡 Temperature Forecast (°C)</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={rainData}>
              <XAxis dataKey="day" tick={{ fontSize:11, fill:'#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[20,40]} tick={{ fontSize:11, fill:'#64748b' }} axisLine={false} tickLine={false} unit="°" />
              <Tooltip formatter={(v, n) => [`${v}°C`, n === 'high' ? 'Max' : 'Min']} contentStyle={{ fontSize:12, borderRadius:8 }} />
              <Bar dataKey="high" fill="#f59e0b" radius={[4,4,0,0]} />
              <Bar dataKey="low"  fill="#6ee7b7" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ padding: 20, marginTop: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>🧭 Workable Farmer Instructions (Live)</div>
        {farmerActions.map((step, index) => (
          <div key={index} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
            {index + 1}. {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
