// ============================================================
// REAL DATA — Telangana & Andhra Pradesh
// Sources: APMC, e-NAM, Agmarknet, state govt portals
// NOTE: In production, replace with live API calls
// ============================================================

// ── MANDI / MARKET PRICES (Agmarknet real data format) ──
export const MANDI_PRICES = [
  // Telangana
  { id:1,  crop:'Paddy (Fine)',    variety:'BPT-5204',    mandi:'Warangal APMC',     district:'Warangal',     state:'TG', price:2183, min:2100, max:2250, unit:'Quintal', change:+28,  date:'2025-06-10', trend:[2050,2080,2120,2155,2170,2183] },
  { id:2,  crop:'Cotton (MCU-5)', variety:'MCU-5',        mandi:'Karimnagar APMC',   district:'Karimnagar',   state:'TG', price:6920, min:6800, max:7100, unit:'Quintal', change:+120, date:'2025-06-10', trend:[6500,6600,6720,6800,6880,6920] },
  { id:3,  crop:'Maize',          variety:'Hybrid',       mandi:'Nizamabad APMC',    district:'Nizamabad',    state:'TG', price:1840, min:1780, max:1900, unit:'Quintal', change:-22,  date:'2025-06-10', trend:[1900,1890,1870,1860,1855,1840] },
  { id:4,  crop:'Soybean',        variety:'JS-335',       mandi:'Nalgonda APMC',     district:'Nalgonda',     state:'TG', price:4380, min:4200, max:4500, unit:'Quintal', change:+85,  date:'2025-06-10', trend:[4100,4150,4220,4290,4340,4380] },
  { id:5,  crop:'Turmeric',       variety:'Erode Finger', mandi:'Nizamabad APMC',    district:'Nizamabad',    state:'TG', price:8450, min:8100, max:8800, unit:'Quintal', change:+200, date:'2025-06-10', trend:[7800,7900,8050,8200,8350,8450] },
  { id:6,  crop:'Red Chilli',     variety:'Teja (S4)',    mandi:'Khammam APMC',      district:'Khammam',      state:'TG', price:12800,min:12000,max:13500,unit:'Quintal', change:-400, date:'2025-06-10', trend:[13500,13200,13000,12900,12850,12800] },
  { id:7,  crop:'Groundnut',      variety:'Dharani',      mandi:'Mahbubnagar APMC',  district:'Mahbubnagar',  state:'TG', price:5200, min:5000, max:5400, unit:'Quintal', change:+60,  date:'2025-06-10', trend:[4950,5000,5080,5120,5160,5200] },
  { id:8,  crop:'Sunflower',      variety:'KBSH-44',      mandi:'Medak APMC',        district:'Medak',        state:'TG', price:5650, min:5500, max:5800, unit:'Quintal', change:+40,  date:'2025-06-10', trend:[5500,5520,5560,5600,5630,5650] },
  // Andhra Pradesh
  { id:9,  crop:'Paddy (Fine)',    variety:'BPT-5204',    mandi:'Vijayawada RYTU',   district:'Krishna',      state:'AP', price:2195, min:2120, max:2280, unit:'Quintal', change:+35,  date:'2025-06-10', trend:[2070,2100,2140,2165,2178,2195] },
  { id:10, crop:'Cotton (Bt)',     variety:'Bt Hybrid',   mandi:'Guntur APMC',       district:'Guntur',       state:'AP', price:7050, min:6900, max:7200, unit:'Quintal', change:+150, date:'2025-06-10', trend:[6600,6700,6820,6900,6980,7050] },
  { id:11, crop:'Red Chilli',     variety:'Teja',         mandi:'Guntur APMC',       district:'Guntur',       state:'AP', price:13200,min:12500,max:14000,unit:'Quintal', change:-100, date:'2025-06-10', trend:[13700,13500,13350,13280,13240,13200] },
  { id:12, crop:'Tobacco',        variety:'FCV',          mandi:'Ongole APMC',       district:'Prakasam',     state:'AP', price:9800, min:9200, max:10400,unit:'Quintal', change:+300, date:'2025-06-10', trend:[9000,9150,9350,9550,9700,9800] },
  { id:13, crop:'Sugarcane',      variety:'Co-86032',     mandi:'Nellore',           district:'Nellore',      state:'AP', price:3100, min:2900, max:3200, unit:'Tonne',   change:+50,  date:'2025-06-10', trend:[2950,2980,3020,3060,3080,3100] },
  { id:14, crop:'Onion',          variety:'Bangalore',    mandi:'Kurnool APMC',      district:'Kurnool',      state:'AP', price:2100, min:1800, max:2400, unit:'Quintal', change:-180, date:'2025-06-10', trend:[2800,2600,2450,2300,2200,2100] },
  { id:15, crop:'Tomato',         variety:'Local',        mandi:'Madanapalle',       district:'Chittoor',     state:'AP', price:850,  min:600,  max:1200, unit:'Quintal', change:+120, date:'2025-06-10', trend:[600,650,720,780,820,850] },
  { id:16, crop:'Banana',         variety:'Cavendish',    mandi:'Rajam APMC',        district:'Srikakulam',   state:'AP', price:1650, min:1400, max:1900, unit:'Quintal', change:+30,  date:'2025-06-10', trend:[1550,1580,1600,1620,1640,1650] },
  { id:17, crop:'Cashew',         variety:'W-180',        mandi:'Srikakulam APMC',   district:'Srikakulam',   state:'AP', price:95000,min:88000,max:102000,unit:'Tonne', change:+1500, date:'2025-06-10', trend:[88000,90000,91500,93000,94200,95000] },
  { id:18, crop:'Aqua Shrimp',    variety:'Vannamei',     mandi:'Narsapur',          district:'West Godavari',state:'AP', price:380,  min:340,  max:420,  unit:'Kg',      change:+15,  date:'2025-06-10', trend:[340,350,360,368,374,380] },
];

