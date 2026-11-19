import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, Phone, Calendar, Check, MessageSquare, Instagram } from 'lucide-react';
import { quizSteps } from '../data/quizData';
import { useModals } from '../context/ModalContext';
import { sendBookingEmail } from '../utils/emailService';
import SEO from '../components/SEO/SEO';
import '../styles/quiz.css';

function QuizVideoCard({ title, subtitle, videoSrc, posterSrc, isPlaying: controlledPlaying, onTogglePlay }) {
  const videoRef = useRef(null);
  const [localPlaying, setLocalPlaying] = useState(false);

  const isControlled = typeof controlledPlaying === 'boolean';
  const isPlaying = isControlled ? controlledPlaying : localPlaying;
  const isStep2 = Boolean(videoSrc && videoSrc.includes('step-2'));

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isControlled) {
      if (controlledPlaying) {
        if (vid.paused) {
          vid.muted = false;
          vid.play().catch(() => {});
        }
      } else {
        if (!vid.paused) {
          vid.pause();
        }
      }
    }
  }, [controlledPlaying, isControlled]);

  // Pause when scrolled outside viewport
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !vid.paused) {
            vid.pause();
            if (isControlled && onTogglePlay) {
              onTogglePlay(false);
            } else {
              setLocalPlaying(false);
            }
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(vid);
    return () => observer.disconnect();
  }, [isControlled, onTogglePlay]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.muted = false;
      vid.play().then(() => {
        if (isControlled && onTogglePlay) {
          onTogglePlay(true);
        } else {
          setLocalPlaying(true);
        }
      }).catch(() => {});
    } else {
      vid.pause();
      if (isControlled && onTogglePlay) {
        onTogglePlay(false);
      } else {
        setLocalPlaying(false);
      }
    }
  };

  const handlePause = () => {
    if (isControlled && onTogglePlay) {
      if (controlledPlaying) onTogglePlay(false);
    } else {
      setLocalPlaying(false);
    }
  };

  const handlePlay = () => {
    if (isControlled && onTogglePlay) {
      if (!controlledPlaying) onTogglePlay(true);
    } else {
      setLocalPlaying(true);
    }
  };

  return (
    <div
      style={{
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid #e5e5e6',
        backgroundColor: '#fff',
      }}
    >
      <div
        style={{
          backgroundColor: '#f0ede6',
          padding: '16px 14px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontWeight: '600', fontSize: '15px', color: '#221f20' }}>{title}</div>
        <div style={{ fontSize: '12px', color: '#777', marginTop: '2px' }}>{subtitle}</div>
      </div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          backgroundColor: '#f8f8f8',
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          loop
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          onClick={togglePlay}
          onPause={handlePause}
          onPlay={handlePlay}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            cursor: 'pointer',
            transform: isStep2 ? 'scale(1.46)' : 'none',
            transformOrigin: '50% 20%',
          }}
        />
        {!isPlaying && posterSrc && (
          <img
            src={posterSrc}
            alt={title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transform: isStep2 ? 'scale(1.46)' : 'none',
              transformOrigin: '50% 20%',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        )}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={`Play ${title}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.65)',
              border: '2px solid rgba(255,255,255,0.9)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2,
              padding: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
              style={{ marginLeft: '3px' }}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default function GetStarted() {
  const { openAlertModal, openAuZipModal, openBookNow } = useModals();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [historyStack, setHistoryStack] = useState([]);
  const [playingQuizVid, setPlayingQuizVid] = useState(null);
  const [answers, setAnswers] = useState({}); // stepIdx -> selected option object
  const [hoverImgs, setHoverImgs] = useState({}); // stepIdx -> preview URL
  const [zipCode, setZipCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const zipInputRef = useRef(null);

  useEffect(() => {
    document.title = 'Am I a Candidate? Smile Quiz — Alignaa Official';
  }, []);

  const progressPct = result
    ? 100
    : Math.min(100, Math.round(((currentIdx + 1) / 9) * 100));

  const handleSelectOption = (stepIdx, opt) => {
    setAnswers((prev) => ({ ...prev, [stepIdx]: opt }));
    if (opt.image) {
      setHoverImgs((prev) => ({ ...prev, [stepIdx]: opt.image }));
    }
  };

  const handleNext = (idx) => {
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
        openAlertModal('Pin Code Required', 'Please enter your Pin code to proceed.');
        return;
      }
      if (!/^[1-9][0-9]{5}$/.test(v)) {
        openAlertModal('Invalid Pin Code', 'Please enter a valid 6-digit Pin code.');
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

  const handleSubmit = async (e) => {
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
    const complaint = answers[0]?.label || 'Alignment';
    const severity = answers[1]?.label || answers[2]?.label || 'Moderate';
    const estimatedTier =
      severity === 'Mild'
        ? 'Tier 1 (Rs,22,999)'
        : severity === 'Severe'
          ? 'Tier 3 (Starting from Rs,79,999)'
          : 'Tier 2 (Starting from Rs,43,999)';

    // Gather all answered quiz questions and user selections
    const answeredStepIndices = Array.from(
      new Set([
        ...historyStack,
        ...Object.keys(answers).map(Number).sort((a, b) => a - b),
      ])
    );

    const quizQAList = answeredStepIndices
      .map((stepIdx) => {
        const step = quizSteps.find((s) => s.idx === stepIdx);
        const question = step?.questions?.[0];
        const answer = answers[stepIdx];
        if (question && question.type === 'mc' && answer?.label) {
          return `• ${question.title}\n  ➜ Selected: ${answer.label}`;
        }
        return null;
      })
      .filter(Boolean);

    const scanDetails = [
      `📋 QUIZ QUESTIONS & ANSWERS:`,
      quizQAList.length > 0 ? quizQAList.join('\n\n') : '• No multiple-choice questions recorded',
      ``,
      `-----------------------------------`,
      `📊 TREATMENT & CANDIDACY ESTIMATE:`,
      `• Primary Concern: ${complaint}`,
      `• Severity Level: ${severity}`,
      `• Estimated Package: ${estimatedTier}`,
      `• Coupon Code: ${couponCode.trim() ? couponCode.trim().toUpperCase() : 'None'}`,
    ].join('\n');

    try {
      await sendBookingEmail({
        form_type: 'Book Free 3D Scan',
        user_name: firstName.trim(),
        user_email: cleanEmail,
        user_phone: cleanPhone,
        pin_code: zipCode.trim(),
        coupon_code: couponCode.trim() ? couponCode.trim().toUpperCase() : 'None',
        booking_details: scanDetails,
      });
    } catch (err) {
      console.error('EmailJS 3D scan booking error:', err);
      // Fail gracefully so user still sees calculated result
    } finally {
      setSubmitting(false);
      setResult({
        firstName: firstName.trim(),
        email: cleanEmail,
        zipCode: zipCode.trim(),
        complaint,
        severity,
        estimatedTier,
      });
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="page-quiz">
      <SEO
        title="Free Smile Assessment Quiz — Am I a Candidate? | Alignaa"
        description="Take our 30-second free online smile quiz to find out if you're a candidate for Alignaa clear aligners in India. Book a 3D dental scan with a licensed dentist."
        keywords="smile assessment quiz, am i candidate for aligners, free 3D dental scan, book aligner appointment, clear aligners eligibility"
        canonical="/get-started"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Smile Assessment', url: '/get-started' },
        ]}
      />
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
            <div className="block" style={{ width: '100%', padding: '0 10px' }}>
              {/* Top assessment complete header */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    border: '1.5px solid #221f20',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                  }}
                >
                  <Check size={24} color="#221f20" strokeWidth={1.8} />
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#9b9a9d',
                    fontWeight: '500',
                    marginBottom: '10px',
                  }}
                >
                  Your assessment is complete
                </div>
                <h1
                  style={{
                    fontSize: '28px',
                    fontWeight: '300',
                    margin: '0 auto',
                    maxWidth: '640px',
                    lineHeight: '1.3',
                  }}
                >
                  You sound like an excellent candidate for Alignaa
                </h1>
              </div>

              {/* Dynamic explanation card */}
              <div
                style={{
                  border: '1px solid #dcdcdc',
                  borderRadius: '10px',
                  padding: '24px 28px',
                  maxWidth: '640px',
                  margin: '24px auto 44px auto',
                  backgroundColor: '#fff',
                  textAlign: 'center',
                  fontSize: '14.5px',
                  lineHeight: '1.6',
                  color: '#333',
                }}
              >
                {result.complaint && result.complaint.toLowerCase().includes('spacing')
                  ? 'Mild-to-moderate spacing is the kind of smile our partner dentists straighten every day. To show you exactly what’s possible for yours, an Alignaa partner dentist takes a closer look in person to map out what your new smile could look like, all before you commit to treatment.'
                  : result.complaint && result.complaint.toLowerCase().includes('crowd')
                    ? 'Mild-to-moderate crowding is the kind of smile our partner dentists straighten every day. To show you exactly what’s possible for yours, an Alignaa partner dentist takes a closer look in person to map out what your new smile could look like, all before you commit to treatment.'
                    : 'Bite and alignment cases are the kind of smiles our partner dentists straighten every day. To show you exactly what’s possible for yours, an Alignaa partner dentist takes a closer look in person to map out what your new smile could look like, all before you commit to treatment.'}
              </div>

              {/* What happens next */}
              <div style={{ maxWidth: '640px', margin: '0 auto 44px auto' }}>
                <div
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#9b9a9d',
                    fontWeight: '500',
                    textAlign: 'center',
                    marginBottom: '32px',
                  }}
                >
                  What happens next
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                  {/* Step 1 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div className="quiz-cta-step-number" style={{ marginTop: '2px' }}>1</div>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '15.5px', fontWeight: '600', color: '#221f20' }}>
                        Schedule your results call
                      </h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                        A quick call with our team: we&apos;ll go over your results, answer your questions, and help you decide if Alignaa&apos;s right for you, whether you&apos;re ready to start or just exploring.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div className="quiz-cta-step-number" style={{ marginTop: '2px' }}>2</div>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '15.5px', fontWeight: '600', color: '#221f20' }}>
                        Book your dental exam and consultation
                      </h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                        We&apos;ll get you in with an Alignaa partner dentist who takes x-rays and scans, then builds your custom treatment plan with Alignaa&apos;s orthodontists.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div className="quiz-cta-step-number" style={{ marginTop: '2px' }}>3</div>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '15.5px', fontWeight: '600', color: '#221f20' }}>
                        See your plan, then decide
                      </h4>
                      <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                        You&apos;ll see a 3D simulation of how your teeth move into their new position, before anything begins. Whether to go ahead is up to you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dark Call to Action Card */}
              <div
                style={{
                  backgroundColor: '#221f20',
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '36px 20px',
                  maxWidth: '640px',
                  margin: '0 auto 36px auto',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ margin: '0 0 22px 0', fontSize: '19px', fontWeight: '400', letterSpacing: '0.02em' }}>
                  Choose a time for your results call
                </h3>
                <button
                  type="button"
                  className="quiz-cta-schedule-button"
                  onClick={openBookNow}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#fff',
                    color: '#221f20',
                    padding: '13px 28px',
                    borderRadius: '5px',
                    fontSize: '15px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    border: 0,
                    margin: '0 auto',
                  }}
                >
                  <span>Schedule my call</span>
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Contact / Help callouts */}
              <div style={{ maxWidth: '640px', margin: '0 auto 56px auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div className="quiz-cta-icon-bubble" style={{ marginTop: '2px' }}>
                    <Phone size={15} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14.5px', fontWeight: '600', color: '#221f20' }}>
                      Can&apos;t pick a time right now?
                    </h4>
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#666', lineHeight: '1.5' }}>
                      No problem - we just texted you a link to your results, so you can come back and book anytime. Save <strong>(888) 546-3206</strong> so you know it&apos;s us when we text.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div className="quiz-cta-icon-bubble" style={{ marginTop: '2px' }}>
                    <MessageSquare size={15} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14.5px', fontWeight: '600', color: '#221f20' }}>
                      Prefer texting?
                    </h4>
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#666', lineHeight: '1.5' }}>
                      Text us anytime at <strong>(888) 546-3206</strong> — questions welcome, and if you&apos;d rather skip the call entirely, we can handle everything by text.
                    </p>
                  </div>
                </div>
              </div>

              {/* While you wait - more on Alignaa aligners */}
              <div style={{ maxWidth: '780px', margin: '0 auto 60px auto' }}>
                <h3
                  style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: '400',
                    margin: '0 0 32px 0',
                    color: '#221f20',
                  }}
                >
                  While you wait - more on Alignaa aligners:
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px',
                  }}
                >
                  <QuizVideoCard
                    title="What are clear aligners?"
                    subtitle="Explained in less than 60 seconds"
                    videoSrc="/assets/videos/progress-step-1.mp4"
                    posterSrc="/assets/images/progress-step-1-poster.jpg"
                    isPlaying={playingQuizVid === 'qvid-1'}
                    onTogglePlay={(shouldPlay) => setPlayingQuizVid(shouldPlay ? 'qvid-1' : null)}
                  />
                  <QuizVideoCard
                    title="Why dentists partner with Alignaa"
                    subtitle="Explained in less than 60 seconds"
                    videoSrc="/assets/videos/progress-step-2.mp4"
                    posterSrc="/assets/images/progress-step-2-poster.jpg"
                    isPlaying={playingQuizVid === 'qvid-2'}
                    onTogglePlay={(shouldPlay) => setPlayingQuizVid(shouldPlay ? 'qvid-2' : null)}
                  />
                </div>

                <div style={{ maxWidth: '380px', margin: '0 auto 36px auto' }}>
                  <QuizVideoCard
                    title="What is the dentist's role in teeth straightening?"
                    subtitle="Explained in less than 60 seconds"
                    videoSrc="/assets/videos/progress-step-3.mp4"
                    posterSrc="/assets/images/progress-step-3-poster.jpg"
                    isPlaying={playingQuizVid === 'qvid-3'}
                    onTogglePlay={(shouldPlay) => setPlayingQuizVid(shouldPlay ? 'qvid-3' : null)}
                  />
                </div>

                <button
                  type="button"
                  onClick={openBookNow}
                  style={{
                    display: 'block',
                    width: '100%',
                    maxWidth: '380px',
                    margin: '0 auto',
                    backgroundColor: '#221f20',
                    color: '#fff',
                    padding: '14px 20px',
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    border: 0,
                    textAlign: 'center',
                  }}
                >
                  Schedule my call
                </button>
              </div>

              {/* Instagram Feed Section */}
              <div style={{ marginTop: '70px', marginBottom: '40px' }}>
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                    marginBottom: '28px',
                    color: '#221f20',
                  }}
                >
                  Follow us on Instagram!
                </div>

                <div className="insta-wrap">
                  {[
                    {
                      image: '/assets/images/socials-1-poster.jpg',
                      url: 'https://www.instagram.com/alignaa.co/',
                    },
                    {
                      image: '/assets/images/socials-2-poster.jpg',
                      url: 'https://www.instagram.com/alignaa.co/',
                    },
                    {
                      image: '/assets/images/socials-3-poster.jpg',
                      url: 'https://www.instagram.com/alignaa.co/',
                    },
                    {
                      image: '/assets/images/socials-4-poster.jpg',
                      url: 'https://www.instagram.com/alignaa.co/',
                    },
                  ].map((post, idx) => (
                    <a
                      key={idx}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="insta-block"
                      style={{ backgroundImage: `url('${post.image}')` }}
                      aria-label="View Instagram post"
                    >
                      <div className="insta-overlay">
                        <Instagram size={34} color="#fff" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="quiz-wrap">
              <div
                className="quiz-row"
                style={{
                  transform: `translateX(-${currentIdx * 100}%)`,
                  transition: 'transform 0.35s ease-in-out',
                }}
              >
                {quizSteps.map((step) => {
                  if (step.idx <= 6) {
                    const selAnswer = answers[step.idx];
                    const activeImg =
                      hoverImgs[step.idx] ||
                      selAnswer?.image ||
                      step.initImage;

                    return (
                      <div className="quiz-page" key={step.idx} data-idx={step.idx}>
                        <div className="quiz-page-inner">
                          {step.idx === 0 && (
                            <div className="block std-x-pad">
                              <div className="offer-wrap" style={{ padding: '18px 24px' }}>
                                <p style={{ margin: 0 }}>
                                  Our Smile consultation will help us (and you) understand the specifics of how we can help straighten your smile, including timelines, next steps and pricing. Fill the form today.
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="question-block">
                            {step.initImage && (
                              <div style={{ position: 'relative' }}>
                                <div
                                  className="quiz-img"
                                  style={{
                                    backgroundImage: `url('${activeImg}')`,
                                  }}
                                />
                                {step.hasDots && (
                                  <div className="dots-wrap">
                                    {step.questions[0].answers.map((opt, optIdx) => {
                                      const isSel = selAnswer?.label === opt.label;
                                      return (
                                        <div
                                          key={opt.label || optIdx}
                                          className={`dot ${isSel ? 'selected' : ''}`}
                                          onClick={() => handleSelectOption(step.idx, opt)}
                                          onMouseEnter={() => {
                                            if (opt.image) {
                                              setHoverImgs((prev) => ({
                                                ...prev,
                                                [step.idx]: opt.image,
                                              }));
                                            }
                                          }}
                                          onMouseLeave={() => {
                                            setHoverImgs((prev) => ({
                                              ...prev,
                                              [step.idx]: selAnswer?.image || step.initImage,
                                            }));
                                          }}
                                        />
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="question-wrap">
                              <h4>{step.questions[0].title}</h4>
                              <div className="answers-wrap">
                                {step.questions[0].answers.map((opt) => {
                                  const isSel = selAnswer?.label === opt.label;
                                  return (
                                    <div
                                      key={opt.label}
                                      className={`answer ${isSel ? 'selected' : ''}`}
                                      onClick={() => handleSelectOption(step.idx, opt)}
                                      onMouseEnter={() => {
                                        if (opt.image) {
                                          setHoverImgs((prev) => ({
                                            ...prev,
                                            [step.idx]: opt.image,
                                          }));
                                        }
                                      }}
                                      onMouseLeave={() => {
                                        setHoverImgs((prev) => ({
                                          ...prev,
                                          [step.idx]: selAnswer?.image || step.initImage,
                                        }));
                                      }}
                                    >
                                      {opt.label}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <button
                              type="button"
                              className="quiz-next"
                              onClick={() => handleNext(step.idx)}
                            >
                              <span>Next</span>
                              <ChevronRight size={20} />
                            </button>

                            {step.idx > 0 && (
                              <p
                                style={{
                                  color: '#9b9a9d',
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  marginTop: '10px',
                                }}
                                onClick={handleBack}
                              >
                                Go back
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (step.idx === 7) {
                    return (
                      <div className="quiz-page" key={step.idx} data-idx={step.idx}>
                        <div className="quiz-page-inner">
                          <div className="question-block">
                            <div className="question-wrap">
                              <h4>What&apos;s your Pin code?</h4>
                              <p>
                                We&apos;ll make sure there is an Alignaa partner dental practice in your area
                              </p>
                              <div className="answers-wrap">
                                <input
                                  ref={zipInputRef}
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  maxLength={6}
                                  name="pc"
                                  placeholder="Enter 6-digit Pin code"
                                  aria-label="Pin code"
                                  value={zipCode}
                                  onChange={(e) =>
                                    setZipCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleNext(step.idx);
                                  }}
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              className="quiz-next"
                              onClick={() => handleNext(step.idx)}
                            >
                              <span>Next</span>
                              <ChevronRight size={20} />
                            </button>
                            <p
                              style={{
                                color: '#9b9a9d',
                                cursor: 'pointer',
                                textAlign: 'center',
                                marginTop: '10px',
                              }}
                              onClick={handleBack}
                            >
                              Go back
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (step.idx === 8) {
                    return (
                      <div className="quiz-page" key={step.idx} data-idx={step.idx}>
                        <div className="quiz-page-inner">
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

                            <div className="question-wrap">
                              <h4>Coupon Code (Optional)</h4>
                              <div className="answers-wrap">
                                <input
                                  name="coupon"
                                  type="text"
                                  aria-label="Coupon Code (Optional)"
                                  placeholder="Enter coupon code"
                                  value={couponCode}
                                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                  style={{ textTransform: 'uppercase' }}
                                />
                                <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#666', fontStyle: 'italic' }}>
                                  *Note: If you have a coupon code, you get a discount.
                                </p>
                              </div>
                            </div>

                            <p
                              style={{
                                color: '#9b9a9d',
                                fontSize: '14px',
                                lineHeight: '1.25em',
                              }}
                            >
                              By submitting, you agree to receive an automated text message from Alignaa with your smile quiz results and information about scheduling a call to discuss your results. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help.{' '}
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
                              Our team may also email you about your results, Alignaa treatment, and scheduling a consultation.
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

                            <p
                              style={{
                                color: '#9b9a9d',
                                cursor: 'pointer',
                                textAlign: 'center',
                                marginTop: '10px',
                              }}
                              onClick={handleBack}
                            >
                              Go back
                            </p>
                          </form>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

