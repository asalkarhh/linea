import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { resultsData } from '../data/resultsData';
import { useModals } from '../context/ModalContext';
import SlideCarousel from '../components/Carousel/SlideCarousel';
import CtaBlock from '../components/Buttons/CtaBlock';
import '../styles/results.css';

export default function Results() {
  const { openLightbox } = useModals();

  useEffect(() => {
    document.title = 'Real Smile Results & Reviews — Alignaa Official';
  }, []);

  return (
    <div className="page-results">
      <div
        className="block top-cover cover-results"
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
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <div className="half cover-text">
            <h1 style={{ marginTop: 0, color: 'white' }}>Your Smile, Your Story</h1>
            <p style={{ fontSize: '18px', color: 'white' }}>
              Take our quick, interactive assessment to get personalised advice about your orthodontic needs.
            </p>
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
                <span>Get Started</span>
                <ChevronRight size={20} />
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Google Reviews Carousel */}
      <div style={{ paddingTop: '60px', backgroundColor: '#fff' }}>
        <SlideCarousel
          id="google-reviews"
          variant="overlay"
          heading="400+ Google Reviews"
          headingTag="h2"
          sectionClassName="block std-x-pad"
          items={resultsData.googleReviews}
          desktopVisible={3}
          tabletVisible={2}
          mobileVisible={1}
          renderSlide={(rev, idx) => (
            <div key={rev.name + idx} className="slide">
              <div className="slide-block">
                <div className="slide-img">
                  <img src={rev.avatar} alt={rev.name} style={{ width: '100%' }} />
                </div>
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ float: 'right' }}
                  aria-label="Google review"
                >
                  <img
                    src="/assets/icons/google-g.svg"
                    alt="Google"
                    style={{ height: '24px' }}
                  />
                </a>
                <p style={{ fontWeight: 600, marginBottom: '4px' }}>{rev.name}</p>
                <p style={{ fontSize: '12px', color: '#9b9a9d', marginTop: 0 }}>
                  {rev.timeAgo}
                </p>
                <p style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                  {[0, 1, 2, 3, 4].map((s) => (
                    <img
                      key={s}
                      src="/assets/icons/google-star.png"
                      alt="star"
                      style={{ height: '14px', width: '14px' }}
                    />
                  ))}
                </p>
                <div className="slide-description">
                  <p>{rev.body}</p>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      {/* Trustpilot Reviews Carousel */}
      <div style={{ paddingTop: '40px', backgroundColor: '#fff' }}>
        <SlideCarousel
          id="trustpilot-reviews"
          variant="overlay"
          heading="4.9/5 on Trustpilot"
          headingTag="h2"
          sectionClassName="block std-x-pad"
          items={resultsData.trustpilotReviews}
          desktopVisible={3}
          tabletVisible={2}
          mobileVisible={1}
          renderSlide={(rev, idx) => (
            <div key={rev.name + idx} className="slide">
              <div className="slide-block">
                <div
                  className="slide-img"
                  style={{
                    backgroundColor: rev.avatarBg || '#f6f5e9',
                    backgroundImage: rev.avatarImage
                      ? `url(${rev.avatarImage})`
                      : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {!rev.avatarImage && rev.abbrev}
                </div>
                <a
                  href="https://au.trustpilot.com/review/lineaofficial.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ float: 'right' }}
                  aria-label="Trustpilot review"
                >
                  <img
                    src="/assets/icons/trustpilot-logo.svg"
                    alt="Trustpilot"
                    style={{ height: '24px' }}
                  />
                </a>
                <p>{rev.name}</p>
                <p>
                  <img
                    src="/assets/icons/tp-5-stars.svg"
                    alt="5 stars"
                    style={{ height: '15px' }}
                  />
                </p>
                <div className="slide-description">
                  {rev.title && <h4>{rev.title}</h4>}
                  <p>{rev.body}</p>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      {/* Before & After Results Gallery */}
      <div style={{ paddingTop: '60px', paddingBottom: '80px', backgroundColor: '#fff' }}>
        <SlideCarousel
          id="results"
          variant="overlay"
          heading="Results"
          headingTag="h2"
          sectionClassName="block std-x-pad"
          items={resultsData.resultsGallery}
          desktopVisible={4}
          tabletVisible={2}
          mobileVisible={1}
          renderSlide={(item, idx) => (
            <div key={item.image + idx} className="slide slide-25">
              <button
                type="button"
                className="slide-25-img"
                onClick={() => openLightbox(item.image, `${item.name} — ${item.caseInfo}`)}
                aria-label={`View ${item.name} before and after result`}
                style={{
                  backgroundImage: `url(${item.image})`,
                  width: '100%',
                  border: 0,
                  padding: 0,
                }}
              >
                <div className="slide-25-overlay">
                  <div className="name-overlay">{item.name}</div>
                  <div
                    className="case-overlay"
                    style={{ textAlign: 'right' }}
                    dangerouslySetInnerHTML={{ __html: item.caseHtml }}
                  />
                </div>
              </button>
            </div>
          )}
        />
      </div>

      <CtaBlock
        title="Is Alignaa right for you?"
        description="Take the free 30 second assessment to find out."
        buttonLabel="Start Here"
        buttonTo="/aligners/quiz/"
      />
    </div>
  );
}