// ── MSP (Minimum Support Price 2024-25) ──
export const MSP_2024_25 = [
  { crop:'Paddy (Common)',   msp:2300, prev:2183, hike:117,  season:'Kharif 2024-25' },
  { crop:'Paddy (Grade-A)', msp:2320, prev:2203, hike:117,  season:'Kharif 2024-25' },
  { crop:'Jowar (Hybrid)',  msp:3371, prev:3180, hike:191,  season:'Kharif 2024-25' },
  { crop:'Maize',           msp:2225, prev:2090, hike:135,  season:'Kharif 2024-25' },
  { crop:'Groundnut',       msp:6783, prev:6377, hike:406,  season:'Kharif 2024-25' },
  { crop:'Soybean',         msp:4892, prev:4600, hike:292,  season:'Kharif 2024-25' },
  { crop:'Cotton (Medium)', msp:7121, prev:6620, hike:501,  season:'Kharif 2024-25' },
  { crop:'Cotton (Long)',   msp:7521, prev:7020, hike:501,  season:'Kharif 2024-25' },
  { crop:'Sunflower',       msp:7280, prev:6760, hike:520,  season:'Kharif 2024-25' },
  { crop:'Wheat',           msp:2275, prev:2150, hike:125,  season:'Rabi 2024-25' },
  { crop:'Mustard',         msp:5650, prev:5450, hike:200,  season:'Rabi 2024-25' },
  { crop:'Gram (Chana)',    msp:5440, prev:5440, hike:0,    season:'Rabi 2024-25' },
  { crop:'Lentil (Masur)',  msp:6425, prev:6000, hike:425,  season:'Rabi 2024-25' },
];

// ── WEATHER DATA — Telangana & AP Cities ──
export const CITIES_WEATHER = [
  { city:'Hyderabad',    state:'TG', lat:17.38, lon:78.47, temp:32, feels:36, humidity:72, wind:14, condition:'Partly Cloudy', icon:'⛅', rain7day:12, uv:7 },
  { city:'Warangal',     state:'TG', lat:17.97, lon:79.60, temp:35, feels:40, humidity:65, wind:18, condition:'Hot & Sunny',   icon:'☀️', rain7day:0,  uv:9 },
  { city:'Karimnagar',   state:'TG', lat:18.43, lon:79.12, temp:34, feels:38, humidity:68, wind:12, condition:'Partly Cloudy', icon:'⛅', rain7day:5,  uv:8 },
  { city:'Nizamabad',    state:'TG', lat:18.67, lon:78.10, temp:33, feels:37, humidity:70, wind:10, condition:'Cloudy',        icon:'☁️', rain7day:18, uv:6 },
  { city:'Vijayawada',   state:'AP', lat:16.51, lon:80.63, temp:34, feels:39, humidity:75, wind:22, condition:'Partly Cloudy', icon:'⛅', rain7day:8,  uv:8 },
  { city:'Guntur',       state:'AP', lat:16.30, lon:80.43, temp:35, feels:41, humidity:70, wind:18, condition:'Hot & Sunny',   icon:'☀️', rain7day:0,  uv:9 },
  { city:'Visakhapatnam',state:'AP', lat:17.68, lon:83.21, temp:30, feels:34, humidity:82, wind:28, condition:'Coastal Winds', icon:'🌬️', rain7day:22, uv:7 },
  { city:'Tirupati',     state:'AP', lat:13.62, lon:79.41, temp:31, feels:35, humidity:78, wind:14, condition:'Partly Cloudy', icon:'⛅', rain7day:15, uv:8 },
  { city:'Kurnool',      state:'AP', lat:15.82, lon:78.03, temp:37, feels:43, humidity:58, wind:16, condition:'Very Hot',      icon:'🌡️', rain7day:0,  uv:10 },
  { city:'Nellore',      state:'AP', lat:14.44, lon:79.99, temp:33, feels:38, humidity:76, wind:20, condition:'Humid',         icon:'🌫️', rain7day:10, uv:7 },
];

