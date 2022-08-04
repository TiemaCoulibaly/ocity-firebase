import React, { memo, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const MapView = ({ posts }) => {
  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);
  const position = [47, 2];

  const allPosts = posts.map((post) => post);

  return (
    <>
      <MapContainer
        style={{ height: "100vh", width: "40vw", margin: 0 }}
        center={position}
        zoom={6}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allPosts?.map((post, idx) => (
          <Marker
            key={idx}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
            position={[post.coordinates[1], post.coordinates[0]]}>
            <Popup>
              {post.title} <br /> {post.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default memo(MapView);
