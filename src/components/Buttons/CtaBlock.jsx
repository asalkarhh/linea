import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function CtaBlock({
  title = 'Get Started Today',
  description = "Take the free 30 second assessment to see if you're a candidate for Alignaa.",
  buttonLabel = 'Start Here',
  buttonTo = '/aligners/quiz/',
  showChevron = true,
  useH1 = true,
  noBorderButton = false,
}) {
  const Heading = useH1 ? 'h1' : 'h2';

  return (
    <section className="block cta-block">
      <div className="half">
        <Heading
          style={
            useH1
              ? { marginTop: 0 }
              : { fontSize: '2em', marginTop: 0 }
          }
        >
          {title}
        </Heading>
        <p style={{ fontSize: '18px' }}>{description}</p>
        <button
          id="model-button"
          type="button"
          style={noBorderButton ? { padding: 0 } : undefined}
        >
          <Link
            to={buttonTo}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: showChevron ? '20px' : '10px 20px',
            }}
          >
            <span>{buttonLabel}</span>
            {showChevron && <ChevronRight size={20} strokeWidth={2} />}
          </Link>
        </button>
      </div>
    </section>
  );
}

