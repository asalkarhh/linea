import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://www.alignaa.co';
const DEFAULT_IMAGE = `${BASE_URL}/assets/images/home-veneers.jpg`;

/**
 * Reusable SEO component for dynamic per-page metadata and JSON-LD structured data.
 */
export default function SEO({
  title = 'Alignaa® | Dentist-Led Clear Aligners in India — From ₹22,999',
  description = 'Alignaa provides doctor-directed clear aligners starting from ₹22,999 in India. High-precision 3D scans, doctor supervision, custom Zendura aligners, retainers & whitening.',
  keywords = 'clear aligners India, invisible braces cost, Alignaa aligners, teeth straightening without braces, Invisalign alternatives India, teeth aligners cost',
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  schema = null,
  breadcrumbs = null,
}) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to set or create meta tags
    const setMeta = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Canonical URL
    const canonicalUrl = canonical
      ? (canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical}`)
      : `${BASE_URL}${location.pathname}`;

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // 4. Open Graph Tags
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', fullOgImage);
    setMeta('property', 'og:site_name', 'Alignaa Clear Aligners');
    setMeta('property', 'og:locale', 'en_IN');

    // 5. Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', fullOgImage);
    setMeta('name', 'twitter:url', canonicalUrl);

    // 6. JSON-LD Structured Data
    const scriptId = 'page-jsonld-schema';
    let scriptEl = document.getElementById(scriptId);

    const schemasToInject = [];

    // Optional breadcrumbs schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemasToInject.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${BASE_URL}${crumb.url}`,
        })),
      });
    }

    // Page-specific schema
    if (schema) {
      if (Array.isArray(schema)) {
        schemasToInject.push(...schema);
      } else {
        schemasToInject.push(schema);
      }
    }

    if (schemasToInject.length > 0) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(
        schemasToInject.length === 1 ? schemasToInject[0] : { '@context': 'https://schema.org', '@graph': schemasToInject }
      );
    } else if (scriptEl) {
      scriptEl.remove();
    }

    // Cleanup on unmount: if script was created, remove it
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, keywords, canonical, ogType, ogImage, schema, breadcrumbs, location.pathname]);

  return null;
}
