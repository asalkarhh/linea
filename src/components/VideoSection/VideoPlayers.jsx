import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

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

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onScroll = () => {
      if (window.scrollY < window.innerHeight) {
        if (vid.paused) vid.play().catch(() => {});
      } else {
        if (!vid.paused) vid.pause();
      }
      if (onVisibilityCheck) onVisibilityCheck(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onVisibilityCheck]);

  const videoSrc = isMobile
    ? '/assets/videos/Linea_Vertical__Website_Hero_Comp.mp4'
    : '/assets/videos/Linea_Wide_Website_Hero_Comp.mp4';
  const posterSrc = isMobile
    ? '/assets/images/video-still-mobile.jpeg'
    : '/assets/images/video-still.jpeg';

  return (
    <video
      key={videoSrc}
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      poster={posterSrc}
      className="video-element cover-video"
      aria-label="Linea Clear Aligners hero background video"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}

export function LocalPlayableVideo({
  src,
  poster,
  className = '',
  id,
  ariaLabel = 'Play video',
  style,
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

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
    <div style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      <video
        ref={videoRef}
        id={id}
        src={src}
        poster={poster || undefined}
        loop
        muted
        playsInline
        preload="metadata"
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          borderRadius: 'inherit',
        }}
      />
      <button
        type="button"
        className="play"
        onClick={togglePlay}
        aria-label={playing ? `Pause ${ariaLabel}` : ariaLabel}
        style={{
          opacity: playing ? 0 : 1,
          border: 0,
          borderRadius: 0,
        }}
      >
        <Play size={60} color="#f5f5f5" strokeWidth={1.75} />
      </button>
    </div>
  );
}

export function VimeoShowcasePlayer({ src, id, title = 'Linea Clear Aligners video' }) {
  const [activated, setActivated] = useState(false);

  if (activated) {
    return (
      <iframe
        id={id}
        src={`${src}&autoplay=1`}
        title={title}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        style={{ width: '100%', height: '100%' }}
      />
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#413728' }}>
      <img
        src="/assets/images/video-still.jpeg"
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <button
        type="button"
        className="play"
        onClick={() => setActivated(true)}
        aria-label={`Play ${title}`}
        style={{ border: 0, borderRadius: 0 }}
      >
        <Play size={60} color="#f5f5f5" strokeWidth={1.75} />
      </button>
    </div>
  );
}

