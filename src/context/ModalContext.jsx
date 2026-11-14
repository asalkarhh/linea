import { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [bookNowOpen, setBookNowOpen] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' });
  const [infoModal, setInfoModal] = useState({ open: false, type: null, data: null });
  const [darkHeader, setDarkHeader] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);

  const openBookNow = useCallback(() => setBookNowOpen(true), []);
  const closeBookNow = useCallback(() => setBookNowOpen(false), []);

  const openLightbox = useCallback((src, alt = 'Before and after Alignaa treatment') => {
    setLightbox({ open: true, src, alt });
  }, []);
  const closeLightbox = useCallback(() => {
    setLightbox({ open: false, src: '', alt: '' });
  }, []);

  const openReviewModal = useCallback((review) => {
    setInfoModal({ open: true, type: 'review', data: review });
  }, []);

  const openTollFreeModal = useCallback(() => {
    setInfoModal({ open: true, type: 'tollFree', data: null });
  }, []);

  const openAuZipModal = useCallback((zipValue, onConfirmReenter) => {
    setInfoModal({
      open: true,
      type: 'auZip',
      data: { zipValue, onConfirmReenter },
    });
  }, []);

  const openAlertModal = useCallback((title, message) => {
    setInfoModal({
      open: true,
      type: 'message',
      data: { title, message },
    });
  }, []);

  const closeInfoModal = useCallback(() => {
    setInfoModal({ open: false, type: null, data: null });
  }, []);

  return (
    <ModalContext.Provider
      value={{
        bookNowOpen,
        openBookNow,
        closeBookNow,
        lightbox,
        openLightbox,
        closeLightbox,
        infoModal,
        openReviewModal,
        openTollFreeModal,
        openAuZipModal,
        openAlertModal,
        closeInfoModal,
        darkHeader,
        setDarkHeader,
        headerOpacity,
        setHeaderOpacity,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModals must be used inside ModalProvider');
  }
  return ctx;
}

