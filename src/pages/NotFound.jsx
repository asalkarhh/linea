import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useModals } from '../context/ModalContext';

export default function NotFound() {
  const { openTollFreeModal } = useModals();

  useEffect(() => {
    document.title = 'Page Not Found — Linea Official';
  }, []);

  return (
    <div
      className="block std-x-pad"
      style={{
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '120px',
        paddingBottom: '80px',
      }}
    >
      <p style={{ fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666' }}>
        404 — Page Not Found
      </p>
      <h1 style={{ fontSize: '36px', margin: '10px 0 16px' }}>
        This page has moved or no longer exists.
      </h1>
      <p style={{ maxWidth: '520px', color: '#555', marginBottom: '32px' }}>
        Explore our dentist-directed clear aligners, check pricing, or connect with a Linea Smile Expert.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
        <button type="button" style={{ width: 'auto', padding: 0 }}>
          <Link to="/" style={{ display: 'block', padding: '14px 24px' }}>
            Return Home
          </Link>
        </button>
        <button type="button" className="dark-button" style={{ width: 'auto', padding: 0 }}>
          <Link to="/aligners/" style={{ display: 'block', padding: '14px 24px' }}>
            Explore Aligners
          </Link>
        </button>
        <button
          type="button"
          onClick={openTollFreeModal}
          style={{
            width: 'auto',
            padding: '14px 24px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Phone size={16} />
          <span>1-888-546-3206</span>
        </button>
      </div>
    </div>
  );
}

