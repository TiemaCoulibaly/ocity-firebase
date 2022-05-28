import React from "react";
import GoogleMapReact from "google-map-react";

const Map = () => {
  const coords = { lat: 0, lng: 0 };
  return (
    <div className="h-96 w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={""}
        onChildClick={""}></GoogleMapReact>
    </div>
  );
};

export default Map;
