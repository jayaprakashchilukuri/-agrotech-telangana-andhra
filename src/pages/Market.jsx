import React, { useState, useMemo } from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MANDI_PRICES, MSP_2024_25 } from '../data/realData';
import './Market.css';

const PriceRow = ({ item, onSelect, selected }) => (
  <tr
    className={`price-row${selected ? ' selected' : ''}`}
    onClick={() => onSelect(item)}
    style={{ cursor: 'pointer' }}
  >
    <td>
      <div className="pr-crop">{item.crop}</div>
      <div className="pr-variety">{item.variety}</div>
    </td>
    <td>
      <div className="pr-mandi">{item.mandi}</div>
      <div className="pr-dist">{item.district}</div>
    </td>
    <td>
      <span className={`badge badge-${item.state === 'TG' ? 'gold' : 'sky'}`}>{item.state}</span>
    </td>
    <td className="pr-price-cell">
      <div className="pr-price">₹{item.price.toLocaleString()}</div>
      <div className="pr-range">₹{item.min.toLocaleString()}–{item.max.toLocaleString()}</div>
    </td>
    <td>
      <span className={`pr-change ${item.change > 0 ? 'up' : 'down'}`}>
        {item.change > 0 ? '▲' : '▼'} ₹{Math.abs(item.change)}
      </span>
    </td>
    <td className="pr-unit">{item.unit}</td>
  </tr>
);

const TrendChart = ({ item }) => {
  const data = item.trend.map((val, i) => ({
    day: ['5d ago', '4d ago', '3d ago', '2d ago', 'Yesterday', 'Today'][i],
    price: val,
  }));

  const isUp = item.change > 0;

  return (
    <div className="trend-panel">
      <div className="tp-header">
        <div>
          <div className="tp-crop">{item.crop} — {item.variety}</div>
          <div className="tp-mandi">📍 {item.mandi}, {item.district} ({item.state})</div>
        </div>
        <div className="tp-current">
          <div className="tp-price">₹{item.price.toLocaleString()}</div>
          <div className={`tp-change ${isUp ? 'up' : 'down'}`}>
            {isUp ? '▲' : '▼'} ₹{Math.abs(item.change)} today
          </div>
        </div>
      </div>

      <div className="tp-meta-row">
        <div className="tpm"><span className="tpm-l">Min</span><span className="tpm-v">₹{item.min.toLocaleString()}</span></div>
        <div className="tpm"><span className="tpm-l">Max</span><span className="tpm-v">₹{item.max.toLocaleString()}</span></div>
        <div className="tpm"><span className="tpm-l">Unit</span><span className="tpm-v">{item.unit}</span></div>
        <div className="tpm"><span className="tpm-l">Date</span><span className="tpm-v">{item.date}</span></div>
      </div>

      <div className="tp-chart">
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={isUp ? '#16a34a' : '#dc2626'} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={isUp ? '#16a34a' : '#dc2626'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis domain={['auto','auto']} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false}
              tickFormatter={v => `₹${v.toLocaleString()}`} width={65} />
            <Tooltip
              formatter={v => [`₹${v.toLocaleString()}`, item.crop]}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #d1fae5', background: 'white' }}
            />
            <Area type="monotone" dataKey="price" stroke={isUp ? '#16a34a' : '#dc2626'}
              strokeWidth={2.5} fill="url(#priceGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="tp-footer">
        <span>Source: Agmarknet / e-NAM</span>
        <span>Updated: {new Date().toLocaleTimeString('en-IN')}</span>
      </div>
    </div>
  );
};

