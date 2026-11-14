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
    ? '/assets/videos/Linea_Vertical__Website_Hero_Comp.mp4'
    : '/assets/videos/Linea_Wide_Website_Hero_Comp.mp4';
  const posterSrc = isMobile
    ? '/assets/images/video-still-mobile.jpeg'
    : '/assets/images/video-still.jpeg';

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

// Module 3 Process Step Video Player with scroll-based autoplay matching reference
export function ProcessVideoPlayer({
  id,
  stepNumber,
  src,
  poster,
  vimeoUrl,
  isActive = false,
  title = '',
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [useVimeo, setUseVimeo] = useState(false);

  // Autoplay or pause when active step changes on scroll
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isActive) {
      vid.muted = true;
      vid.defaultMuted = true;
      vid.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setPlaying(false);
    }
  };

  const fallbackPoster =
    stepNumber === 2
      ? '/assets/images/progress-step-2-poster.jpg'
      : stepNumber === 3
        ? '/assets/images/progress-step-3-poster.jpg'
        : '/assets/images/progress-step-1-poster.jpg';

  return (
    <div className="process-video-wrap" style={{ position: 'relative', overflow: 'hidden' }}>
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
        <video
          ref={videoRef}
          id={id}
          src={src}
          poster={poster || fallbackPoster}
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setUseVimeo(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '10px 10px 0 0',
          }}
        />
      )}

      <button
        type="button"
        className="play"
        onClick={togglePlay}
        aria-label={playing ? `Pause Step ${stepNumber}` : `Play Step ${stepNumber}`}
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
          src={poster || '/assets/images/video-still.jpeg'}
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
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [useVimeo, setUseVimeo] = useState(false);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setPlaying(false);
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
          muted
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onError={() => setUseVimeo(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '10px',
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

// Module 2 Dentist Guarantee block with video toggle
export function GuaranteeVideoBlock({ activeMod2 }) {
  const [playingVideo, setPlayingVideo] = useState(false);

  return (
    <div className="mod-2-video-wrap" style={{ position: 'relative' }}>
      {playingVideo ? (
        <iframe
          src="https://player.vimeo.com/video/724683619?autoplay=1&controls=0"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          id="guarantee-video"
          title="Alignaa Dentist Guarantee"
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />
      ) : (
        <>
          <img
            alt="Dentist performing Alignaa Clear Aligner fitting"
            id="guarantee-video"
            src="/assets/images/dentist.jpg"
            style={{ width: '100%', display: 'block', borderRadius: '5px' }}
          />
          <button
            type="button"
            className="play"
            onClick={() => setPlayingVideo(true)}
            aria-label="Play Alignaa Dentist Guarantee Video"
            style={{ border: 0, borderRadius: 0 }}
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
        </>
      )}
    </div>
  );
}
