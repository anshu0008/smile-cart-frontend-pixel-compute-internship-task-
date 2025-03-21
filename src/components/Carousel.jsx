import { useEffect, useRef, useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

const Carousel = ({ image_url, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const IMAGE_URLS = [
    image_url,
    "https://ik.imagekit.io/d9mvewbju/SmileCart/thumbnail_61_7PaLfb.jpg",
    "https://ik.imagekit.io/d9mvewbju/SmileCart/1_yuRfcETI5.jpg",
    "https://ik.imagekit.io/d9mvewbju/SmileCart/2_HoKD2OblW.png",
    "https://ik.imagekit.io/d9mvewbju/SmileCart/3_-6sHqwicC.png",
  ];

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % IMAGE_URLS.length;
    setCurrentIndex(nextIndex);
    resetTimer();
  };

  const handlePrevious = () => {
    const previousIndex =
      (currentIndex - 1 + IMAGE_URLS.length) % IMAGE_URLS.length;
    setCurrentIndex(previousIndex);
    resetTimer();
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(handleNext, 3000);
  };

  useEffect(() => {
    resetTimer();

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (resetTimer.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex]);

  return (
    <div className="flex items-center">
      <ArrowLeft
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        onClick={() => {
          handlePrevious();
        }}
      />
      {IMAGE_URLS.map((url, index) => (
        <img
          alt={title}
          key={index}
          src={url}
          className={`h-64 w-10/12 object-contain ${
            currentIndex === index ? "block" : "hidden"
          }`}
        />
      ))}
      <ArrowRight
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        onClick={() => {
          handleNext();
        }}
      />
    </div>
  );
};

export default Carousel;
