import { useEffect } from 'react';
import { X, Phone } from 'lucide-react';
import { useModals } from '../../context/ModalContext';

export default function GlobalModals() {
  const { lightbox, closeLightbox, infoModal, closeInfoModal } = useModals();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (lightbox.open) closeLightbox();
        if (infoModal.open) closeInfoModal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open, infoModal.open, closeLightbox, closeInfoModal]);

  return (
    <>
      {lightbox.open && (
        <div
          className="photoOverlay"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={closeLightbox}
        >
          <button
            type="button"
            aria-label="Close photo preview"
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'transparent',
              color: '#ffffff',
              border: 0,
              padding: '6px',
            }}
          >
            <X size={28} />
          </button>
          <img
            className="photoLarge"
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {infoModal.open && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeInfoModal();
          }}
        >
          <div
            className="modal"
            id="modal"
            style={{
              display: 'block',
              border: '1px solid var(--primary-text-color)',
            }}
          >
            <button
              type="button"
              className="closemodal"
              onClick={closeInfoModal}
              aria-label="Close modal"
              style={{
                top: '5px',
                right: '5px',
                color: '#221f20',
                background: 'transparent',
                border: 0,
                padding: '4px',
              }}
            >
              <X size={24} />
            </button>

            {infoModal.type === 'review' && infoModal.data && (
              <div className="block" style={{ padding: '20px' }}>
                {infoModal.data.title && (
                  <h4 style={{ marginTop: 0 }}>{infoModal.data.title}</h4>
                )}
                <p style={{ whiteSpace: 'pre-line', marginBottom: 0 }}>
                  {infoModal.data.fullBody}
                </p>
              </div>
            )}

            {infoModal.type === 'tollFree' && (
              <div
                className="block"
                style={{
                  backgroundColor: '#ccc',
                  padding: '20px',
                  borderRadius: '10px',
                }}
              >
                <p style={{ marginTop: 0 }}>
                  Call an Alignaa Smile Expert now, for any specific questions on pricing, locations or booking in for your consultation.
                </p>
                <a
                  href="tel:+18885463206"
                  className="flex vertical-center"
                  style={{ gap: '10px' }}
                >
                  <h1 style={{ margin: '10px 0' }}>1-888-546-3206</h1>
                  <div
                    className="flex vertical-center"
                    style={{
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#221f20',
                      color: '#ccc',
                    }}
                  >
                    <Phone size={20} />
                  </div>
                </a>
              </div>
            )}

            {infoModal.type === 'auZip' && infoModal.data && (
              <div className="block" style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ marginTop: 0 }}>Is that a US zip code?</h2>
                <p>
                  You entered <b>{infoModal.data.zipValue}</b> - US zip codes have five digits.
                </p>
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: '10px 20px',
                    background: '#fff',
                    color: 'var(--primary-text-color)',
                    border: '1px solid var(--primary-line-color)',
                    margin: '16px 0',
                    borderRadius: '5px',
                  }}
                  onClick={() => {
                    closeInfoModal();
                    if (infoModal.data.onConfirmReenter) {
                      infoModal.data.onConfirmReenter();
                    }
                  }}
                >
                  Let me re-enter it
                </button>
                <button
                  type="button"
                  style={{
                    padding: '10px 20px',
                    border: '1px solid var(--primary-line-color)',
                    borderRadius: '5px',
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                  onClick={closeInfoModal}
                >
                  Close
                </button>
              </div>
            )}

            {infoModal.type === 'message' && infoModal.data && (
              <div className="block" style={{ padding: '20px' }}>
                {infoModal.data.title && (
                  <h3 style={{ marginTop: 0 }}>{infoModal.data.title}</h3>
                )}
                <p style={{ marginBottom: 0 }}>{infoModal.data.message}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

