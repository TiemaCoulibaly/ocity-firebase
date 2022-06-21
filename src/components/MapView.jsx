import React, { useState } from "react";
// import GoogleMapReact from "google-map-react";
import ReactMapGL, { Marker } from "react-map-gl";

const MapView = () => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "800px",
    latitude: 48.8584,
    longitude: 17.071727,
    zoom: 2,
  });
  return (
    // <div className="w-full h-[100vh]">
    <ReactMapGL
      {...viewport}
      mapboxAccessToken={process.env.REACT_APP_APP_MAPBOX_API_KEY}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/tiema/cl4o2sat3000t15oc6u1w6g2g">
      <Marker
        longitude={2.2945}
        latitude={48.8584}
        offsetLeft={-20}
        offsetTop={-30}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </Marker>
    </ReactMapGL>
    // </div>
  );
};

export default MapView;
