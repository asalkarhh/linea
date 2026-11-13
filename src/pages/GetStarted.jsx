import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, Phone, Calendar } from 'lucide-react';
import { quizSteps } from '../data/quizData';
import { useModals } from '../context/ModalContext';
import '../styles/quiz.css';

export default function GetStarted() {
  const { openAlertModal, openAuZipModal, openBookNow } = useModals();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [historyStack, setHistoryStack] = useState([]);
  const [answers, setAnswers] = useState({}); // stepIdx -> selected option object
  const [hoverImgs, setHoverImgs] = useState({}); // stepIdx -> preview URL
  const [zipCode, setZipCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const zipInputRef = useRef(null);

  useEffect(() => {
    document.title = 'Am I a Candidate? Smile Quiz — Linea Official';
  }, []);

  const progressPct = result
    ? 100
    : Math.min(100, Math.round(((currentIdx + 1) / 10) * 100));

  const handleSelectOption = (stepIdx, opt) => {
    setAnswers((prev) => ({ ...prev, [stepIdx]: opt }));
    if (opt.image) {
      setHoverImgs((prev) => ({ ...prev, [stepIdx]: opt.image }));
    }
  };

  const handleNext = (step) => {
    const idx = step.idx;
    if (idx <= 6) {
      const picked = answers[idx];
      if (!picked) {
        openAlertModal('Select an Answer', 'Please select an answer before continuing.');
        return;
      }
      const nextStepIdx = picked.jt ? picked.jt - 1 : idx + 1;
      setHistoryStack((prev) => [...prev, idx]);
      setCurrentIdx(nextStepIdx);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (idx === 7) {
      const v = zipCode.trim();
      if (!v) {
        openAlertModal('Zip Code Required', 'Please enter an answer to proceed.');
        return;
      }
      if (/^[0-9]{4}$/.test(v)) {
        openAuZipModal(v, () => {
          setTimeout(() => zipInputRef.current?.focus(), 50);
        });
        return;
      }
      if (!/^[0-9]{5}$/.test(v)) {
        openAlertModal('Invalid Zip Code', 'Please enter a valid 5 digit US zip code.');
        return;
      }
      setHistoryStack((prev) => [...prev, idx]);
      setCurrentIdx(8);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  const handleBack = () => {
    if (historyStack.length === 0) return;
    const prevIdx = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, -1));
    setCurrentIdx(prevIdx);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim()) {
      openAlertModal('First Name Required', 'Please enter your first name.');
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!cleanEmail || !emailRe.test(cleanEmail)) {
      openAlertModal('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    const cleanPhone = phone.replace(/[\s()-]/g, '');
    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      openAlertModal('Invalid Phone', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const complaint = answers[0]?.label || 'Alignment';
      const severity = answers[1]?.label || answers[2]?.label || 'Moderate';
      const estimatedTier =
        severity === 'Mild'
          ? 'Tier 1 ($1,995)'
          : severity === 'Severe'
            ? 'Tier 3 ($3,995)'
            : 'Tier 2 ($2,995)';

      setResult({
        firstName: firstName.trim(),
        email: cleanEmail,
        zipCode: zipCode.trim(),
        complaint,
        severity,
        estimatedTier,
      });
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 400);
  };

  const activeStep = quizSteps[currentIdx];

  return (
    <div className="page-quiz">
      <div className="block" style={{ paddingTop: '90px' }}>
        <div className="block quiz-container std-x-pad" id="quiz-wrap">
          <div className="block quiz-progress-container">
            <div className="quiz-progress-wrap">
              <div
                className="quiz-progress-bar"
                style={{ width: `${progressPct}%` }}
                role="progressbar"
                aria-valuenow={progressPct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="quiz-step" />
                <div className="quiz-step" />
              </div>
            </div>
          </div>

          {result ? (
            <div
              className="block"
              style={{
                maxWidth: '720px',
                margin: '40px auto 80px auto',
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '32px',
                border: '1px solid var(--primary-line-color)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                }}
              >
                <CheckCircle2 size={32} color="#221f20" />
                <h1 style={{ margin: 0, fontSize: '28px' }}>
                  Great news, {result.firstName} — you look like a strong candidate!
                </h1>
              </div>

              <div className="offer-wrap" style={{ margin: '20px 0' }}>
                <h2 style={{ marginTop: 0 }}>Your $150 OFF Treatment Offer Is Unlocked</h2>
                <p style={{ marginBottom: '14px' }}>
                  Based on your responses ({result.complaint} · {result.severity}), your estimated treatment match is{' '}
                  <strong>{result.estimatedTier}</strong> near ZIP <strong>{result.zipCode}</strong>.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="quiz-cta-step-number">1</div>
                  <span>Schedule a free 15-minute phone consultation with a Linea Smile Specialist.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="quiz-cta-step-number">2</div>
                  <span>Visit a licensed partner dentist near {result.zipCode} for your 3D scan &amp; exam.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="quiz-cta-step-number">3</div>
                  <span>Preview your custom 3D smile simulation before making any aligners.</span>
                </div>
              </div>

              <div
                className="flex"
                style={{ gap: '14px', flexWrap: 'wrap', marginTop: '24px' }}
              >
                <button
                  type="button"
                  onClick={openBookNow}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 24px',
                    fontSize: '16px',
                  }}
                >
                  <Calendar size={18} />
                  <span>Book a Free Call</span>
                </button>
                <a
                  href="tel:+18885463206"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 24px',
                    borderRadius: '5px',
                    border: '1px solid var(--primary-text-color)',
                  }}
                >
                  <Phone size={18} />
                  <span>Call 1-888-546-3206</span>
                </a>
                <Link
                  to="/aligners/pricing/"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '14px 18px',
                    textDecoration: 'underline',
                  }}
                >
                  Compare Pricing Tiers
                </Link>
              </div>

              <p style={{ fontSize: '12px', color: '#9b9a9d', marginTop: '20px', marginBottom: 0 }}>
                Frontend simulation note: summary generated locally for {result.email}; no live submission sent.
              </p>
            </div>
          ) : (
            <div className="quiz-wrap">
              <div className="quiz-page">
                <div className="quiz-page-inner">
                  {activeStep.idx === 0 && (
                    <div className="block std-x-pad">
                      <div className="offer-wrap">
                        <h2 style={{ marginTop: 0 }}>
                          Special Offer: $150 OFF
                          <span className="offer-mobile-hide"> Your Linea Treatment</span>
                        </h2>
                        <p>
                          <span className="offer-mobile-hide">
                            Our Smile Quiz will help us (and you) understand the specifics of how we can help straighten your smile, including timelines, next steps and pricing.{' '}
                          </span>
                          <span className="b">
                            Complete the quiz today and you&apos;ll get $150 off your treatment!
                          </span>{' '}
                          <i style={{ fontSize: '14px', color: '#999' }}>*T&amp;CS apply.</i>
                        </p>
                      </div>
                    </div>
                  )}

                  {activeStep.idx <= 6 && (
                    <div className="question-block">
                      {activeStep.initImage && (
                        <div style={{ position: 'relative' }}>
                          <div
                            className="quiz-img"
                            style={{
                              backgroundImage: `url('${
                                hoverImgs[activeStep.idx] ||
                                answers[activeStep.idx]?.image ||
                                activeStep.initImage
                              }')`,
                            }}
                          />
                          {activeStep.hasDots && (
                            <div className="dots-wrap">
                              {activeStep.questions[0].answers.map((opt) => {
                                const isSel =
                                  answers[activeStep.idx]?.label === opt.label;
                                return (
                                  <button
                                    key={opt.label}
                                    type="button"
                                    aria-label={opt.label}
                                    className={`dot ${isSel ? 'selected' : ''}`}
                                    onClick={() =>
                                      handleSelectOption(activeStep.idx, opt)
                                    }
                                    onMouseEnter={() => {
                                      if (opt.image) {
                                        setHoverImgs((prev) => ({
                                          ...prev,
                                          [activeStep.idx]: opt.image,
                                        }));
                                      }
                                    }}
                                    onMouseLeave={() => {
                                      setHoverImgs((prev) => ({
                                        ...prev,
                                        [activeStep.idx]:
                                          answers[activeStep.idx]?.image ||
                                          activeStep.initImage,
                                      }));
                                    }}
                                    style={{ padding: 0, backgroundColor: isSel ? '#333333' : 'transparent', border: '1px solid #9b9a9d', margin: '0 0 10px 0' }}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="question-wrap">
                        <h4>{activeStep.questions[0].title}</h4>
                        <div className="answers-wrap">
                          {activeStep.questions[0].answers.map((opt) => {
                            const isSel =
                              answers[activeStep.idx]?.label === opt.label;
                            return (
                              <button
                                key={opt.label}
                                type="button"
                                className={`answer ${isSel ? 'selected' : ''}`}
                                onClick={() =>
                                  handleSelectOption(activeStep.idx, opt)
                                }
                                onMouseEnter={() => {
                                  if (opt.image) {
                                    setHoverImgs((prev) => ({
                                      ...prev,
                                      [activeStep.idx]: opt.image,
                                    }));
                                  }
                                }}
                                onMouseLeave={() => {
                                  setHoverImgs((prev) => ({
                                    ...prev,
                                    [activeStep.idx]:
                                      answers[activeStep.idx]?.image ||
                                      activeStep.initImage,
                                  }));
                                }}
                                style={{
                                  display: 'block',
                                  justifyContent: 'center',
                                  backgroundColor: isSel ? '#333333' : '#f5f5f5',
                                  color: isSel ? '#fff' : '#221f20',
                                  margin: '0 auto 20px auto',
                                }}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="quiz-next"
                        onClick={() => handleNext(activeStep)}
                      >
                        <span>Next</span>
                        <ChevronRight size={20} />
                      </button>

                      {historyStack.length > 0 && (
                        <button
                          type="button"
                          onClick={handleBack}
                          style={{
                            background: 'transparent',
                            color: '#9b9a9d',
                            border: 0,
                            margin: '8px auto 0 auto',
                            padding: '6px 12px',
                            fontSize: '14px',
                          }}
                        >
                          Go back
                        </button>
                      )}
                    </div>
                  )}

                  {activeStep.idx === 7 && (
                    <div className="question-block">
                      <div className="question-wrap">
                        <h4>What&apos;s your zip code?</h4>
                        <p>
                          We&apos;ll make sure there is a Linea partner dental practice in your area
                        </p>
                        <div className="answers-wrap">
                          <input
                            ref={zipInputRef}
                            type="text"
                            maxLength={10}
                            name="pc"
                            aria-label="Zip code"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleNext(activeStep);
                            }}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="quiz-next"
                        onClick={() => handleNext(activeStep)}
                      >
                        <span>Next</span>
                        <ChevronRight size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={handleBack}
                        style={{
                          background: 'transparent',
                          color: '#9b9a9d',
                          border: 0,
                          margin: '8px auto 0 auto',
                          padding: '6px 12px',
                          fontSize: '14px',
                        }}
                      >
                        Go back
                      </button>
                    </div>
                  )}

                  {activeStep.idx === 8 && (
                    <form className="question-block" onSubmit={handleSubmit}>
                      <h4>We just need a few details so that we can send you your results.</h4>
                      <div className="question-wrap">
                        <h4>First Name</h4>
                        <div className="answers-wrap">
                          <input
                            name="fn"
                            type="text"
                            aria-label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="question-wrap">
                        <h4>Email</h4>
                        <div className="answers-wrap">
                          <input
                            name="email"
                            type="email"
                            aria-label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="question-wrap">
                        <h4>Phone</h4>
                        <div className="answers-wrap">
                          <div
                            className="input"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              fontSize: '16px',
                            }}
                          >
                            <input
                              type="tel"
                              maxLength={20}
                              placeholder="555 123 4567"
                              aria-label="Phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{ padding: 0, margin: 0, border: 0 }}
                            />
                          </div>
                        </div>
                      </div>

                      <p
                        style={{
                          color: '#9b9a9d',
                          fontSize: '14px',
                          lineHeight: '1.25em',
                        }}
                      >
                        By submitting, you agree to receive an automated text message from Linea with your smile quiz results and information about scheduling a call to discuss your results. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help.{' '}
                        <Link
                          to="/terms/"
                          target="_blank"
                          style={{ textDecoration: 'underline', color: '#9b9a9d' }}
                        >
                          Terms
                        </Link>{' '}
                        ·{' '}
                        <Link
                          to="/privacy/"
                          target="_blank"
                          style={{ textDecoration: 'underline', color: '#9b9a9d' }}
                        >
                          Privacy
                        </Link>
                      </p>
                      <p
                        style={{
                          color: '#9b9a9d',
                          fontSize: '14px',
                          lineHeight: '1.25em',
                        }}
                      >
                        Our team may also email you about your results, Linea treatment, and scheduling a consultation.
                      </p>

                      <button
                        type="submit"
                        className="quiz-next"
                        id="quiz-submit"
                        disabled={submitting}
                      >
                        <span>{submitting ? 'Calculating...' : 'Next'}</span>
                        <ChevronRight size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={handleBack}
                        style={{
                          background: 'transparent',
                          color: '#9b9a9d',
                          border: 0,
                          margin: '8px auto 0 auto',
                          padding: '6px 12px',
                          fontSize: '14px',
                        }}
                      >
                        Go back
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

