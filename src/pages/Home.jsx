import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import Aligners from './Aligners';
import { useModals } from '../context/ModalContext';
import '../styles/home.css';

export default function Home() {
  const { homeScrolled, setHomeScrolled } = useModals();
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 700 : false
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
    // Always start at initial welcome cover (Image 3) on fresh load / reload
    setHomeScrolled(false);

    const onResize = () => setIsMobile(window.innerWidth < 700);
    const onBeforeUnload = () => window.scrollTo(0, 0);
    window.addEventListener('resize', onResize);
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [setHomeScrolled]);

  const videoSrc = isMobile
    ? '/assets/videos/Alignaa_Vertical__Website_Hero_Comp.mp4'
    : '/assets/videos/Alignaa_Wide_Website_Hero_Comp.mp4';
  const posterSrc = isMobile
    ? '/assets/images/alignaa-hero-mobile-poster.jpg'
    : '/assets/images/alignaa-hero-wide-poster.jpg';

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.defaultMuted = true;
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [videoSrc]);

  // Track scroll position to pause offscreen video and switch hero to Image 2 once user explores
  useEffect(() => {
    const handleScroll = () => {
      const vid = videoRef.current;
      const scrollY = window.scrollY;
      const winH = window.innerHeight || 800;

      // When "Craft a smile" section goes up around 80%, switch hero state to Image 2
      if (scrollY >= winH * 0.8) {
        setHomeScrolled(true);
      }

      // Pause hero video when deep in content sheet to conserve resources
      if (vid) {
        if (scrollY > winH) {
          if (!vid.paused) vid.pause();
        } else {
          if (vid.paused) vid.play().catch(() => {});
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setHomeScrolled]);

  const scrollToContent = () => {
    const target = document.getElementById('aligners-main-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-home">
      <SEO
        title="Alignaa® | Dentist-Led Clear Aligners in India — From ₹22,999"
        description="Alignaa provides doctor-directed clear aligners starting from ₹22,999 in India. High-precision 3D digital scans, continuous dentist supervision, custom Zendura aligners, free retainers & whitening."
        keywords="clear aligners India, invisible braces cost, Alignaa aligners, teeth straightening without braces, Invisalign alternatives India, clear teeth clips price, invisible teeth aligners"
        canonical="/"
      />

      {/* Hero Cover (Sticky 100vh Window) */}
      <section className="home-hero-cover" id="home-hero-cover">
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          poster={posterSrc}
          className="home-hero-video-bg"
          aria-label="Alignaa Clear Aligners hero video"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="home-hero-overlay" />

        {!homeScrolled ? (
          /* Image 3: On Website Load / Initial View */
          <>
            <h1 className="home-hero-title">Clear Aligners</h1>

            <div className="home-hero-actions">
              <Link to="/aligners/quiz/" className="home-cta-button">
                Book free 3D scan
              </Link>
              <button
                type="button"
                className="home-scroll-down-btn"
                onClick={scrollToContent}
                aria-label="Scroll down to explore"
              >
                <ChevronDown size={30} strokeWidth={2} />
              </button>
            </div>
          </>
        ) : (
          /* Image 2: When Scrolling Back Up */
          <div className="home-hero-aligners-block">
            <h1 className="home-aligners-title">
              STRAIGHT  TEETH 
              <br />
              WITH ALIGNAA<sup>&reg;</sup>
              <br />
              CLEAR ALIGNERS
            </h1>
            <br></br>
            <Link
              to="/aligners/quiz/"
              className="home-candidate-btn"
            >
              <span>Am I a Candidate?</span>
              <ChevronRight size={18} strokeWidth={2} />
            </Link>
          </div>
        )}
      </section>

      {/* Main Website Content Sheet (Image 1: "Craft a smile that’s uniquely yours." glides up over sticky hero) */}
      <div className="home-content-sheet" id="aligners-main-content">
        <Aligners hideHero={true} />
      </div>
    </div>
  );
}