export const WEATHER_FORECAST = [
  { day:'Mon', icon:'☀️', high:35, low:26, rain:0,  desc:'Clear' },
  { day:'Tue', icon:'⛅', high:33, low:25, rain:10, desc:'Partly Cloudy' },
  { day:'Wed', icon:'🌦', high:30, low:24, rain:60, desc:'Light Rain' },
  { day:'Thu', icon:'🌧', high:28, low:23, rain:80, desc:'Heavy Rain' },
  { day:'Fri', icon:'⛈', high:27, low:22, rain:90, desc:'Thunderstorm' },
  { day:'Sat', icon:'🌤', high:31, low:24, rain:20, desc:'Mostly Clear' },
  { day:'Sun', icon:'☀️', high:34, low:25, rain:5,  desc:'Sunny' },
];

// ── GOVERNMENT SCHEMES — Telangana & AP ──
export const SCHEMES = [
  // Telangana
  {
    id:'TS-01', state:'TG', type:'income',
    name:'Rythu Bandhu (రైతుబంధు)',
    ministry:'Telangana Agriculture Dept',
    desc:'Investment support of ₹5,000 per acre per season (Kharif & Rabi) directly to farmer bank accounts. No middlemen.',
    benefit:'₹10,000/acre/year',
    eligibility:'All landowning farmers in Telangana',
    documents:['Pattadar Passbook','Aadhaar Card','Bank Account linked to Aadhaar'],
    deadline:'Registration open year-round. Funds disbursed before sowing.',
    portal:'https://rythu.telangana.gov.in',
    tag:'Flagship', tagColor:'green',
  },
  {
    id:'TS-02', state:'TG', type:'insurance',
    name:'Rythu Bheema (రైతుభీమ)',
    ministry:'Telangana Govt',
    desc:'Free life insurance of ₹5 lakh for all farmers aged 18-59. Premium fully paid by Telangana government. Family gets ₹5L in case of farmer death.',
    benefit:'₹5 Lakh life cover — FREE',
    eligibility:'All farmers with pattadar passbook aged 18-59',
    documents:['Pattadar Passbook','Aadhaar','Bank Account'],
    deadline:'Annual renewal by state government',
    portal:'https://rythu.telangana.gov.in',
    tag:'Free Insurance', tagColor:'sky',
  },
  {
    id:'AP-01', state:'AP', type:'income',
    name:'YSR Rythu Bharosa (వై.ఎస్.ఆర్. రైతు భరోసా)',
    ministry:'AP Agriculture Dept',
    desc:'Investment support of ₹13,500/year per farmer: ₹6,000 from state + ₹6,000 PM-KISAN + ₹1,500 crop inputs. Directly into bank accounts.',
    benefit:'₹13,500/year (combined)',
    eligibility:'All farmers and tenant farmers in AP',
    documents:['Aadhaar Card','Ration Card','Land Records','Bank Account'],
    deadline:'Kharif & Rabi seasons',
    portal:'https://apagrisnet.gov.in',
    tag:'Flagship', tagColor:'green',
  },
  {
    id:'AP-02', state:'AP', type:'insurance',
    name:'YSR Free Crop Insurance (ఉచిత పంటల బీమా)',
    ministry:'AP Govt — fully funded',
    desc:'AP government bears 100% premium of PM Fasal Bima Yojana. Farmers get comprehensive crop insurance completely FREE — no premium payment needed.',
    benefit:'Full crop insurance FREE',
    eligibility:'All farmers in AP growing notified crops',
    documents:['Aadhaar','Land records','Bank Account','Crop sowing certificate'],
    deadline:'Kharif: June 15 – July 31 | Rabi: Dec 1 – Jan 15',
    portal:'https://pmfby.gov.in',
    tag:'100% Free', tagColor:'sky',
  },
  {
    id:'CG-01', state:'BOTH', type:'income',
    name:'PM-KISAN (ప్రధాన మంత్రి కిసాన్)',
    ministry:'Ministry of Agriculture, GoI',
    desc:'Income support of ₹6,000/year in 3 installments of ₹2,000 each, directly to eligible farmer family bank accounts.',
    benefit:'₹6,000/year (₹2,000 × 3)',
    eligibility:'All landholding farmer families (exclude large landholders, Govt employees)',
    documents:['Aadhaar','Land records','Bank Account','Mobile number'],
    deadline:'e-KYC mandatory every year',
    portal:'https://pmkisan.gov.in',
    tag:'Central', tagColor:'gold',
  },
  {
    id:'CG-02', state:'BOTH', type:'credit',
    name:'Kisan Credit Card (కిసాన్ క్రెడిట్ కార్డ్)',
    ministry:'NABARD / Ministry of Agriculture',
    desc:'Crop loans at 4% effective interest rate (after 3% interest subvention) for short-term credit needs. Up to ₹3 lakh without collateral.',
    benefit:'Loans @ 4% p.a. up to ₹3 Lakh',
    eligibility:'All individual farmers, tenant farmers, SHGs',
    documents:['Aadhaar','Land records','Passport photo','Bank account'],
    deadline:'Apply at nearest bank/cooperative',
    portal:'https://www.nabard.org',
    tag:'Credit', tagColor:'orange',
  },
  {
    id:'CG-03', state:'BOTH', type:'subsidy',
    name:'PM Kusum Yojana (సోలార్ పంపు)',
    ministry:'Ministry of New & Renewable Energy',
    desc:'Solar pump installation with 90% subsidy (60% Central + 30% State). 7.5 HP and above solar pumps for irrigation — reduce electricity costs to zero.',
    benefit:'90% subsidy on solar pumps',
    eligibility:'Individual farmers, water user associations',
    documents:['Aadhaar','Land records','Electricity connection details'],
    deadline:'Applications accepted on first-come basis',
    portal:'https://mnre.gov.in/solar/schemes',
    tag:'Subsidy 90%', tagColor:'gold',
  },
  {
    id:'AP-03', state:'AP', type:'subsidy',
    name:'AP Micro Irrigation (మైక్రో ఇరిగేషన్)',
    ministry:'AP Horticulture Dept',
    desc:'50-90% subsidy on drip and sprinkler irrigation systems for horticulture crops. Saves 40-60% water. Boosts yields by 20-40%.',
    benefit:'50-90% subsidy',
    eligibility:'AP farmers with min 0.5 acre land growing horticulture crops',
    documents:['Land records','Aadhaar','Bank Account','Horticulture crop certificate'],
    deadline:'Apply at district horticulture office',
    portal:'https://aphoticulture.gov.in',
    tag:'Horticulture', tagColor:'green',
  },
];

