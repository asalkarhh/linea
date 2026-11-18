import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/preloader.css';

export default function Preloader() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialExiting, setInitialExiting] = useState(false);
  const [initialProgress, setInitialProgress] = useState(15);

  const [routeLoading, setRouteLoading] = useState(false);
  const [routeProgress, setRouteProgress] = useState(0);

  const location = useLocation();
  const currentPathRef = useRef(location.pathname);
  const isFirstMountRef = useRef(true);

  // 1. Initial Site Preloader Sequence (Doctor-Grade First Load)
  useEffect(() => {
    // Incrementally advance progress bar smoothly
    const interval = setInterval(() => {
      setInitialProgress((prev) => {
        if (prev >= 88) {
          clearInterval(interval);
          return 88;
        }
        const delta = Math.floor(Math.random() * 14) + 8;
        return Math.min(prev + delta, 88);
      });
    }, 90);

    const completeInitialSequence = () => {
      clearInterval(interval);
      setInitialProgress(100);

      // Gracefully exit and reveal page
      setTimeout(() => {
        setInitialExiting(true);

        // Remove inline static HTML fallback shell if present
        const staticFallback = document.getElementById('initial-preloader');
        if (staticFallback) {
          staticFallback.style.opacity = '0';
          staticFallback.style.transition = 'opacity 0.4s ease';
          setTimeout(() => {
            staticFallback.remove();
          }, 400);
        }

        setTimeout(() => {
          setInitialLoading(false);
        }, 450);
      }, 200);
    };

    if (document.readyState === 'complete') {
      setTimeout(completeInitialSequence, 450);
    } else {
      window.addEventListener('load', completeInitialSequence, { once: true });
      // Safety timeout in case a media asset or script hangs
      const safetyTimeout = setTimeout(completeInitialSequence, 1200);
      return () => {
        clearInterval(interval);
        clearTimeout(safetyTimeout);
        window.removeEventListener('load', completeInitialSequence);
      };
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 2. Route Transition Preloader (Executes seamlessly on EVERY page transition)
  useEffect(() => {
    // Skip on first mount (handled by initial preloader)
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      currentPathRef.current = location.pathname;
      return;
    }

    // Only fire if the actual pathname changed (ignore query params or hash jumps)
    if (currentPathRef.current === location.pathname) {
      return;
    }
    currentPathRef.current = location.pathname;

    setRouteLoading(true);
    setRouteProgress(25);

    const step1 = setTimeout(() => {
      setRouteProgress(70);
    }, 70);

    const step2 = setTimeout(() => {
      setRouteProgress(100);
    }, 200);

    const step3 = setTimeout(() => {
      setRouteLoading(false);
      setRouteProgress(0);
    }, 380);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Top Laser Progress Bar (Active on Route Changes and Initial Load) */}
      {(routeLoading || (initialLoading && !initialExiting)) && (
        <div className="alignaa-top-laser-bar" aria-hidden="true">
          <div
            className="alignaa-top-laser-fill"
            style={{
              width: `${initialLoading ? initialProgress : routeProgress}%`,
              opacity: routeLoading || (initialLoading && !initialExiting) ? 1 : 0,
            }}
          />
        </div>
      )}

      {/* Initial Fullscreen Doctor-Grade Preloader */}
      {initialLoading && (
        <div
          className={`alignaa-preloader-root ${
            initialExiting ? 'preloader-exiting' : ''
          }`}
          role="status"
          aria-live="polite"
          aria-label="Loading Alignaa Doctor-Directed Clear Aligners"
        >
          <div className="alignaa-preloader-card">
            <div className="alignaa-preloader-emblem-wrap">
              <div className="alignaa-preloader-glow" />
              <img
                src="/assets/icons/marque-white.png"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/images/whitelogo.png';
                }}
                alt="Alignaa Clear Aligners"
                className="alignaa-preloader-emblem"
                width={52}
                height={48}
              />
            </div>

            <div className="alignaa-preloader-brand">ALIGNAA</div>
            <div className="alignaa-preloader-sub">Doctor-Directed Clear Aligners</div>

            <div className="alignaa-preloader-track">
              <div
                className="alignaa-preloader-fill"
                style={{ width: `${initialProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Route Transition Curtain (Sleek medical-grade transition across every page) */}
      <div
        className={`alignaa-route-curtain ${routeLoading ? 'route-active' : ''}`}
        aria-hidden={!routeLoading}
      >
        <div className="alignaa-route-card">
          <div className="alignaa-route-emblem-wrap">
            <img
              src="/assets/icons/marque-white.png"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/assets/images/whitelogo.png';
              }}
              alt=""
              className="alignaa-route-emblem"
              width={42}
              height={38}
            />
          </div>
          <div className="alignaa-route-sub">ALIGNING CLINICAL VIEW...</div>
          <div className="alignaa-route-track">
            <div
              className="alignaa-route-fill"
              style={{ width: `${routeProgress}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
