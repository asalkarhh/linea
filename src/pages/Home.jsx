import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
  useEffect(() => {
    document.title = 'Linea Official — Clear Aligners';
  }, []);

  return (
    <div className="page-home">
      <div className="block home-wrap">
        <section className="block home-section" id="aligners-cover">
          <h1 className="home-title">Clear Aligners</h1>
          <div className="block buttons-bar">
            <Link
              to="/aligners/quiz/"
              className="home-cta-link home-cta-primary"
            >
              Take the Quiz
            </Link>
            <Link
              to="/aligners/"
              className="home-cta-link home-cta-secondary"
            >
              Learn More
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

