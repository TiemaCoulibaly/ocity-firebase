import React, { memo, useEffect } from "react";
import {
  MapContainer,
  Popup,
  TileLayer,
  Marker,
  CircleMarker,
} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import PropTypes from "prop-types";

const MyMap = ({ coordinates, address, title }) => {
  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);
  return (
    <>
      {coordinates && (
        <MapContainer
          style={{ height: "40vh", margin: 0 }}
          center={[coordinates[1], coordinates[0]]}
          zoom={14}
          scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[coordinates[1], coordinates[0]]}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }>
            <Popup>
              City stade {title} <br /> {address}
            </Popup>
            <CircleMarker
              center={[coordinates[1], coordinates[0]]}
              pathOptions={{ color: "green" }}
              radius={70}></CircleMarker>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};
MyMap.propTypes = {
  coordinates: PropTypes.array,
  address: PropTypes.string,
  title: PropTypes.string,
  updateMode: PropTypes.bool,
};
export default memo(MyMap);
