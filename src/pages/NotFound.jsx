import React, { memo } from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div
    className="
    flex
    items-center
    justify-center
    w-full
    h-16
    lg:h-auto md:h-auto
    bg-gradient-to-r
    from-green-100 to-green-200
    py-28
  ">
    <div className="px-10 lg:px-40 md:px-40 py-5 lg:py-20 md:py-20 bg-white rounded-md shadow-xl">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-green-600 text-9xl">404</h1>

        <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          <span className="text-green-400">Oops!</span> Page not found
        </h6>

        <p className="mb-8 text-center text-gray-500 md:text-lg">
          The page you’re looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="group relative w-full flex justify-center p-3 text-xl font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-green-800  hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Go home
        </Link>
      </div>
    </div>
  </div>
);

export default memo(NotFound);
