import React, { useState, useEffect, useRef } from 'react';
// Components
import SliderItem from './SliderItem';
// Styles
import { StyledSliderWrapper, StyledSlider } from './SliderStyles';
// Types

const numberOfSlides = (maxVisibleSlides, windowWidth) => {
  if (windowWidth > 1200) return maxVisibleSlides;
  if (windowWidth > 992) return 4;
  if (windowWidth > 768) return 3;
  return 2;
};

const Slider = ({
  children,
  zoomFactor,
  slideMargin,
  maxVisibleSlides,
  pageTransition,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [transformValue, setTransformValue] = useState(`-${zoomFactor / 2}%`);
  const [scrollSize, setScrollSize] = useState(0);

  const sliderRef = useRef(null);

  const visibleSlides = numberOfSlides(maxVisibleSlides, scrollSize);
  // Pages start at 0, therefore -1 at the end here
  const totalPages = Math.ceil(children.length / visibleSlides) - 1;

  useEffect(() => {
    //@ts-ignore
    const resizeObserver = new ResizeObserver(entries => {
      setScrollSize(entries[0].contentRect.width);
    });
    resizeObserver.observe(sliderRef.current);
  }, [sliderRef]);

  // Position slider on resize
  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      if (currentPage > totalPages) setCurrentPage(totalPages);
      sliderRef.current.style.transform = `translate3D(-${
        currentPage * scrollSize
      }px, 0, 0)`;
    }
  }, [sliderRef, currentPage, scrollSize, totalPages]);

  // Have to disable hover effect on slides when flipping page
  // Otherwise it will look ugly when mouse hovers over the slides
  const disableHoverEffect = () => {
    if (sliderRef.current) sliderRef.current.style.pointerEvents = 'none';
    setTimeout(() => {
      if (sliderRef.current) sliderRef.current.style.pointerEvents = 'all';
    }, pageTransition);
  };

  const handleSlideMove = forward => {
    disableHoverEffect();
    setCurrentPage(currentPage + (forward ? 1 : -1));

    if (sliderRef.current)
      sliderRef.current.style.transform = `translate3D(-${
        (currentPage + (forward ? 1 : -1)) * scrollSize
      }px, 0, 0)`;
  };

  const handleMouseOver = id => {
    if (id % visibleSlides === 1) setTransformValue('0%'); // left
    if (id % visibleSlides === 0) setTransformValue(`-${zoomFactor}%`); // right
  };

  const handleMouseOut = () => {
    setTransformValue(`-${zoomFactor / 2}%`);
  };

  const assignSlideClass = (index, visibleSlides) => {
    const classes = ['right', 'left'];
    return classes[index % visibleSlides] || '';
  };

  return (
    <StyledSliderWrapper zoomFactor={zoomFactor} visibleSlides={visibleSlides}>
      <StyledSlider
        visibleSlides={visibleSlides}
        transformValue={transformValue}
        zoomFactor={zoomFactor}
        slideMargin={slideMargin}
        pageTransition={pageTransition}
        ref={sliderRef}
      >
        {children.map((child, i) => (
          <SliderItem
            key={i}
            slideMargin={slideMargin}
            visibleSlides={visibleSlides}
            zoomFactor={zoomFactor}
            slideClass={assignSlideClass(i + 1, visibleSlides)}
            id={i + 1}
            callback={handleMouseOver}
            callbackOut={handleMouseOut}
          >
            {child}
          </SliderItem>
        ))}
      </StyledSlider>
      {currentPage > 0 && (
        <div className="button-wrapper back">
          <button
            className="button back"
            onClick={() => handleSlideMove(false)}
          >
            &#8249;
          </button>
        </div>
      )}
      {currentPage !== totalPages && (
        <div className="button-wrapper forward">
          <button
            className="button forward"
            onClick={() => handleSlideMove(true)}
          >
            &#8250;
          </button>
        </div>
      )}
    </StyledSliderWrapper>
  );
};

export default Slider;
