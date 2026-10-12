import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LangProvider } from './i18n/LangContext';
import { AppLayout } from './components/AppLayout';
import { Home } from './pages/Home';
import { Shoots } from './pages/Shoots';
import { RegisterShoot } from './pages/RegisterShoot';
import { Locations } from './pages/Locations';
import { LocationDetail } from './pages/LocationDetail';
import { Guide } from './pages/Guide';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="shoots" replace />} />
            <Route path="shoots" element={<Shoots />} />
            <Route path="shoots/new" element={<RegisterShoot />} />
            <Route path="locations" element={<Locations />} />
            <Route path="locations/:id" element={<LocationDetail />} />
            <Route path="guide" element={<Guide />} />
            <Route path="guide/:chapterId" element={<Guide />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}
