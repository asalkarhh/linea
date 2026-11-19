import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO/SEO';
import '../styles/blog.css';

const PAGE_SIZE = 12;

export default function Blog() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);

  const hasMore = visibleCount < blogPosts.length;

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(blogPosts.length, prev + PAGE_SIZE));
        }
      },
      { rootMargin: '120px' }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  const visiblePosts = blogPosts.slice(0, visibleCount);

  return (
    <div className="page-blog">
      <SEO
        title="Clear Aligner & Orthodontic Blog — Expert Dental Guides | Alignaa"
        description="Read expert orthodontic articles on teeth straightening, clear aligner comparisons, costs, oral hygiene tips, and Invisalign alternatives from Alignaa."
        keywords="orthodontic blog, clear aligners guide, invisalign vs alignaa, clear aligners advice, teeth care tips, dental alignment blog"
        canonical="/blog"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />
      <div
        className="block top-cover cover-blog"
        style={{
          position: 'relative',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        >
          <div className="half cover-text">
            <h1 style={{ marginTop: 0, fontSize: '40px', color: 'white', textAlign: 'center' }}>
              The Alignaa Blog
            </h1>
          </div>
        </div>
      </div>

      <section className="block std-x-pad std-y-pad" style={{ backgroundColor: '#fff' }}>
        <div className="posts-wrap" id="postsWrap">
          {visiblePosts.map((post) => (
            <article key={post.slug} className="post">
              <Link
                to={`/blog/${post.slug}/`}
                style={{ display: 'block', height: '100%' }}
              >
                <div
                  className="cover-image"
                  style={{
                    backgroundImage: `url("${post.coverImage}")`,
                    borderRadius: '5px',
                  }}
                />
                <p
                  style={{
                    fontSize: '14px',
                    paddingBottom: '6px',
                    borderBottom: '1px solid #9b9a9d',
                  }}
                />
                <h3 style={{ marginTop: 0 }}>{post.title}</h3>
                <p style={{ color: '#9b9a9d' }}>{post.date}</p>
              </Link>
            </article>
          ))}
        </div>

        {hasMore && (
          <div
            ref={sentinelRef}
            id="load-more-posts"
            style={{ textAlign: 'center', marginTop: '30px' }}
          >
            <button
              type="button"
              onClick={() =>
                setVisibleCount((prev) => Math.min(blogPosts.length, prev + PAGE_SIZE))
              }
              style={{ margin: '0 auto', fontSize: '14px' }}
            >
              Load More Posts
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
