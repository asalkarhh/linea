import { useState } from 'react';

export default function FaqAccordion({
  items,
  borderBottomLast = true,
  idPrefix = 'faq',
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const isFirst = idx === 0;
        const isLast = idx === items.length - 1;
        const ansId = `${idPrefix}-answer-${idx}`;
        const qId = `${idPrefix}-question-${idx}`;

        return (
          <div key={qId} className="qa-wrap">
            <div
              className="question-wrap"
              id={qId}
              style={{
                borderTop: isFirst ? '1px solid #9b9a9d' : undefined,
                padding: 0,
              }}
            >
              <button
                type="button"
                className="question-trigger"
                aria-expanded={isOpen}
                aria-controls={ansId}
                onClick={() => toggle(idx)}
              >
                <span style={{ flex: 1, textAlign: 'left' }}>{item.question}</span>
                <span
                  aria-hidden="true"
                  style={{ fontWeight: 500, fontSize: '18px', minWidth: '16px', textAlign: 'right' }}
                >
                  {isOpen ? '-' : '+'}
                </span>
              </button>
            </div>
            <div
              id={ansId}
              className={`question-answer ${isOpen ? 'expanded' : ''}`}
              role="region"
              aria-labelledby={qId}
              style={{
                borderBottom: !borderBottomLast && isLast ? 0 : '1px solid #9b9a9d',
                marginBottom: !borderBottomLast && isLast ? '40px' : undefined,
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: item.answerHtml }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

