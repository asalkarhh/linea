import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useModals } from '../context/ModalContext';

export default function PasswordReset() {
  const { openAlertModal } = useModals();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Set or Reset Password — Alignaa Official';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!cleanEmail || !emailRe.test(cleanEmail)) {
      openAlertModal('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="page-password-reset">
      <div
        className="block"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="block"
          id="password-reset-block"
          style={{
            width: '300px',
            maxWidth: '100%',
            marginTop: '120px',
            paddingBottom: '100px',
          }}
        >
          {submitted ? (
            <div>
              <h3>Check your inbox</h3>
              <p style={{ fontSize: '14px' }}>
                If an account exists for <strong>{email}</strong>, password setup or reset instructions would be sent there.
              </p>
              <p style={{ fontSize: '12px', color: '#9b9a9d', fontStyle: 'italic' }}>
                Frontend demo notice: live account recovery is unavailable in this static clone.
              </p>
              <p>
                <Link to="/login/" style={{ textDecoration: 'underline' }}>
                  Back to Login
                </Link>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Set or Reset Password</h3>
              <p>
                <label htmlFor="id_email">Email address:</label>
                <input
                  autoFocus
                  id="id_email"
                  maxLength={254}
                  name="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <button
                id="reset-password"
                style={{
                  width: '100%',
                  fontSize: '20px',
                  display: 'block',
                  margin: '20px auto 0 auto',
                  cursor: 'pointer',
                }}
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

