import React, { useState } from 'react';
import { SCHEMES } from '../data/realData';
import './Schemes.css';

const SchemeCard = ({ scheme }) => {
  const [expanded, setExpanded] = useState(false);

  const tagColors = { green:'badge-green', sky:'badge-sky', gold:'badge-gold', orange:'badge-orange' };

  return (
    <div className={`scheme-card card${expanded ? ' expanded' : ''}`}>
      <div className="sk-top" onClick={() => setExpanded(!expanded)}>
        <div className="sk-header">
          <div className="sk-meta">
            <span className={`badge ${tagColors[scheme.tagColor] || 'badge-green'}`}>{scheme.tag}</span>
            <span className={`badge badge-${scheme.state === 'TG' ? 'gold' : scheme.state === 'AP' ? 'sky' : 'green'}`}>
              {scheme.state === 'BOTH' ? '🇮🇳 Central' : scheme.state === 'TG' ? '🌿 Telangana' : '🌾 Andhra Pradesh'}
            </span>
          </div>
          <div className="sk-name">{scheme.name}</div>
          <div className="sk-ministry">{scheme.ministry}</div>
        </div>
        <div className="sk-benefit-box">
          <div className="skb-val">{scheme.benefit}</div>
          <div className="skb-lbl">Benefit</div>
        </div>
        <div className={`sk-arrow${expanded ? ' open' : ''}`}>▼</div>
      </div>

      <div className="sk-desc">{scheme.desc}</div>

      {expanded && (
        <div className="sk-details animate-fadeUp">
          <div className="divider"></div>

          <div className="sk-section">
            <div className="sks-title">✅ Eligibility</div>
            <p>{scheme.eligibility}</p>
          </div>

          <div className="sk-section">
            <div className="sks-title">📄 Documents Required</div>
            <ul className="docs-list">
              {scheme.documents.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>

          <div className="sk-section">
            <div className="sks-title">📅 Deadline / Schedule</div>
            <p>{scheme.deadline}</p>
          </div>

          <div className="sk-actions">
            <a href={scheme.portal} target="_blank" rel="noreferrer" className="btn btn-primary">
              🌐 Apply Online →
            </a>
            <button className="btn btn-outline" onClick={() => alert(`Call 1800-180-1551 for ${scheme.name} help`)}>
              📞 Helpline
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Schemes = ({ lang }) => {
  const [stateFilter, setStateFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const types = ['ALL', 'income', 'insurance', 'credit', 'subsidy'];
  const typeLabels = { ALL:'All', income:'Income Support', insurance:'Insurance', credit:'Credit', subsidy:'Subsidy' };

  const filtered = SCHEMES.filter(s => {
    const matchState = stateFilter === 'ALL' || s.state === stateFilter || s.state === 'BOTH';
    const matchType  = typeFilter === 'ALL' || s.type === typeFilter;
    return matchState && matchType;
  });

  return (
    <div className="schemes-page animate-fadeUp">
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / Government Schemes</div>
        <h1>📋 Government Schemes — TG & AP</h1>
        <p>All active agricultural schemes with eligibility, documents, and direct application links. Last updated: June 2025.</p>
      </div>

      {/* Highlight Box */}
      <div className="schemes-highlight">
        <div className="sh-item tg">
          <div className="shi-flag">🌿</div>
          <div>
            <div className="shi-state">Telangana</div>
            <div className="shi-scheme">Rythu Bandhu + Rythu Bheema</div>
            <div className="shi-val">₹10,000/acre/yr + ₹5L Life Insurance FREE</div>
          </div>
        </div>
        <div className="sh-item ap">
          <div className="shi-flag">🌾</div>
          <div>
            <div className="shi-state">Andhra Pradesh</div>
            <div className="shi-scheme">YSR Rythu Bharosa + Free Crop Insurance</div>
            <div className="shi-val">₹13,500/year + 100% Free Insurance</div>
          </div>
        </div>
        <div className="sh-item central">
          <div className="shi-flag">🇮🇳</div>
          <div>
            <div className="shi-state">Central Government</div>
            <div className="shi-scheme">PM-KISAN + KCC + PM Kusum</div>
            <div className="shi-val">₹6,000/yr + 4% Crop Loan + 90% Solar Subsidy</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="schemes-filters">
        <div className="chip-tabs">
          {['ALL','TG','AP','BOTH'].map(s => (
            <button key={s} className={`chip${stateFilter === s ? ' active' : ''}`} onClick={() => setStateFilter(s)}>
              {s === 'ALL' ? '🇮🇳 All' : s === 'TG' ? '🌿 Telangana' : s === 'AP' ? '🌾 Andhra Pradesh' : '🇮🇳 Central'}
            </button>
          ))}
        </div>
        <div className="chip-tabs">
          {types.map(t => (
            <button key={t} className={`chip${typeFilter === t ? ' active' : ''}`} onClick={() => setTypeFilter(t)}>
              {typeLabels[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Scheme Cards */}
      <div className="schemes-list">
        {filtered.map(s => <SchemeCard key={s.id} scheme={s} />)}
      </div>

      {/* Procurement Info */}
      <div className="card" style={{ padding: 20, marginTop: 8 }}>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12 }}>📞 Scheme Helplines</div>
        <div className="grid-2">
          {[
            ['Rythu Bandhu (TS)', '1800-425-8855', 'Telangana'],
            ['YSR Rythu Bharosa (AP)', '1800-425-2977', 'Andhra Pradesh'],
            ['PM-KISAN', '155261', 'Central — 24x7'],
            ['Crop Insurance PMFBY', '14447', 'Central'],
          ].map(([name, num, state], i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700 }}>{name}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>{state}</div>
              </div>
              <div style={{ fontSize:16, fontWeight:900, color:'var(--green-700)' }}>{num}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schemes;