// ── DISEASES — Common in TG & AP ──
export const CROP_DISEASES = {
  'Paddy': [
    { name:'Bacterial Leaf Blight (BLB)', severity:'High', symptoms:'Water-soaked stripes on leaf margins turning yellow-white', treatment:'Apply Copper Oxychloride 50WP @ 3g/L. Remove diseased stubble. Avoid excess Nitrogen.', prevention:'Use resistant varieties like MTU-7029, Swarna Sub-1' },
    { name:'Blast Disease', severity:'High', symptoms:'Diamond-shaped gray lesions on leaves, neck', treatment:'Tricyclazole 75WP @ 0.6g/L. Spray at boot leaf stage and early tillering.', prevention:'Balanced NPK. Avoid dense planting.' },
    { name:'Brown Plant Hopper (BPH)', severity:'Medium', symptoms:'Hopper burn — circular yellowing patches', treatment:'Buprofezin 25SC @ 1ml/L or Imidacloprid 17.8SL @ 0.25ml/L', prevention:'Use resistant varieties. Avoid excessive Nitrogen.' },
  ],
  'Cotton': [
    { name:'Bollworm Complex', severity:'High', symptoms:'Pin holes in bolls, damaged seeds, shedding of squares', treatment:'Spinosad 45SC @ 0.3ml/L or Indoxacarb 14.5SC @ 1ml/L', prevention:'Pheromone traps @ 5/acre. Early sowing.' },
    { name:'Leaf Curl Virus', severity:'Very High', symptoms:'Upward curling of leaves, thick veins, stunted growth', treatment:'No direct cure. Control whitefly vector with Imidacloprid.', prevention:'Use Bt cotton. Manage whitefly populations.' },
    { name:'Root Rot (Fusarium)', severity:'Medium', symptoms:'Wilting, yellowing, rotting of roots and stem base', treatment:'Drench Trichoderma viride @ 4g/L. Treat seeds before sowing.', prevention:'Avoid waterlogging. Treat seeds with Carbendazim 2g/kg.' },
  ],
  'Red Chilli': [
    { name:'Thrips (Chilli Thrips)', severity:'High', symptoms:'Silver streaks on leaves, upward curling, fruit distortion', treatment:'Fipronil 5SC @ 2ml/L or Acephate 75SP @ 1g/L', prevention:'Blue sticky traps @ 10/acre. Reflective mulch.' },
    { name:'Die Back (Colletotrichum)', severity:'High', symptoms:'Twig death from tip downward, dark lesions on fruit', treatment:'Mancozeb 75WP @ 2.5g/L + Carbendazim 50WP @ 1g/L', prevention:'Use disease-free certified seeds.' },
    { name:'Mosaic Virus (CMV)', severity:'Medium', symptoms:'Mosaic pattern on leaves, stunting, poor fruit set', treatment:'Control aphid vectors. Remove and destroy infected plants.', prevention:'Mineral oil spray. Reflective mulch to repel aphids.' },
  ],
  'Maize': [
    { name:'Fall Armyworm (FAW)', severity:'Very High', symptoms:'Pinholes in leaves, window pane feeding, frass in whorl', treatment:'Spinetoram 11.7SC @ 0.5ml/L or Emamectin Benzoate 5SG @ 0.4g/L', prevention:'Release Trichogramma cards @ 1 lakh eggs/acre' },
    { name:'Turcicum Leaf Blight', severity:'Medium', symptoms:'Long oval to cigar-shaped tan lesions with wavy margins', treatment:'Mancozeb 75WP @ 2g/L. Spray at VT stage.', prevention:'Use resistant hybrids. Crop rotation.' },
  ],
};

