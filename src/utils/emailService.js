import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Format current timestamp for Indian Standard Time
 */
function getFormattedTimestamp() {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }).format(new Date());
  } catch {
    return new Date().toLocaleString();
  }
}

/**
 * Sends booking email notification through EmailJS
 *
 * @param {Object} params
 * @param {string} params.form_type - e.g. "Book Free Consultation" or "Book Free 3D Scan"
 * @param {string} params.user_name - Customer Name
 * @param {string} params.user_email - Customer Email
 * @param {string} params.user_phone - Customer Phone
 * @param {string} [params.pin_code] - Customer PIN / Postal Code
 * @param {string} params.booking_details - Formatted multiline details
 * @returns {Promise<import('@emailjs/browser').EmailJSResponseStatus>}
 */
export async function sendBookingEmail({
  form_type,
  user_name,
  user_email,
  user_phone,
  pin_code = '',
  booking_details = '',
}) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    const missing = [];
    if (!SERVICE_ID) missing.push('VITE_EMAILJS_SERVICE_ID');
    if (!TEMPLATE_ID) missing.push('VITE_EMAILJS_TEMPLATE_ID');
    if (!PUBLIC_KEY) missing.push('VITE_EMAILJS_PUBLIC_KEY');
    console.error(`EmailJS configuration missing in .env: ${missing.join(', ')}`);
    throw new Error(`EmailJS configuration missing: ${missing.join(', ')}`);
  }

  const templateParams = {
    form_type,
    user_name,
    user_email,
    user_phone,
    pin_code: pin_code || 'N/A',
    booking_details,
    timestamp: getFormattedTimestamp(),
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
    publicKey: PUBLIC_KEY,
  });
}
