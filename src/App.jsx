import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { ModalProvider } from './context/ModalContext';
import Preloader from './components/Preloader/Preloader';
import AppRoutes from './routes/AppRoutes';

function GlobalVideoScrollManager() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    // Observer to pause videos when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          if (vid instanceof HTMLVideoElement) {
            if (!entry.isIntersecting) {
              if (!vid.paused) {
                vid.pause();
                // If it was an ambient autoplay background video, remember to resume on enter
                if (vid.autoplay && vid.muted) {
                  vid.dataset.pausedByScroll = 'true';
                }
              }
            } else {
              // Resumed ambient background video when scrolled back into view
              if (vid.dataset.pausedByScroll === 'true') {
                delete vid.dataset.pausedByScroll;
                vid.play().catch(() => {});
              }
            }
          }
        });
      },
      { threshold: 0 }
    );

    const registered = new WeakSet();
    const registerVideos = () => {
      const videos = document.querySelectorAll('video');
      videos.forEach((vid) => {
        if (!registered.has(vid)) {
          registered.add(vid);
          observer.observe(vid);
        }
      });
    };

    registerVideos();

    // Re-check for new videos dynamically mounted to the DOM
    const mutationObserver = new MutationObserver(() => {
      registerVideos();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // When an interactive video starts playing, pause all other non-muted playing videos
    const handlePlayCapture = (e) => {
      const currentVid = e.target;
      if (currentVid instanceof HTMLVideoElement && !currentVid.muted) {
        const allVideos = document.querySelectorAll('video');
        allVideos.forEach((otherVid) => {
          if (otherVid !== currentVid && !otherVid.paused && !otherVid.muted) {
            otherVid.pause();
          }
        });
      }
    };

    document.addEventListener('play', handlePlayCapture, true);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      document.removeEventListener('play', handlePlayCapture, true);
    };
  }, []);

  return null;
}

export default function App() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ModalProvider>
          <Preloader />
          <GlobalVideoScrollManager />
          <AppRoutes />
          <Analytics />
        </ModalProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}

