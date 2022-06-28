import React from "react";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  ImageWithZoom,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const CarouselImages = ({ pictures, widthImage, heightImage, arrow, top }) => {
  return (
    <>
      <CarouselProvider
        visibleSlides={1}
        naturalSlideWidth={widthImage}
        naturalSlideHeight={heightImage}
        totalSlides={pictures && pictures.length}
        step={1}
        hasMasterSpinner>
        <Slider>
          {pictures?.map((picture, idx) => (
            <Slide key={idx}>
              <ImageWithZoom
                src={picture}
                alt={picture.name}
                className="object-center object-cover w-full h-full rounded-sm"
              />
            </Slide>
          ))}
        </Slider>
        <ButtonBack
          className={`absolute top-${top} left-5 p-2 text-white transition duration-500 ease-in-out transform hover:scale-125 hover:-translate-y-1`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-${arrow} w-${arrow}`}
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
        <ButtonNext
          className={`absolute top-${top} right-5 p-2 text-white transition duration-500 ease-in-out transform hover:scale-125 hover:-translate-y-1`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-${arrow} w-${arrow}`}
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
    </>
  );
};

export default CarouselImages;
