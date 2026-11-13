import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import CtaBlock from '../components/Buttons/CtaBlock';
import '../styles/blog.css';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Linea Official Blog`;
    } else {
      document.title = 'Article Not Found — Linea Official';
    }
  }, [post]);

  const handleContentClick = (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href) return;
    if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      navigate(href);
    }
  };

  if (!post) {
    return (
      <div className="page-blog std-x-pad std-y-pad" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h1>Article Not Found</h1>
        <p>We could not find the blog post you requested.</p>
        <Link to="/blog/" style={{ textDecoration: 'underline' }}>
          Back to all articles
        </Link>
      </div>
    );
  }

  return (
    <div className="page-blog">
      <div
        className="block std-x-pad std-y-pad"
        style={{ backgroundColor: '#fff', paddingTop: '100px' }}
      >
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
          <Link
            to="/blog/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              color: '#9b9a9d',
              marginBottom: '20px',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Blog</span>
          </Link>

          <h1 style={{ marginTop: 0, lineHeight: '1.25em' }}>{post.title}</h1>

          <div
            className="flex vertical-center"
            style={{ gap: '12px', margin: '20px 0 30px 0' }}
          >
            <img
              src={post.authorImage || '/assets/icons/linea-app-icon.png'}
              alt={post.author}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{post.author}</div>
              <div style={{ fontSize: '12px', color: '#9b9a9d' }}>
                {post.date}
                {post.updated ? ` · Updated ${post.updated}` : ''}
              </div>
            </div>
          </div>

          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="post-detail-cover-image"
              style={{ marginBottom: '30px' }}
            />
          )}

          <div
            className="ck-content"
            onClick={handleContentClick}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </div>

      <CtaBlock
        title="Is Linea right for you?"
        description="Take the free 30 second assessment to find out."
        buttonLabel="Get Started"
        buttonTo="/aligners/quiz/"
      />
    </div>
  );
}

