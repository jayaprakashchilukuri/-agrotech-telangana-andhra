import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ activePage, setPage, lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const labels = {
    en: { brand: 'రైతు సేవలు', sub: 'AgroTech', home: 'Home', market: 'Market', weather: 'Weather', schemes: 'Schemes', chatbot: 'AI Help' },
    te: { brand: 'రైతు సేవలు', sub: 'వ్యవసాయ సేవలు', home: 'హోమ్', market: 'మార్కెట్', weather: 'వాతావరణం', schemes: 'పథకాలు', chatbot: 'AI సహాయం' },
    hi: { brand: 'रैतु सेवलु', sub: 'एग्रोटेक', home: 'होम', market: 'बाज़ार', weather: 'मौसम', schemes: 'योजनाएं', chatbot: 'AI सहायता' },
  };

  const t = labels[lang] || labels.en;

  const navItems = [
    { id:'home',        icon:'🏠', label:t.home },
    { id:'market',      icon:'📈', label:t.market },
    { id:'weather',     icon:'🌤', label:t.weather },
    { id:'schemes',     icon:'📋', label:t.schemes },
    { id:'chatbot',     icon:'🤖', label:t.chatbot },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Brand */}
          <div className="nav-brand" onClick={() => setPage('home')}>
            <div className="nav-logo">
              <span>🌾</span>
            </div>
            <div className="nav-brand-text">
              <span className="nav-brand-main">{t.brand}</span>
              <span className="nav-brand-sub">{t.sub}</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="nav-links">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-link${activePage === item.id ? ' active' : ''}`}
                onClick={() => { setPage(item.id); setMobileOpen(false); }}
              >
                <span className="nl-icon">{item.icon}</span>
                <span className="nl-label">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="nav-right">
            {/* Language Toggle */}
            <div className="lang-switcher">
              {['en', 'te', 'hi'].map(l => (
                <button
                  key={l}
                  className={`lang-btn${lang === l ? ' active' : ''}`}
                  onClick={() => setLang(l)}
                >
                  {l === 'en' ? 'EN' : l === 'te' ? 'తె' : 'हि'}
                </button>
              ))}
            </div>

            {/* Alert bell */}
            <button className="nav-bell" onClick={() => setPage('alerts')}>
              <span>🔔</span>
              <span className="bell-dot"></span>
            </button>

            {/* Hamburger (mobile) */}
            <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mobile-menu">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`mobile-nav-link${activePage === item.id ? ' active' : ''}`}
                onClick={() => { setPage(item.id); setMobileOpen(false); }}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Ticker Bar */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[
            '🌾 Paddy BPT-5204 ₹2,195/qtl ▲₹35',
            '🌿 Cotton Bt ₹7,050/qtl ▲₹150',
            '🌶 Red Chilli Teja ₹13,200/qtl ▼₹100',
            '🌽 Maize ₹1,840/qtl ▼₹22',
            '🟡 Turmeric ₹8,450/qtl ▲₹200',
            '🥜 Groundnut ₹5,200/qtl ▲₹60',
            '🌻 Sunflower ₹5,650/qtl ▲₹40',
            '🌾 Paddy MTU-1010 ₹2,183/qtl ▲₹28',
            '🍅 Tomato Madanapalle ₹850/qtl ▲₹120',
            '🧅 Onion Kurnool ₹2,100/qtl ▼₹180',
          ].concat([
            '🌾 Paddy BPT-5204 ₹2,195/qtl ▲₹35',
            '🌿 Cotton Bt ₹7,050/qtl ▲₹150',
            '🌶 Red Chilli Teja ₹13,200/qtl ▼₹100',
            '🌽 Maize ₹1,840/qtl ▼₹22',
            '🟡 Turmeric ₹8,450/qtl ▲₹200',
          ]).map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-sep"> | </span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
