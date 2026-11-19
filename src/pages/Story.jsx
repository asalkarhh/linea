import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import CtaBlock from '../components/Buttons/CtaBlock';
import SEO from '../components/SEO/SEO';
import '../styles/about.css';

export default function Story() {
  return (
    <div className="page-about">
      <SEO
        title="Our Story — Transforming Orthodontic Care | Alignaa"
        description="Learn about Alignaa's mission: making premium, doctor-directed clear aligner treatment accessible and affordable across India with cutting-edge digital dentistry."
        canonical="/about"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Our Story', url: '/about' },
        ]}
      />
      <div
        className="block top-cover cover-about"
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
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
        >
          <div className="half cover-text">
            <p style={{ marginTop: 0, fontSize: '18px', color: 'white' }}>Our Story</p>
            <h1 style={{ color: 'white' }}>
              An uncompromising vision for a new era in clear aligner therapy.
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
                <span>Get Started</span>
                <ChevronRight size={20} />
              </Link>
            </button>
          </div>
        </div>
      </div>

      <section
        className="block about-block"
        style={{
          backgroundColor: '#fff',
          overflow: 'hidden',
          clear: 'both',
        }}
      >
        <div
          className="half square-35vw"
          style={{
            backgroundImage: 'url(/assets/images/about-module-2.jpg)',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            zIndex: 1,
          }}
        />
        <div className="half std-x-pad std-y-pad about-text">
          <h1
            style={{
              fontFamily: 'var(--font-primary)',
              marginTop: 0,
              paddingBottom: '20px',
              borderBottom: '1px solid #221f20',
              fontSize: '24px',
            }}
          >
            About
          </h1>
          <p style={{ fontSize: '14px' }}>
            Alignaa is a premium clear aligner label founded in India by Ortho experts, with an ambition to combine the efficiency and cost-effectiveness of direct-to-consumer aligners whilst still maintaining the same level of safety, dentist involvement and oversight as dentist-directed aligners.
          </p>
          <p style={{ fontSize: '14px', marginBottom: 0 }}>
            When we decided to explore an invisible aligner brand, we wanted to do it in a very different way. We wanted to do more than just straighten people&rsquo;s teeth, we wanted to transform lives. We wanted to inspire self-confidence and empower people to truly express themselves. For us, each smile is unique, each smile tells a story and we wanted to play a part in shaping that. To do this we had to create a brand that was universally accessible, yet didn&rsquo;t sacrifice integrity.
          </p>
        </div>
      </section>

      <section
        className="block about-block reverse"
        style={{
          backgroundColor: '#fff',
          overflow: 'hidden',
          clear: 'both',
        }}
      >
        <div
          className="half square-35vw"
          style={{
            backgroundImage: 'url(/assets/images/twisting-aligners.jpg)',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            zIndex: 1,
          }}
        />
        <div className="half std-x-pad std-y-pad about-text">
          <p style={{ fontSize: '14px', marginTop: 0 }}>
            Alignaa&rsquo;s renewed approach to teeth straightening is reinventing the world of aligners, where patients are partnered with approved dentists to ensure that they have access to a thorough examination of teeth and gums, as well as important procedures like IPR and attachments that are crucial to treatment success.
          </p>
          <p style={{ fontSize: '14px', marginBottom: 0 }}>
            Alignaa aligners are conceived using the highest quality BPA-free materials, and contemporary designs that are effortlessly moulded to the shape of your own unique smile. We truly believe that through creativity, integrity and self-expression we can create a timeless brand that has an inspiring impact on people and their lives.
          </p>
        </div>
      </section>

      <section
        className="block about-block"
        style={{
          backgroundColor: '#fff',
          overflow: 'hidden',
          clear: 'both',
        }}
      >
        <div
          className="half square-35vw"
          style={{
            backgroundImage: 'url(/assets/images/model-aligner-3x2.jpg)',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            zIndex: 1,
          }}
        />
        <div className="half std-x-pad std-y-pad about-text">
          <h1
            style={{
              fontFamily: 'var(--font-primary)',
              marginTop: 0,
              paddingBottom: '20px',
              borderBottom: '1px solid #221f20',
              fontSize: '24px',
            }}
          >
            Values
          </h1>
          <p style={{ fontSize: '14px' }}>
            <b>Creativity</b> - We are creators. We chase originality. We try new things and we challenge convention.
          </p>
          <p style={{ fontSize: '14px' }}>
            <b>Authenticity</b> - We are genuine to our brand mission, and values. We can&rsquo;t do everything and we don&rsquo;t try to. We don&rsquo;t over promise and we don&rsquo;t under deliver. We are always honest and transparent in everything we do.
          </p>
          <p style={{ fontSize: '14px', marginBottom: 0 }}>
            <b>Community</b> - Everyone is an individual &ldquo;me&rdquo;, but we are part of a great &ldquo;we&rdquo;. We are all in this together and we always look out for one another. We have empathy, we know we&rsquo;re all human, and know we can&rsquo;t do any of this alone.
          </p>
        </div>
      </section>

      <section
        className="block about-block reverse"
        style={{
          backgroundColor: '#fff',
          overflow: 'hidden',
          clear: 'both',
        }}
      >
        <div
          className="half square-35vw"
          style={{
            backgroundImage: 'url(/assets/images/aligner-leaf.jpg)',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            zIndex: 1,
          }}
        />
        <div className="half std-x-pad std-y-pad about-text">
          <h1
            className="mobile-hide"
            style={{
              fontFamily: 'var(--font-primary)',
              marginTop: 0,
              paddingBottom: '20px',
              fontSize: '24px',
            }}
          >
            &nbsp;
          </h1>
          <p style={{ fontSize: '14px' }}>
            <b>Aspiration</b> - We do what we love and are connected to something greater than ourselves. We never settle, we always strive to do more, be more. We self-evaluate and are constantly changing, improving, evolving.
          </p>
          <p style={{ fontSize: '14px' }}>
            <b>Thankfulness</b> - We are grateful for each other, our community, and to be part of this journey. We never take success for granted.
          </p>
          <p style={{ fontSize: '14px', marginBottom: 0 }}>
            <b>Tenacity</b> - We never give up. We get things done and we do them well. We always persevere and we always push the boundaries of expectation.
          </p>
        </div>
      </section>

      <CtaBlock
        title="Get Started Today"
        description="Take the free 30 second assessment to see if you’re a candidate for Alignaa."
        buttonLabel="Start Here"
        buttonTo="/aligners/quiz/"
      />
    </div>
  );
}