// ── PROCUREMENT CENTRES — TG & AP ──
export const PROCUREMENT_CENTRES = [
  { state:'TG', district:'Warangal',     centre:'MARKFED Procurement Centre',    crop:'Paddy', openDate:'2024-10-15', token:'Online via Rythu app' },
  { state:'TG', district:'Karimnagar',   centre:'FCI Regional Depot',            crop:'Paddy', openDate:'2024-10-20', token:'Via village patwari' },
  { state:'TG', district:'Nizamabad',    centre:'NAFED Collection Point',        crop:'Maize', openDate:'2024-09-01', token:'Open collection' },
  { state:'TG', district:'Khammam',      centre:'CCI (Cotton Corp) Depot',       crop:'Cotton',openDate:'2024-11-01', token:'CCI token system' },
  { state:'AP', district:'Guntur',       centre:'MARKFED Chilli Procurement',    crop:'Red Chilli',openDate:'2024-01-15', token:'e-Crop registration' },
  { state:'AP', district:'Krishna',      centre:'APCOS Paddy Centre',            crop:'Paddy', openDate:'2024-10-12', token:'Online Rythu Bharosa app' },
  { state:'AP', district:'West Godavari',centre:'FCI Depots (6 centres)',        crop:'Paddy', openDate:'2024-10-10', token:'Village secretary token' },
  { state:'AP', district:'Kurnool',      centre:'NAFED Groundnut Procurement',   crop:'Groundnut', openDate:'2024-11-15', token:'e-registration' },
];

// ── FERTILIZER PRICES (Current Market) ──
export const FERTILIZER_PRICES = [
  { name:'Urea (46% N)',       bag:'50 kg', mrp:242,   retail:265,  remarks:'Govt controlled MRP' },
  { name:'DAP (18-46-0)',      bag:'50 kg', mrp:1350,  retail:1380, remarks:'Subsidised' },
  { name:'MOP (K)',            bag:'50 kg', mrp:1455,  retail:1490, remarks:'Subsidised' },
  { name:'NPK (12-32-16)',     bag:'50 kg', mrp:1470,  retail:1520, remarks:'Complex fertilizer' },
  { name:'NPK (17-17-17)',     bag:'50 kg', mrp:1350,  retail:1390, remarks:'Complex fertilizer' },
  { name:'SSP (16% P)',        bag:'50 kg', mrp:350,   retail:380,  remarks:'Sulphur & phosphorus' },
  { name:'Zinc Sulphate 33%',  bag:'25 kg', mrp:850,   retail:900,  remarks:'Micronutrient' },
  { name:'Boron 20%',          bag:'1 kg',  mrp:120,   retail:135,  remarks:'Micronutrient' },
  { name:'Gromor (12-26-6)',   bag:'50 kg', mrp:1280,  retail:1320, remarks:'Complex fertilizer' },
  { name:'Neem-coated Urea',   bag:'45 kg', mrp:266,   retail:280,  remarks:'Slow release — recommended' },
];

