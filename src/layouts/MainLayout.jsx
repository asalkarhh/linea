import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import LargeMenu, { LocationSelector } from '../components/Navigation/LargeMenu';
import Footer from '../components/Footer/Footer';
import BookNowModal from '../components/Modals/BookNowModal';
import GlobalModals from '../components/Modals/GlobalModals';
import { useModals } from '../context/ModalContext';

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openBookNow, setDarkHeader, setHeaderOpacity } = useModals();

  const isHome = location.pathname === '/';

  // Close drawer on route change and scroll cleanly
  useEffect(() => {
    setMenuOpen(false);
    setDarkHeader(false);
    setHeaderOpacity(1);

    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash, setDarkHeader, setHeaderOpacity]);

  // Trigger Book Now modal automatically when query ?l=bn is visited
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('l') === 'bn') {
      openBookNow();
      params.delete('l');
      const cleaned = params.toString();
      navigate(
        {
          pathname: location.pathname,
          search: cleaned ? `?${cleaned}` : '',
          hash: location.hash,
        },
        { replace: true }
      );
    }
  }, [location.search, location.pathname, location.hash, navigate, openBookNow]);

  // Regional banner logic
  useEffect(() => {
    // Keep selector banner disabled for unified domestic India presence
    setSelectorOpen(false);
  }, []);

  const dismissSelector = () => {
    try {
      sessionStorage.setItem('lloc', 'us');
    } catch {
      // Ignore storage edge cases
    }
    setSelectorOpen(false);
  };

  const handleInternalHtmlLinks = (e) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    const target = anchor.getAttribute('target');
    if (
      href &&
      href.startsWith('/') &&
      !href.startsWith('//') &&
      !href.startsWith('/assets/') &&
      target !== '_blank'
    ) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <>
      <div className="container">
        <div className="block main" onClick={handleInternalHtmlLinks}>
          <Outlet />
        </div>
        <Footer />
      </div>

      <LargeMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        selectorOpen={selectorOpen}
      />
      <LocationSelector open={selectorOpen} onDismiss={dismissSelector} />
      <BookNowModal />
      <GlobalModals />
    </>
  );
}
