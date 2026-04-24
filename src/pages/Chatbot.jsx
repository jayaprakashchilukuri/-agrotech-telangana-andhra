import React, { useState, useRef, useEffect } from 'react';
import { MANDI_PRICES, SCHEMES, HELPLINES } from '../data/realData';
import './Chatbot.css';

// Telugu + English farming knowledge base
const KB = {
  greetings: ['hello','hi','namaste','నమస్కారం','నమస్తే','హలో'],
  price_keywords: ['price','ధర','ధరలు','rate','రేటు','today','ఈరోజు','market','మార్కెట్'],
  weather_keywords: ['weather','వాతావరణం','rain','వర్షం','forecast','temperature','ఉష్ణోగ్రత'],
  scheme_keywords: ['scheme','పథకం','rythu','రైతు','bandhu','bharosa','kisan','insurance','బీమా','pmkisan'],
  disease_keywords: ['disease','వ్యాధి','pest','కీటకం','blast','blight','bollworm','thrips','armyworm'],
  fertilizer_keywords: ['fertilizer','ఎరువు','urea','dap','npk','urea','potash','soil','మట్టి'],
  helpline_keywords: ['helpline','సహాయం','contact','number','phone','call','1800'],
  chilli_keywords:['chilli','మిరప','guntur','గుంటూరు','red chilli'],
  paddy_keywords:['paddy','వరి','rice','bpt','mtu','kharif'],
  cotton_keywords:['cotton','పత్తి','bt cotton','bollworm'],
};

