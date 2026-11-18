import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { resultsData } from '../data/resultsData';
import { useModals } from '../context/ModalContext';
import SlideCarousel from '../components/Carousel/SlideCarousel';
import CtaBlock from '../components/Buttons/CtaBlock';
import SEO from '../components/SEO/SEO';
import '../styles/results.css';

export default function Results() {
  const { openLightbox } = useModals();

  return (
    <div className="page-results">
      <SEO
        title="Real Clear Aligner Before & After Results & Reviews | Alignaa"
        description="See real smile transformations treated with Alignaa clear aligners. Real patient before-and-after photos for crowding, spacing, protrusion, and deep bites."
        keywords="clear aligners results, aligners before and after, invisible braces results, crowding before after, teeth straightening review, smile transformation"
        canonical="/aligners/results"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Clear Aligners', url: '/aligners' },
          { name: 'Results', url: '/aligners/results' },
        ]}
      />
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

      {/* Cloned Reviews Carousels - Commented out until updated with real client reviews */}
      {/*
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
                <div style={{ float: 'right' }}>
                  <img
                    src="/assets/icons/google-g.svg"
                    alt="Google"
                    style={{ height: '24px' }}
                  />
                </div>
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

      <div style={{ paddingTop: '40px', backgroundColor: '#fff' }}>
        <SlideCarousel
          id="client-reviews"
          variant="overlay"
          heading="Our Happy Clients say:"
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
                <p style={{ fontWeight: 600 }}>{rev.name}</p>
                <p style={{ color: '#00b67a', fontSize: '16px' }}>
                  ★★★★★
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
      */}

      {/* Before & After Results Gallery */}
      <div style={{ paddingTop: '60px', paddingBottom: '80px', backgroundColor: '#fff' }}>
        <SlideCarousel
          id="results"
          variant="aligners"
          heading="Results"
          headingTag="h2"
          sectionClassName="block has-slides"
          items={resultsData.resultsGallery}
          desktopVisible={3}
          tabletVisible={2}
          mobileVisible={1}
          showArrows={false}
          renderSlide={(item, idx) => (
            <div key={item.image + idx} className="slide">
              <div className="slide-block">
                <button
                  type="button"
                  className="slide-25-img"
                  onClick={() => openLightbox(item.image, item.name ? `${item.name} — ${item.caseInfo}` : item.caseInfo || 'Alignaa smile result')}
                  aria-label={`View before and after result ${idx + 1}`}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    border: 0,
                    padding: 0,
                    borderRadius: '5px',
                  }}
                >
                  <div className="slide-25-overlay">
                    {item.name && <div className="name-overlay">{item.name}</div>}
                    {item.caseHtml && (
                      <div
                        className="case-overlay"
                        style={{ textAlign: 'right' }}
                        dangerouslySetInnerHTML={{ __html: item.caseHtml }}
                      />
                    )}
                  </div>
                </button>
              </div>
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

