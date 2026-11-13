import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pagesData } from '../data/pagesData';

export default function Terms() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Website Usage Terms and Conditions — Linea Official';
  }, []);

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
      dangerouslySetInnerHTML={{ __html: pagesData.termsInnerHtml }}
    />
  );
}