const Market = ({ lang }) => {
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [selectedCrop, setSelectedCrop] = useState(MANDI_PRICES[0]);
  const [tab, setTab] = useState('prices');

  const filtered = useMemo(() => {
    return MANDI_PRICES.filter(item => {
      const matchSearch =
        item.crop.toLowerCase().includes(search.toLowerCase()) ||
        item.mandi.toLowerCase().includes(search.toLowerCase()) ||
        item.district.toLowerCase().includes(search.toLowerCase());
      const matchState = stateFilter === 'ALL' || item.state === stateFilter;
      return matchSearch && matchState;
    });
  }, [search, stateFilter]);

  const upCount   = MANDI_PRICES.filter(m => m.change > 0).length;
  const downCount = MANDI_PRICES.filter(m => m.change < 0).length;

  return (
    <div className="market-page animate-fadeUp">
      {/* Page Header */}
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / Market Prices</div>
        <h1>📈 Mandi Prices — Telangana & AP</h1>
        <p>Live prices from {MANDI_PRICES.length} mandis. Data from Agmarknet / e-NAM. Updated daily.</p>
      </div>

      {/* Summary Bar */}
      <div className="market-summary">
        <div className="ms-item">
          <div className="ms-val">{MANDI_PRICES.length}</div>
          <div className="ms-label">Crops Tracked</div>
        </div>
        <div className="ms-item up">
          <div className="ms-val">▲ {upCount}</div>
          <div className="ms-label">Prices Up</div>
        </div>
        <div className="ms-item down">
          <div className="ms-val">▼ {downCount}</div>
          <div className="ms-label">Prices Down</div>
        </div>
        <div className="ms-item">
          <div className="ms-val">{new Date().toLocaleDateString('en-IN')}</div>
          <div className="ms-label">Last Updated</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="chip-tabs" style={{ marginBottom: 20 }}>
        {['prices', 'msp', 'filter'].map(t => (
          <button key={t} className={`chip${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'prices' ? '📊 All Prices' : t === 'msp' ? '🏛 MSP 2024-25' : '🔍 Filter & Search'}
          </button>
        ))}
      </div>

      {tab === 'prices' && (
        <div className="market-layout">
          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="search-bar" style={{ flex: 1, maxWidth: 360 }}>
              <span>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search crop, mandi, district..."
              />
            </div>
            <div className="state-filter">
              {['ALL', 'TG', 'AP'].map(s => (
                <button
                  key={s}
                  className={`chip${stateFilter === s ? ' active' : ''}`}
                  onClick={() => setStateFilter(s)}
                >
                  {s === 'ALL' ? '🇮🇳 All' : s === 'TG' ? '🌿 Telangana' : '🌾 Andhra Pradesh'}
                </button>
              ))}
            </div>
          </div>

          <div className="market-main">
            {/* Price Table */}
            <div className="card price-table-card">
              <div className="table-wrap">
                <table className="data-table price-table">
                  <thead>
                    <tr>
                      <th>Crop / Variety</th>
                      <th>Mandi / District</th>
                      <th>State</th>
                      <th>Price (Modal)</th>
                      <th>Change</th>
                      <th>Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(item => (
                      <PriceRow
                        key={item.id}
                        item={item}
                        onSelect={setSelectedCrop}
                        selected={selectedCrop?.id === item.id}
                      />
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                          No results found for "{search}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                Showing {filtered.length} of {MANDI_PRICES.length} crops |
                Source: Agmarknet Portal | Prices in ₹ per {selectedCrop?.unit || 'Quintal'}
              </div>
            </div>

            {/* Trend Panel */}
            {selectedCrop && <TrendChart item={selectedCrop} />}
          </div>
        </div>
      )}

      {tab === 'msp' && (
        <div className="card">
          <div style={{ padding: '16px 18px 12px', borderBottom: '1px solid var(--border)' }}>
            <div className="hch-title" style={{ fontSize: 15, fontWeight: 800 }}>
              🏛 MSP (Minimum Support Price) 2024-25
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              Government guaranteed prices — farmers have the right to sell at MSP via procurement centres
            </div>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>MSP 2024-25</th>
                  <th>Previous MSP</th>
                  <th>Hike</th>
                  <th>Season</th>
                </tr>
              </thead>
              <tbody>
                {MSP_2024_25.map((m, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{m.crop}</td>
                    <td style={{ fontWeight: 900, color: 'var(--green-700)', fontSize: 15 }}>
                      ₹{m.msp.toLocaleString()}
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>₹{m.prev.toLocaleString()}</td>
                    <td>
                      {m.hike > 0 ? (
                        <span className="badge badge-green">▲ ₹{m.hike}</span>
                      ) : (
                        <span className="badge badge-gold">No change</span>
                      )}
                    </td>
                    <td><span className="badge badge-sky">{m.season}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            Source: Cabinet Committee on Economic Affairs (CCEA), Govt of India | Effective 2024-25
          </div>
        </div>
      )}

      {tab === 'filter' && (
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 16, fontSize: 15, fontWeight: 800 }}>🔍 Advanced Filter</h3>
          <div className="grid-3" style={{ gap: 14, marginBottom: 16 }}>
            <div className="input-group">
              <label className="input-label">State</label>
              <select className="input" value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
                <option value="ALL">All States</option>
                <option value="TG">Telangana</option>
                <option value="AP">Andhra Pradesh</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Crop Category</label>
              <select className="input">
                <option>All Crops</option>
                <option>Cereals (Paddy, Maize)</option>
                <option>Cash Crops (Cotton, Tobacco)</option>
                <option>Spices (Chilli, Turmeric)</option>
                <option>Oilseeds (Groundnut, Soybean)</option>
                <option>Horticulture</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Price Range</label>
              <select className="input">
                <option>All Prices</option>
                <option>Below ₹2,000/qtl</option>
                <option>₹2,000–₹5,000/qtl</option>
                <option>₹5,000–₹10,000/qtl</option>
                <option>Above ₹10,000/qtl</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setTab('prices')}>Apply Filter & View →</button>
        </div>
      )}
    </div>
  );
};

export default Market;
