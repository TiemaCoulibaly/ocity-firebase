import { memo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Markers from "./Markers";

type MapViewProps = {
  posts: string[];
  setChildClicked: React.Dispatch<number>;
};

const MapView = ({ posts, setChildClicked }: MapViewProps) => {
  const position = [46.7111, 1.7191];
  const zoomLevel = 6;

  return (
    <>
      <MapContainer
        style={{ height: "100vh", width: "40vw", margin: 0 }}
        center={position}
        zoom={zoomLevel}
        scrollWheelZoom={true}
      >
        <Markers setChildClicked={setChildClicked} posts={posts} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
};

export default memo(MapView);
