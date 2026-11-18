import { useState, useRef, useEffect, useCallback } from 'react';

// Hero video background with mobile/desktop source switching and reliable autoplay
export function HeroVideoBg({ onVisibilityCheck }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 700 : false
  );
  const videoRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const videoSrc = isMobile
    ? '/assets/videos/Alignaa_Vertical__Website_Hero_Comp.mp4'
    : '/assets/videos/Alignaa_Wide_Website_Hero_Comp.mp4';
  const posterSrc = isMobile
    ? '/assets/images/alignaa-hero-mobile-poster.jpg'
    : '/assets/images/alignaa-hero-wide-poster.jpg';

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Guarantee browser autoplay by enforcing muted DOM properties
    vid.muted = true;
    vid.defaultMuted = true;
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    const onScroll = () => {
      const scrollY = window.scrollY;
      const winH = window.innerHeight || 800;
      if (scrollY < winH) {
        if (vid.paused) vid.play().catch(() => {});
      } else {
        if (!vid.paused) vid.pause();
      }
      if (onVisibilityCheck) onVisibilityCheck(scrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [videoSrc, onVisibilityCheck]);

  return (
    <video
      ref={videoRef}
      key={videoSrc}
      autoPlay
      muted
      loop
      playsInline
      webkit-playsinline="true"
      poster={posterSrc}
      className="video-element jquery-background-video cover-video"
      aria-label="Alignaa Clear Aligners hero background video"
      style={{ objectFit: 'cover' }}
    >
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support this feature
    </video>
  );
}

