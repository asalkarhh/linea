import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import CtaBlock from '../components/Buttons/CtaBlock';
import SEO from '../components/SEO/SEO';

const WHY_BLOCKS = [
  {
    title: 'Direct Dentist Involvement',
    image: '/assets/images/dentist1.jpg',
    imagePos: 'center center',
    reverseDesktop: false,
    paragraphs: [
      'Why compromise on the road to your perfect smile? By involving trained professionals in your treatment, Alignaa clear teeth aligners are more likely to deliver the results you need, while ensuring your safety.',
      'Our extensive dental network means every case is thoroughly reviewed by a licensed dentist or orthodontist. A partner dentist near you will also properly assess the health of your teeth and gums and perform any procedures crucial to your treatment success, like IPR and attachments.',
    ],
  },
  {
    title: 'Premium Aligner Technology',
    image: '/assets/images/model-rock-flower.jpg',
    imagePos: 'bottom center',
    reverseDesktop: true,
    paragraphs: [
      'Our clear aligners are made using Zendura aligner material, engineered in Silicon Valley.',
      'This premium-grade thermoplastic features a patented dual-shell construction with an elastomeric core, making it more durable while remaining flexible enough to deliver consistent, gentle force — for more comfortable wear and more accurate results.',
    ],
  },
  {
    title: 'Local Care, 7 Day Support',
    image: '/assets/images/dentist2.jpg',
    imagePos: 'center center',
    reverseDesktop: false,
    paragraphs: [
      'Whether you need to consult a dentist or ask questions, our local team is available 7 days a week.',
      'As an Alignaa patient, you will also have access to our Patient Account Center, where you can view your treatment timeline, receive reminders and upload monthly tracking photos. This allows us to monitor your progress every step of the way, to ensure you achieve the smile of your dreams.',
    ],
  },
  {
    title: 'Retainers to Maintain Perfection',
    image: '/assets/images/aligner_and_case.jpg',
    imagePos: 'center center',
    reverseDesktop: true,
    paragraphs: [
      'Retainers are crucial to ensure your teeth remain straight after treatment, and don’t revert to their original position.',
      'All Alignaa treatment kits come with a complimentary set of retainers. Wear them at night to keep your smile just the way you like it.',
    ],
  },
];

export default function WhyAlignaa() {
  return (
    <div className="page-why">
      <SEO
        title="Why Choose Alignaa Clear Aligners | Doctor-Led vs. At-Home Kits"
        description="Why Alignaa? 100% dentist oversight, in-clinic 3D intraoral scans, IPR & attachments when needed, premium Zendura material, and zero hidden costs."
        keywords="why alignaa, at home aligners vs dentist, doctor directed aligners, best clear aligner brand, orthodontist supervision, zendura aligners"
        canonical="/aligners/why"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Clear Aligners', url: '/aligners' },
          { name: 'Why Alignaa', url: '/aligners/why' },
        ]}
      />
      <div
        className="block top-cover cover-why"
        style={{
          position: 'relative',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <div className="half cover-text">
            <h1 style={{ marginTop: 0, color: 'white' }}>A New Era in Smile Design</h1>
            <p style={{ fontSize: '18px', color: 'white' }}>
              Comprehensive dentist involvement, doctor-prescribed treatment plans, Premium Zendura aligner technology, remote tracking and 7-day access to local customer care. Alignaa is the future of teeth straightening.
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
                <span>Start Here</span>
                <ChevronRight size={20} />
              </Link>
            </button>
          </div>
        </div>
      </div>

      {WHY_BLOCKS.map((blk) => (
        <section key={blk.title} className="block" style={{ backgroundColor: '#fff' }}>
          <div
            className="half square-35vw"
            style={{
              float: blk.reverseDesktop ? 'right' : undefined,
              backgroundImage: `url(${blk.image})`,
              backgroundPosition: blk.imagePos,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
          <div className="half std-x-pad std-y-pad">
            <h1
              style={{
                fontFamily: 'var(--font-primary)',
                paddingBottom: '20px',
                borderBottom: '1px solid #221f20',
                fontSize: '24px',
              }}
            >
              {blk.title}
            </h1>
            {blk.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: '14px' }}>
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <CtaBlock
        title="Is Alignaa right for you?"
        description="Take the free 30 second assessment to find out."
        buttonLabel="Am I a candidate?"
        buttonTo="/aligners/quiz/"
      />
    </div>
  );
}

