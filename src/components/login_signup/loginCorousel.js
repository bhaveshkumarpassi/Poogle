import React, { useState } from 'react';
import display1 from '../../Images/questionMan.jpg'
import display2 from "../../Images/answer1.jpg";
import display3 from "../../Images/blog2.jpg";
import display4 from "../../Images/chat2.png";

import {
  Carousel,CarouselItem,CarouselControl,CarouselIndicators} from 'reactstrap';

const items = [
  {
    src : display1,
    altText : "Slide 1"
  },
  {
    src : display2,
    altText: 'Slide 2',
  },
  {
    src : display3,
    altText: 'Slide 3',
  },
  {
    src : display4,
    altText: 'Slide 4',
  },

];

const LoginCorousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} style ={{ 
            objectFit: "cover"
             }}/>
      </CarouselItem>
    );
  });

  return (
      <div className="LoginCorouselDiv">
        <center>
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      className = "LoginCorousel"
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
    </center>
    </div>
  );
}

export default LoginCorousel;