import React from 'react';
import { MANDI_PRICES, WEATHER_FORECAST, FARMER_TIPS, HELPLINES } from '../data/realData';
import './Home.css';

const StatCard = ({ icon, value, label, color, sub }) => (
  <div className={`stat-card stat-${color}`}>
    <div className="sc-icon">{icon}</div>
    <div className="sc-value">{value}</div>
    <div className="sc-label">{label}</div>
    {sub && <div className="sc-sub">{sub}</div>}
  </div>
);

const QuickPrice = ({ crop, price, change, state }) => (
  <div className="qp-item">
    <div className="qp-meta">
      <span className="qp-crop">{crop}</span>
      <span className={`qp-badge badge-${state === 'TG' ? 'gold' : 'sky'}`}>{state}</span>
    </div>
    <div className="qp-price">₹{price.toLocaleString()}<span>/qtl</span></div>
    <div className={`qp-change ${change > 0 ? 'text-up' : 'text-down'}`}>
      {change > 0 ? '▲' : '▼'} ₹{Math.abs(change)} today
    </div>
  </div>
);

const ServiceCard = ({ icon, title, desc, tag, tagColor, onClick }) => (
  <div className="service-card" onClick={onClick}>
    <div className="svc-top">
      <div className="svc-icon">{icon}</div>
      {tag && <span className={`badge badge-${tagColor || 'green'} svc-tag`}>{tag}</span>}
    </div>
    <div className="svc-title">{title}</div>
    <div className="svc-desc">{desc}</div>
    <div className="svc-arrow">→</div>
  </div>
);

const AlertBanner = () => (
  <div className="alert-banner">
    <span className="ab-pulse">🔴</span>
    <div className="ab-content">
      <strong>Cyclone Watch:</strong> Low pressure over Bay of Bengal. Krishna & Godavari districts — heavy rain expected Thu–Fri. Harvest mature paddy urgently.
    </div>
    <button className="ab-btn">Full Alert →</button>
  </div>
);

