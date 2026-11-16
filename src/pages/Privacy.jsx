import { useNavigate } from 'react-router-dom';
import { pagesData } from '../data/pagesData';
import SEO from '../components/SEO/SEO';

export default function Privacy() {
  const navigate = useNavigate();

  const handleContentClick = (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <div
      className="page-legal"
      style={{ backgroundColor: '#fff', minHeight: '70vh' }}
      onClick={handleContentClick}
    >
      <SEO
        title="Privacy Policy | Alignaa Clear Aligners"
        description="Learn how Alignaa protects your personal and dental healthcare information."
        canonical="/privacy"
      />
      <div dangerouslySetInnerHTML={{ __html: pagesData.privacyInnerHtml }} />
    </div>
  );
}