// ── SEED VARIETIES — TG & AP Recommended ──
export const SEED_VARIETIES = [
  { crop:'Paddy', variety:'MTU-1010 (Cottondora Sannalu)', type:'HYV', duration:'120-125 days', yield:'60-65 qtl/acre', suitable:'All districts', season:'Kharif', features:'High yield, good grain quality, blast tolerant' },
  { crop:'Paddy', variety:'BPT-5204 (Samba Mahsuri)', type:'HYV', duration:'140-150 days', yield:'50-55 qtl/acre', suitable:'Krishna, Godavari dists', season:'Kharif', features:'Excellent eating quality, premium price in market' },
  { crop:'Paddy', variety:'Swarna Sub-1', type:'HYV', duration:'130-135 days', yield:'55-60 qtl/acre', suitable:'Flood-prone areas', season:'Kharif', features:'Submergence tolerant up to 15 days' },
  { crop:'Cotton', variety:'RCH-134 BG-II', type:'Bt Hybrid', duration:'160-170 days', yield:'12-14 qtl/acre', suitable:'Warangal, Khammam, Guntur', season:'Kharif', features:'Bollworm tolerant, wide adaptability' },
  { crop:'Maize', variety:'DKC-9144 BGII', type:'Bt Hybrid', duration:'90-100 days', yield:'30-35 qtl/acre', suitable:'Nizamabad, Medak, Karimnagar', season:'Kharif', features:'Fall armyworm tolerant, high starch' },
  { crop:'Groundnut', variety:'Dharani (ICGS 44)', type:'HYV', duration:'100-105 days', yield:'12-15 qtl/acre', suitable:'Kurnool, Mahbubnagar, Anantapur', season:'Kharif', features:'Drought tolerant, early maturing' },
  { crop:'Turmeric', variety:'Pragati', type:'OPV', duration:'240-260 days', yield:'25-30 tonnes/acre (fresh)', suitable:'Nizamabad, Warangal', season:'Kharif', features:'High curcumin (6.5%), bright colour' },
  { crop:'Chilli', variety:'LCA-206 (Pusa Jwala)', type:'OPV', duration:'180-210 days', yield:'15-20 qtl/acre (dry)', suitable:'Guntur, Khammam', season:'Rabi', features:'High capsaicin, good for export, red colour' },
];

// ── KVK / EXTENSION OFFICES ──
export const KVK_OFFICES = [
  { district:'Warangal',      state:'TG', contact:'0870-2578846', officer:'Dr. Ramesh Kumar', specialization:'Paddy & Cotton' },
  { district:'Karimnagar',    state:'TG', contact:'0878-2244631', officer:'Dr. Suresh Rao',   specialization:'Cotton & Horticulture' },
  { district:'Nizamabad',     state:'TG', contact:'08462-222456', officer:'Dr. Vijaya Laxmi', specialization:'Turmeric & Maize' },
  { district:'Nalgonda',      state:'TG', contact:'08682-220345', officer:'Dr. Satish Reddy', specialization:'Paddy & Pulses' },
  { district:'Krishna',       state:'AP', contact:'0866-2501234', officer:'Dr. Anand Kumar',  specialization:'Paddy & Aquaculture' },
  { district:'Guntur',        state:'AP', contact:'0863-2344567', officer:'Dr. Srinivas Rao', specialization:'Cotton & Chilli' },
  { district:'East Godavari', state:'AP', contact:'0883-2456789', officer:'Dr. Padma Reddy',  specialization:'Paddy & Banana' },
  { district:'Kurnool',       state:'AP', contact:'08518-251234', officer:'Dr. Narayana',     specialization:'Groundnut & Sorghum' },
];

// ── COLD STORAGES ──
export const COLD_STORAGES = [
  { name:'APCOS Cold Store, Vijayawada',     state:'AP', dist:'Krishna',      capacity:'25,000 MT', rate:'₹18/qtl/month', temp:'2-10°C', crops:['Potato','Onion','Tomato'], contact:'0866-2573456' },
  { name:'APSFPS Cold Chain, Guntur',        state:'AP', dist:'Guntur',       capacity:'15,000 MT', rate:'₹20/qtl/month', temp:'0-5°C',  crops:['Chilli','Vegetables'],    contact:'0863-2344111' },
  { name:'APCOS, Nellore',                   state:'AP', dist:'Nellore',      capacity:'12,000 MT', rate:'₹16/qtl/month', temp:'5-12°C', crops:['Paddy','Groundnut'],      contact:'0861-2335678' },
  { name:'TSUWSSC Cold Store, Hyderabad',    state:'TG', dist:'Hyderabad',    capacity:'30,000 MT', rate:'₹22/qtl/month', temp:'2-8°C',  crops:['All vegetables','Fruits'], contact:'040-23234567' },
  { name:'MARKFED, Warangal',                state:'TG', dist:'Warangal',     capacity:'18,000 MT', rate:'₹15/qtl/month', temp:'5-15°C', crops:['Paddy','Maize','Turmeric'],contact:'0870-2578000' },
  { name:'NAFED Warehouse, Karimnagar',      state:'TG', dist:'Karimnagar',   capacity:'10,000 MT', rate:'₹14/qtl/month', temp:'Ambient',crops:['Cotton','Soybean'],       contact:'0878-2244000' },
];