// Module 3 Process Step Video Player
export function ProcessVideoPlayer({
  id,
  stepNumber,
  src,
  poster,
  vimeoUrl,
  isActive = false,
  title = '',
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [useVimeo, setUseVimeo] = useState(false);

  const fallbackPoster =
    stepNumber === 2
      ? '/assets/images/progress-step-2-poster.jpg'
      : stepNumber === 3
        ? '/assets/images/progress-step-3-poster.jpg'
        : '/assets/images/progress-step-1-poster.jpg';

  const resetToStart = useCallback(() => {
    const vid = videoRef.current;
    if (vid) {
      if (!vid.paused) {
        vid.pause();
      }
      try {
        vid.currentTime = 0;
        vid.load();
      } catch (_) {}
    }
    setPlaying(false);
    setHasStarted(false);
  }, []);

  // Stop, rewind to 0:00, and restore pre-video poster image when scrolled outside viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. IntersectionObserver on container element
    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              resetToStart();
            }
          });
        },
        { threshold: 0 }
      );
      observer.observe(container);
    }

    // 2. Direct scroll/resize visibility check
    const checkVisibility = () => {
      const rect = container.getBoundingClientRect();
      const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!isVisible) {
        resetToStart();
      }
    };

    // 3. Listen to global process video reset event
    const handleGlobalReset = () => {
      resetToStart();
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);
    window.addEventListener('alignaa:reset-process-videos', handleGlobalReset);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      window.removeEventListener('alignaa:reset-process-videos', handleGlobalReset);
    };
  }, [resetToStart]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.muted = true;
      vid.defaultMuted = true;
      if (!hasStarted) {
        try {
          vid.currentTime = 0;
        } catch (_) {}
      }
      vid
        .play()
        .then(() => {
          setHasStarted(true);
          setPlaying(true);
        })
        .catch(() => {});
    } else {
      vid.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="process-video-wrap"
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={togglePlay}
    >
      {useVimeo ? (
        <iframe
          id={id}
          src={vimeoUrl}
          title={title || `Alignaa Process Step ${stepNumber}`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      ) : (
        <>
          <video
            ref={videoRef}
            id={id}
            src={src}
            poster={poster || fallbackPoster}
            loop={false}
            muted
            playsInline
            webkit-playsinline="true"
            preload="metadata"
            onPlay={() => {
              setHasStarted(true);
              setPlaying(true);
            }}
            onPause={() => setPlaying(false)}
            onEnded={resetToStart}
            onError={() => setUseVimeo(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              borderRadius: '10px 10px 0 0',
              transform: stepNumber === 2 ? 'scale(1.46)' : 'none',
              transformOrigin: '50% 20%',
            }}
          />
          {!hasStarted && (
            <img
              src={poster || fallbackPoster}
              alt={title || `Alignaa Process Step ${stepNumber}`}
              id={id ? `${id}-poster` : undefined}
              className="process-poster-img"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px 10px 0 0',
                transform: stepNumber === 2 ? 'scale(1.46)' : 'none',
                transformOrigin: '50% 20%',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />
          )}
        </>
      )}

      <button
        type="button"
        className="play"
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        aria-label={playing ? `Pause Step ${stepNumber}` : `Play Step ${stepNumber}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          opacity: playing ? (isHovered ? 1 : 0) : 1,
          pointerEvents: playing ? (isHovered ? 'auto' : 'none') : 'auto',
          border: 0,
          borderRadius: 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        {playing ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-pause"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-play"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>
    </div>
  );
}

// Module 6 Showcase Video Player supporting local MP4 video or fallback Vimeo embed
export function VimeoShowcasePlayer({
  src = '/assets/videos/aligna video.mp4',
  id = 'mod-6-video',
  title = 'Alignaa Clear Aligners AI Monitoring & 3D Simulation',
  poster = '/assets/images/aligna-video-poster.jpg',
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);

  // Pause when scrolled outside viewport
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !vid.paused) {
            vid.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(vid);
    return () => observer.disconnect();
  }, []);

  const isLocalVideo = Boolean(
    src && (src.endsWith('.mp4') || src.startsWith('/') || !src.includes('vimeo.com'))
  );

  const handlePlayClick = () => {
    if (isLocalVideo && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }

    setIsPlaying(true);
    // Send play postMessage to Vimeo player iframe
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: 'play' }), '*');
      } catch {
        // Fallback handled by direct player controls
      }
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#413728',
        borderRadius: 'inherit',
        overflow: 'hidden',
      }}
    >
      {isLocalVideo ? (
        <video
          ref={videoRef}
          id={id}
          src={src}
          poster={poster}
          playsInline
          webkit-playsinline="true"
          loop
          muted={false}
          controls={isPlaying}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={handlePlayClick}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            borderRadius: 'inherit',
            cursor: 'pointer',
          }}
        />
      ) : !loadError ? (
        <iframe
          ref={iframeRef}
          id={id}
          src={src}
          title={title}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          onError={() => setLoadError(true)}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            borderRadius: 'inherit',
          }}
        />
      ) : (
        <img
          src={poster || '/assets/images/alignaa-hero-wide-poster.jpg'}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}

      {/* Reference play button overlay */}
      {!isPlaying && (
        <button
          type="button"
          className="play"
          onClick={handlePlayClick}
          aria-label={`Play ${title}`}
          style={{
            border: 0,
            borderRadius: 0,
            opacity: isPlaying ? 0 : 1,
            pointerEvents: isPlaying ? 'none' : 'auto',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-play"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Module 10 Socials Vertical Video Player with high-res poster and toggle play
export function SocialsVideoPlayer({
  id,
  src,
  poster,
  vimeoUrl,
  ariaLabel = 'Play Alignaa social video',
  isPlaying: controlledIsPlaying,
  onTogglePlay,
}) {
  const videoRef = useRef(null);
  const [localPlaying, setLocalPlaying] = useState(false);
  const [useVimeo, setUseVimeo] = useState(false);

  const isControlled = typeof controlledIsPlaying === 'boolean';
  const playing = isControlled ? controlledIsPlaying : localPlaying;

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isControlled) {
      if (controlledIsPlaying) {
        if (vid.paused) {
          vid.muted = false;
          vid.play().catch(() => {});
        }
      } else {
        if (!vid.paused) {
          vid.pause();
        }
      }
    }
  }, [controlledIsPlaying, isControlled]);

  // Pause when scrolled outside viewport
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !vid.paused) {
            vid.pause();
            if (isControlled && onTogglePlay) {
              onTogglePlay(false);
            } else {
              setLocalPlaying(false);
            }
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(vid);
    return () => observer.disconnect();
  }, [isControlled, onTogglePlay]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.muted = false;
      vid.play().then(() => {
        if (isControlled && onTogglePlay) {
          onTogglePlay(true);
        } else {
          setLocalPlaying(true);
        }
      }).catch(() => {});
    } else {
      vid.pause();
      if (isControlled && onTogglePlay) {
        onTogglePlay(false);
      } else {
        setLocalPlaying(false);
      }
    }
  };

  const handlePause = () => {
    if (isControlled && onTogglePlay) {
      if (controlledIsPlaying) {
        onTogglePlay(false);
      }
    } else {
      setLocalPlaying(false);
    }
  };

  const handlePlay = () => {
    if (isControlled && onTogglePlay) {
      if (!controlledIsPlaying) {
        onTogglePlay(true);
      }
    } else {
      setLocalPlaying(true);
    }
  };

  return (
    <div
      className="socials-video-wrap"
      style={{ position: 'relative', width: '100%', borderRadius: '10px', overflow: 'hidden' }}
    >
      {useVimeo ? (
        <iframe
          id={id}
          src={vimeoUrl}
          title={ariaLabel}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', borderRadius: '10px' }}
        />
      ) : (
        <video
          ref={videoRef}
          id={id}
          src={src}
          poster={poster || undefined}
          loop
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          onClick={togglePlay}
          onPause={handlePause}
          onPlay={handlePlay}
          onError={() => setUseVimeo(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        />
      )}

      <button
        type="button"
        className="play"
        onClick={togglePlay}
        aria-label={playing ? `Pause ${ariaLabel}` : ariaLabel}
        style={{
          opacity: playing ? 0 : 1,
          pointerEvents: playing ? 'none' : 'auto',
          border: 0,
          borderRadius: 0,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-play"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </button>
    </div>
  );
}

// Module 2 Dentist Guarantee block - static image display (video and play button permanently removed)
export function GuaranteeVideoBlock({ activeMod2 = 1 }) {
  const imgSrc = activeMod2 === 2 ? '/assets/images/technology.jpg' : '/assets/images/dentist.jpg';
  const altText =
    activeMod2 === 2
      ? 'Backed by advanced aligner technology'
      : 'Dentist performing Alignaa Clear Aligner fitting';

  return (
    <div className="mod-2-video-wrap" style={{ position: 'relative' }}>
      <img
        alt={altText}
        id="guarantee-video"
        src={imgSrc}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );
}
