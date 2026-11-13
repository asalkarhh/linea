import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useModals } from '../context/ModalContext';

export default function Login() {
  const { openAlertModal } = useModals();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    document.title = 'Log In — Linea Official';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = username.trim().toLowerCase();
    if (!cleanEmail) {
      openAlertModal('Email Required', 'Please enter your email address.');
      return;
    }
    if (!password) {
      openAlertModal('Password Required', 'Please enter your password.');
      return;
    }
    setStatusMessage(
      'This static frontend clone does not connect to Linea’s live patient portal or authentication servers. Existing patients can reset access via the official portal.'
    );
  };

  return (
    <div className="page-login">
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
          style={{
            width: '300px',
            maxWidth: '100%',
            marginTop: '120px',
            paddingBottom: '100px',
          }}
        >
          <form onSubmit={handleSubmit}>
            <h3 style={{ marginBottom: '40px' }}>Log in to your Linea Account</h3>
            <p>
              <label htmlFor="id_username">Email:</label>
              <input
                type="email"
                name="username"
                autoFocus
                autoCapitalize="none"
                autoComplete="email"
                maxLength={254}
                required
                id="id_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="id_password">Password:</label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                id="id_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>

            {statusMessage && (
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: '1.4em',
                  backgroundColor: '#e8e4d9',
                  padding: '10px 12px',
                  borderRadius: '5px',
                  border: '1px solid var(--primary-line-color)',
                }}
              >
                {statusMessage}
              </p>
            )}

            <button
              style={{
                width: '100%',
                fontSize: '20px',
                display: 'block',
                margin: '20px auto 0 auto',
                cursor: 'pointer',
              }}
              type="submit"
            >
              Log In
            </button>
            <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>
              <Link to="/password_reset/">Set/reset password</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