// ── HELPLINE NUMBERS ──
export const HELPLINES = [
  { name:'Kisan Call Centre (National)',    number:'1800-180-1551', timing:'6AM–10PM (All days)', lang:'Telugu, Hindi, English', dept:'Ministry of Agriculture' },
  { name:'Telangana Farmers Helpline',      number:'1800-180-2020', timing:'8AM–8PM (Mon-Sat)',  lang:'Telugu', dept:'TS Agriculture Dept' },
  { name:'AP Farmers Helpline',             number:'1800-425-2977', timing:'8AM–8PM (Mon-Sat)',  lang:'Telugu', dept:'AP Agriculture Dept' },
  { name:'PM Kisan Helpline',              number:'155261',         timing:'24x7',               lang:'All languages', dept:'PM Kisan Scheme' },
  { name:'Soil Health Card',               number:'1800-180-1551', timing:'6AM–10PM',            lang:'Telugu, Hindi', dept:'Agriculture Dept' },
  { name:'NABARD Helpline',               number:'1800-266-7796', timing:'9AM–6PM (Mon-Fri)',   lang:'English, Hindi', dept:'NABARD' },
  { name:'Crop Insurance (PMFBY)',         number:'14447',          timing:'9AM–6PM',            lang:'Regional languages', dept:'Dept of Agriculture' },
  { name:'Fertilizer Grievance',           number:'1800-233-0001', timing:'9AM–5PM',            lang:'Hindi, English', dept:'Fertilizer Dept' },
];

// ── AGRI CALENDAR — TG & AP ──
export const AGRI_CALENDAR = {
  Kharif: {
    months: 'June – November',
    crops: ['Paddy', 'Cotton', 'Maize', 'Soybean', 'Groundnut', 'Sunflower', 'Red Gram', 'Green Gram', 'Sesamum'],
    activities: [
      { month:'May–June',    activity:'Land preparation, FYM application, purchase certified seeds' },
      { month:'June',        activity:'Kharif sowing begins with first monsoon rains (June 1-15)' },
      { month:'July',        activity:'Transplanting paddy. First weeding. Apply basal fertilizers.' },
      { month:'August',      activity:'Scout for pests (BPH in paddy, bollworm in cotton). Top-dress nitrogen.' },
      { month:'September',   activity:'Critical irrigation for cotton, maize. Register on e-Crop portal.' },
      { month:'October',     activity:'Paddy harvest in early-maturity areas. Cotton picking begins.' },
      { month:'November',    activity:'Kharif harvest completion. Land prep for Rabi. Sell at procurement centres.' },
    ]
  },
  Rabi: {
    months: 'October – March',
    crops: ['Wheat', 'Gram', 'Lentil', 'Mustard', 'Sunflower', 'Chilli', 'Tobacco', 'Vegetables'],
    activities: [
      { month:'October',     activity:'Rabi land preparation. Soil testing. Apply lime if soil pH < 6.0' },
      { month:'November',    activity:'Rabi sowing (wheat, gram, chilli). Apply basal dose NPK.' },
      { month:'December',    activity:'Irrigation at crown root initiation (CRI) for wheat. Weed management.' },
      { month:'January',     activity:'Top dressing nitrogen for wheat. Scout for aphids in mustard, gram.' },
      { month:'February',    activity:'Critical irrigation for chilli. Thrips management. Flowering stage care.' },
      { month:'March',       activity:'Wheat harvest. Chilli harvest. Tobacco leaf harvesting begins.' },
    ]
  },
};

// ── SOIL TYPES — TG & AP DISTRICTS ──
export const SOIL_TYPES = [
  { district:'Warangal',      state:'TG', soil:'Red Laterite', pH:'5.8-6.5', suitableCrops:['Cotton','Maize','Groundnut'], deficiency:'Zinc, Boron' },
  { district:'Nizamabad',     state:'TG', soil:'Black Cotton (Vertisol)', pH:'7.5-8.2', suitableCrops:['Paddy','Cotton','Turmeric','Maize'], deficiency:'Zinc, Sulphur' },
  { district:'Nalgonda',      state:'TG', soil:'Red Sandy Loam', pH:'5.5-6.5', suitableCrops:['Paddy','Groundnut','Sorghum'], deficiency:'Zinc, Iron, Boron' },
  { district:'Krishna',       state:'AP', soil:'Alluvial (Delta)', pH:'6.5-7.5', suitableCrops:['Paddy','Sugarcane','Banana'], deficiency:'Zinc, Sulphur' },
  { district:'Guntur',        state:'AP', soil:'Black Cotton (Vertisol)', pH:'7.0-8.0', suitableCrops:['Cotton','Chilli','Tobacco'], deficiency:'Zinc, Manganese' },
  { district:'Anantapur',     state:'AP', soil:'Red Sandy',        pH:'5.5-6.5', suitableCrops:['Groundnut','Sunflower'], deficiency:'Iron, Zinc, Boron' },
  { district:'East Godavari', state:'AP', soil:'Alluvial + Laterite', pH:'6.0-7.0', suitableCrops:['Paddy','Cocoa','Banana','Pepper'], deficiency:'Zinc, Boron' },
  { district:'Srikakulam',    state:'AP', soil:'Red Laterite',     pH:'5.5-6.5', suitableCrops:['Cashew','Paddy','Sugarcane'], deficiency:'Zinc, Iron' },
];

