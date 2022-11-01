import { memo } from "react";
import PropTypes from "prop-types";

import logo from "../images/logo-black-green.png";
import footOnSoccerBall from "../images/foot-on-soocer-ball.jpg";

import cityView from "../images/city-view.jpg";
import stadium from "../images/stadium.jpg";
import goalkeeper from "../images/goalkeeper.jpg";
import soccerPass from "../images/soccer-pass.jpg";
import whiteNet from "../images/white-net.jpg";
import tribune from "../images/tribune.jpg";

const Header = () => {
  return (
    <div className="relative overflow-hidden mt-20">
      <div className="pb-80 lg:pt-40 lg:pb-48">
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 md:px-6 sm:px-6 sm:static">
          <img
            src={logo}
            alt="logo"
            className="h-20 mx-auto md:mx-auto lg:ml-32"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">O'City</span>{" "}
              <span className="block text-green-600 xl:inline">Stade</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mx-auto  md:max-w-xl md:mt-5 md:text-xl lg:mx-0">
              Trouver un city stade n'a jamais été aussi facile{" "}
            </p>
          </div>

          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 md:left-1/2 md:top-0 md:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-40 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0   md:opacity-0 lg:opacity-100">
                        <img
                          src={footOnSoccerBall}
                          alt="foot-on-SoccerBall"
                          className="w-full h-full object-center object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src={goalkeeper}
                          alt="goalkeeper"
                          className="w-full h-full object-center object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    {/*  */}
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-1 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src={tribune}
                          alt="tribune"
                          className="w-full h-full object-center object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src={stadium}
                          alt="soccer-stadium"
                          className="w-full h-full object-center object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src={whiteNet}
                          alt="white-net"
                          className="w-full h-full object-center object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-auto">
                        <img
                          src={soccerPass}
                          alt="soccer-pass"
                          className="w-full h-full object-center object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src={cityView}
                          alt="city-view"
                          className="w-full h-full object-center object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Header.propTypes = {
  logo: PropTypes.string,
};

export default memo(Header);
