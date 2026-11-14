import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { resultsData } from '../data/resultsData';
import { alignersData } from '../data/alignersData';
import { useModals } from '../context/ModalContext';
import SlideCarousel from '../components/Carousel/SlideCarousel';
import CtaBlock from '../components/Buttons/CtaBlock';
import '../styles/results.css';

export default function BeforeAfter() {
  const { openLightbox } = useModals();
  const [selectedCase, setSelectedCase] = useState('All');

  useEffect(() => {
    document.title = 'Before & After Transformations — Alignaa Official';
  }, []);

  const caseFilters = useMemo(() => {
    const set = new Set(['All']);
    resultsData.resultsGallery.forEach((item) => {
      const m = item.caseInfo?.match(/Case:\s*([^/]+)/i);
      if (m && m[1]) set.add(m[1].trim());
    });
    return Array.from(set);
  }, []);

  const filteredResults = useMemo(() => {
    if (selectedCase === 'All') return resultsData.resultsGallery;
    return resultsData.resultsGallery.filter((item) =>
      item.caseInfo?.toLowerCase().includes(`case: ${selectedCase.toLowerCase()}`)
    );
  }, [selectedCase]);

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
            backgroundColor: 'rgba(0,0,0,0.28)',
          }}
        >
          <div className="half cover-text">
            <p style={{ marginTop: 0, fontSize: '18px', color: 'white' }}>Before &amp; Afters</p>
            <h1 style={{ color: 'white' }}>Real smiles transformed by dentist-directed care.</h1>
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

      {/* Interactive Case Filter & Gallery */}
      <section className="block std-x-pad std-y-pad" style={{ backgroundColor: '#fff' }}>
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 28px' }}>
          <h2 style={{ marginTop: 0 }}>Browse Results by Case Type</h2>
          <p style={{ color: '#555', marginBottom: '20px' }}>
            Select a malocclusion category or click any patient result to inspect the full before-and-after transformation.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            {caseFilters.map((cat) => {
              const active = selectedCase === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCase(cat)}
                  aria-pressed={active}
                  style={{
                    padding: '10px 16px',
                    width: 'auto',
                    backgroundColor: active ? 'var(--primary-button-color)' : '#f2f2f2',
                    color: active ? '#fff' : '#221f20',
                    borderColor: active ? 'var(--primary-button-color)' : '#ccc',
                    fontSize: '14px',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <SlideCarousel
          id="results"
          variant="overlay"
          sectionClassName="block"
          items={filteredResults}
          desktopVisible={4}
          tabletVisible={2}
          mobileVisible={1}
          renderSlide={(item, idx) => (
            <div key={`${item.image}-${idx}`} className="slide slide-25">
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
      </section>

      {/* Profile Gallery */}
      <section className="block std-x-pad std-y-pad">
        <SlideCarousel
          id="profile-results"
          variant="overlay"
          heading="Smile Profiles"
          headingTag="h2"
          sectionClassName="block"
          items={alignersData.profileGallery}
          desktopVisible={4}
          tabletVisible={2}
          mobileVisible={1}
          renderSlide={(item, idx) => (
            <div key={`${item.image}-${idx}`} className="slide slide-25">
              <button
                type="button"
                className="slide-25-img"
                onClick={() => openLightbox(item.image, `${item.name} — ${item.caseInfo || ''}`)}
                aria-label={`View ${item.name} smile profile`}
                style={{
                  backgroundImage: `url(${item.image})`,
                  width: '100%',
                  border: 0,
                  padding: 0,
                }}
              >
                <div className="slide-25-overlay">
                  <div className="name-overlay">{item.name}</div>
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
          )}
        />
      </section>

      <CtaBlock
        title="Is Alignaa right for you?"
        description="Take the free 30 second assessment to find out."
        buttonLabel="Start Here"
        buttonTo="/aligners/quiz/"
      />
    </div>
  );
}

