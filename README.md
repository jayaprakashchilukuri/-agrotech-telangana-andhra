# 🌾 రైతు సేవలు — AgroTech Platform
### Smart Farming Platform for Telangana & Andhra Pradesh Farmers

---

## 📋 Project Overview

A production-grade React web application providing comprehensive agricultural services specifically designed for **Telangana** and **Andhra Pradesh** farmers.

### 🎯 Key Features
- **📈 Live Mandi Prices** — 18 crops from 20+ mandis (Agmarknet format)
- **🏛 Government Schemes** — Rythu Bandhu, YSR Rythu Bharosa, PM-KISAN, KCC, PM Kusum, YSR Free Insurance
- **🌤 Weather Forecast** — 7-day forecasts for 10 TG & AP cities with crop advisories
- **💰 Profit Calculator** — Real MSP comparison, ROI analysis
- **🔬 Disease Detection** — AI photo upload + manual disease guide for Paddy, Cotton, Chilli, Maize
- **🌱 Seeds & Varieties** — KVK/ICAR recommended HYV seeds with yield data
- **🧪 Fertilizer Guide** — Current MRP rates, NPK recommendations by crop
- **📅 Agri Calendar** — Kharif, Rabi, Zaid schedules for TG & AP
- **🛒 Marketplace** — Direct farmer-to-buyer produce listing
- **🛡 Crop Insurance** — PMFBY, YSR Free Insurance, claim filing
- **🚁 Drone Services** — Book DGCA-approved operators in your district
- **🏭 Cold Storage** — APCOS, TSUWSSC locator + govt procurement centres
- **🚨 Emergency Alerts** — Cyclone, pest, flood, procurement alerts
- **🤖 AI Chatbot** — Telugu + English farming assistant

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 |
| Charts | Recharts |
| Routing | Page-based state (no react-router needed) |
| Styling | Pure CSS (modular per component) |
| Icons | Unicode Emoji |
| Fonts | Google Fonts (Baloo Tammudu 2, Inter) |
| Build | Create React App |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# 1. Extract the zip file
unzip agrotech-telangana-ap.zip
cd agrotech-telangana-ap

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

App opens at **http://localhost:3000**

### Build for Production
```bash
npm run build
# Optimized files in /build folder
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / .css      # Top navigation + language switcher + ticker
│   └── Sidebar.jsx / .css     # Left sidebar with all service links
├── pages/
│   ├── Home.jsx / .css        # Dashboard with hero, stats, service cards
│   ├── Market.jsx / .css      # Mandi prices table + trend charts + MSP
│   ├── Weather.jsx / .css     # City weather + 7-day forecast + crop advisory
│   ├── Schemes.jsx / .css     # Government schemes with expand/apply
│   ├── Calculator.jsx / .css  # Profit/ROI calculator with MSP comparison
│   ├── Chatbot.jsx / .css     # AI assistant (Telugu + English)
│   └── OtherPages.jsx         # Seeds, Fertilizer, Calendar, Insurance,
│                               # Drone, Storage, Alerts, Disease, Marketplace
├── data/
│   └── realData.js            # All real TG & AP data (replace with API later)
├── styles/
│   └── global.css             # Design system, variables, utilities
├── App.jsx                    # Main router
└── index.js                   # Entry point
```

---

## 🔌 Adding Real APIs

All data is in `src/data/realData.js`. Replace with API calls:

```js
// Example: Replace MANDI_PRICES with Agmarknet API
const fetchPrices = async () => {
  const res = await fetch('https://api.agmarknet.gov.in/prices?state=AP&commodity=paddy');
  return res.json();
};

// Example: Replace WEATHER with IMD / OpenWeather API  
const fetchWeather = async (lat, lon) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=YOUR_KEY`);
  return res.json();
};

// Example: Anthropic API for real AI chatbot
const askAI = async (question) => {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': 'YOUR_KEY', 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'claude-3-5-haiku-20241022', max_tokens: 500, messages: [{ role: 'user', content: question }] })
  });
  return res.json();
};
```

### Recommended APIs
| Feature | API | Cost |
|---------|-----|------|
| Mandi Prices | Agmarknet API / data.gov.in | Free |
| Weather | IMD Agrimet / OpenWeather | Free |
| Soil Data | ICAR Soil Health Card API | Free |
| Schemes | MyScheme API (data.gov.in) | Free |
| AI Chatbot | Anthropic Claude API | Paid |

---

## 🌐 Deployment

### Netlify (Easiest)
```bash
npm run build
# Drag & drop /build folder to netlify.com/drop
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages
```bash
npm install gh-pages --save-dev
# Add to package.json: "homepage": "https://yourusername.github.io/agrotech"
npm run build && npx gh-pages -d build
```

---

## 📞 Data Sources

- **Mandi Prices**: Agmarknet (agmarknet.gov.in) — real 2025 format
- **MSP**: CACP / CCEA notification 2024-25
- **Schemes**: Official govt portals (pmkisan.gov.in, rythu.telangana.gov.in, apagrisnet.gov.in)
- **Weather**: IMD Agrimet data format
- **Seed Varieties**: ICAR / KVK recommendations for TG & AP
- **Fertilizer MRP**: Dept of Fertilizers, GoI (June 2025)

---

## 📄 License
Open source for educational and agricultural use.
Built for Telangana & Andhra Pradesh farmers 🌾
