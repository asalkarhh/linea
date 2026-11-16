import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useModals } from '../context/ModalContext';
import CtaBlock from '../components/Buttons/CtaBlock';
import SEO from '../components/SEO/SEO';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { openAlertModal } = useModals();

  const initialReason = searchParams.get('ctx') === 'cp' ? 'cp' : '';
  const [reason, setReason] = useState(initialReason);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (searchParams.get('ctx') === 'cp') {
      setReason('cp');
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      openAlertModal('Name Required', 'Please enter your name.');
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!cleanEmail || !emailRe.test(cleanEmail)) {
      openAlertModal('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!message.trim()) {
      openAlertModal('Message Required', 'Please leave us a message.');
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 350);
  };

  return (
    <div className="page-contact">
      <SEO
        title="Contact Alignaa | Clear Aligner Enquiry & Clinic Booking"
        description="Have questions about clear aligners or need help finding a partner dental clinic in India? Contact Alignaa's patient care team today."
        keywords="contact alignaa, clear aligners enquiry, book dental scan appointment, teeth aligners customer support"
        canonical="/contact"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
      />
      <div
        className="block"
        id="messagecontainer"
        style={{
          maxWidth: '600px',
          margin: 'auto',
          padding: '40px',
          paddingTop: '120px',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-primary)' }}>We&apos;d love to hear from you!</h2>

        {sent ? (
          <div
            style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid var(--primary-line-color)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <CheckCircle2 size={24} color="#221f20" />
              <h3 style={{ margin: 0 }}>Message Sent</h3>
            </div>
            <p>
              Thank you, <strong>{name}</strong>. Our customer care team has logged your{' '}
              {reason === 'cp' ? 'complaint' : reason === 'existing' ? 'patient inquiry' : 'inquiry'} and will reply to{' '}
              <strong>{email}</strong> within 48 hours.
            </p>
            <p style={{ fontSize: '12px', color: '#9b9a9d', fontStyle: 'italic' }}>
              Frontend demo notice: no backend network request was transmitted.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setName('');
                setEmail('');
                setMessage('');
              }}
              style={{ fontSize: '14px' }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="contact_reason">Reason</label>
              <select
                id="contact_reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">--------</option>
                <option value="new">New Inquiry</option>
                <option value="existing">Existing Patient</option>
                <option value="cp">Complaint</option>
              </select>
            </div>

            <div className="flex" style={{ gap: '20px' }}>
              <div style={{ width: '50%' }}>
                <label htmlFor="contact_name">Name</label>
                <input
                  id="contact_name"
                  maxLength={100}
                  placeholder="First & Last Name"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{ width: '50%' }}>
                <label htmlFor="contact_email">Email</label>
                <input
                  id="contact_email"
                  maxLength={254}
                  placeholder="email@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact_message">Message</label>
              <textarea
                className="contact"
                id="contact_message"
                placeholder="Leave us a message..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              id="sendbutton"
              disabled={sending}
              style={{ fontSize: '20px', margin: '20px auto 0 auto' }}
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
            <p style={{ fontStyle: 'italic' }}>
              A member of our customer care team will be in touch with you within 48 hours
            </p>
          </form>
        )}
      </div>

      <CtaBlock
        title="Get Started Today"
        description="Take the free 30 second assessment to see if you’re a candidate for Alignaa."
        buttonLabel="Start Here"
        buttonTo="/aligners/quiz/"
      />
    </div>
  );
}

