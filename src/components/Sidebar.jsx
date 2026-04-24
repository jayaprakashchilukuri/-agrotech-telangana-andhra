import React from 'react';
import './Sidebar.css';

const MENU = [
  { section: 'Main', items: [
    { id:'home',        icon:'🏠', label:'Home / Dashboard',    labelTe:'హోమ్ / డాష్‌బోర్డ్' },
    { id:'market',      icon:'📈', label:'Market Prices',       labelTe:'మార్కెట్ ధరలు' },
    { id:'weather',     icon:'🌤', label:'Weather & Forecast',  labelTe:'వాతావరణం' },
  ]},
  { section: 'Farmer Services', items: [
    { id:'schemes',     icon:'📋', label:'Govt Schemes',        labelTe:'ప్రభుత్వ పథకాలు' },
    { id:'calculator',  icon:'💰', label:'Profit Calculator',   labelTe:'లాభ కాలిక్యులేటర్' },
    { id:'disease',     icon:'🔬', label:'Crop Disease AI',     labelTe:'పంట వ్యాధి AI' },
    { id:'seeds',       icon:'🌱', label:'Seeds & Varieties',   labelTe:'విత్తనాలు & రకాలు' },
    { id:'fertilizer',  icon:'🧪', label:'Fertilizer Guide',    labelTe:'ఎరువుల గైడ్' },
    { id:'calendar',    icon:'📅', label:'Agri Calendar',       labelTe:'వ్యవసాయ కాలెండర్' },
  ]},
  { section: 'Services', items: [
    { id:'marketplace', icon:'🛒', label:'Farmer Marketplace',  labelTe:'రైతు మార్కెట్‌ప్లేస్' },
    { id:'insurance',   icon:'🛡', label:'Crop Insurance',      labelTe:'పంటల బీమా' },
    { id:'drone',       icon:'🚁', label:'Drone Services',      labelTe:'డ్రోన్ సేవలు' },
    { id:'storage',     icon:'🏭', label:'Cold Storage',        labelTe:'కోల్డ్ స్టోరేజ్' },
    { id:'alerts',      icon:'🚨', label:'Emergency Alerts',    labelTe:'అత్యవసర హెచ్చరికలు' },
    { id:'chatbot',     icon:'🤖', label:'AI Farming Assistant',labelTe:'AI సహాయకుడు' },
  ]},
];

const Sidebar = ({ activePage, setPage, lang }) => {
  const isTe = lang === 'te';

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        {MENU.map(group => (
          <div key={group.section} className="sidebar-group">
            <div className="sidebar-section-label">{group.section}</div>
            {group.items.map(item => (
              <button
                key={item.id}
                className={`sidebar-item${activePage === item.id ? ' active' : ''}`}
                onClick={() => setPage(item.id)}
                title={item.label}
              >
                <span className="si-icon">{item.icon}</span>
                <span className="si-label">{isTe ? item.labelTe : item.label}</span>
                {activePage === item.id && <span className="si-active-bar"></span>}
              </button>
            ))}
          </div>
        ))}

        {/* Helpline Footer */}
        <div className="sidebar-helpline">
          <div className="sh-title">📞 Farmer Helpline</div>
          <div className="sh-num">1800-180-1551</div>
          <div className="sh-sub">Free • 6AM–10PM • Telugu</div>
          <button className="sh-btn" onClick={() => setPage('schemes')}>
            View All Schemes →
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
