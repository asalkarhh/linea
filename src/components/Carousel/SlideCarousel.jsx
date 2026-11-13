import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SlideCarousel({
  id,
  heading,
  headingTag = 'h2',
  sectionClassName = 'block has-slides std-y-pad',
  sectionStyle,
  items = [],
  renderSlide,
  variant = 'aligners', // 'aligners' | 'overlay'
  desktopVisible = 3,
  tabletVisible = 2,
  mobileVisible = 1,
  wrapInStdXPad = true,
  afterRow,
}) {
  const [index, setIndex] = useState(0);
  const [translatePx, setTranslatePx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(mobileVisible);
  const trackRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const getVisibleForWidth = useCallback(
    (w) => {
      if (w >= 940) return desktopVisible;
      if (w >= 700) return tabletVisible;
      return mobileVisible;
    },
    [desktopVisible, tabletVisible, mobileVisible]
  );

  const maxIndex = Math.max(0, items.length - visibleCount);

  useEffect(() => {
    const updateSize = () => {
      const nextVis = getVisibleForWidth(window.innerWidth);
      setVisibleCount(nextVis);
      setIndex((curr) => Math.min(curr, Math.max(0, items.length - nextVis)));
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [getVisibleForWidth, items.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstSlide = track.children[0];
    if (!firstSlide) return;
    const step = firstSlide.getBoundingClientRect().width;
    setTranslatePx(-Math.round(index * step));
  }, [index, visibleCount, items.length]);

  const prev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const t = e.changedTouches[0];
    const dx = touchStartX.current - t.clientX;
    const dy = touchStartY.current - t.clientY;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx > 0) next();
      else prev();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  const canLeft = index > 0;
  const canRight = index < maxIndex;
  const Heading = headingTag;

  if (variant === 'overlay') {
    return (
      <div
        className={sectionClassName}
        id={id}
        style={sectionStyle}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {heading && <Heading style={{ paddingLeft: '10px' }}>{heading}</Heading>}
        <div className="slide-wrap" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div
            className="slide-row"
            ref={trackRef}
            style={{
              left: `${translatePx}px`,
              position: 'relative',
            }}
          >
            {items.map((item, i) => renderSlide(item, i))}
          </div>
          {canLeft && (
            <button
              type="button"
              className="arrow arrow-left"
              onClick={prev}
              aria-label="Previous slide"
              style={{ left: 0 }}
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {canRight && (
            <button
              type="button"
              className="arrow arrow-right"
              onClick={next}
              aria-label="Next slide"
              style={{ right: 0 }}
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
        {afterRow}
      </div>
    );
  }

  return (
    <section
      className={sectionClassName}
      id={id}
      style={sectionStyle}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="row std-x-pad"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {heading && <Heading>{heading}</Heading>}
        <div className="arrows-wrap">
          <button
            type="button"
            className={`arrow ${canLeft ? 'can-swipe' : ''}`}
            onClick={prev}
            disabled={!canLeft}
            aria-label={`Previous ${heading || 'slides'}`}
            style={{ background: 'transparent', border: 0 }}
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
          <button
            type="button"
            className={`arrow ${canRight ? 'can-swipe' : ''}`}
            onClick={next}
            disabled={!canRight}
            aria-label={`Next ${heading || 'slides'}`}
            style={{ background: 'transparent', border: 0 }}
          >
            <ArrowRight size={24} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div
        className={wrapInStdXPad ? 'block std-x-pad' : 'block'}
        style={wrapInStdXPad ? { paddingRight: 0 } : undefined}
      >
        <div className="slide-wrap" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div
            className="slide-row"
            ref={trackRef}
            style={{ transform: `translateX(${translatePx}px)` }}
          >
            {items.map((item, i) => renderSlide(item, i))}
          </div>
        </div>
      </div>
      {afterRow}
    </section>
  );
}

