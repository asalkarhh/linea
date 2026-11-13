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
          aria-controls="linea-large-menu"
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
        aria-label="Linea Home"
        style={{
          width: '200px',
          display: 'block',
          margin: 'auto',
          height: '100%',
          color: barColor,
        }}
      >
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="40"
          viewBox="0 0 2110.000000 795.000000"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <g
            transform="translate(0.000000,795.000000) scale(0.100000,-0.100000)"
            fill="currentColor"
            stroke="none"
          >
            <path d="M1990 3975 l0 -1985 1500 2 1500 3 37 38 38 37 3 190 3 190 -1295 0 -1296 0 0 1755 0 1755 -245 0 -245 0 0 -1985z" />
            <path d="M5760 3975 l0 -1985 245 0 245 0 0 1985 0 1985 -245 0 -245 0 0 -1985z" />
            <path d="M7180 3975 l0 -1985 245 0 245 0 2 1480 3 1480 1273 -1462 c701 -805 1288 -1471 1305 -1481 25 -13 56 -17 144 -17 l113 0 0 1985 0 1985 -250 0 -250 0 -2 -1478 -3 -1479 -1270 1463 c-812 936 -1281 1469 -1302 1479 -22 11 -63 15 -142 15 l-111 0 0 -1985z" />
            <path d="M11320 3975 l0 -1985 1520 0 1520 0 0 230 0 230 -1270 0 -1270 0 0 715 0 715 1020 0 1020 0 0 230 0 230 -1020 0 -1020 0 0 580 0 580 1165 0 1165 0 0 230 0 230 -1415 0 -1415 0 0 -1985z" />
            <path d="M16696 5868 c-24 -51 -458 -939 -966 -1973 -507 -1034 -924 -1886 -927 -1893 -4 -11 42 -12 243 -10 237 3 250 4 280 25 24 17 80 124 280 532 l249 511 1099 -3 1100 -2 245 -502 c135 -276 254 -511 264 -521 36 -39 63 -42 308 -40 l236 3 -971 1983 -971 1982 -212 0 -213 0 -44 -92z m696 -1472 c235 -477 428 -870 428 -872 0 -8 -1730 -4 -1730 4 -1 18 856 1741 864 1738 6 -1 202 -393 438 -870z" />
          </g>
        </svg>
      </Link>
    </header>
  );
}

