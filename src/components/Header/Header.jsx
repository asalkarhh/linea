import { Link, useLocation } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useModals } from '../../context/ModalContext';

export default function Header({ menuOpen, onToggleMenu, selectorOpen }) {
  const location = useLocation();
  const { openBookNow, darkHeader, headerOpacity } = useModals();

  const path = location.pathname;
  const isHome = path === '/';
  const isAlignersSection = path.startsWith('/aligners');

  // On /aligners/ and /, header transitions from transparent to solid light (or dark over dark sections)
  const useScrollHeader = path === '/aligners/' || path === '/aligners' || path === '/';

  const topStyle = {};
  if (useScrollHeader) {
    if (darkHeader) {
      topStyle.backgroundColor = 'rgba(34, 31, 32, 1)';
      topStyle.color = '#ffffff';
    } else {
      topStyle.backgroundColor = `rgba(245, 245, 245, ${headerOpacity})`;
      topStyle.color = '#221f20';
    }
  } else if (isHome) {
    topStyle.backgroundColor = 'transparent';
    topStyle.color = '#221f20';
  }

  const barColor = useScrollHeader && darkHeader ? '#ffffff' : '#221f20';

  const handleLogoClick = (e) => {
    if (menuOpen && onToggleMenu) {
      onToggleMenu();
    }

    if (isHome) {
      // Stay on same page (e.g. from COMMON CASES) and smoothly scroll to the top section
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      // If user has scrolled down on another page, smooth scroll to the top of that particular page
      if (window.scrollY > 80) {
        e.preventDefault();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } else {
        // If already at the top, navigate to home and ensure top position
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`top ${selectorOpen ? 'selector-open' : ''}`}
      id="top"
      style={topStyle}
    >
      <div className="menu left">
        <button
          type="button"
          className={`nav-icon ${menuOpen ? 'open' : ''}`}
          onClick={onToggleMenu}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="Alignaa-large-menu"
          style={{
            background: 'transparent',
            border: 0,
            padding: 0,
            margin: 0,
            color: 'inherit',
            borderRadius: 0,
          }}
        >
          <div style={{ backgroundColor: barColor }} />
          <div style={{ backgroundColor: barColor }} />
        </button>
      </div>

      <div className="menu right">
        <ul style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <li>
            <div className="start-here top-start-here">
              <button
                type="button"
                className="header-book-mobile"
                onClick={openBookNow}
                aria-label="Book your free consultation"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: barColor,
                  padding: '4px',
                  cursor: 'pointer',
                }}
              >
                <Calendar size={24} strokeWidth={2} />
              </button>
              <button
                type="button"
                className="header-book-desktop"
                onClick={openBookNow}
                style={{
                  fontSize: '14px',
                  padding: '6px 14px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  lineHeight: '1.2',
                }}
              >
                Book your free consultation
              </button>
            </div>
          </li>
        </ul>
      </div>

      <Link
        to="/"
        onClick={handleLogoClick}
        aria-label="Alignaa Home"
        style={{
          width: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          height: '100%',
          color: barColor,
          textDecoration: 'none',
          position: 'relative',
          zIndex: 10,
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            fontFamily: "'Nord', var(--font-primary)",
            fontSize: '24px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'inherit',
            lineHeight: 1,
            pointerEvents: 'none',
          }}
        >
          ALIGNAA
        </span>
      </Link>
    </header>
  );
}

