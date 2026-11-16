import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit2,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useModals } from '../../context/ModalContext';

const TIMEZONES = [
  'Asia/Kolkata (IST)',
  'Asia/Dubai',
  'Asia/Singapore',
  'Europe/London',
  'America/New_York',
];

const SLOTS_BY_WEEKDAY = [
  [],
  ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM'],
  ['09:30 AM', '11:30 AM', '02:00 PM', '04:00 PM'],
  ['10:00 AM', '12:00 PM', '02:30 PM', '04:30 PM'],
  ['09:00 AM', '11:00 AM', '01:30 PM', '03:00 PM', '05:00 PM'],
  ['09:30 AM', '11:30 AM', '01:00 PM', '02:30 PM'],
  ['10:00 AM', '11:30 AM'],
];

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function BookNowModal() {
  const { bookNowOpen, closeBookNow, openAlertModal } = useModals();

  const today = useMemo(() => new Date(), []);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [tzModalOpen, setTzModalOpen] = useState(false);
  const [tzFilter, setTzFilter] = useState('');

  const [firstName, setFirstName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [marketingSms, setMarketingSms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  const formWrapRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && bookNowOpen) {
        if (tzModalOpen) setTzModalOpen(false);
        else closeBookNow();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [bookNowOpen, tzModalOpen, closeBookNow]);

  const calendarWeeks = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
  }, [year, month]);

  const isDayAvailable = (d) => {
    if (!d) return false;
    const candidate = new Date(year, month, d);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffDays = (candidate - todayMidnight) / (1000 * 60 * 60 * 24);
    const dow = candidate.getDay();
    return diffDays >= 0 && diffDays <= 45 && dow !== 0; // Mon-Sat next 45 days
  };

  const isToday = (d) =>
    d &&
    year === today.getFullYear() &&
    month === today.getMonth() &&
    d === today.getDate();

  const availableTimes = useMemo(() => {
    if (!selectedDay) return [];
    const dow = new Date(year, month, selectedDay).getDay();
    return SLOTS_BY_WEEKDAY[dow] || [];
  }, [year, month, selectedDay]);

  const changeMonth = (delta) => {
    let nextMonth = month + delta;
    let nextYear = year;
    if (nextMonth < 0) {
      nextMonth = 11;
      nextYear -= 1;
    } else if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }
    setMonth(nextMonth);
    setYear(nextYear);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const handleSelectDay = (d) => {
    setSelectedDay(d);
    setSelectedTime(null);
    if (formWrapRef.current) {
      formWrapRef.current.scrollTo({ top: 360, behavior: 'smooth' });
    }
  };

  const handleSelectTime = (t) => {
    setSelectedTime(t);
    if (formWrapRef.current) {
      formWrapRef.current.scrollTo({ top: 680, behavior: 'smooth' });
    }
  };

  const handleResetAndClose = () => {
    closeBookNow();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDay || !selectedTime) {
      openAlertModal('Select Date & Time', 'Please select an available date and time.');
      return;
    }
    if (!firstName.trim()) {
      openAlertModal('Required Field', 'Please enter your first name.');
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
      openAlertModal('Invalid Phone', 'Please enter a valid mobile number of 10 digits.');
      return;
    }
    const cleanPin = zipCode.trim();
    if (!cleanPin) {
      openAlertModal('Required Field', 'Please enter your pin code.');
      return;
    }
    if (!/^[1-9][0-9]{5}$/.test(cleanPin)) {
      openAlertModal('Invalid Pin Code', 'Please enter a valid 6-digit Pin code.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setConfirmed({
        firstName: firstName.trim(),
        email: cleanEmail,
        phone: cleanPhone,
        zipCode: zipCode.trim(),
        dateLabel: `${selectedDay} ${MONTH_NAMES[month]} ${year}`,
        time: selectedTime,
        timezone,
      });
    }, 350);
  };

  const filteredTimezones = TIMEZONES.filter((tz) =>
    tz.toLowerCase().includes(tzFilter.toLowerCase())
  );

  return (
    <>
      <div
        className={`book-now-overlay ${bookNowOpen ? 'booking-overlay-opened' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Book a free 15-minute call"
        aria-hidden={!bookNowOpen}
      >
        <div className="book-now-flex">
          <div className="book-now-image" onClick={handleResetAndClose} />
          <div className="book-now-form-wrap" ref={formWrapRef}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                type="button"
                className="book-now-back-button"
                onClick={handleResetAndClose}
                aria-label="Close booking overlay"
              >
                <ArrowLeft size={24} />
              </button>
              <h4 style={{ margin: '10px 0' }}>BOOK CALL</h4>
            </div>
            <div style={{ height: '1px', borderBottom: '1px solid #9b9a9d', marginBottom: '16px' }} />

            {confirmed ? (
              <div style={{ padding: '20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <CheckCircle2 size={28} color="#221f20" />
                  <h3 style={{ margin: 0 }}>Call Scheduled</h3>
                </div>
                <p>
                  Thanks, <strong>{confirmed.firstName}</strong>! Your 15-minute smile consultation call is confirmed for:
                </p>
                <p style={{ background: '#e8e4d9', padding: '12px', borderRadius: '5px' }}>
                  <strong>{confirmed.dateLabel}</strong> at <strong>{confirmed.time}</strong>
                </p>
                <p style={{ fontSize: '14px', color: '#555' }}>
                  A confirmation summary has been recorded for <strong>{confirmed.email}</strong>{confirmed.zipCode ? ` (PIN ${confirmed.zipCode})` : ''}.
                </p>
                <p style={{ fontSize: '12px', color: '#9b9a9d', fontStyle: 'italic' }}>
                  Demo frontend preview: no live backend booking request is sent.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmed(null);
                    handleResetAndClose();
                  }}
                  style={{ width: '100%', marginTop: '16px', fontSize: '16px' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="schedule-wrap">
                  <div className="schedule-left">
                    <div
                      className="flex vertical-center"
                      style={{ marginBottom: '16px', gap: '10px' }}
                    >
                      <Clock size={20} />
                      <span>15 minutes</span>
                    </div>
                    <p>
                      During this free consultation, our smile specialist will discuss your case with you, answer any questions you have and help locate a partner dentist nearest to you.
                    </p>
                    {/* <p>
                      *Book an initial consultation within 7 days of the call and receive $150 off your treatment* T&amp;Cs apply.
                    </p> */}
                    <h3>Select a date:</h3>
                    <div className="schedule-calendar-wrap">
                      <div className="schedule-header">
                        <button
                          type="button"
                          className="schedule-nav-wrap"
                          onClick={() => changeMonth(-1)}
                          aria-label="Previous month"
                          style={{ background: 'transparent', color: 'inherit', border: 0 }}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <div className="schedule-week-title">
                          {MONTH_NAMES[month]} {year}
                        </div>
                        <button
                          type="button"
                          className="schedule-nav-wrap"
                          onClick={() => changeMonth(1)}
                          aria-label="Next month"
                          style={{ background: 'transparent', color: 'inherit', border: 0 }}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>

                      <div className="schedule-calendar">
                        <div className="schedule-week-wrap">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dName) => (
                            <div key={dName} className="schedule-day">
                              <div className="schedule-day-name">{dName}</div>
                            </div>
                          ))}
                        </div>
                        {calendarWeeks.map((week, wi) => (
                          <div key={wi} className="schedule-week-wrap">
                            {week.map((day, di) => {
                              const avail = isDayAvailable(day);
                              const selected = day && selectedDay === day;
                              const cls = [
                                'schedule-day-number',
                                avail ? 'available' : 'unavailable',
                                selected ? 'selected' : '',
                                isToday(day) ? 'today' : '',
                              ]
                                .filter(Boolean)
                                .join(' ');

                              return (
                                <div key={di} className="schedule-day">
                                  <div className="schedule-day-body">
                                    {avail ? (
                                      <button
                                        type="button"
                                        className={cls}
                                        onClick={() => handleSelectDay(day)}
                                        style={{ padding: 0, backgroundColor: selected ? undefined : 'transparent', color: selected ? '#fff' : '#221f20' }}
                                      >
                                        {day}
                                      </button>
                                    ) : (
                                      <div className={cls}>{day || ''}</div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="schedule-right">
                    <h3>Select a time:</h3>
                    <div className="select-time-block">
                      {!selectedDay ? (
                        <p>
                          <i>Choose a date to see available times</i>
                        </p>
                      ) : availableTimes.length === 0 ? (
                        <p>
                          <i>No times available on this date.</i>
                        </p>
                      ) : (
                        availableTimes.map((t) => (
                          <button
                            key={t}
                            type="button"
                            className={`time ${selectedTime === t ? 'selected' : ''}`}
                            onClick={() => handleSelectTime(t)}
                          >
                            {t}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {selectedDay && selectedTime && (
                  <form className="book-now-form-fields" id="step-3" onSubmit={handleSubmit}>
                    <h3>Confirm booking details:</h3>
                    <input
                      type="text"
                      id="book_first_name"
                      maxLength={30}
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      id="book_zip_code"
                      maxLength={6}
                      placeholder="6-digit Pin Code"
                      value={zipCode}
                      onChange={(e) =>
                        setZipCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                      }
                    />
                    <input
                      type="email"
                      id="book_email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div
                      className="input"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '16px',
                        maxWidth: '100%',
                      }}
                    >
                      <input
                        type="text"
                        maxLength={20}
                        id="book_phone"
                        placeholder="91 5123 4567"
                        style={{ padding: 0, margin: 0, border: 0 }}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <p style={{ marginBottom: '30px', fontSize: '14px', color: '#9b9a9d' }}>
                      <i>
                        We&apos;ll text appointment reminders and rescheduling info to this number. Reply STOP to opt out.
                      </i>
                    </p>

                    <div className="confirm-booking-details">
                      <b>Selected date and time: </b>
                      <span>
                        <span className="selected-day">{selectedDay}</span>{' '}
                        <span className="selected-mo-yr">
                          {MONTH_NAMES[month]} {year}
                        </span>{' '}
                        <span className="selected-time">{selectedTime}</span>
                      </span>
                    </div>

                    <p style={{ color: '#9b9a9d', fontSize: '14px', lineHeight: '1em' }}>
                      By submitting, Alignaa may call or email you to deliver your quiz results and schedule a consultation.{' '}
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

                    {/* <div
                      style={{
                        borderTop: '1px solid var(--primary-line-color)',
                        paddingTop: '16px',
                        textAlign: 'center',
                      }}
                    >
                      <b style={{ fontSize: '12px', color: 'green' }}>ONE LAST THING</b>
                      <div style={{ margin: '8px 0' }}>
                        <b>Save $150</b> when you book a consultation in our offer window.
                      </div>
                    </div> */}

                    <div
                      className="flex"
                      style={{
                        alignItems: 'flex-start',
                        gap: '5px',
                        margin: '16px 0',
                        textAlign: 'left',
                      }}
                    >
                      <input
                        type="checkbox"
                        id="id_enable_marketing_sms"
                        checked={marketingSms}
                        onChange={(e) => setMarketingSms(e.target.checked)}
                      />
                      <label
                        htmlFor="id_enable_marketing_sms"
                        style={{
                          margin: 0,
                          padding: 0,
                          fontSize: '14px',
                          flexGrow: 1,
                          lineHeight: '1.3em',
                        }}
                      >
                        <b>Text me Alignaa&apos;s offers and promotions</b>
                        <br />
                        <span style={{ fontSize: '12px', color: '#9b9a9d' }}>
                          I agree to receive recurring marketing texts from Alignaa at 888-546-3206. Frequency varies. Consent is not a condition of any purchase or service. Reply STOP to opt out, HELP for help. Msg &amp; data rates may apply.{' '}
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
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      id="book-now-button"
                      disabled={submitting}
                      style={{ margin: '20px auto', fontSize: '16px', width: '100%' }}
                    >
                      {submitting ? 'Submitting...' : 'Schedule'}
                    </button>
                  </form>
                )}

                {/* <div className="flex" style={{ alignItems: 'center', gap: '5px', marginTop: '12px' }}>
                  <p style={{ fontSize: '14px', textAlign: 'right' }}>
                    Timezone: <span id="timezone">{timezone}</span>
                  </p>
                  <button
                    type="button"
                    aria-label="Change timezone"
                    onClick={() => setTzModalOpen(true)}
                    style={{
                      background: 'transparent',
                      color: 'var(--primary-line-color)',
                      padding: '4px',
                      border: 0,
                    }}
                  >
                    <Edit2 size={14} />
                  </button>
                </div> */}
                <div className="block" style={{ height: '60px' }} />
              </>
            )}
          </div>
        </div>
      </div>

      {tzModalOpen && (
        <div
          className="modal-overlay"
          style={{ zIndex: 10050 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setTzModalOpen(false);
          }}
        >
          <div className="modal" style={{ display: 'block', zIndex: 10051 }} id="book-tz-modal">
            <button
              type="button"
              className="closemodal"
              onClick={() => setTzModalOpen(false)}
              aria-label="Close timezone selector"
              style={{ background: 'transparent', border: 0, color: '#221f20' }}
            >
              <X size={24} />
            </button>
            <div className="block" style={{ padding: '20px' }}>
              <input
                type="text"
                placeholder="Filter timezones"
                id="filter_tz"
                value={tzFilter}
                onChange={(e) => setTzFilter(e.target.value)}
              />
              <div className="tzs-wrap">
                {filteredTimezones.map((tz) => (
                  <div
                    key={tz}
                    className="tz"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setTimezone(tz);
                      setSelectedDay(null);
                      setSelectedTime(null);
                      setTzModalOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setTimezone(tz);
                        setTzModalOpen(false);
                      }
                    }}
                  >
                    {tz}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