function getReply(msg, lang) {
  const m = msg.toLowerCase();
  const isTe = lang === 'te';

  // Greetings
  if (KB.greetings.some(k => m.includes(k))) {
    return isTe
      ? 'నమస్కారం! నేను రైతు సేవలు AI అసిస్టెంట్‌ని. మీ వ్యవసాయ సమస్యలకు సహాయం చేస్తాను. ధరలు, పథకాలు, వ్యాధులు లేదా వాతావరణం గురించి అడగండి! 🌾'
      : 'Namaste! I\'m the Rythu Sevalu AI Assistant. I can help with crop prices, government schemes, diseases, weather, and farming advice for Telangana & AP. What do you need? 🌾';
  }

  // Paddy price
  if (KB.paddy_keywords.some(k => m.includes(k)) && KB.price_keywords.some(k => m.includes(k))) {
    const p = MANDI_PRICES.filter(x => x.crop.toLowerCase().includes('paddy'));
    const lines = p.slice(0,3).map(x => `${x.mandi} (${x.state}): ₹${x.price}/qtl (${x.change>0?'▲':'▼'}₹${Math.abs(x.change)})`).join('\n');
    return isTe
      ? `వరి ధరలు (ఈరోజు):\n${lines}\n\nMSP 2024-25: ₹2,300/quintal\nమీకు దగ్గరలో ఉన్న కొనుగోలు కేంద్రానికి వెళ్ళి MSP ధరకు అమ్మవచ్చు.`
      : `Today's Paddy Prices:\n${lines}\n\nMSP 2024-25: ₹2,300/qtl.\nSell at govt procurement centres to get MSP price!`;
  }

  // Cotton price
  if (KB.cotton_keywords.some(k => m.includes(k)) && KB.price_keywords.some(k => m.includes(k))) {
    const p = MANDI_PRICES.filter(x => x.crop.toLowerCase().includes('cotton'));
    const lines = p.map(x => `${x.mandi} (${x.state}): ₹${x.price}/qtl`).join('\n');
    return `Cotton prices today:\n${lines}\n\nMSP: ₹7,121/qtl (Medium staple)\nTip: Dry cotton below 8% moisture before selling for better price.`;
  }

  // Chilli price
  if (KB.chilli_keywords.some(k => m.includes(k)) && KB.price_keywords.some(k => m.includes(k))) {
    const p = MANDI_PRICES.find(x => x.crop.toLowerCase().includes('chilli') && x.state === 'AP');
    return isTe
      ? `గుంటూరు మిరప ధర: ₹${p?.price?.toLocaleString()}/క్వింటల్\nమార్పు: ${p?.change > 0 ? '▲' : '▼'} ₹${Math.abs(p?.change || 0)}\nగమనిక: సంచులు అమ్మే ముందు తేమ 10% కంటే తక్కువగా ఉండాలి.`
      : `Guntur Red Chilli (Teja): ₹${p?.price?.toLocaleString()}/qtl\nChange: ${p?.change > 0 ? '▲+' : '▼'}₹${Math.abs(p?.change || 0)} today\nNote: Dry below 10% moisture for premium grade price.`;
  }

  // Any price
  if (KB.price_keywords.some(k => m.includes(k))) {
    const top5 = MANDI_PRICES.slice(0,5).map(x => `${x.crop}: ₹${x.price.toLocaleString()} (${x.state}) ${x.change>0?'▲':'▼'}₹${Math.abs(x.change)}`).join('\n');
    return isTe
      ? `ఈరోజు ప్రధాన ధరలు:\n${top5}\n\nమొత్తం ధరలు చూడడానికి Market Prices పేజీ తెరవండి. 📈`
      : `Today's Key Prices:\n${top5}\n\nSee all 18 crops in Market Prices section. 📈`;
  }

  // Schemes
  if (KB.scheme_keywords.some(k => m.includes(k))) {
    if (m.includes('rythu bandhu') || m.includes('రైతుబంధు')) {
      return isTe
        ? 'రైతుబంధు పథకం:\n✅ ₹5,000/ఎకరా/సీజన్ (ఖరీఫ్ + రబీ = ₹10,000/ఎకరా/సంవత్సరం)\n✅ పట్టాదార్ పాస్‌బుక్ ఉన్న అన్ని రైతులకు వర్తిస్తుంది\n✅ నేరుగా బ్యాంకు ఖాతాకు జమ అవుతుంది\n📞 Helpline: 1800-425-8855'
        : 'Rythu Bandhu Scheme (Telangana):\n✅ ₹5,000/acre/season (Kharif + Rabi = ₹10,000/acre/year)\n✅ For all pattadar passbook holders\n✅ Direct bank transfer\n📞 Helpline: 1800-425-8855';
    }
    if (m.includes('pm kisan') || m.includes('pmkisan') || m.includes('కిసాన్')) {
      return '📋 PM-KISAN Scheme:\n✅ ₹6,000/year in 3 installments of ₹2,000\n✅ All farmer families eligible (except govt employees)\n✅ e-KYC mandatory for continued benefits\n🌐 Apply: pmkisan.gov.in\n📞 Helpline: 155261';
    }
    const sList = SCHEMES.slice(0,4).map(s => `• ${s.name}: ${s.benefit}`).join('\n');
    return isTe
      ? `ప్రధాన పథకాలు:\n${sList}\n\nమొత్తం పథకాలు చూడడానికి Government Schemes పేజీ తెరవండి.`
      : `Key Active Schemes:\n${sList}\n\nSee all schemes with eligibility & documents in the Schemes section.`;
  }

  // Disease
  if (KB.disease_keywords.some(k => m.includes(k))) {
    if (m.includes('blast') || m.includes('paddy disease') || m.includes('వరి వ్యాధి')) {
      return isTe
        ? 'వరి బ్లాస్ట్ వ్యాధి:\n🔴 లక్షణాలు: ఆకులపై వజ్రాకార మచ్చలు, మెడ తెగిపోవడం\n💊 చికిత్స: Tricyclazole 75WP @ 0.6g/L నీటిలో కలిపి పిచికారీ\n🛡 నివారణ: Swarna Sub-1, MTU-7029 రకాలు వాడండి\n📞 KVK సహాయం తీసుకోండి'
        : 'Paddy Blast Disease:\n🔴 Symptoms: Diamond-shaped gray lesions on leaves/neck\n💊 Treatment: Tricyclazole 75WP @ 0.6g/L. Spray at boot leaf stage.\n🛡 Prevention: Use resistant varieties MTU-7029, Swarna Sub-1';
    }
    if (m.includes('bollworm') || m.includes('cotton disease') || m.includes('పత్తి వ్యాధి')) {
      return 'Cotton Bollworm:\n🔴 Symptoms: Pin holes in bolls, damaged seeds, shedding\n💊 Treatment: Spinosad 45SC @ 0.3ml/L or Indoxacarb 14.5SC @ 1ml/L\n🛡 Prevention: Pheromone traps @ 5/acre. Use Bt cotton.\n📅 Scout every week from 40 DAS';
    }
    if (m.includes('armyworm') || m.includes('faw') || m.includes('maize')) {
      return 'Fall Armyworm (FAW) in Maize:\n🔴 Symptoms: Pinholes in leaves, window feeding, frass in whorl\n💊 Treatment: Spinetoram 11.7SC @ 0.5ml/L (spray in whorl)\n🛡 Prevention: Trichogramma cards @ 1 lakh eggs/acre\n⚠️ Scout daily in early morning — pest is most active then';
    }
    return isTe
      ? 'వ్యాధి గురించి మరింత నిర్దిష్టంగా చెప్పండి: వరి, పత్తి, మిరప, మొక్కజొన్న? Disease AI పేజీలో ఫోటో అప్‌లోడ్ చేయండి.'
      : 'Please specify crop: Paddy, Cotton, Chilli, or Maize?\nFor AI diagnosis, upload a photo in the Disease Detection section.';
  }

  // Fertilizer
  if (KB.fertilizer_keywords.some(k => m.includes(k))) {
    return `Current Fertilizer MRP:\n• Urea (50kg): ₹242 (MRP)\n• DAP (50kg): ₹1,350 (subsidised)\n• MOP (50kg): ₹1,455\n• NPK 17-17-17 (50kg): ₹1,350\n\n💡 Tip: Always buy fertilizers with printed MRP bag. Report overpricing to 1800-180-1551`;
  }

  // Weather
  if (KB.weather_keywords.some(k => m.includes(k))) {
    return isTe
      ? 'వాతావరణం (ఈరోజు):\n☀️ విజయవాడ: 34°C, సన్నీ\n⛅ హైదరాబాద్: 32°C, పాక్షికంగా మేఘావృతం\n🌧 గురువారం: కృష్ణ జిల్లాలో 80mm వర్షం\n\n⚠️ వ్యవసాయ సలహా: పక్వానికి వచ్చిన పత్తి మరియు వరి గురువారం ముందే కోయండి!'
      : 'Current Weather:\n☀️ Vijayawada: 34°C, Sunny\n⛅ Hyderabad: 32°C, Partly Cloudy\n🌧 Thursday: Heavy rain (80mm) in Krishna district\n\n⚠️ Advisory: Harvest mature cotton and paddy before Thursday rain!';
  }

  // Helpline
  if (KB.helpline_keywords.some(k => m.includes(k))) {
    const hList = HELPLINES.slice(0,4).map(h => `• ${h.name}: ${h.number} (${h.timing})`).join('\n');
    return `📞 Farmer Helplines:\n${hList}\n\nAll Kisan Call Centre calls are FREE from any phone.`;
  }

  // Default
  return isTe
    ? `మీరు అడిగిన విషయం:\n"${msg}"\n\nనేను మీకు ఈ విషయాలలో సహాయం చేయగలను:\n📈 మార్కెట్ ధరలు\n🌤 వాతావరణం\n📋 ప్రభుత్వ పథకాలు\n🔬 పంట వ్యాధులు\n🧪 ఎరువుల సమాచారం\n📞 హెల్ప్‌లైన్ నంబర్లు\n\nమరో ప్రశ్న అడగండి!`
    : `I can help with:\n📈 Crop prices from TG & AP mandis\n🌤 Weather & farming advisories\n📋 Rythu Bandhu, YSR Bharosa, PM-KISAN\n🔬 Paddy blast, cotton bollworm, FAW\n🧪 Fertilizer MRP & recommendations\n📞 All farmer helpline numbers\n\nAsk me anything! 🌾`;
}

