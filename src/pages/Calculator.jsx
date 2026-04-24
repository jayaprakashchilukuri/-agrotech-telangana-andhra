import React, { useState } from 'react';
import { MANDI_PRICES, MSP_2024_25 } from '../data/realData';
import './Calculator.css';

const Calculator = ({ lang }) => {
  const [form, setForm] = useState({
    crop: 'Paddy (Fine)', state: 'AP', area: 2,
    seed: 1200, fert: 3500, labour: 5000,
    irr: 1500, pesticide: 800, other: 500,
    yield: 20, sellPrice: 2195,
  });
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const cropOptions = MANDI_PRICES.map(m => m.crop).filter((v, i, a) => a.indexOf(v) === i);
  const msps = Object.fromEntries(MSP_2024_25.map(m => [m.crop, m.msp]));

  const autofillPrice = (cropName) => {
    const found = MANDI_PRICES.find(m => m.crop === cropName && m.state === form.state);
    if (found) set('sellPrice', found.price);
  };

  const calculate = () => {
    const area  = parseFloat(form.area)       || 1;
    const costs = [form.seed, form.fert, form.labour, form.irr, form.pesticide, form.other]
      .map(v => parseFloat(v) || 0)
      .reduce((a, b) => a + b, 0);
    const totalCost    = costs * area;
    const grossRevenue = parseFloat(form.yield) * parseFloat(form.sellPrice) * area;
    const mspKey       = Object.keys(msps).find(k => k.toLowerCase().includes(form.crop.split(' ')[0].toLowerCase()));
    const mspPrice     = mspKey ? msps[mspKey] : 0;
    const mspRevenue   = parseFloat(form.yield) * mspPrice * area;
    const profit       = grossRevenue - totalCost;
    const mspProfit    = mspRevenue - totalCost;
    const roi          = ((profit / totalCost) * 100).toFixed(1);
    const costPerQtl   = (totalCost / (parseFloat(form.yield) * area)).toFixed(0);
    setResult({ totalCost, grossRevenue, profit, mspRevenue, mspProfit, roi, costPerQtl, mspPrice });
  };

  return (
    <div className="calc-page animate-fadeUp">
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / Profit Calculator</div>
        <h1>💰 Crop Profit Calculator</h1>
        <p>Calculate your input costs, expected revenue, and net profit per acre. Compare with MSP prices.</p>
      </div>

      <div className="calc-layout">
        {/* Form */}
        <div className="card calc-form-card">
          <div className="calc-section-title">🌾 Crop & Location</div>
          <div className="grid-2" style={{ gap: 14, marginBottom: 20 }}>
            <div className="input-group">
              <label className="input-label">Crop</label>
              <select className="input" value={form.crop}
                onChange={e => { set('crop', e.target.value); autofillPrice(e.target.value); }}>
                {cropOptions.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">State</label>
              <select className="input" value={form.state} onChange={e => set('state', e.target.value)}>
                <option value="TG">Telangana</option>
                <option value="AP">Andhra Pradesh</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Land Area (Acres)</label>
              <input type="number" className="input" value={form.area}
                onChange={e => set('area', e.target.value)} min="0.5" step="0.5" />
            </div>
            <div className="input-group">
              <label className="input-label">Expected Yield (qtl/acre)</label>
              <input type="number" className="input" value={form.yield}
                onChange={e => set('yield', e.target.value)} />
            </div>
          </div>

          <div className="calc-section-title">💸 Input Costs (₹ per acre)</div>
          <div className="grid-2" style={{ gap: 14, marginBottom: 20 }}>
            {[
              ['seed', 'Seed / Planting Material'],
              ['fert', 'Fertilizer (NPK + Micro)'],
              ['labour', 'Labour (Sowing to Harvest)'],
              ['irr', 'Irrigation Cost'],
              ['pesticide', 'Pesticide / Fungicide'],
              ['other', 'Other Expenses'],
            ].map(([key, label]) => (
              <div key={key} className="input-group">
                <label className="input-label">{label}</label>
                <input type="number" className="input" value={form[key]}
                  onChange={e => set(key, e.target.value)} />
              </div>
            ))}
          </div>

          <div className="calc-section-title">📈 Sale Price</div>
          <div className="grid-2" style={{ gap: 14, marginBottom: 20 }}>
            <div className="input-group">
              <label className="input-label">Selling Price (₹/qtl)</label>
              <input type="number" className="input" value={form.sellPrice}
                onChange={e => set('sellPrice', e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Auto-fill from mandi</label>
              <button className="btn btn-outline btn-full" onClick={() => autofillPrice(form.crop)}>
                📈 Get Live Market Price
              </button>
            </div>
          </div>

          <button className="btn btn-primary btn-full btn-lg" onClick={calculate}>
            🧮 Calculate Profit
          </button>
        </div>

        {/* Result */}
        <div className="calc-result-col">
          {result ? (
            <>
              <div className="result-main-card">
                <div className="rmc-title">📊 Profit Analysis — {form.crop} ({form.area} Acres)</div>
                <div className="rmc-profit">
                  <div className={`rmc-profit-val ${result.profit >= 0 ? 'profit' : 'loss'}`}>
                    {result.profit >= 0 ? '₹' : '-₹'}{Math.abs(result.profit).toLocaleString()}
                  </div>
                  <div className="rmc-profit-label">Net Profit / Loss</div>
                  <div className={`rmc-roi ${result.profit >= 0 ? 'profit' : 'loss'}`}>
                    ROI: {result.roi}%
                  </div>
                </div>

                {[
                  ['Total Input Cost',  `₹${result.totalCost.toLocaleString()}`, ''],
                  ['Gross Revenue (Market)', `₹${result.grossRevenue.toLocaleString()}`, ''],
                  ['Cost per Quintal', `₹${result.costPerQtl}`, ''],
                  result.mspPrice > 0
                    ? ['Revenue at MSP', `₹${result.mspRevenue.toLocaleString()}`, `MSP: ₹${result.mspPrice}/qtl`]
                    : null,
                  result.mspPrice > 0
                    ? ['Profit at MSP', `₹${result.mspProfit.toLocaleString()}`, '']
                    : null,
                ].filter(Boolean).map(([label, val, sub], i) => (
                  <div key={i} className="rmc-row">
                    <div>
                      <div className="rmc-row-label">{label}</div>
                      {sub && <div className="rmc-row-sub">{sub}</div>}
                    </div>
                    <div className="rmc-row-val">{val}</div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="card" style={{ padding: 18 }}>
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>💡 Improvement Tips</div>
                {[
                  result.totalCost / (parseFloat(form.area)) > 12000
                    ? '⚠️ High input costs. Reduce labour with machinery. Use neem-coated urea to cut fertilizer need by 15%.'
                    : '✅ Input costs are reasonable.',
                  parseFloat(form.yield) < 18
                    ? '📈 Low yield. Use HYV certified seeds and apply soil test-based fertilization to boost yield.'
                    : '✅ Good yield levels.',
                  parseFloat(form.sellPrice) < (result.mspPrice || 99999)
                    ? `⚠️ Market price below MSP (₹${result.mspPrice}/qtl). Sell at govt procurement centre to get MSP.`
                    : '✅ Market price is good.',
                  '💧 Use drip irrigation to reduce irrigation costs by 30-40%.',
                ].map((tip, i) => (
                  <div key={i} style={{ fontSize: 12, padding: '7px 0', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>
                    {tip}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="calc-placeholder card">
              <div className="cp-icon">🧮</div>
              <div className="cp-text">Fill in the details and click Calculate to see your profit analysis</div>
              <div className="cp-tips">
                <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13 }}>Average yields (TG & AP):</div>
                {[
                  ['Paddy (HYV)', '18–22 qtl/acre'],
                  ['Cotton (Bt)', '10–14 qtl/acre'],
                  ['Maize (Hybrid)', '28–35 qtl/acre'],
                  ['Red Chilli', '14–20 qtl/acre (dry)'],
                  ['Groundnut', '10–14 qtl/acre'],
                ].map(([c, y]) => (
                  <div key={c} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '5px 0', borderBottom: '1px solid var(--border)' }}>
                    <span>{c}</span><span style={{ fontWeight: 700, color: 'var(--green-700)' }}>{y}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
