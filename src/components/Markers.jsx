import { Icon } from "leaflet";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Marker, Popup, useMap } from "react-leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";

const Markers = ({ posts, setChildClicked }) => {
  const map = useMap();
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
      {posts?.map((post, i) => (
        <Marker
          key={i}
          eventHandlers={{
            click: (e) => {
              map.setView([post.coordinates[1], post.coordinates[0]], 10);

              setChildClicked(i);
            },
          }}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
          position={[post.coordinates[1], post.coordinates[0]]}
        >
          <Popup>
            {post.title} <br /> {post.address} <br />
          </Popup>
        </Marker>
      ))}
    </>
  );
};
Markers.propTypes = {
  posts: PropTypes.array,
  setChildClicked: PropTypes.func,
};
export default Markers;