const QUICK_QUESTIONS = [
  { te:'నేడు వరి ధర?', en:'Paddy price today?' },
  { te:'రైతుబంధు పథకం?', en:'Rythu Bandhu scheme?' },
  { te:'పత్తి వ్యాధి చికిత్స?', en:'Cotton bollworm treatment?' },
  { te:'వాతావరణం?', en:'Weather forecast?' },
  { te:'PM కిసాన్?', en:'PM-KISAN scheme?' },
  { te:'యూరియా ధర?', en:'Urea fertilizer price?' },
];

const Chatbot = ({ lang }) => {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: lang === 'te'
        ? 'నమస్కారం! 🌾 నేను రైతు సేవలు AI అసిస్టెంట్‌ని. తెలంగాణ & ఆంధ్రప్రదేశ్ రైతులకు సహాయం చేస్తాను.\n\nమీరు అడగవచ్చు:\n• మార్కెట్ ధరలు\n• ప్రభుత్వ పథకాలు (రైతుబంధు, YSR భరోసా)\n• వ్యాధి చికిత్స\n• వాతావరణ సలహాలు'
        : 'Namaste! 🌾 I\'m the Rythu Sevalu AI for Telangana & AP farmers.\n\nAsk me about:\n• Today\'s mandi prices\n• Rythu Bandhu, YSR Bharosa, PM-KISAN\n• Crop disease treatment\n• Weather advisories & farming tips'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const send = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text: msg }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
    const reply = getReply(msg, lang);
    setMessages(m => [...m, { role: 'bot', text: reply }]);
    setLoading(false);
  };

  return (
    <div className="chatbot-page animate-fadeUp">
      <div className="page-header">
        <div className="breadcrumb">🏠 Home / AI Assistant</div>
        <h1>🤖 AI Farming Assistant</h1>
        <p>Ask in Telugu or English — crop prices, schemes, diseases, weather, fertilizers.</p>
      </div>

      <div className="chat-layout">
        <div className="chat-main card">
          {/* Chat window */}
          <div className="chat-window" ref={chatRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg-wrap ${m.role}`}>
                {m.role === 'bot' && <div className="bot-avatar">🌾</div>}
                <div className={`chat-bubble ${m.role}`}>
                  {m.text.split('\n').map((line, j) => (
                    <span key={j}>{line}{j < m.text.split('\n').length - 1 && <br/>}</span>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="msg-wrap bot">
                <div className="bot-avatar">🌾</div>
                <div className="chat-bubble bot typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <div className="quick-q-row">
              {QUICK_QUESTIONS.map((q, i) => (
                <button key={i} className="quick-q" onClick={() => send(lang === 'te' ? q.te : q.en)}>
                  {lang === 'te' ? q.te : q.en}
                </button>
              ))}
            </div>
            <div className="chat-input-row">
              <input
                className="chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder={lang === 'te' ? 'తెలుగు లేదా ఇంగ్లీష్‌లో అడగండి...' : 'Ask in Telugu or English...'}
                disabled={loading}
              />
              <button className="send-btn btn btn-primary" onClick={() => send()} disabled={loading || !input.trim()}>
                ➤
              </button>
            </div>
          </div>
        </div>

        {/* Side Info */}
        <div className="chat-sidebar">
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>📋 What I Know</div>
            {[
              ['📈','Prices','18 crops, 40+ mandis, daily updates'],
              ['📋','Schemes','Rythu Bandhu, YSR Bharosa, PM-KISAN, KCC'],
              ['🔬','Diseases','Paddy blast, cotton bollworm, FAW, chilli thrips'],
              ['🧪','Fertilizers','MRP rates, NPK recommendations'],
              ['🌤','Weather','7-day forecast, crop advisories'],
              ['📞','Helplines','All farmer helpline numbers'],
            ].map(([i,t,d]) => (
              <div key={t} style={{ display:'flex', gap:10, padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
                <span style={{ fontSize:18 }}>{i}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:700 }}>{t}</div>
                  <div style={{ fontSize:11, color:'var(--text-muted)' }}>{d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 18, marginTop: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>⚡ Quick Helplines</div>
            {HELPLINES.slice(0,3).map((h,i) => (
              <div key={i} style={{ padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
                <div style={{ fontSize:12, fontWeight:700 }}>{h.name}</div>
                <div style={{ fontSize:15, fontWeight:900, color:'var(--green-700)' }}>{h.number}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
