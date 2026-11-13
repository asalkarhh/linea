import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check, X } from 'lucide-react';
import { alignersData } from '../data/alignersData';
import { useModals } from '../context/ModalContext';
import {
  HeroVideoBg,
  ProcessVideoPlayer,
  VimeoShowcasePlayer,
  SocialsVideoPlayer,
  GuaranteeVideoBlock,
} from '../components/VideoSection/VideoPlayers';
import SlideCarousel from '../components/Carousel/SlideCarousel';
import FaqAccordion from '../components/Accordion/FaqAccordion';
import CtaBlock from '../components/Buttons/CtaBlock';
import ScrollReveal from '../components/ScrollAnimations/ScrollReveal';
import '../styles/aligners.css';

export default function Aligners() {
  const { openBookNow, openReviewModal, openLightbox, setDarkHeader, setHeaderOpacity } = useModals();
  const [activeMod2, setActiveMod2] = useState(1);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [activeProcessStep, setActiveProcessStep] = useState(null);

  const mod3Ref = useRef(null);
  const pricingRef = useRef(null);
  const mod5Ref = useRef(null);
  const casesRef = useRef(null);
  const reviewsRef = useRef(null);
  const resultsRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    document.title = 'Clear Aligners — Linea Official';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const winW = window.innerWidth || 1024;
      setShowBottomBar(y >= 50 && y < winW ? true : y >= winW);

      if (y < winW) {
        const opacity = Math.min(1, (y * 6) / winW);
        setDarkHeader(false);
        setHeaderOpacity(opacity);
      } else {
        setHeaderOpacity(1);
        const offsetTop = (el) => (el ? el.getBoundingClientRect().top + y : Infinity);
        const mod3Top = offsetTop(mod3Ref.current) - 60;
        const pricingTop = offsetTop(pricingRef.current) - 60;
        const mod5Top = offsetTop(mod5Ref.current) - 60;
        const casesTop = offsetTop(casesRef.current) - 60;
        const reviewsTop = offsetTop(reviewsRef.current) - 60;
        const resultsTop = offsetTop(resultsRef.current) - 60;
        const socialsTop = offsetTop(socialsRef.current) - 60;

        const isDark =
          (y > mod3Top && y < pricingTop) ||
          (y > mod5Top && y < casesTop) ||
          (y > reviewsTop && y < resultsTop) ||
          y > socialsTop;

        setDarkHeader(isDark);

        // Process step autoplay on scroll matching reference
        const mod3El = mod3Ref.current;
        if (mod3El) {
          const rect = mod3El.getBoundingClientRect();
          const topInView = rect.top;
          const totalH = rect.height;
          if (topInView < window.innerHeight * 0.75 && topInView + totalH > 100) {
            const relY = Math.max(0, -topInView + 100);
            const ratio = relY / totalH;
            if (ratio < 0.35) {
              setActiveProcessStep(1);
            } else if (ratio < 0.7) {
              setActiveProcessStep(2);
            } else {
              setActiveProcessStep(3);
            }
          } else {
            setActiveProcessStep(null);
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      setDarkHeader(false);
      setHeaderOpacity(1);
    };
  }, [setDarkHeader, setHeaderOpacity]);

  return (
    <div className="page-aligners">
      {/* Module 1: Fullscreen Hero Video */}
      <section
        className="block element-with-video-bg"
        style={{ position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}
      >
        <HeroVideoBg />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}
        >
          <div className="std-x-pad" style={{ position: 'absolute', bottom: '70px' }}>
            <h1 className="hero-title" style={{ position: 'static' }}>
              STRAIGHT TEETH
              <br />
              WITH LINEA<sup>&reg;</sup>
              <br />
              CLEAR ALIGNERS
            </h1>
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
                <span>Am I a Candidate?</span>
                <ChevronRight size={20} />
              </Link>
            </button>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section
        className="block row std-x-pad std-y-pad"
        style={{ borderBottom: '1px solid #d1dae0', overflow: 'hidden' }}
      >
        <div className="half">
          <div className="desktop-right-pad">
            <h2 style={{ fontSize: '2em' }}>
              Craft a smile
              <br />
              that&rsquo;s uniquely yours.
            </h2>
            <ScrollReveal>
              <p className="variable-text-size">
                Linea offers tailored orthodontic solutions with AI-powered treatment tracking and 7-day local customer support.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <p className="variable-text-size">
                All of our treatments are prescribed, performed and monitored by a licensed dentist.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.14}>
              <button
                id="model-button"
                type="button"
                style={{
                  margin: '20px 0',
                  fontSize: '14px',
                  fontWeight: 300,
                  textAlign: 'left',
                  padding: 0,
                  maxWidth: '220px',
                }}
              >
                <Link
                  to="/aligners/quiz/"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 20px',
                  }}
                >
                  <span>Get Started</span>
                  <ChevronRight size={16} />
                </Link>
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Carousel */}
      <SlideCarousel
        id="featured"
        heading="FEATURED"
        items={alignersData.featured}
        desktopVisible={3}
        tabletVisible={2}
        mobileVisible={1}
        renderSlide={(imgSrc, idx) => (
          <div key={imgSrc + idx} className="slide">
            <div className="slide-block">
              <img src={imgSrc} alt="Before and after Linea Clear Aligners" loading="lazy" />
            </div>
          </div>
        )}
      />

      {/* Module 2: Guided by local dentists / Aligner Technology switcher */}
      <section className="block mod-2-row std-y-pad">
        <div className="half" id="square-mod-2-left">
          <GuaranteeVideoBlock activeMod2={activeMod2} />
        </div>

        <div
          className="half square-mod-2"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {activeMod2 === 1 ? (
            <div className="mod-2-block" id="mod-2-block-1">
              <ScrollReveal>
                <h2
                  style={{
                    marginTop: 0,
                    paddingBottom: '20px',
                    borderBottom: '1px solid #221f20',
                    fontSize: '24px',
                  }}
                >
                  Guided by local dentists
                </h2>
                <p style={{ fontSize: '14px' }}>
                  Your teeth are an important asset - don&rsquo;t compromise on their care. With Linea, a licensed dentist or orthodontist in your local area oversees your treatment, meaning your future smile is guaranteed by an expert.
                </p>
              </ScrollReveal>
            </div>
          ) : (
            <div className="mod-2-block" id="mod-2-block-2">
              <ScrollReveal>
                <h2
                  style={{
                    marginTop: 0,
                    paddingBottom: '20px',
                    borderBottom: '1px solid #221f20',
                    fontSize: '24px',
                  }}
                >
                  Backed by advanced aligner technology
                </h2>
                <p style={{ fontSize: '14px' }}>
                  Aligner material can have a direct impact on treatment success. Our clear aligners are made from a premium grade, high-flex thermoplastic - providing consistent force, less breakage, less staining and better results.
                </p>
              </ScrollReveal>
            </div>
          )}

          <div className="module-2-icons-wrap">
            <button
              type="button"
              className="module-2-icon"
              id="mod-2-icon-1"
              onClick={() => setActiveMod2(1)}
              aria-label="Guided by local dentists"
              aria-pressed={activeMod2 === 1}
              style={{
                marginRight: '40px',
                border: activeMod2 === 1 ? '1px solid #252525' : '0px solid transparent',
                padding: 0,
              }}
            >
              <img
                alt="Dentist guarantee icon"
                src="/assets/icons/guarantee-icon.png"
                style={{ width: '100px' }}
              />
            </button>
            <button
              type="button"
              className="module-2-icon"
              id="mod-2-icon-2"
              onClick={() => setActiveMod2(2)}
              aria-label="Backed by advanced aligner technology"
              aria-pressed={activeMod2 === 2}
              style={{
                border: activeMod2 === 2 ? '1px solid #252525' : '0px solid transparent',
                padding: 0,
              }}
            >
              <img
                alt="Advanced aligner material icon"
                src="/assets/icons/erkodur-icon.png"
                style={{ width: '80px' }}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Module 3: Dark Process Section */}
      <section className="block std-x-pad dark-module std-y-pad" id="mod-3" ref={mod3Ref}>
        <h2>PROCESS</h2>
        <div className="block row" style={{ justifyContent: 'space-between' }}>
          {alignersData.processSteps.map((step) => (
            <div key={step.step} className="process-block">
              <ProcessVideoPlayer
                id={`process${step.step}`}
                stepNumber={step.step}
                src={step.localVideo}
                poster={step.poster}
                vimeoUrl={step.vimeoUrl}
                isActive={activeProcessStep === step.step}
                title={step.title}
              />
              <div className="process-details">
                <h3>{step.title}</h3>
                <div
                  style={{
                    paddingLeft: '15px',
                    borderLeft: '2px solid var(--primary-line-color)',
                    margin: '16px 0',
                  }}
                >
                  {step.description}
                </div>
                <div className="pricing-cta">
                  <button type="button" onClick={openBookNow}>
                    Book Now
                  </button>
                  <button type="button" style={{ padding: 0 }}>
                    <Link
                      to="/aligners/quiz/"
                      style={{ display: 'block', padding: '10px 20px' }}
                    >
                      Am I a Candidate?
                    </Link>
                  </button>
                </div>
                <div className="process-step">{step.step}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Module 4: Highlight Images Dark Row */}
      <section className="block row dark-module" style={{ overflow: 'visible' }}>
        <div className="highlight-images-left std-y-pad">
          <img
            alt="Model holding Linea clear aligner and carrying case"
            src="/assets/images/fullscreen-model.jpg"
            style={{ width: '100%' }}
            loading="lazy"
          />
        </div>
        <div className="highlight-images-right flex std-y-pad" style={{ flexDirection: 'column' }}>
          <div className="block" style={{ overflow: 'visible', paddingBottom: '40px' }}>
            <ScrollReveal>
              <img
                alt="3D scan of teeth"
                src="/assets/images/3d-scan.jpg"
                style={{ width: '100%' }}
                loading="lazy"
              />
              <p style={{ color: '#9b9a9d', fontSize: '14px' }}>
                Industry-leading <span style={{ color: '#f5f5f5' }}>3D scanning technology</span> captures a digital impression of your smile. These professional scans are far more accurate than those gathered from at-home impression kits, leading to better tracking &amp; more accurate results.
              </p>
            </ScrollReveal>
          </div>
          <div className="block" style={{ overflow: 'visible' }}>
            <ScrollReveal>
              <div
                style={{
                  width: '100%',
                  padding: '60px',
                  backgroundColor: 'rgb(238, 238, 238)',
                }}
              >
                <img
                  alt="Smile simulation"
                  src="/assets/images/treatment-plan.jpg"
                  style={{ width: '100%' }}
                  loading="lazy"
                />
              </div>
              <p style={{ color: '#9b9a9d', fontSize: '14px' }}>
                Our <span style={{ color: '#f5f5f5' }}>bespoke treatment plans</span> are engineered by our in-house orthodontics team. The design focuses on facial symmetry, your lip profile and unique facial proportions to craft a perfectly personalised smile.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="block dark-module std-y-pad" />

      {/* Pricing Carousel Section */}
      <div ref={pricingRef}>
        <SlideCarousel
          id="pricing"
          heading="PRICING"
          items={alignersData.pricingTiers}
          desktopVisible={3}
          tabletVisible={2}
          mobileVisible={1}
          renderSlide={(tier) => (
            <div key={tier.title} className="slide">
              <div className="slide-block pricing-details">
                <img src={tier.image} alt={tier.alt} loading="lazy" />
                <div className="block" style={{ padding: '0 10px 110px 10px' }}>
                  <h4>{tier.title}</h4>
                  <p>{tier.subtitle}</p>
                  <div style={{ display: 'flex' }}>
                    {tier.columns.map((col, ci) => (
                      <div key={ci} style={{ width: '50%' }}>
                        <ul>
                          {col.map((feat) => (
                            <li key={feat}>{feat}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pricing-cta">
                  <button type="button" onClick={openBookNow}>
                    Book Now
                  </button>
                  <button type="button" style={{ padding: 0 }}>
                    <Link
                      to="/aligners/quiz/"
                      style={{ display: 'block', padding: '10px 20px' }}
                    >
                      Am I a Candidate?
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      {/* Module 5: Comparison Table Dark */}
      <section className="block std-x-pad std-y-pad dark-module" id="mod-5" ref={mod5Ref}>
        <h2 style={{ color: '#fff', textAlign: 'center' }}>COMPARISON</h2>
        <div className="block std-y-pad">
          <table cellSpacing="0" cellPadding="10px" style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>Perks</th>
                <th>Linea</th>
                <th>Braces</th>
                <th>At-Home Aligners</th>
              </tr>
            </thead>
            <tbody>
              {alignersData.comparisonRows.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td className="center cell-highlight">
                    {row.linea ? <Check size={23} /> : <X size={23} />}
                  </td>
                  <td className="center">
                    {row.braces ? <Check size={23} /> : <X size={23} />}
                  </td>
                  <td className="center">
                    {row.atHome ? <Check size={23} /> : <X size={23} />}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="center" colSpan={4}>
                  <button
                    type="button"
                    style={{
                      display: 'inline-block',
                      padding: 0,
                      borderRadius: '20px',
                      margin: '10px auto',
                    }}
                  >
                    <Link
                      to="/aligners/quiz/"
                      style={{ display: 'block', padding: '10px 20px' }}
                    >
                      Get Started
                    </Link>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Common Cases Carousel */}
      <div ref={casesRef}>
        <SlideCarousel
          id="cases"
          heading="COMMON CASES"
          items={alignersData.dentalCases}
          desktopVisible={3}
          tabletVisible={2}
          mobileVisible={1}
          renderSlide={(item) => (
            <div key={item.title} className="slide">
              <div className="slide-block pricing-details">
                <img src={item.image} alt={item.alt} loading="lazy" />
                <div className="block" style={{ padding: '0 10px 110px 10px' }}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                <div className="pricing-cta">
                  <button type="button" onClick={openBookNow}>
                    Book Now
                  </button>
                  <button type="button" style={{ padding: 0 }}>
                    <Link
                      to="/aligners/quiz/"
                      style={{ display: 'block', padding: '10px 20px' }}
                    >
                      Am I a Candidate?
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      {/* Module 6: Showcase Video */}
      <section className="block mod-2-row std-y-pad" style={{ position: 'relative' }}>
        <div className="mod-6-video-wrap">
          <VimeoShowcasePlayer
            id="mod-6-video"
            src="https://player.vimeo.com/video/878905076?controls=0"
            title="Linea Clear Aligners Story Video"
          />
        </div>
      </section>

      {/* Reviews Carousel */}
      <div ref={reviewsRef}>
        <SlideCarousel
          id="reviews"
          heading="4000+ HAPPY CLIENTS"
          sectionClassName="block has-slides dark-module std-y-pad"
          items={alignersData.reviews}
          desktopVisible={3}
          tabletVisible={2}
          mobileVisible={1}
          renderSlide={(rev, idx) => (
            <div key={rev.name + idx} className="slide">
              <div className="slide-block review-block">
                <div className="flex vertical-center" style={{ gap: '10px' }}>
                  <div
                    className="slide-img"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: rev.avatarBg || '#f6f5e9',
                      backgroundImage: rev.avatarImage ? `url(${rev.avatarImage})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {!rev.avatarImage && rev.abbrev}
                  </div>
                  <a
                    href="https://au.trustpilot.com/review/lineaofficial.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flexGrow: 1 }}
                  >
                    {rev.name}
                    <br />
                    <div
                      className="flex vertical-center"
                      style={{ justifyContent: 'space-between', width: '100%' }}
                    >
                      <img
                        alt="Trustpilot review stars"
                        src="/assets/icons/tp-5-stars.svg"
                        style={{ height: '15px' }}
                      />
                      <img
                        alt="Trustpilot logo"
                        src="/assets/icons/trustpilot-logo.svg"
                        style={{ height: '20px' }}
                      />
                    </div>
                  </a>
                </div>
                <div className="slide-description" style={{ marginTop: '12px' }}>
                  {rev.title && <h4>{rev.title}</h4>}
                  <p>
                    {rev.hasSeeMore ? (
                      <>
                        {rev.excerpt}...{' '}
                        <button
                          type="button"
                          className="see-more"
                          onClick={() => openReviewModal(rev)}
                          style={{
                            background: 'transparent',
                            border: 0,
                            padding: 0,
                            display: 'inline',
                            font: 'inherit',
                            fontStyle: 'italic',
                            color: '#9b9a9d',
                          }}
                        >
                          See more
                        </button>
                      </>
                    ) : (
                      rev.fullBody
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      {/* Results Section: Profile + Intraoral Carousels */}
      <section className="block std-y-pad" id="results" ref={resultsRef}>
        <h2 className="std-x-pad">RESULTS</h2>

        <SlideCarousel
          id="profile"
          heading="Profile"
          headingTag="h3"
          sectionClassName="block has-slides"
          items={alignersData.profileGallery}
          desktopVisible={3}
          tabletVisible={2}
          mobileVisible={1}
          renderSlide={(item, i) => (
            <div key={item.image + i} className="slide">
              <div className="slide-block">
                <img
                  src={item.image}
                  alt={item.alt || 'Before and after Linea clear aligner treatment'}
                  loading="lazy"
                />
              </div>
            </div>
          )}
        />

        <SlideCarousel
          id="intraoral"
          heading="Intraoral"
          headingTag="h3"
          sectionClassName="block has-slides"
          items={alignersData.intraoralGallery}
          desktopVisible={3}
          tabletVisible={2}
          mobileVisible={1}
          renderSlide={(item, i) => (
            <div key={item.image + i} className="slide">
              <div className="slide-block">
                <button
                  type="button"
                  className="slide-25-img"
                  onClick={() => openLightbox(item.image, `${item.name} — ${item.caseInfo}`)}
                  aria-label={`Enlarge ${item.name} before and after photo`}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    border: 0,
                    padding: 0,
                    borderRadius: '5px',
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
            </div>
          )}
        />
      </section>

      {/* Socials Vertical Videos Dark Carousel */}
      <div ref={socialsRef}>
        <SlideCarousel
          id="socials"
          heading="CHECK OUT OUR SOCIALS"
          sectionClassName="block has-slides dark-module std-y-pad"
          items={alignersData.socials}
          desktopVisible={3}
          tabletVisible={2}
          mobileVisible={1}
          renderSlide={(vid, idx) => (
            <div key={vid.id + idx} className="slide">
              <SocialsVideoPlayer
                id={vid.id}
                src={vid.localVideo}
                poster={vid.poster}
                vimeoUrl={vid.vimeoUrl}
                ariaLabel={`Play Linea social video ${idx + 1}`}
              />
            </div>
          )}
        />
      </div>

      {/* FAQs Section */}
      <section className="block has-slides std-y-pad std-x-pad" id="faqs">
        <div className="half" style={{ float: 'none', margin: 'auto' }}>
          <h2 style={{ textAlign: 'center' }}>FAQS</h2>
          <FaqAccordion items={alignersData.faqs} idPrefix="aligners-faq" />
          <p style={{ marginTop: '20px', textAlign: 'center' }}>
            <Link to="/aligners/faq/" style={{ textDecoration: 'underline' }}>
              See all FAQs
            </Link>
          </p>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <CtaBlock
        title="Is Linea right for you?"
        description="Take 30 seconds to answer a few questions and find out."
        buttonLabel="Get Started"
        buttonTo="/aligners/quiz/"
        useH1={false}
        showChevron={false}
        noBorderButton={true}
      />

      {/* Sticky Bottom Action Bar */}
      <div
        className="bottom-bar"
        style={{ bottom: showBottomBar ? '0px' : '-50px' }}
      >
        <div className="bottom-bar-button">
          <Link to="/aligners/quiz/">Take the Quiz</Link>
        </div>
        <button
          type="button"
          className="bottom-bar-button"
          onClick={openBookNow}
          style={{ border: 0, borderRadius: 0 }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

