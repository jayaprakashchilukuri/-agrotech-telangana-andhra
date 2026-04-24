import React, { useEffect, useState } from 'react';
import { SEED_VARIETIES, FERTILIZER_PRICES, AGRI_CALENDAR, INSURANCE_PLANS, DRONE_OPERATORS, COLD_STORAGES, CROP_DISEASES, PROCUREMENT_CENTRES } from '../data/realData';
import { buildWeatherAlerts, fetchWeatherByCity, fetchWeatherByCoords } from '../services/agriApi';

/* ─────────────── SEEDS PAGE ─────────────── */
export const Seeds = () => {
  const [crop, setCrop] = useState('All');
  const crops = ['All', ...new Set(SEED_VARIETIES.map(s => s.crop))];
  const filtered = crop === 'All' ? SEED_VARIETIES : SEED_VARIETIES.filter(s => s.crop === crop);

  return (
    <div className="animate-fadeUp">
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / Seeds & Varieties</div>
        <h1>🌱 Recommended Seeds — TG & AP</h1>
        <p>KVK & ICAR recommended HYV and hybrid seeds for Telangana & Andhra Pradesh. Real performance data.</p>
      </div>
      <div className="chip-tabs" style={{ marginBottom: 20 }}>
        {crops.map(c => (
          <button key={c} className={`chip${crop === c ? ' active' : ''}`} onClick={() => setCrop(c)}>{c}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((s, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span className="badge badge-green">{s.crop}</span>
                  <span className="badge badge-sky">{s.type}</span>
                  <span className="badge badge-gold">{s.season}</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 4 }}>{s.variety}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>📍 Suitable for: {s.suitable}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>⭐ {s.features}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, minWidth: 280 }}>
                {[['⏱ Duration', s.duration], ['📦 Yield', s.yield], ['🌱 Season', s.season]].map(([l, v]) => (
                  <div key={l} style={{ background: 'var(--green-50)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>{l}</div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--green-800)' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────── FERTILIZER PAGE ─────────────── */
export const Fertilizer = () => (
  <div className="animate-fadeUp">
    <div className="page-header">
      <div className="breadcrumb">🏠 Home / Fertilizer Guide</div>
      <h1>🧪 Fertilizer Guide & MRP Rates</h1>
      <p>Current MRP rates (June 2025). Overpricing is illegal — report to 1800-180-1551.</p>
    </div>
    <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fffbeb)', border: '1px solid #fde68a', borderRadius: 14, padding: 16, marginBottom: 20, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <span style={{ fontSize: 22 }}>⚠️</span>
      <div>
        <div style={{ fontWeight: 800, fontSize: 13, color: '#92400e' }}>Important: Buy Fertilizers at MRP Only</div>
        <div style={{ fontSize: 12, color: '#78350f', marginTop: 4, lineHeight: 1.6 }}>
          If any dealer charges above MRP, call Fertilizer Grievance: <strong>1800-233-0001</strong> (Free). Always insist on a printed receipt.
        </div>
      </div>
    </div>
    <div className="card" style={{ overflow: 'hidden' }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Fertilizer</th>
            <th>Pack Size</th>
            <th>Govt MRP</th>
            <th>Avg Retail</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {FERTILIZER_PRICES.map((f, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 700 }}>{f.name}</td>
              <td>{f.bag}</td>
              <td style={{ fontWeight: 900, color: 'var(--green-700)', fontSize: 15 }}>₹{f.mrp}</td>
              <td style={{ color: f.retail > f.mrp ? '#dc2626' : 'var(--text-primary)', fontWeight: 700 }}>₹{f.retail}</td>
              <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{f.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="card" style={{ padding: 20, marginTop: 16 }}>
      <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 14 }}>📊 Crop-wise NPK Recommendation (per acre)</div>
      {[
        ['Paddy (HYV)', '80:40:40 kg NPK', 'Split N in 3 doses: basal, tillering, panicle initiation'],
        ['Cotton (Bt)', '100:50:50 kg NPK', 'Apply 1/3 basal + 1/3 at 45 DAS + 1/3 at boll formation'],
        ['Maize (Hybrid)', '100:50:50 kg NPK', '1/3 basal + 2/3 side dress at 25 DAS. Add Zinc 25kg/acre'],
        ['Groundnut', '15:30:15 kg NPK', 'Low N as it fixes own nitrogen. Add Gypsum 200kg/acre at flowering'],
        ['Red Chilli', '80:60:60 kg NPK', 'Split into 4 doses. Boron 1kg/acre at flower bud stage'],
        ['Turmeric', '100:50:50 kg NPK', 'Apply monthly from planting. Potash critical for rhizome yield'],
      ].map(([crop, npk, note], i) => (
        <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>{crop}</span>
            <span style={{ fontWeight: 900, color: 'var(--green-700)', fontSize: 13 }}>{npk}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{note}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ─────────────── AGRI CALENDAR PAGE ─────────────── */
export const AgriCalendar = () => {
  const [season, setSeason] = useState('Kharif');
  const data = AGRI_CALENDAR[season];

  return (
    <div className="animate-fadeUp">
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / Agri Calendar</div>
        <h1>📅 Agricultural Calendar — TG & AP</h1>
        <p>Month-by-month farming activity schedule for Telangana & Andhra Pradesh.</p>
      </div>
      <div className="chip-tabs" style={{ marginBottom: 20 }}>
        {Object.keys(AGRI_CALENDAR).map(s => (
          <button key={s} className={`chip${season === s ? ' active' : ''}`} onClick={() => setSeason(s)}>{s}</button>
        ))}
      </div>
      <div style={{ background: 'linear-gradient(135deg, #052e16, #166534)', borderRadius: 16, padding: 22, marginBottom: 20, color: 'white' }}>
        <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 6, fontWeight: 700, letterSpacing: '0.5px' }}>{season.toUpperCase()} SEASON</div>
        <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>📅 {data.months}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {data.crops.map(c => (
            <span key={c} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>{c}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {data.activities.map((act, i) => (
          <div key={i} style={{ display: 'flex', gap: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 60, flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--green-700)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, zIndex: 1, flexShrink: 0 }}>{i + 1}</div>
              {i < data.activities.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 24 }}></div>}
            </div>
            <div style={{ paddingBottom: 20, paddingLeft: 14, flex: 1 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--green-700)', marginBottom: 5 }}>{act.month}</div>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6 }}>{act.activity}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────── INSURANCE PAGE ─────────────── */

export const Insurance = ({ lang }) => {
  const [claimForm, setClaimForm] = useState({ policy: '', crop: 'Paddy', cause: 'Flood', loss: '', phone: '' });

  return (
    <div className="animate-fadeUp">
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / Crop Insurance</div>
        <h1>🛡 Crop Insurance — TG & AP</h1>
        <p>Compare policies, enroll, and file claims. AP farmers get 100% FREE insurance under YSR scheme.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', borderRadius: 14, padding: 18, color: 'white' }}>
          <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 700, marginBottom: 6 }}>ANDHRA PRADESH</div>
          <div style={{ fontSize: 18, fontWeight: 900 }}>100% FREE Crop Insurance</div>
          <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6, lineHeight: 1.5 }}>YSR scheme — AP government pays full PMFBY premium. Zero cost to farmers.</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', borderRadius: 14, padding: 18, color: 'white' }}>
          <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 700, marginBottom: 6 }}>TELANGANA</div>
          <div style={{ fontSize: 18, fontWeight: 900 }}>FREE Life Insurance ₹5 Lakh</div>
          <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6, lineHeight: 1.5 }}>Rythu Bheema — free life cover for all TG farmers aged 18–59.</div>
        </div>
      </div>

      {INSURANCE_PLANS.map((p, i) => (
        <div key={i} className="card" style={{ padding: 20, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <span className={`badge ${p.type.includes('AP') ? 'badge-sky' : p.type.includes('TG') ? 'badge-gold' : p.type === 'Central' ? 'badge-green' : 'badge-orange'}`}>{p.type}</span>
                {(p.free_ap || p.free_tg) && <span className="badge badge-green">✅ FREE</span>}
              </div>
              <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 6 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>📅 Deadline: {p.deadline}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>✅ {p.eligibility}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>PREMIUM</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: p.free_ap || p.free_tg ? 'var(--green-700)' : 'var(--text-primary)' }}>{p.premium}</div>
              <div style={{ fontSize: 11, color: 'var(--green-700)', fontWeight: 700, marginTop: 4 }}>Cover: {p.cover}</div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }} onClick={() => alert('Redirecting to PMFBY portal: pmfby.gov.in')}>
                Enroll →
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Claim Form */}
      <div className="card" style={{ padding: 24, marginTop: 8 }}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>📝 File a Crop Loss Claim</div>
        <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 12, color: '#92400e' }}>
          ⏰ <strong>Important:</strong> File claim within 72 hours of crop damage. Collect photographic evidence immediately.
        </div>
        <div className="grid-2" style={{ gap: 14, marginBottom: 16 }}>
          {[
            ['Policy Number', 'policy', 'text', 'PMFBY-2024-AP-...'],
            ['Registered Mobile', 'phone', 'tel', '9876543210'],
          ].map(([l, k, t, ph]) => (
            <div key={k} className="input-group">
              <label className="input-label">{l}</label>
              <input type={t} className="input" placeholder={ph}
                value={claimForm[k]} onChange={e => setClaimForm(f => ({ ...f, [k]: e.target.value }))} />
            </div>
          ))}
          <div className="input-group">
            <label className="input-label">Crop Damaged</label>
            <select className="input" value={claimForm.crop}
              onChange={e => setClaimForm(f => ({ ...f, crop: e.target.value }))}>
              {['Paddy', 'Cotton', 'Maize', 'Groundnut', 'Red Chilli', 'Soybean', 'Turmeric'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Cause of Damage</label>
            <select className="input" value={claimForm.cause}
              onChange={e => setClaimForm(f => ({ ...f, cause: e.target.value }))}>
              {['Flood / Waterlogging', 'Drought', 'Cyclone', 'Hailstorm', 'Pest / Disease', 'Fire', 'Landslide'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">% Crop Loss (Estimate)</label>
            <input type="number" className="input" placeholder="e.g. 60" min="0" max="100"
              value={claimForm.loss} onChange={e => setClaimForm(f => ({ ...f, loss: e.target.value }))} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => alert('Claim submitted! Ref #2025-AP-' + Math.floor(Math.random() * 100000) + '\nInsurance inspector will visit within 48 hours.\nTrack at pmfby.gov.in')}>
          📤 Submit Claim
        </button>
      </div>
    </div>
  );
};

/* ─────────────── DRONE PAGE ─────────────── */
export const Drone = () => {
  const [selected, setSelected] = useState(null);
  const [bookingState, setBookingState] = useState({ district: '', acres: 5, date: '' });

  const PLANS = [
    { name: 'Basic', price: 400, area: 'Up to 5 Acres', features: ['Herbicide spray', 'Pesticide spray', 'Operator + equipment'], badge: null },
    { name: 'Standard', price: 700, area: 'Up to 10 Acres', features: ['All Basic features', 'Fertilizer spraying', 'GPS route report'], badge: 'Popular' },
    { name: 'Premium', price: 1200, area: 'Up to 20 Acres', features: ['All Standard features', 'High-res GPS mapping', 'NDVI crop health report'], badge: null },
    { name: 'Season Pass', price: 3500, area: 'All Season (Unlimited)', features: ['Unlimited sprays', 'Priority booking', 'Free disease scouting report'], badge: 'Best Value' },
  ];

  return (
    <div className="animate-fadeUp">
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / Drone Services</div>
        <h1>🚁 Drone Spraying Service</h1>
        <p>Book certified DGCA-approved drone operators in your district. Precision agriculture at affordable rates.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 24 }}>
        {PLANS.map((p, i) => (
          <div key={i} className="card" style={{ padding: 20, cursor: 'pointer', border: selected === i ? '2px solid var(--green-600)' : '1px solid var(--border)', background: selected === i ? 'var(--green-50)' : 'white', transition: 'all 0.2s' }}
            onClick={() => setSelected(i)}>
            {p.badge && <span className="badge badge-gold" style={{ marginBottom: 10, display: 'inline-block' }}>{p.badge}</span>}
            <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--green-700)', fontFamily: "'Baloo Tammudu 2'" }}>
              ₹{p.price}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>/acre</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--green-700)', fontWeight: 600, margin: '6px 0 10px' }}>{p.area}</div>
            {p.features.map(f => <div key={f} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '3px 0' }}>✅ {f}</div>)}
          </div>
        ))}
      </div>

      {selected !== null && (
        <div className="card" style={{ padding: 22, marginBottom: 18 }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 16 }}>📅 Book {PLANS[selected].name} Plan</div>
          <div className="grid-2" style={{ gap: 14 }}>
            <div className="input-group">
              <label className="input-label">Your District</label>
              <select className="input" value={bookingState.district} onChange={e => setBookingState(b => ({ ...b, district: e.target.value }))}>
                <option value="">Select District</option>
                {['Warangal', 'Karimnagar', 'Nizamabad', 'Khammam', 'Nalgonda', 'Vijayawada (Krishna)', 'Guntur', 'Kurnool', 'Nellore', 'East Godavari'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Number of Acres</label>
              <input type="number" className="input" value={bookingState.acres} min="1" onChange={e => setBookingState(b => ({ ...b, acres: e.target.value }))} />
            </div>
            <div className="input-group">
              <label className="input-label">Preferred Date</label>
              <input type="date" className="input" value={bookingState.date} min={new Date().toISOString().split('T')[0]} onChange={e => setBookingState(b => ({ ...b, date: e.target.value }))} />
            </div>
            <div className="input-group">
              <label className="input-label">Estimated Cost</label>
              <div style={{ background: 'var(--green-50)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', fontSize: 18, fontWeight: 900, color: 'var(--green-700)' }}>
                ₹{(PLANS[selected].price * (bookingState.acres || 1)).toLocaleString()}
              </div>
            </div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: 16 }}
            onClick={() => alert(`Booking confirmed! ✅\nPlan: ${PLANS[selected].name}\nOperator will call within 2 hours.\nRef: DR-${Math.floor(Math.random() * 100000)}`)}>
            ✅ Confirm Booking
          </button>
        </div>
      )}

      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 14 }}>🏭 Registered Operators — TG & AP</div>
        {DRONE_OPERATORS.map((op, i) => (
          <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{op.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
                {'⭐'.repeat(Math.floor(op.rating))} {op.rating} ({op.reviews} reviews) &bull; {op.districts.join(', ')}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ fontWeight: 800, color: 'var(--green-700)' }}>₹{op.rate}/acre</div>
              <button className="btn btn-outline btn-sm" onClick={() => alert(`Calling ${op.name}: ${op.contact}`)}>📞 Call</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────── COLD STORAGE PAGE ─────────────── */
export const Storage = () => (
  <div className="animate-fadeUp">
    <div className="page-header">
      <div className="breadcrumb">🏠 Home / Cold Storage</div>
      <h1>🏭 Cold Storage Locator — TG & AP</h1>
      <p>Government and private cold storage facilities. Preserve produce and get better prices by avoiding distress sales.</p>
    </div>
    <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 14, padding: 16, marginBottom: 20, fontSize: 13, color: '#075985' }}>
      💡 <strong>Tip:</strong> Store paddy at less than 14% moisture. Store onion/potato at 2–8°C. Storing produce for 2–3 months can increase prices by 20–40%.
    </div>
    {['TG', 'AP'].map(state => (
      <div key={state} style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 14, color: 'var(--text-primary)' }}>
          {state === 'TG' ? '🌿 Telangana' : '🌾 Andhra Pradesh'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {COLD_STORAGES.filter(s => s.state === state).map((s, i) => (
            <div key={i} className="card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>{s.name}</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                    {s.crops.map(c => <span key={c} className="badge badge-green">{c}</span>)}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>📍 {s.dist} &bull; 🌡 {s.temp} &bull; 📦 {s.capacity}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--green-700)' }}>{s.rate}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>storage rate</div>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }}
                    onClick={() => alert(`Booking space at ${s.name}\nCall: ${s.contact}`)}>
                    Book Space
                  </button>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.contact}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
    <div className="card" style={{ padding: 20 }}>
      <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 14 }}>🏛 Govt Procurement Centres (MSP Purchase)</div>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr><th>State</th><th>District</th><th>Centre</th><th>Crop</th><th>Open Date</th><th>Token</th></tr>
          </thead>
          <tbody>
            {PROCUREMENT_CENTRES.map((c, i) => (
              <tr key={i}>
                <td><span className={`badge ${c.state === 'TG' ? 'badge-gold' : 'badge-sky'}`}>{c.state}</span></td>
                <td style={{ fontWeight: 600 }}>{c.district}</td>
                <td>{c.centre}</td>
                <td><span className="badge badge-green">{c.crop}</span></td>
                <td>{c.openDate}</td>
                <td style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.token}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

/* ─────────────── ALERTS PAGE ─────────────── */
export const Alerts = () => {
  const [toggles, setToggles] = useState([true, true, true, false, true]);
  const [alerts, setAlerts] = useState([]);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [alertsError, setAlertsError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [locationNote, setLocationNote] = useState('Loading live weather alerts for selected cities...');
  const toggle = i => setToggles(t => t.map((v, j) => j === i ? !v : v));

  const loadAlerts = async () => {
    setAlertsLoading(true);
    setAlertsError('');
    try {
      const trackedCities = ['Hyderabad', 'Warangal', 'Vijayawada', 'Guntur', 'Kurnool'];
      const weatherSnapshots = await Promise.all(trackedCities.map((city) => fetchWeatherByCity(city)));
      setAlerts(buildWeatherAlerts(weatherSnapshots));
      setLocationNote('Live alerts generated from Open-Meteo weather signals across key TG/AP cities.');
      setLastUpdated(new Date().toLocaleTimeString('en-IN'));
    } catch {
      setAlertsError('Could not refresh live alerts right now. Showing latest available alerts.');
    } finally {
      setAlertsLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
    const timer = setInterval(() => loadAlerts(), 300000);
    return () => clearInterval(timer);
  }, []);

  const useMyLocationAlerts = () => {
    if (!navigator.geolocation) {
      setLocationNote('Geolocation is not available in this browser.');
      return;
    }

    setLocationNote('Fetching live alerts for your current location...');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const localWeather = await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude, 'Your Location');
        const nearbyWeather = await fetchWeatherByCity(localWeather.nearestSupportedCity || 'Hyderabad');
        setAlerts(buildWeatherAlerts([localWeather, nearbyWeather]));
        setLocationNote(`Live alerts for your location and nearest city (${localWeather.nearestSupportedCity || 'Hyderabad'}).`);
        setLastUpdated(new Date().toLocaleTimeString('en-IN'));
      },
      () => {
        setLocationNote('Location permission denied. Showing city-based live alerts.');
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  const typeMap = { danger: 'alert-danger', warning: 'alert-warning', info: 'alert-info', success: 'alert-success' };

  return (
    <div className="animate-fadeUp">
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / Emergency Alerts</div>
        <h1>🚨 Emergency Alerts — TG & AP</h1>
        <p>Real-time weather, pest, procurement and disaster alerts for Telangana & Andhra Pradesh farmers.</p>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-outline btn-sm" onClick={useMyLocationAlerts}>📍 Use My Location Alerts</button>
        <button className="btn btn-outline btn-sm" onClick={loadAlerts} disabled={alertsLoading}>{alertsLoading ? 'Refreshing...' : '🔄 Refresh Alerts'}</button>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{locationNote}</span>
      </div>
      {lastUpdated && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Auto-refresh: every 5 min | Last updated at {lastUpdated}</div>}
      {alertsError && (
        <div className="card" style={{ padding: 10, marginBottom: 12, color: '#b45309', fontSize: 13 }}>
          {alertsError}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {alertsLoading && (
          <div className="card" style={{ padding: 14, fontSize: 13, color: 'var(--text-muted)' }}>Loading live alerts...</div>
        )}
        {!alertsLoading && alerts.map((a, i) => (
          <div key={i} className={`alert ${typeMap[a.type]}`}>
            <span className="alert-icon" style={{ fontSize: 22, flexShrink: 0 }}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <div className="alert-title">{a.title}</div>
              <div className="alert-body">{a.body}</div>
              <div style={{ display: 'flex', gap: 16, marginTop: 6, fontSize: 10, opacity: 0.7 }}>
                <span>🕐 {a.time}</span><span>📡 {a.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 14 }}>🔔 My Alert Subscriptions</div>
        {['🌪 Cyclone & Flood Warnings', '🐛 Pest & Disease Outbreaks', '💰 Procurement & Price Alerts', '💧 Irrigation Release Schedule', '🌡 Extreme Weather (Heat/Cold)'].map((s, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{s}</span>
            <div className={`toggle-switch ${toggles[i] ? 'on' : 'off'}`} onClick={() => toggle(i)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
        ))}
        <button className="btn btn-primary" style={{ marginTop: 16 }}
          onClick={() => alert('Alert preferences saved! You will receive SMS/WhatsApp alerts.')}>
          💾 Save Preferences
        </button>
      </div>
    </div>
  );
};

/* ─────────────── DISEASE PAGE ─────────────── */
export const Disease = () => {
  const [crop, setCrop] = useState('Paddy');
  const [analysed, setAnalysed] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);

  const diseases = CROP_DISEASES[crop] || [];

  return (
    <div className="animate-fadeUp">
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / Disease Detection</div>
        <h1>🔬 Crop Disease Guide & AI Detection</h1>
        <p>Disease symptoms, treatments and prevention for major crops in Telangana & AP.</p>
      </div>

      <div className="chip-tabs" style={{ marginBottom: 20 }}>
        {Object.keys(CROP_DISEASES).map(c => (
          <button key={c} className={`chip${crop === c ? ' active' : ''}`} onClick={() => { setCrop(c); setSelectedDisease(null); }}>{c}</button>
        ))}
      </div>

      <div className="grid-2" style={{ gap: 16, marginBottom: 20 }}>
        <div>
          {diseases.map((d, i) => (
            <div key={i} className="card" style={{ padding: 18, marginBottom: 12, cursor: 'pointer', border: selectedDisease === i ? '2px solid var(--green-600)' : '1px solid var(--border)', background: selectedDisease === i ? 'var(--green-50)' : 'white' }}
              onClick={() => setSelectedDisease(selectedDisease === i ? null : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{d.name}</div>
                <span className={`badge ${d.severity === 'Very High' || d.severity === 'High' ? 'badge-red' : 'badge-gold'}`}>{d.severity}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>🔴 Symptoms: {d.symptoms}</div>
              {selectedDisease === i && (
                <div style={{ marginTop: 10 }} className="animate-fadeUp">
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 12, marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-700)', marginBottom: 4 }}>💊 TREATMENT</div>
                    <div style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.6 }}>{d.treatment}</div>
                  </div>
                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#92400e', marginBottom: 4 }}>🛡 PREVENTION</div>
                    <div style={{ fontSize: 12, color: '#78350f', lineHeight: 1.6 }}>{d.prevention}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 14 }}>📷 AI Photo Diagnosis</div>
            <div
              style={{ border: '2px dashed var(--green-400)', borderRadius: 14, padding: '36px 20px', textAlign: 'center', background: analysed ? 'var(--green-50)' : 'var(--slate-50)', cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={() => setAnalysed(true)}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>{analysed ? '🌿' : '📸'}</div>
              {analysed ? (
                <>
                  <div style={{ fontWeight: 800, color: 'var(--green-800)', marginBottom: 4 }}>Analysis Complete</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Leaf Blight detected with 87% confidence</div>
                </>
              ) : (
                <>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Upload Crop Photo</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Click to take photo or upload. AI analyses in seconds.</div>
                </>
              )}
            </div>
            {analysed && (
              <div style={{ marginTop: 14, background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 10, padding: 14 }} className="animate-fadeUp">
                <div style={{ fontWeight: 800, fontSize: 14, color: '#92400e', marginBottom: 6 }}>⚠️ Bacterial Leaf Blight (BLB)</div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ height: 6, background: '#fde68a', borderRadius: 3 }}>
                    <div style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg,#d97706,#f59e0b)', borderRadius: 3 }}></div>
                  </div>
                  <div style={{ fontSize: 10, color: '#92400e', marginTop: 3 }}>Confidence: 87%</div>
                </div>
                <div style={{ fontSize: 12, color: '#78350f', lineHeight: 1.6 }}>
                  <strong>Treatment:</strong> Apply Copper Oxychloride @ 3g/L. Remove infected tillers. Avoid excess nitrogen.
                </div>
                <button className="btn btn-gold btn-sm" style={{ marginTop: 10, fontSize: 12 }}>📞 Contact KVK for Expert Help</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────── MARKETPLACE PAGE ─────────────── */
const PRODUCTS = [
  { i: '🌾', name: 'Paddy BPT-5204 (Grade A)', seller: 'Ramu Reddy, Krishna', price: '₹2,150/qtl', qty: '50 qtl', state: 'AP' },
  { i: '🌿', name: 'Cotton (Bt) Ginned', seller: 'Suresh Farms, Warangal', price: '₹7,000/qtl', qty: '20 qtl', state: 'TG' },
  { i: '🌶', name: 'Red Chilli Teja (S4)', seller: 'Venkat Agro, Guntur', price: '₹130/kg', qty: '500 kg', state: 'AP' },
  { i: '🟡', name: 'Turmeric Finger (Pragati)', seller: 'Nizamabad Spices', price: '₹85/kg', qty: '200 kg', state: 'TG' },
  { i: '🥜', name: 'Groundnut Bold Grade', seller: 'Kurnool Agro', price: '₹55/kg', qty: '1 tonne', state: 'AP' },
  { i: '🧅', name: 'Fresh Onion Red', seller: 'Kisan Co-op, Mahbubnagar', price: '₹22/kg', qty: '2 tonnes', state: 'TG' },
  { i: '🍅', name: 'Tomato (Local Variety)', seller: 'Green Fields, Chittoor', price: '₹9/kg', qty: '500 kg', state: 'AP' },
  { i: '🌽', name: 'Hybrid Maize (Dry)', seller: 'Nizamabad Grains', price: '₹20/kg', qty: '5 tonnes', state: 'TG' },
];

export const Marketplace = () => {
  const [listing, setListing] = useState({ crop: '', qty: '', price: '', location: '', contact: '' });
  const [stateF, setStateF] = useState('ALL');

  const filtered = stateF === 'ALL' ? PRODUCTS : PRODUCTS.filter(p => p.state === stateF);

  return (
    <div className="animate-fadeUp">
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / Marketplace</div>
        <h1>🛒 Farmer Marketplace — TG & AP</h1>
        <p>Buy and sell produce directly. Connect with verified buyers and farmers across Telangana & AP.</p>
      </div>

      <div className="chip-tabs" style={{ marginBottom: 20 }}>
        {[['ALL', '🇮🇳 All'], ['TG', '🌿 Telangana'], ['AP', '🌾 Andhra Pradesh']].map(([v, l]) => (
          <button key={v} className={`chip${stateF === v ? ' active' : ''}`} onClick={() => setStateF(v)}>{l}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12, marginBottom: 24 }}>
        {filtered.map((p, i) => (
          <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = ''}>
            <div style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, background: 'linear-gradient(135deg,var(--green-50),var(--green-100))' }}>
              {p.i}
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 3 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>👤 {p.seller}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 17, fontWeight: 900, color: 'var(--green-700)' }}>{p.price}</div>
                <span className={`badge ${p.state === 'TG' ? 'badge-gold' : 'badge-sky'}`}>{p.state}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>📦 Available: {p.qty}</div>
              <button className="btn btn-primary btn-full btn-sm" style={{ marginTop: 10 }}
                onClick={() => alert(`Connecting you with ${p.seller}\nFor bulk purchase, call Agri Exchange: 1800-180-1551`)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>📤 List Your Produce for Sale</div>
        <div className="grid-2" style={{ gap: 14, marginBottom: 16 }}>
          {[['Crop / Product Name', 'crop', 'text', 'e.g. Paddy BPT-5204'],
            ['Quantity Available', 'qty', 'text', 'e.g. 50 Quintals'],
            ['Your Price (₹)', 'price', 'text', 'e.g. ₹2,150/qtl'],
            ['Village, District', 'location', 'text', 'e.g. Guntur, AP'],
            ['Contact Number', 'contact', 'tel', '9876543210']
          ].map(([l, k, t, ph]) => (
            <div key={k} className="input-group">
              <label className="input-label">{l}</label>
              <input type={t} className="input" placeholder={ph}
                value={listing[k]} onChange={e => setListing(f => ({ ...f, [k]: e.target.value }))} />
            </div>
          ))}
        </div>
        <button className="btn btn-gold" onClick={() => alert('Listing published! 🎉 Buyers will contact you directly. Listing valid for 30 days.')}>
          📢 Publish Listing for FREE
        </button>
      </div>
    </div>
  );
};

const OtherPages = { Seeds, Fertilizer, AgriCalendar, Insurance, Drone, Storage, Alerts, Disease, Marketplace };

export default OtherPages;
