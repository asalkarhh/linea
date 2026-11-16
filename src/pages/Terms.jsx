import { useNavigate } from 'react-router-dom';
import { pagesData } from '../data/pagesData';
import SEO from '../components/SEO/SEO';

export default function Terms() {
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
        title="Terms & Conditions | Alignaa Clear Aligners"
        description="Review the terms and conditions for using Alignaa's website and orthodontic services."
        canonical="/terms"
      />
      <div dangerouslySetInnerHTML={{ __html: pagesData.termsInnerHtml }} />
    </div>
  );
}

