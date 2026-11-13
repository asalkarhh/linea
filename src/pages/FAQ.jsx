import { useState, useEffect, useMemo } from 'react';
import { faqCategories } from '../data/faqData';
import FaqAccordion from '../components/Accordion/FaqAccordion';
import CtaBlock from '../components/Buttons/CtaBlock';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    document.title = 'Frequently Asked Questions — Linea Official';
  }, []);

  const query = searchTerm.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!query) return faqCategories;
    return faqCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          const text = `${item.question} ${item.plainText}`.toLowerCase();
          return text.includes(query);
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query]);

  const toggleCategory = (catName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  return (
    <div className="page-faq">
      <div className="block" style={{ paddingTop: '120px' }}>
        <h1 style={{ textAlign: 'center' }}>Frequently Asked Questions</h1>
      </div>

      <section className="block std-x-pad std-y-pad">
        <div className="half" style={{ float: 'none', margin: 'auto' }}>
          <div style={{ margin: '10px 0 40px 0' }}>
            <input
              id="search"
              type="search"
              placeholder="Search keywords"
              aria-label="Search frequently asked questions"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredCategories.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#9b9a9d', padding: '20px 0' }}>
              No matching questions found for &ldquo;{searchTerm}&rdquo;.
            </p>
          ) : (
            filteredCategories.map((cat, ci) => {
              const isExpanded = query.length > 0 || Boolean(openCategories[cat.category]);
              const catSlug = cat.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

              return (
                <div
                  key={cat.category}
                  className="block"
                  style={
                    ci === filteredCategories.length - 1
                      ? { marginBottom: '40px' }
                      : undefined
                  }
                >
                  <div className="header-wrap" style={{ padding: 0 }}>
                    <button
                      type="button"
                      className="question-trigger"
                      aria-expanded={isExpanded}
                      aria-controls={`cat-block-${catSlug}`}
                      onClick={() => toggleCategory(cat.category)}
                    >
                      <h4 style={{ margin: 0 }}>{cat.category}</h4>
                      <span
                        className="control"
                        style={{ position: 'static' }}
                        aria-hidden="true"
                      >
                        {isExpanded ? '-' : '+'}
                      </span>
                    </button>
                  </div>

                  <div
                    id={`cat-block-${catSlug}`}
                    className={`question-block ${isExpanded ? 'expanded' : ''}`}
                    style={
                      isExpanded &&
                      ci === filteredCategories.length - 1
                        ? { borderBottom: '0px' }
                        : undefined
                    }
                  >
                    <FaqAccordion
                      items={cat.items}
                      borderBottomLast={ci !== filteredCategories.length - 1}
                      idPrefix={`faq-${catSlug}`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <CtaBlock
        title="Is Linea right for you?"
        description="Take the free 30 second assessment to find out."
        buttonLabel="Get Started"
        buttonTo="/aligners/quiz/"
      />
    </div>
  );
}

