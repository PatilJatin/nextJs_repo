"use client";
import Image from "next/image";
import Link from "next/link";
// components/Carousel.tsx
import { useState, useEffect } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(images);

  useEffect(() => {
    console.log("id");

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Set the auto-timer interval (in milliseconds)

    return () => clearInterval(interval);
  });

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) =>
        image.includes(".mp4") || image.includes(".mov") ? (
          // Check if it's a video
          <div key={index} className="absolute top-0 left-0 w-full h-full">
            <video
              width="100"
              height="100"
              autoPlay
              muted
              loop
              onEnded={(e) => {
                e.currentTarget.currentTime = 0;
              }}
              className="w-full h-full object-cover "
            >
              <source src={image.toString()} type="video/mp4" />
              <source src={image.toString()} type="video/mov" />
            </video>
          </div>
        ) : (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform transform ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Image
              src={image}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
              width={500}
              height={300}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Carousel;
