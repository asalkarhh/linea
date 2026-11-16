import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import '../styles/home.css';

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.defaultMuted = true;
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, []);

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
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            className="home-video-bg"
            aria-label="Alignaa Clear Aligners hero video"
          >
            <source
              src="/assets/videos/Alignaa_Wide_Website_Hero_Comp.mp4"
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
              Book Your free scan Now
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

