import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { pricingData } from '../data/pricingData';
import CtaBlock from '../components/Buttons/CtaBlock';
import '../styles/pricing.css';

export default function Timeline() {
  useEffect(() => {
    document.title = 'Treatment Timeline — Linea Official';
  }, []);

  return (
    <div className="page-pricing">
      <div
        className="block top-cover cover-pricing"
        style={{
          position: 'relative',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.35)',
          }}
        >
          <div className="half cover-text">
            <p style={{ marginTop: 0, fontSize: '18px', color: 'white' }}>Treatment Timeline</p>
            <h1 style={{ color: 'white' }}>Your journey from first scan to confident smile.</h1>
            <button
              id="model-button"
              type="button"
              style={{
                marginBottom: '20px',
                fontSize: '20px',
                fontWeight: 300,
                textAlign: 'left',
                padding: 0,
              }}
            >
              <Link
                to="/aligners/quiz/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px',
                }}
              >
                <span>Take the Smile Quiz</span>
                <ChevronRight size={20} />
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* 9-Step Treatment Timeline */}
      <section
        className="block std-x-pad"
        id="timeline"
        style={{ paddingTop: '80px', paddingBottom: '20px', backgroundColor: '#fff' }}
      >
        <h1 style={{ textAlign: 'center' }}>Start Here</h1>
        {pricingData.timeline.map((step, i) => (
          <div key={step.heading + i} className="block timeline-block">
            <div className="timeline-title">
              {step.heading}
              <br />
              <b>{step.subtitle}</b>
            </div>
            <div className="timeline-text">{step.description}</div>
          </div>
        ))}

        <div className="block" style={{ clear: 'both' }}>
          <button type="button" style={{ margin: '60px auto 60px', fontSize: '20px', padding: 0 }}>
            <Link to="/aligners/quiz/" style={{ display: 'block', padding: '20px' }}>
              Get Started
            </Link>
          </button>
        </div>
      </section>

      <CtaBlock
        title="Ready to begin your Linea journey?"
        description="See pricing options and find out which aligner tier fits your smile goals."
        buttonLabel="View Pricing"
        buttonTo="/aligners/pricing/"
      />
    </div>
  );
}