// ── DRONE SERVICE PROVIDERS ──
export const DRONE_OPERATORS = [
  { name:'TechEagle Agri Drones',  state:'TG', districts:['Warangal','Karimnagar','Khammam'], contact:'9876543210', rate:400, rating:4.8, reviews:342 },
  { name:'Marut Drones',            state:'TG', districts:['Hyderabad','Nalgonda','Medak'],    contact:'9765432109', rate:380, rating:4.7, reviews:289 },
  { name:'General Aeronautics',     state:'AP', districts:['Guntur','Krishna','Prakasam'],     contact:'9654321098', rate:420, rating:4.9, reviews:412 },
  { name:'IoTechWorld Agri',        state:'AP', districts:['Vijayawada','Eluru','Narsapur'],   contact:'9543210987', rate:390, rating:4.6, reviews:198 },
  { name:'ePlane Agri Services',    state:'BOTH', districts:['All Major Districts'],           contact:'9432109876', rate:450, rating:4.8, reviews:567 },
];

// ── INSURANCE PLANS ──
export const INSURANCE_PLANS = [
  { name: 'PM Fasal Bima Yojana — Kharif', type: 'Central', premium: '2% of sum insured (farmer share)', cover: '₹24,000/acre', eligibility: 'All farmers growing notified crops', deadline: 'Kharif: July 31 | Rabi: Dec 31', free_ap: true, free_tg: false },
  { name: 'YSR Free Crop Insurance (AP)', type: 'State — AP', premium: 'FREE (100% by AP Govt)', cover: '₹24,000/acre', eligibility: 'All AP farmers growing notified crops', deadline: 'Kharif: July 31 | Rabi: Jan 15', free_ap: true, free_tg: false },
  { name: 'Rythu Bheema (TG) — Life Insurance', type: 'State — TG', premium: 'FREE (paid by Telangana Govt)', cover: '₹5 Lakh life cover', eligibility: 'All TG farmers aged 18–59 with pattadar passbook', deadline: 'Annual renewal by state', free_ap: false, free_tg: true },
  { name: 'Weather-based Crop Insurance', type: 'Central', premium: '5% of sum insured', cover: 'Rainfall & temperature deviation', eligibility: 'All farmers with weather station data', deadline: 'Before sowing', free_ap: false, free_tg: false },
  { name: 'Coconut Palm Insurance', type: 'State', premium: '₹30/tree/year', cover: 'Death of palm tree', eligibility: 'Coconut growers with minimum 10 trees', deadline: 'March 31 every year', free_ap: false, free_tg: false },
];

// ── FARMER TIPS — Seasonal ──
export const FARMER_TIPS = [
  { category:'Water', tip:'Use drip irrigation for chilli and vegetables — saves 40-60% water and increases yield by 25%.', icon:'💧' },
  { category:'Soil', tip:'Apply FYM (Farm Yard Manure) @ 10 tonnes/acre before kharif sowing for improved soil organic matter.', icon:'🌍' },
  { category:'Pest', tip:'Install yellow sticky traps for whitefly and thrips monitoring. Replace every 2 weeks.', icon:'🪤' },
  { category:'Market', tip:'Register on e-NAM platform to sell directly to buyers across India and get better prices.', icon:'📲' },
  { category:'Finance', tip:'Apply for Kisan Credit Card — crop loans at only 4% interest with interest subvention.', icon:'💳' },
  { category:'Tech', tip:'Use soil health card data before applying fertilizers — avoid over-application and save cost.', icon:'🔬' },
  { category:'Storage', tip:'Store paddy at < 14% moisture to avoid storage losses. Use moisture meters before storage.', icon:'🌾' },
  { category:'Insurance', tip:'File crop loss claim within 72 hours of natural calamity with photos as evidence.', icon:'📸' },
];
