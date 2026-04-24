import React, { useEffect, useState } from 'react';
import './styles/global.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Market from './pages/Market';
import Weather from './pages/Weather';
import Schemes from './pages/Schemes';
import Calculator from './pages/Calculator';
import Chatbot from './pages/Chatbot';
import {
  Seeds, Fertilizer, AgriCalendar,
  Insurance, Drone, Storage,
  Alerts, Disease, Marketplace
} from './pages/OtherPages';

function App() {
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#/', '').trim();
    return hash || 'home';
  };

  const [page, setPage] = useState(getPageFromHash());
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const onHashChange = () => {
      setPage(getPageFromHash());
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const setPageWithRoute = (nextPage) => {
    window.location.hash = `/${nextPage}`;
    setPage(nextPage);
  };

  const renderPage = () => {
    switch (page) {
      case 'home':        return <Home setPage={setPageWithRoute} lang={lang} />;
      case 'market':      return <Market lang={lang} />;
      case 'weather':     return <Weather lang={lang} />;
      case 'schemes':     return <Schemes lang={lang} />;
      case 'calculator':  return <Calculator lang={lang} />;
      case 'chatbot':     return <Chatbot lang={lang} />;
      case 'seeds':       return <Seeds lang={lang} />;
      case 'fertilizer':  return <Fertilizer lang={lang} />;
      case 'calendar':    return <AgriCalendar lang={lang} />;
      case 'insurance':   return <Insurance lang={lang} />;
      case 'drone':       return <Drone lang={lang} />;
      case 'storage':     return <Storage lang={lang} />;
      case 'alerts':      return <Alerts lang={lang} />;
      case 'disease':     return <Disease lang={lang} />;
      case 'marketplace': return <Marketplace lang={lang} />;
      default:            return <Home setPage={setPageWithRoute} lang={lang} />;
    }
  };

  return (
    <div className="app">
      <Navbar activePage={page} setPage={setPageWithRoute} lang={lang} setLang={setLang} />

      <div className="page-layout" style={{ paddingTop: 'calc(var(--nav-height) + 32px)' }}>
        <Sidebar activePage={page} setPage={setPageWithRoute} lang={lang} />
        <main className="main-content">
          <div className="page-inner">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
