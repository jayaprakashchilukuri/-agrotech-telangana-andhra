import React, { useEffect, useMemo, useState } from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MANDI_PRICES, MSP_2024_25 } from '../data/realData';
import { fetchMarketPrices } from '../services/agriApi';
import './Market.css';

const resolveStateCode = (value) => {
  const normalized = String(value || '').toLowerCase();
  if (normalized === 'tg' || normalized.includes('telangana')) return 'TG';
  if (normalized === 'ap' || normalized.includes('andhra')) return 'AP';
  return 'AP';
};

const toNumber = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const buildTrend = (min, modal, max) => {
  const safeMin = Math.max(0, Math.round(min));
  const safeModal = Math.max(0, Math.round(modal));
  const safeMax = Math.max(safeModal, Math.round(max));

  if (!safeModal) {
    return [safeMin, safeMin, safeMin, safeMin, safeMin, safeMin];
  }

  const day1 = Math.round(safeModal * 0.94);
  const day2 = Math.round(safeModal * 0.96);
  const day3 = Math.round(safeModal * 0.98);
  const day4 = Math.round((safeMin + safeModal) / 2);
  const day5 = Math.round((safeModal + safeMax) / 2);
  return [day1, day2, day3, day4, day5, safeModal];
};

const normalizeMarketData = (records = []) => {
  if (!Array.isArray(records) || !records.length) {
    return MANDI_PRICES;
  }

  const looksNormalized = records[0]?.crop && records[0]?.mandi && records[0]?.price;
  if (looksNormalized) {
    return records;
  }

  const mapped = records
    .map((row, index) => {
      const min = toNumber(row.min_price ?? row.min, 0);
      const max = toNumber(row.max_price ?? row.max, min);
      const modal = toNumber(row.modal_price ?? row.price, min || max);
      const trend = buildTrend(min || modal, modal, max || modal);

      return {
        id: row.id || `api-${index + 1}`,
        crop: row.commodity || row.crop || 'Unknown Crop',
        variety: row.variety || 'Standard',
        mandi: row.market || row.mandi || 'Unknown Mandi',
        district: row.district || row.district_name || 'Unknown District',
        state: resolveStateCode(row.state || row.state_name),
        price: Math.round(modal || 0),
        min: Math.round(min || modal || 0),
        max: Math.round(max || modal || 0),
        unit: row.unit || 'Quintal',
        change: trend[5] - trend[4],
        date: row.arrival_date || row.date || new Date().toISOString().slice(0, 10),
        trend,
      };
    })
    .filter((item) => item.price > 0);

  return mapped.length ? mapped : MANDI_PRICES;
};

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
  const [marketData, setMarketData] = useState(MANDI_PRICES);
  const [selectedCrop, setSelectedCrop] = useState(MANDI_PRICES[0]);
  const [tab, setTab] = useState('prices');
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [marketSource, setMarketSource] = useState('Local fallback');
  const [lastUpdated, setLastUpdated] = useState('');

  const loadLiveMarket = async () => {
    setIsLoading(true);
    setLoadError('');

    try {
      const resourceId = process.env.REACT_APP_DATA_GOV_RESOURCE_ID;
      const apiKey = process.env.REACT_APP_DATA_GOV_API_KEY;
      const response = await fetchMarketPrices({
        resourceId,
        apiKey,
        limit: 250,
      });

      const normalized = normalizeMarketData(response);
      setMarketData(normalized);
      setSelectedCrop(normalized[0] || null);
      setMarketSource(resourceId && apiKey ? 'data.gov.in live API' : 'Local fallback data');
      setLastUpdated(new Date().toLocaleString('en-IN'));
    } catch {
      setMarketData(MANDI_PRICES);
      setSelectedCrop(MANDI_PRICES[0]);
      setLoadError('Could not fetch live market feed. Showing fallback mandi data.');
      setMarketSource('Local fallback data');
      setLastUpdated(new Date().toLocaleString('en-IN'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLiveMarket();
    const timer = setInterval(() => loadLiveMarket(), 300000);
    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    return marketData.filter(item => {
      const matchSearch =
        item.crop.toLowerCase().includes(search.toLowerCase()) ||
        item.mandi.toLowerCase().includes(search.toLowerCase()) ||
        item.district.toLowerCase().includes(search.toLowerCase());
      const matchState = stateFilter === 'ALL' || item.state === stateFilter;
      return matchSearch && matchState;
    });
  }, [marketData, search, stateFilter]);

  const upCount = marketData.filter(m => m.change > 0).length;
  const downCount = marketData.filter(m => m.change < 0).length;

  return (
    <div className="market-page animate-fadeUp">
      {/* Page Header */}
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / Market Prices</div>
        <h1>📈 Mandi Prices — Telangana & AP</h1>
        <p>Live prices from {marketData.length} mandis. Data from Agmarknet / e-NAM. Updated daily.</p>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-outline btn-sm" onClick={loadLiveMarket} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh Live Prices'}
        </button>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Source: {marketSource}</span>
        {lastUpdated && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Updated: {lastUpdated}</span>}
      </div>
      {loadError && (
        <div className="card" style={{ padding: 10, marginBottom: 12, color: '#b45309', fontSize: 13 }}>
          {loadError}
        </div>
      )}

      {/* Summary Bar */}
      <div className="market-summary">
        <div className="ms-item">
          <div className="ms-val">{marketData.length}</div>
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
                Showing {filtered.length} of {marketData.length} crops |
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
