import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import '../styles/home.css';

export default function Home() {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 700 : false
  );

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

    vid.muted = true;
    vid.defaultMuted = true;
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [videoSrc]);

  return (
    <div className="page-home">
      <SEO
        title="Alignaa® | Dentist-Led Clear Aligners in India — From ₹22,999"
        description="Alignaa provides doctor-directed clear aligners starting from ₹22,999 in India. High-precision 3D digital scans, continuous dentist supervision, custom Zendura aligners, free retainers & whitening."
        keywords="clear aligners India, invisible braces cost, Alignaa aligners, teeth straightening without braces, Invisalign alternatives India, clear teeth clips price, invisible teeth aligners"
        canonical="/"
      />
      <div className="block home-wrap">
        <section className="block home-section" id="aligners-cover">
          <video
            ref={videoRef}
            key={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            poster={posterSrc}
            className="home-video-bg"
            aria-label="Alignaa Clear Aligners hero video"
          >
            <source
              src={videoSrc}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <h1 className="home-title">Clear Aligners</h1>
          <div className="block buttons-bar">
            <Link
              to="/aligners/quiz/"
              className="home-cta-link home-cta-primary"
            >
              Book free 3D scan
            </Link>
            <Link
              to="/aligners/"
              className="home-cta-link home-cta-secondary"
            >
              Learn More
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

