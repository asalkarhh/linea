import { Link, useLocation } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { useModals } from '../../context/ModalContext';

export default function Header({ menuOpen, onToggleMenu, selectorOpen }) {
  const location = useLocation();
  const { openBookNow, darkHeader, headerOpacity } = useModals();

  const path = location.pathname;
  const isHome = path === '/';
  const isAlignersSection = path.startsWith('/aligners');

  // On /aligners/, header transitions from transparent to solid light (or dark over dark sections)
  const useScrollHeader = path === '/aligners/' || path === '/aligners';

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
          aria-controls="Linea-large-menu"
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
        <ul style={{ position: 'relative' }}>
          {isHome && (
            <li>
              <Link to="/login/" aria-label="Account login" style={{ color: barColor }}>
                <User size={24} strokeWidth={2} />
              </Link>
            </li>
          )}

          {isAlignersSection && (
            <li>
              <div className="start-here top-start-here">
                <button
                  type="button"
                  className="desktop-hide"
                  onClick={openBookNow}
                  aria-label="Book consultation"
                  style={{
                    background: 'transparent',
                    color: barColor,
                    padding: '4px',
                    display: 'inline-flex',
                  }}
                >
                  <Calendar size={24} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="mobile-hide"
                  onClick={openBookNow}
                  style={{ fontSize: '14px', padding: '5px 10px' }}
                >
                  Book Now
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>

      <Link
        to="/"
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
          }}
        >
          ALIGNAA
        </span>
      </Link>
    </header>
  );
}

