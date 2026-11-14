import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="row footer-pad">
        <div className="forty">
          <div className="row">
            <div className="column" style={{ flexBasis: '25%', paddingLeft: 0 }}>
              <img
                src="/assets/images/whitelogo.png"
                alt="Alignaa marque"
                style={{ width: '80%' }}
              />
            </div>
            <div className="column" style={{ flexBasis: '75%', padding: 0 }} />
          </div>
        </div>

        <div className="sixty" style={{ paddingBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ flexBasis: '33.3%', padding: '0 10px' }}>
              <h4
                style={{
                  marginTop: '10px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid white',
                }}
              >
                Support
              </h4>
              <p>
                <Link to="/aligners/faq/">FAQs</Link>
              </p>
              <p>
                <Link to="/contact/">Contact</Link>
              </p>
              <p>
                <Link to="/aligners/quiz/">Get Started</Link>
              </p>
              <p>
                <Link to="/login/">Login</Link>
              </p>
              <p>
                <Link to="/partners/">For Dentists</Link>
              </p>
              <p>
                <Link to="/contact/?ctx=cp">Complaints</Link>
              </p>
            </div>

            <div style={{ flexBasis: '33.3%', padding: '0 10px' }}>
              <h4
                style={{
                  marginTop: '10px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid white',
                }}
              >
                Explore
              </h4>
              <p>
                <Link to="/about/">Our story</Link>
              </p>
              <p>
                <Link to="/aligners/results/#results">Before &amp; Afters</Link>
              </p>
              <p>
                <Link to="/blog/">Blog</Link>
              </p>
              <p>
                <Link to="/aligners/pricing/">Pricing</Link>
              </p>
              <p>
                <Link to="/aligners/pricing/#timeline">Timeline</Link>
              </p>
              <p>
                <Link to="/aligners/results/">Results</Link>
              </p>
            </div>

            <div style={{ flexBasis: '33.3%', padding: '0 10px' }}>
              <h4
                style={{
                  marginTop: '10px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid white',
                }}
              >
                Follow
              </h4>
              <p>
                <a
                  href="https://www.instagram.com/lineaofficial__/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </p>
              <p>
                <a
                  href="https://www.facebook.com/officialinea"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </p>
              <p>
                <a
                  href="https://www.youtube.com/channel/UCWKPcdFx3tIIbLrMeZ5EFqA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </p>
              <p>
                <a
                  href="https://www.linkedin.com/company/lineaofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="block small-font std-x-pad"
        style={{
          borderTop: '1px solid #9b9a9d',
          letterSpacing: '1px',
          marginTop: '10px',
          paddingBottom: '40px',
        }}
      >
        <div className="block" style={{ width: '50%', float: 'left', padding: '10px 0' }}>
          <p style={{ margin: 0, padding: 0 }}>Alignaa &copy; 2026</p>
        </div>
        <div className="block" style={{ width: '50%', float: 'right', padding: '10px 0' }}>
          <div style={{ float: 'right', textAlign: 'right' }}>
            <Link to="/terms/">Terms</Link> | <Link to="/privacy/">Privacy Policy</Link>
          </div>
        </div>
        <div
          className="block"
          style={{
            clear: 'both',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <img
            src="/assets/icons/mastercard.png"
            alt="Mastercard"
            style={{ height: '40px', marginRight: '5px' }}
          />
          <img
            src="/assets/icons/visa.png"
            alt="Visa"
            style={{ height: '20px', marginRight: '5px' }}
          />
        </div>
      </div>
    </footer>
  );
}