const Home = ({ setPage, lang }) => {
  const topPrices = MANDI_PRICES.slice(0, 8);

  const SERVICES = [
    { icon:'📈', title:'Mandi Prices',      desc:'Live prices from 40+ mandis in TG & AP. Compare Agmarknet data.',         page:'market',      tag:'Live',     tagColor:'green' },
    { icon:'🌤', title:'Weather Forecast',  desc:'7-day forecast with crop advisory for your district.',                    page:'weather',     tag:'IMD Data', tagColor:'sky' },
    { icon:'📋', title:'Govt Schemes',      desc:'Rythu Bandhu, YSR Bharosa, PM-KISAN and 15+ active schemes.',             page:'schemes',     tag:'Updated',  tagColor:'gold' },
    { icon:'💰', title:'Profit Calculator', desc:'Calculate crop cost, MSP vs market price, and net profit per acre.',      page:'calculator',  tag:null,       tagColor:null },
    { icon:'🔬', title:'Disease Detection', desc:'AI-powered crop disease ID for paddy, cotton, chilli, maize.',            page:'disease',     tag:'AI',       tagColor:'green' },
    { icon:'🌱', title:'Seeds & Varieties', desc:'Recommended HYV seeds for TG & AP — yield, duration, suitability.',      page:'seeds',       tag:null,       tagColor:null },
    { icon:'🧪', title:'Fertilizer Guide',  desc:'Current MRP rates, NPK recommendations by district & crop.',             page:'fertilizer',  tag:'MRP 2024', tagColor:'orange' },
    { icon:'📅', title:'Agri Calendar',     desc:'Kharif, Rabi & Zaid crop schedules for Telangana & AP.',                 page:'calendar',    tag:null,       tagColor:null },
    { icon:'🛒', title:'Marketplace',       desc:'Buy & sell produce directly. Connect with buyers, traders.',              page:'marketplace', tag:null,       tagColor:null },
    { icon:'🛡', title:'Crop Insurance',    desc:'PMFBY, YSR Free Insurance — compare, enroll, file claims.',              page:'insurance',   tag:'Free AP',  tagColor:'sky' },
    { icon:'🚁', title:'Drone Services',    desc:'Book certified drone operators in your district for spraying.',           page:'drone',       tag:null,       tagColor:null },
    { icon:'🏭', title:'Cold Storage',      desc:'Locate APCOS, TSUWSSC cold stores near you. Book storage.',              page:'storage',     tag:null,       tagColor:null },
    { icon:'🚨', title:'Emergency Alerts',  desc:'Cyclone, pest, flood and market crash alerts for your district.',        page:'alerts',      tag:'3 Active', tagColor:'red' },
    { icon:'🤖', title:'AI Assistant',      desc:'Ask anything in Telugu — crops, weather, schemes, prices.',               page:'chatbot',     tag:'Telugu',   tagColor:'green' },
  ];

  const tip = FARMER_TIPS[Math.floor(Date.now() / 86400000) % FARMER_TIPS.length];

  return (
    <div className="home-page animate-fadeUp">
      {/* Alert Banner */}
      <AlertBanner />

      {/* Hero */}
      <div className="hero-section">
        <div className="hero-bg-pattern"></div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="dot-ts"></span> Telangana & Andhra Pradesh
          </div>
          <h1 className="hero-title">
            <span className="hl-te">రైతు సేవలు</span>
            <span className="hl-en">Farmer Services Platform</span>
          </h1>
          <p className="hero-desc">
            Live mandi prices from 40+ markets · Real government schemes · AI-powered crop help · Weather advisories — all in one place, in Telugu.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => setPage('market')}>
              📈 Check Today's Prices
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => setPage('schemes')}>
              📋 My Schemes
            </button>
          </div>

          {/* State Badges */}
          <div className="state-badges">
            <div className="state-badge tg">
              <span>🌿</span>
              <div>
                <div className="sb-name">Telangana</div>
                <div className="sb-sub">33 Districts • Rythu Bandhu</div>
              </div>
            </div>
            <div className="state-badge ap">
              <span>🌾</span>
              <div>
                <div className="sb-name">Andhra Pradesh</div>
                <div className="sb-sub">26 Districts • YSR Bharosa</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          {[
            { icon:'🌾', value:'40+', label:'Mandis', sub:'Live Prices' },
            { icon:'📋', value:'8+', label:'Active Schemes', sub:'TG & AP' },
            { icon:'🌤', label:'Live Weather', value:'10', sub:'Cities' },
            { icon:'📞', value:'Free', label:'Helpline', sub:'1800-180-1551' },
          ].map((s,i) => (
            <div key={i} className="hero-stat">
              <div className="hs-icon">{s.icon}</div>
              <div className="hs-val">{s.value}</div>
              <div className="hs-label">{s.label}</div>
              <div className="hs-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-body">
        {/* Daily Tip */}
        <div className="daily-tip">
          <span className="dt-icon">{tip.icon}</span>
          <div>
            <div className="dt-label">📌 Today's Farmer Tip — {tip.category}</div>
            <div className="dt-text">{tip.tip}</div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="stats-row-home grid-4">
          <StatCard icon="☀️" value="34°C" label="Vijayawada" color="sky" sub="Hot & Sunny" />
          <StatCard icon="🌾" value="₹2,195" label="Paddy BPT (VJA)" color="green" sub="▲ ₹35 today" />
          <StatCard icon="🌿" value="₹7,050" label="Cotton Bt (GNT)" color="gold" sub="▲ ₹150 today" />
          <StatCard icon="🌶" value="₹13,200" label="Red Chilli (GNT)" color="red" sub="▼ ₹100 today" />
        </div>

        {/* Two column: Prices + Weather */}
        <div className="home-grid-2">
          {/* Price Snapshot */}
          <div className="card home-card">
            <div className="hc-header">
              <div className="hch-title">📈 Today's Prices</div>
              <button className="btn btn-outline btn-sm" onClick={() => setPage('market')}>View All →</button>
            </div>
            <div className="quick-prices">
              {topPrices.map(c => (
                <QuickPrice key={c.id} crop={c.crop} price={c.price} change={c.change} state={c.state} />
              ))}
            </div>
          </div>

          {/* Weather + Calendar */}
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {/* Mini Weather */}
            <div className="card home-card weather-card">
              <div className="hc-header">
                <div className="hch-title">🌤 7-Day Forecast</div>
                <button className="btn btn-outline btn-sm" onClick={() => setPage('weather')}>Details →</button>
              </div>
              <div className="mini-forecast">
                {WEATHER_FORECAST.map((d,i) => (
                  <div key={i} className="mf-day">
                    <div className="mfd-name">{d.day}</div>
                    <div className="mfd-icon">{d.icon}</div>
                    <div className="mfd-temp">{d.high}°</div>
                    {d.rain > 20 && <div className="mfd-rain">💧{d.rain}%</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Helplines Quick */}
            <div className="card home-card">
              <div className="hc-header">
                <div className="hch-title">📞 Helplines</div>
              </div>
              <div className="helplines-mini">
                {HELPLINES.slice(0,4).map((h,i) => (
                  <div key={i} className="hlm-item">
                    <div className="hlm-name">{h.name}</div>
                    <div className="hlm-num">{h.number}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Services Grid */}
        <div className="home-section">
          <div className="section-eyebrow">All Services</div>
          <h2 className="section-title">Everything for TG & AP Farmers</h2>
          <p className="section-sub">14 smart services with real data from government portals</p>
          <div className="services-grid-home">
            {SERVICES.map((s,i) => (
              <ServiceCard key={i} {...s} onClick={() => setPage(s.page)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
