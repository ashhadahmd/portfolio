import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Overview } from './pages/Overview';
import { Contact } from './pages/Contact';

const DEFAULT_TITLE = 'Ashhad Ahmed | Backend Engineer';

const titles: Record<string, string> = {
  '/contact': 'Contact | Ashhad Ahmed',
};

function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = titles[pathname] ?? DEFAULT_TITLE;
    if (!hash) window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <RouteEffects />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
