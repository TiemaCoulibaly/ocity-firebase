import React, { memo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const MapView = ({ posts }) => {
  const position = [47, 2];

  const myCoord = posts.map((post) => post.coordinates);
  // console.log("erreur", myCoord);
  console.log(
    "essyae",
    myCoord.map((le) => le[0])
  );
  return (
    <>
      <MapContainer
        style={{ height: "100vh", width: "40vw", margin: 0 }}
        center={position}
        zoom={6}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {myCoord?.map((post, idx) => (
          <Marker key={idx} position={[post[1] && post[1], post[0] && post[0]]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default memo(MapView);
