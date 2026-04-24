import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CITIES_WEATHER, WEATHER_FORECAST } from '../data/realData';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState(CITIES_WEATHER[0]);
  const [state, setStateF] = useState('ALL');

  const cities = state === 'ALL' ? CITIES_WEATHER : CITIES_WEATHER.filter(c => c.state === state);

  const rainData = WEATHER_FORECAST.map(d => ({ day: d.day, rain: d.rain, high: d.high, low: d.low }));

  const getAdvisory = (c) => {
    if (c.rain7day > 20) return { msg: '⚠️ Heavy rain expected. Check field drainage. Delay fertilizer application.', color: 'warning' };
    if (c.temp > 36)     return { msg: '🌡 Very hot conditions. Irrigate early morning or evening. Avoid pesticide spray.', color: 'danger' };
    if (c.humidity > 80) return { msg: '💧 High humidity. Watch for fungal diseases (blast in paddy, die-back in chilli).', color: 'warning' };
    return { msg: '✅ Good farming conditions. Proceed with normal field activities.', color: 'success' };
  };

  const adv = getAdvisory(city);

  const cropAdvisories = [
    { crop: '🌾 Paddy', advice: city.rain7day > 20 ? 'Heavy rain this week — check for BLB and blast. Drain waterlogged fields.' : 'Good conditions. Apply top-dress nitrogen if at tillering stage.' },
    { crop: '🌿 Cotton', advice: city.temp > 35 ? 'Hot weather — increase irrigation frequency. Monitor for jassids.' : 'Normal conditions. Scout for bollworm at square formation.' },
    { crop: '🌶 Chilli', advice: city.humidity > 75 ? 'High humidity — apply Mancozeb preventively. Watch for die-back.' : 'Proceed with normal irrigation and pest monitoring.' },
    { crop: '🌽 Maize', advice: 'Scout for Fall Armyworm in whorl stage. Check for FAW egg masses early morning.' },
  ];

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
              <div className="cc-temp">{c.temp}°C</div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Weather Card */}
      <div className="weather-main-card">
        <div className="wmc-left">
          <div className="wmc-city">{city.city}, {city.state === 'TG' ? 'Telangana' : 'Andhra Pradesh'}</div>
          <div className="wmc-temp">{city.temp}<span className="wmc-deg">°C</span></div>
          <div className="wmc-cond">{city.icon} {city.condition}</div>
          <div className="wmc-meta-row">
            <div className="wmc-meta"><span>💧</span> {city.humidity}% Humidity</div>
            <div className="wmc-meta"><span>💨</span> {city.wind} km/h Wind</div>
            <div className="wmc-meta"><span>🌡</span> Feels {city.feels}°C</div>
            <div className="wmc-meta"><span>☀️</span> UV Index {city.uv}</div>
          </div>
          {city.rain7day > 0 && (
            <div className="wmc-rain-note">🌧 {city.rain7day}mm rain expected this week</div>
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
          <div style={{ fontWeight:800, fontSize:15 }}>📅 7-Day Forecast — {city.city}</div>
        </div>
        <div className="forecast-row">
          {WEATHER_FORECAST.map((d,i) => (
            <div key={i} className={`fc-item${i===0?' today':''}`}>
              <div className="fci-day">{i === 0 ? 'Today' : d.day}</div>
              <div className="fci-icon">{d.icon}</div>
              <div className="fci-cond">{d.desc}</div>
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
    </div>
  );
};

export default Weather;
