import React, { memo } from "react";

import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  ImageWithZoom,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

type CarouselImagesProps = {
  pictures: string[];
  widthImage: number;
  heightImage: number;
  arrow: number;
  top: number;
};

const CarouselImages = ({
  pictures,
  widthImage,
  heightImage,
  arrow,
  top,
}: CarouselImagesProps) => {
  return (
    <>
      <CarouselProvider
        visibleSlides={1}
        naturalSlideWidth={widthImage}
        naturalSlideHeight={heightImage}
        totalSlides={pictures && pictures.length}
        step={1}
        hasMasterSpinner
      >
        <Slider>
          {pictures?.map((picture, i) => (
            <Slide key={i}>
              <ImageWithZoom
                src={picture}
                alt={picture}
                className="object-center object-cover w-full h-full rounded-sm"
              />
            </Slide>
          ))}
        </Slider>
        <ButtonBack
          className={`absolute top-12 lg:top-${top}  md:top-40 sm:top-30 left-5 p-2 text-white transition duration-500 ease-in-out transform hover:scale-125 hover:-translate-y-1`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-${arrow} w-${arrow}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </ButtonBack>
        <ButtonNext
          className={`absolute top-12 lg:top-${top} md:top-40  right-5 p-2 text-white transition duration-500 ease-in-out transform hover:scale-125 hover:-translate-y-1`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-${arrow} w-${arrow}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </ButtonNext>
      </CarouselProvider>
    </>
  );
};
export default memo(CarouselImages);
