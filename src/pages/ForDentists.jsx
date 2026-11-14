import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { pagesData } from '../data/pagesData';
import { useModals } from '../context/ModalContext';
import FaqAccordion from '../components/Accordion/FaqAccordion';
import '../styles/partners.css';

export default function ForDentists() {
  const { openAlertModal } = useModals();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [practiceName, setPracticeName] = useState('');
  const [practiceUrl, setPracticeUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'For Dentists — Alignaa Official Partners';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      openAlertModal('Required Field', 'Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      openAlertModal('Required Field', 'Please enter your mobile number.');
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!cleanEmail || !emailRe.test(cleanEmail)) {
      openAlertModal('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!practiceName.trim()) {
      openAlertModal('Required Field', 'Please enter the name of your dental practice.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 350);
  };

  return (
    <div className="page-partners">
      {/* Top Hero Cover */}
      <div className="block top-cover" style={{ height: 'auto', backgroundColor: 'var(--primary-bg-color)' }}>
        <div className="flex vertical-center" style={{ maxWidth: '1200px', margin: 'auto' }}>
          <div className="half std-x-pad std-y-pad">
            <h1>
              New Aligner Patients.
              <br />
              None of the Overhead.
            </h1>
            <p>
              We bring new aligner patients to your practice, handle the treatment planning, and manage all of the admin. You deliver the care.
            </p>
            <div className="flex vertical-center" style={{ gap: '20px' }}>
              <a href="#partner-form-wrap">
                <button type="button" style={{ fontSize: '14px' }}>
                  Get Started
                </button>
              </a>
              <a href="#partnership">
                <button
                  type="button"
                  style={{
                    fontSize: '14px',
                    backgroundColor: 'white',
                    color: 'var(--primary-text-color)',
                    border: '1px solid var(--primary-text-color)',
                  }}
                >
                  See How the Partnership Works
                </button>
              </a>
            </div>
            <p>✓ No fees to your practice</p>
            <p>✓ Patients arrive booked, prepped, and deposit-paid</p>
          </div>
          <div className="half std-x-pad std-y-pad">
            <img
              src="/assets/images/fullscreen-model.jpg"
              alt="Alignaa aligner partner showcase"
              style={{ width: '100%', maxWidth: '500px', borderRadius: '10px' }}
            />
          </div>
        </div>
      </div>

      {/* Fit Checklist & Revenue Beyond Aligners */}
      <section className="block std-y-pad" style={{ backgroundColor: '#fff' }}>
        <div className="block std-x-pad" style={{ maxWidth: '1200px', margin: 'auto' }}>
          <h2 style={{ fontSize: '2em' }}>Is Alignaa Right for Your Practice?</h2>
          <p>
            Alignaa is built for practices that want more patients in the chair without more marketing on the desk. You&apos;re likely a good fit if:
          </p>
          <ul style={{ lineHeight: '1.5em' }}>
            <li>You have capacity to fill — whether it&apos;s a new practice, extra chair time, or an associate building their book.</li>
            <li>You&apos;d rather not run your own marketing — we handle acquisition, qualification, deposits, and day-to-day patient communication. No fees to your practice.</li>
            <li>You have 3D scanning capability — iTero, 3Shape, Medit, and other major brands are all supported.</li>
            <li>You want to do more aligner cases — or start — Alignaa is additive to your existing workflow, and our ortho-led clinical team supports you across a range of cases.</li>
            <li>Your practice offers adjacent dental services — Alignaa patients typically need cleanings, fillings, extractions, composite bonding, whitening, and retainers. That work is yours to bill directly.</li>
          </ul>

          <div className="std-y-pad">
            <h2 style={{ textAlign: 'center' }}>Revenue beyond aligners</h2>
            <div className="flex" style={{ alignItems: 'stretch', justifyContent: 'center', gap: '20px' }}>
              <div
                className="block"
                style={{
                  backgroundColor: 'var(--primary-bg-color)',
                  border: '1px solid var(--primary-line-color)',
                  padding: '0 20px',
                  borderRadius: '10px',
                  width: '80%',
                  maxWidth: '300px',
                }}
              >
                <h4>Pre-treatment</h4>
                <p>Fillings, extractions, wire removal, hygiene visits</p>
              </div>
              <div
                className="block"
                style={{
                  backgroundColor: 'var(--primary-bg-color)',
                  border: '1px solid var(--primary-line-color)',
                  padding: '0 20px',
                  borderRadius: '10px',
                  width: '80%',
                  maxWidth: '300px',
                }}
              >
                <h4>Post-treatment</h4>
                <p>Cleanings, whitening, crowns, bridges, composite build-ups, veneers, bonded retainers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the Partnership Works */}
      <section className="block std-y-pad" id="partnership">
        <div className="block std-x-pad" style={{ maxWidth: '1200px', margin: 'auto' }}>
          <h2 style={{ fontSize: '2em', textAlign: 'center', marginBottom: 0 }}>
            How the Partnership Works
          </h2>
          <p
            style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#9b9a9d',
              marginBottom: '30px',
            }}
          >
            Everything you need to grow your practice from the chair.
          </p>

          <div className="flex vertical-center" style={{ gap: '20px' }}>
            <div style={{ flexGrow: 1, flexBasis: '260px' }}>
              <div
                className="flex vertical-center"
                style={{
                  justifyContent: 'center',
                  width: '30px',
                  height: '30px',
                  border: '1px solid var(--primary-text-color)',
                  borderRadius: '50%',
                }}
              >
                1
              </div>
              <h4>We deliver the patient</h4>
              <p>
                We&apos;ve already spoken with them, qualified them, and they&apos;ve paid a deposit. If they no-show, the deposit is paid to you.
              </p>
            </div>

            <div style={{ flexGrow: 1, flexBasis: '260px' }}>
              <div
                className="flex vertical-center"
                style={{
                  justifyContent: 'center',
                  width: '30px',
                  height: '30px',
                  border: '1px solid var(--primary-text-color)',
                  borderRadius: '50%',
                }}
              >
                2
              </div>
              <h4>You consult, we plan</h4>
              <p>
                You do the exam and determine fit. We prepare the treatment plan — you review, adjust, and approve.
              </p>
            </div>

            <div style={{ flexGrow: 1, flexBasis: '260px' }}>
              <div
                className="flex vertical-center"
                style={{
                  justifyContent: 'center',
                  width: '30px',
                  height: '30px',
                  border: '1px solid var(--primary-text-color)',
                  borderRadius: '50%',
                }}
              >
                3
              </div>
              <h4>You treat, we handle the rest</h4>
              <p>
                You see the patient for 4–6 appointments. We handle billing, patient comms, remote monitoring, and follow-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Economics */}
      <section className="block std-y-pad" style={{ backgroundColor: '#fff' }}>
        <div
          className="block std-x-pad"
          style={{ maxWidth: '1200px', margin: 'auto', paddingBottom: '40px' }}
        >
          <h2 style={{ fontSize: '2em', textAlign: 'center' }}>What a typical case looks like</h2>
          <div className="flex" style={{ alignItems: 'stretch', justifyContent: 'center', gap: '20px' }}>
            <div
              className="block"
              style={{
                backgroundColor: 'var(--primary-bg-color)',
                border: '1px solid var(--primary-line-color)',
                padding: '0 20px',
                borderRadius: '10px',
                width: '80%',
                maxWidth: '300px',
                textAlign: 'center',
              }}
            >
              <h4 style={{ fontSize: '2em' }}>~$2,000</h4>
              <p>Estimated revenue per patient</p>
              <p style={{ fontSize: '13px' }}>
                Clinical fees + consultation, cleanings, and related care
              </p>
            </div>
            <div
              className="block"
              style={{
                backgroundColor: 'var(--primary-bg-color)',
                border: '1px solid var(--primary-line-color)',
                padding: '0 20px',
                borderRadius: '10px',
                width: '80%',
                maxWidth: '300px',
                textAlign: 'center',
              }}
            >
              <h4 style={{ fontSize: '2em' }}>$0</h4>
              <p>Cost to your practice</p>
              <p style={{ fontSize: '13px' }}>No marketing fees, no admin overhead</p>
            </div>
          </div>

          <div className="std-y-pad" />

          <h2 style={{ textAlign: 'center' }}>Beyond the case</h2>
          <p style={{ textAlign: 'center' }}>
            These patients are mostly young professionals (25–35), often without a regular dentist. They come for aligners — and many stay as long-term patients.
          </p>

          <div
            className="flex"
            style={{ alignItems: 'stretch', justifyContent: 'center', gap: '20px', marginTop: '30px' }}
          >
            <div
              className="block"
              style={{ padding: '0 20px', width: '80%', maxWidth: '300px', textAlign: 'center' }}
            >
              <h4 style={{ fontSize: '2em', margin: 0 }}>50%+</h4>
              <p style={{ marginBottom: '5px' }}>return for future appointments</p>
              <p style={{ fontSize: '14px', marginTop: '5px' }}>vs. 41% industry average</p>
            </div>
            <div
              className="block"
              style={{ padding: '0 20px', width: '80%', maxWidth: '300px', textAlign: 'center' }}
            >
              <h4 style={{ fontSize: '2em', margin: 0 }}>$7K–$10K+</h4>
              <p style={{ marginBottom: '5px' }}>estimated lifetime value</p>
              <p style={{ fontSize: '15px', marginTop: '5px' }}>per retained aligner patient</p>
            </div>
          </div>

          <a href="#partner-form-wrap">
            <button type="button" style={{ margin: '20px auto', fontSize: '16px' }}>
              Get Started
            </button>
          </a>
        </div>
      </section>

      {/* Clinical Standards Split */}
      <section className="block std-x-pad">
        <div className="flex vertical-center" style={{ maxWidth: '1200px', margin: 'auto' }}>
          <div className="half std-x-pad std-y-pad">
            <h2 style={{ fontSize: '2em' }}>We Care About the Same Things You Do</h2>
            <p>
              We&apos;re dentists too. We started Alignaa because we think patients deserve quality aligner treatment at a fair price.
            </p>
            <h4>Your patients, your clinical judgment</h4>
            <p>
              You review and approve every treatment plan and lead care from start to finish. No quotas, no pressure to accept cases you&apos;re not comfortable with.
            </p>
            <h4>Ortho-led treatment planning</h4>
            <p>
              Our orthodontist-led clinical team prepares every plan for your review. You can approve it, request changes, or decline — the final call is always yours.
            </p>
            <h4>Materials that reflect the standard</h4>
            <p>
              We use multilayer, high-flex aligner material for superior patient comfort and better tracking throughout treatment.
            </p>
            <a href="#partner-form-wrap">
              <button type="button" style={{ fontSize: '16px', marginBottom: '20px' }}>
                Apply Now
              </button>
            </a>
          </div>
          <div className="half std-x-pad std-y-pad">
            <img
              src="/assets/images/email_marketing_7.jpg"
              alt="Dentist examining clear aligner patient"
              style={{ width: '100%', maxWidth: '500px', borderRadius: '10px' }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Quote & Patient Trustpilot Proof */}
      <section className="block std-y-pad" style={{ backgroundColor: '#fff' }}>
        <div className="block std-x-pad" style={{ maxWidth: '1200px', margin: 'auto' }}>
          <h4
            style={{
              textAlign: 'center',
              fontSize: '22px',
              maxWidth: '900px',
              margin: '1.33em auto',
            }}
          >
            &ldquo;We’ve gone from 1 chair running 3 days a week, to 3 chairs running 6 days. The rate that they have been able to fill up my associates books is quite incredible.&rdquo;
          </h4>
          <p style={{ textAlign: 'center', marginBottom: '5px' }}>Dr. Amin Y, DDS</p>
          <p style={{ textAlign: 'center', color: '#9b9a9d', fontSize: '14px', marginTop: '5px' }}>
            Partner practice
          </p>

          <div className="std-y-pad" />

          <h2 style={{ textAlign: 'center' }}>4,000+ Patients Treated</h2>
          <div
            className="flex vertical-center"
            style={{
              margin: '16px 0',
              justifyContent: 'center',
              gap: '5px',
              color: '#00b67a',
              fontSize: '22px',
            }}
          >
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span style={{ opacity: 0.5 }}>★</span>
          </div>
          <div
            className="flex vertical-center"
            style={{ margin: '16px 0', justifyContent: 'center', gap: '10px' }}
          >
            <span style={{ fontSize: '22px' }}>4.9 / 5</span>
            <span style={{ fontSize: '14px', color: '#9b9a9d' }}>on Trustpilot</span>
          </div>

          <div className="flex vertical-center" style={{ gap: '20px' }}>
            {[
              {
                quote:
                  '"Couldn\'t be happier with my teeth and the whole process was seamless — the dentist makes you feel like you are in safe hands."',
                author: '— Alex G.',
              },
              {
                quote:
                  '"I completed my aligner treatment with Alignaa and I\'m honestly so impressed with the results. My teeth look amazing."',
                author: '— Marcelien',
              },
              {
                quote:
                  '"Terrific partnership with affiliated local dentists who provide informative and professional service with the aligners."',
                author: '— Julie',
              },
            ].map((item) => (
              <div
                key={item.author}
                style={{
                  flexGrow: 1,
                  flexBasis: '260px',
                  border: '1px solid var(--primary-line-color)',
                  padding: '0 20px',
                  borderRadius: '10px',
                }}
              >
                <div
                  className="flex vertical-center"
                  style={{ margin: '16px 0', gap: '5px', color: '#00b67a' }}
                >
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <p>{item.quote}</p>
                <p style={{ fontSize: '14px', color: '#9b9a9d' }}>{item.author}</p>
              </div>
            ))}
          </div>

          <a
            href="https://au.trustpilot.com/review/lineaofficial.com.au"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button" style={{ margin: '40px auto 20px auto', fontSize: '16px' }}>
              View All Reviews on Trustpilot
            </button>
          </a>
        </div>
      </section>

      {/* Partner FAQs */}
      <section className="block std-y-pad">
        <div className="block std-x-pad" style={{ maxWidth: '900px', margin: 'auto' }}>
          <h2 style={{ fontSize: '2em', textAlign: 'center' }}>Questions Practices Usually Ask First</h2>
          <FaqAccordion items={pagesData.partnersFaqs} idPrefix="partners-faq" />
        </div>
      </section>

      {/* Partner Inquiry Form */}
      <section
        className="block std-x-pad"
        id="partner-form-wrap"
        style={{ maxWidth: '900px', margin: 'auto', paddingBottom: '60px' }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '2em', marginBottom: 0 }}>
          Let&apos;s See If We&apos;re a Fit
        </h2>
        <p style={{ textAlign: 'center', color: '#9b9a9d', marginBottom: '30px' }}>
          Takes under a minute. We&apos;ll be in touch within 2 business days.
        </p>

        {submitted ? (
          <div
            className="block"
            style={{
              border: '1px solid var(--primary-line-color)',
              padding: '32px',
              borderRadius: '10px',
              backgroundColor: '#fff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <CheckCircle2 size={28} color="#221f20" />
              <h3 style={{ margin: 0 }}>Partner Inquiry Received</h3>
            </div>
            <p>
              Thanks, <strong>{fullName}</strong> from <strong>{practiceName}</strong>. Our clinical partnerships team will contact you at <strong>{email}</strong> or <strong>{phone}</strong> within 2 business days.
            </p>
            <p style={{ fontSize: '12px', color: '#9b9a9d', fontStyle: 'italic' }}>
              Frontend demo notice: submission handled client-side without external API persistence.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFullName('');
                setPhone('');
                setEmail('');
                setPracticeName('');
                setPracticeUrl('');
              }}
              style={{ fontSize: '14px' }}
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form
            className="block"
            onSubmit={handleSubmit}
            style={{
              border: '1px solid var(--primary-line-color)',
              padding: '20px 40px',
              borderRadius: '10px',
              backgroundColor: '#fff',
            }}
          >
            <label htmlFor="partner_full_name">What is your full name?</label>
            <input
              id="partner_full_name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <div className="flex" style={{ gap: '20px' }}>
              <div style={{ flexGrow: 1, flexBasis: '240px' }}>
                <label htmlFor="partner_phone">What is your mobile number?</label>
                <input
                  id="partner_phone"
                  maxLength={20}
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div style={{ flexGrow: 1, flexBasis: '240px' }}>
                <label htmlFor="partner_email">What is your email address?</label>
                <input
                  id="partner_email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="dental_practice">What is the name of your dental practice?</label>
            <input
              id="dental_practice"
              type="text"
              value={practiceName}
              onChange={(e) => setPracticeName(e.target.value)}
            />

            <label htmlFor="dental_practice_url">What is your dental practice website URL?</label>
            <input
              id="dental_practice_url"
              type="text"
              value={practiceUrl}
              onChange={(e) => setPracticeUrl(e.target.value)}
            />

            <button
              type="submit"
              id="submit-quiz"
              disabled={submitting}
              style={{
                padding: '10px 30px',
                fontSize: '16px',
                margin: '30px auto 0 auto',
                width: '100%',
              }}
            >
              {submitting ? 'Submitting...' : 'Get Started'}
            </button>
            <p style={{ color: '#9b9a9d', fontSize: '12px' }}>
              By clicking &ldquo;Get Started&rdquo; you agree to be contacted by Alignaa by phone or WhatsApp.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}

