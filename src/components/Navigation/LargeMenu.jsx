import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function LargeMenu({ open, onClose }) {
  const location = useLocation();
  const path = location.pathname;
  const closeTimerRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else if (path !== '/') {
      document.body.style.overflow = 'initial';
    }
    return () => {
      if (path !== '/') {
        document.body.style.overflow = 'initial';
      }
    };
  }, [open, path]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const showMobileStartHere = path.startsWith('/aligners') || path.startsWith('/partners');
  const startHereTarget = path.startsWith('/partners') ? '/partners/#partner-form-wrap' : '/aligners/quiz/';

  const handleLinkClick = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    onClose();
  };

  return (
    <nav
      id="linea-large-menu"
      aria-label="Primary drawer navigation"
      className={`large-menu ${open ? 'open' : ''}`}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <Link to="/aligners/" onClick={handleLinkClick} tabIndex={open ? 0 : -1}>
        Clear Aligners
      </Link>
      <div className="sub-menu">
        <Link to="/aligners/why/" onClick={handleLinkClick} tabIndex={open ? 0 : -1}>
          Why Linea
        </Link>
        <Link to="/aligners/results/" onClick={handleLinkClick} tabIndex={open ? 0 : -1}>
          Results
        </Link>
        <Link to="/aligners/pricing/" onClick={handleLinkClick} tabIndex={open ? 0 : -1}>
          Pricing
        </Link>
        <Link
          to="/aligners/faq/"
          onClick={handleLinkClick}
          style={{ marginBottom: '40px' }}
          tabIndex={open ? 0 : -1}
        >
          FAQs
        </Link>
      </div>
      <Link to="/blog/" onClick={handleLinkClick} tabIndex={open ? 0 : -1}>
        Blog
      </Link>
      <Link
        to="/about/"
        onClick={handleLinkClick}
        style={{ marginBottom: '40px' }}
        tabIndex={open ? 0 : -1}
      >
        About Linea
      </Link>
      <Link to="/login/" onClick={handleLinkClick} tabIndex={open ? 0 : -1}>
        Login
      </Link>

      {showMobileStartHere && (
        <button className="start-here menu-start-here" type="button" tabIndex={open ? 0 : -1}>
          {path.startsWith('/partners') ? (
            <a
              href="#partner-form-wrap"
              style={{ margin: 0, display: 'block', padding: '20px', fontSize: '20px' }}
              onClick={handleLinkClick}
            >
              Start Here
            </a>
          ) : (
            <Link
              to={startHereTarget}
              style={{ margin: 0, display: 'block', padding: '20px', fontSize: '20px' }}
              onClick={handleLinkClick}
            >
              Start Here
            </Link>
          )}
        </button>
      )}
    </nav>
  );
}

export function LocationSelector({ open, onDismiss }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState('Australia');
  const wrapRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, []);

  if (!open) return null;

  return (
    <div className="location-selector-wrap std-x-pad" style={{ display: 'flex' }} ref={wrapRef}>
      <p className="mobile-hide">Learn more about Linea Clear Aligners in:</p>
      <p className="desktop-hide">View Linea in:</p>
      <div
        className="location-select"
        role="button"
        tabIndex={0}
        onClick={() => setDropdownOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setDropdownOpen((v) => !v);
        }}
      >
        {selected}
        {dropdownOpen && (
          <div className="location-options" style={{ display: 'block' }}>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setSelected('United States');
                setDropdownOpen(false);
                onDismiss();
              }}
            >
              United States
            </span>
          </div>
        )}
      </div>
      {selected === 'Australia' ? (
        <a href="https://www.lineaofficial.com.au/" rel="noopener noreferrer">
          <button type="button">Go</button>
        </a>
      ) : (
        <button type="button" onClick={onDismiss}>
          Go
        </button>
      )}
    </div>
  );
}

