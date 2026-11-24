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
                <a href="https://alignaa-portal.com/en/login">Login</a>
              </p>
              <p>
                <Link to="/partners/">For Dentists</Link>
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
                <Link to="/blog/">Blog</Link>
              </p>
              <p>
                <Link to="/aligners/pricing/">Pricing</Link>
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
                  href="https://www.instagram.com/alignaa.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </p>
               <p>
                <a
                  href="https://www.facebook.com/profile.php?id=61596620851115"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </p>

              <div style={{ marginTop: '28px' }}>
                <h4
                  style={{
                    marginTop: '10px',
                    paddingBottom: '14px',
                    borderBottom: '1px solid white',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                  }}
                >
                  Accepted Payments
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    rowGap: '16px',
                    columnGap: '12px',
                    alignItems: 'center',
                    marginTop: '18px',
                    width: '100%',
                  }}
                >
                  {/* Column 1: Row 1 - Google Pay (Centered relative to RuPay below) */}
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <div style={{ width: '56px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img
                        src="/assets/icons/gpay.png"
                        alt="Google Pay"
                        title="Google Pay"
                        style={{ height: '20px', width: 'auto', display: 'block' }}
                      />
                    </div>
                  </div>

                  {/* Column 2: Row 1 - PhonePe */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                      src="/assets/icons/phonepe.png"
                      alt="PhonePe"
                      title="PhonePe"
                      style={{ height: '22px', width: 'auto', display: 'block' }}
                    />
                  </div>

                  {/* Column 3: Row 1 - UPI */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <img
                      src="/assets/icons/upi.png"
                      alt="UPI"
                      title="UPI"
                      style={{ height: '16px', width: 'auto', display: 'block' }}
                    />
                  </div>

                  {/* Column 1: Row 2 - RuPay */}
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <img
                      src="/assets/icons/rupay.png"
                      alt="RuPay"
                      title="RuPay"
                      style={{ height: '16px', width: 'auto', display: 'block' }}
                    />
                  </div>

                  {/* Column 2: Row 2 - Mastercard */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                      src="/assets/icons/mastercard.png"
                      alt="Mastercard"
                      title="Mastercard"
                      style={{ height: '24px', width: 'auto', display: 'block' }}
                    />
                  </div>

                  {/* Column 3: Row 2 - Visa */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <img
                      src="/assets/icons/visa.png"
                      alt="Visa"
                      title="Visa"
                      style={{ height: '16px', width: 'auto', display: 'block' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar small-font std-x-pad">
        {/* Left: Terms | Privacy Policy */}
        <div className="footer-bottom-left">
          <Link to="/terms/">Terms</Link> | <Link to="/privacy/">Privacy Policy</Link>
        </div>

        {/* Center: Alignaa © 2026 */}
        <div className="footer-bottom-center">
          <p style={{ margin: 0, padding: 0 }}>
            <a href="https://www.alignaa.in/" target="_blank" rel="noopener noreferrer">
              Alignaa
            </a>{' '}
            &copy; 2026
          </p>
        </div>

        {/* Right: Developed by Asalkar Techworks Pvt. Ltd. */}
        <div className="footer-bottom-right footer-developer">
          <p style={{ margin: 0, padding: 0 }}>
            Developed by{' '}
            <a href="https://www.asalkar.in/" target="_blank" rel="noopener noreferrer">
              Asalkar Techworks Pvt. Ltd.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

