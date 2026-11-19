import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Info } from 'lucide-react';
import { pricingData } from '../data/pricingData';
import SlideCarousel from '../components/Carousel/SlideCarousel';
import FaqAccordion from '../components/Accordion/FaqAccordion';
import CtaBlock from '../components/Buttons/CtaBlock';
import SEO from '../components/SEO/SEO';
import '../styles/pricing.css';

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Alignaa Clear Aligner Treatment',
  image: 'https://www.alignaa.co/assets/images/aligner_and_case.jpg',
  description: 'Doctor-directed clear aligners starting from ₹22,999 in India. High-precision 3D digital scans, custom Zendura aligners, retainers & refinements.',
  brand: {
    '@type': 'Brand',
    name: 'Alignaa',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '22999',
    highPrice: '79999',
    offerCount: '3',
    offers: [
      {
        '@type': 'Offer',
        name: 'Tier 1 - Very Lite Cases',
        price: '22999',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: 'https://www.alignaa.co/aligners/pricing',
      },
      {
        '@type': 'Offer',
        name: 'Tier 2 - Standard Cases',
        price: '43999',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: 'https://www.alignaa.co/aligners/pricing',
      },
      {
        '@type': 'Offer',
        name: 'Tier 3 - Complex Cases',
        price: '79999',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: 'https://www.alignaa.co/aligners/pricing',
      },
    ],
  },
};

export default function Pricing() {
  const [openTooltipKey, setOpenTooltipKey] = useState(null);

  return (
    <div className="page-pricing">
      <SEO
        title="Clear Aligners Cost & Transparent Pricing in India | Alignaa (From ₹22,999)"
        description="Clear aligner prices in India starting at ₹22,999 with 0% interest EMI options. All packages include 3D dental scan, custom Zendura aligners, retainers, and refinements."
        keywords="clear aligners cost, invisible braces price India, aligners price, teeth aligners EMI, cheap clear aligners India, teeth straightening cost"
        canonical="/aligners/pricing"
        schema={pricingSchema}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Clear Aligners', url: '/aligners' },
          { name: 'Pricing', url: '/aligners/pricing' },
        ]}
      />
      <div
        className="block top-cover cover-pricing"
        style={{
          position: 'relative',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />

      <div
        className="block std-x-pad"
        style={{ backgroundColor: '#fff', paddingTop: '60px', paddingBottom: '20px' }}
      >
        <h1>Alignaa Aligner Pricing</h1>
      </div>

      {/* Pricing Comparison Tiers Grid */}
      <section
        className="block std-x-pad"
        style={{ backgroundColor: '#fff', paddingTop: '40px', paddingBottom: '40px' }}
      >
        <div className="flex mobile-hide" style={{ justifyContent: 'center' }}>
          <div className="flex-third" />
          <div
            className="flex-third cell"
            style={{
              fontSize: '14px',
              backgroundColor: 'rgba(109, 122, 103, 0.8)',
              color: 'white',
            }}
          >
            Majority of Cases
          </div>
          <div className="flex-third" />
        </div>

        <div className="flex" style={{ justifyContent: 'center' }}>
          {pricingData.tiers.map((tier) => (
            <div key={tier.name} className="flex-third cell" style={{ overflow: 'visible' }}>
              <h3>{tier.name}</h3>
              <h1 style={{ marginTop: '10px', marginBottom: 0 }}>{tier.price}</h1>
              <p>{tier.caseType}</p>

              {tier.features.map((feat, fi) => {
                if (!feat.text || feat.text === '-') return null;
                const key = `${tier.name}-${feat.text}-${fi}`;
                const tipOpen = openTooltipKey === key;

                return (
                  <div key={key} className="flex" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
                    <Check size={16} style={{ marginRight: '10px', flexShrink: 0 }} />
                    {feat.tooltip ? (
                      <div
                        style={{
                          margin: '16px 0',
                          width: 'calc(100% - 26px)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span>{feat.text}</span>
                        <div
                          className="hover-wrap"
                          onMouseEnter={() => setOpenTooltipKey(key)}
                          onMouseLeave={() => setOpenTooltipKey(null)}
                        >
                          <button
                            type="button"
                            aria-label={`More info about ${feat.text}`}
                            aria-expanded={tipOpen}
                            onClick={() =>
                              setOpenTooltipKey((prev) => (prev === key ? null : key))
                            }
                            style={{
                              background: 'transparent',
                              border: 0,
                              padding: '2px',
                              color: '#999999',
                              display: 'inline-flex',
                            }}
                          >
                            <Info size={16} />
                          </button>
                          <div
                            className="hover-block"
                            style={{
                              display: tipOpen ? 'block' : undefined,
                              zIndex: 50,
                              height: 'auto',
                              maxHeight: '220px',
                              overflowY: 'auto',
                            }}
                          >
                            <div className="block" style={{ padding: '0 10px' }}>
                              {feat.tooltip.map((p, pi) => (
                                <p key={pi} style={{ fontSize: '12px', lineHeight: '1.35em' }}>
                                  {p}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p style={{ width: 'calc(100% - 26px)' }}>{feat.text}</p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Treatment Timeline */}
      <section
        className="block std-x-pad"
        id="timeline"
        style={{ paddingTop: '80px', paddingBottom: 0 }}
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
      </section>

      <div className="block" style={{ clear: 'both' }}>
        <button type="button" style={{ margin: '60px auto 80px', fontSize: '20px', padding: 0 }}>
          <Link to="/aligners/quiz/" style={{ display: 'block', padding: '20px' }}>
            Get Started
          </Link>
        </button>
      </div>

      {/* Pricing FAQs */}
      <section className="block" style={{ padding: '80px 40px', backgroundColor: '#fff' }}>
        <h1 style={{ textAlign: 'center' }}>Commonly asked questions about pricing</h1>
        <div className="half" style={{ float: 'none', margin: '40px auto 0 auto' }}>
          <FaqAccordion
            items={pricingData.faqs}
            borderBottomLast={false}
            idPrefix="pricing-faq"
          />
        </div>
      </section>

      {/* Google Reviews Carousel (Commented out)
      <SlideCarousel
        id="google-reviews"
        variant="overlay"
        heading="Google Reviews"
        headingTag="h2"
        sectionClassName="block"
        sectionStyle={{ paddingTop: '40px', paddingBottom: '60px', backgroundColor: '#f5f5f5' }}
        items={pricingData.googleReviews}
        desktopVisible={3}
        tabletVisible={2}
        mobileVisible={1}
        renderSlide={(rev, idx) => (
          <div key={rev.name + idx} className="slide">
            <div className="slide-block" style={{ backgroundColor: '#fff' }}>
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
              <p style={{ marginBottom: '4px', fontWeight: 600 }}>{rev.name}</p>
              <p style={{ marginTop: 0, fontSize: '12px', color: '#9b9a9d' }}>{rev.timeAgo}</p>
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
      */}

      <CtaBlock
        title="Get Started Today"
        description="Take 30 seconds to answer a few questions and see if you're a good fit for Alignaa aligners."
        buttonLabel="Start Here"
        buttonTo="/aligners/quiz/"
      />
    </div>
  );
}

