import React from "react";
import {
  ButtonBack,
  ButtonFirst,
  ButtonLast,
  ButtonNext,
  ButtonPlay,
  CarouselProvider,
  DotGroup,
  ImageWithZoom,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const CarouselImages = ({ pictures }) => {
  return (
    <div className="relative w-1/2 mx-auto">
      <CarouselProvider
        visibleSlides={1}
        naturalSlideWidth={70}
        naturalSlideHeight={30}
        totalSlides={pictures && pictures.length}
        step={1}
        hasMasterSpinner>
        <Slider>
          {pictures?.map((picture, idx) => (
            <Slide key={idx}>
              <ImageWithZoom
                src={picture}
                alt={picture.name}
                className="object-contain"
              />
            </Slide>
          ))}
        </Slider>
        <ButtonBack className="absolute top-1/2 left-5 p-2  bg-green-300 text-white  hover:bg-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </ButtonBack>
        <ButtonNext className="absolute top-1/2 right-5 p-2  bg-green-300 text-white  hover:bg-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </ButtonNext>

        <DotGroup className="text-red-400"></DotGroup>
      </CarouselProvider>
    </div>
  );
};

export default CarouselImages;
