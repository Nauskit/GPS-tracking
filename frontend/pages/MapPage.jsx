import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import { Link } from "react-router-dom";

//Icon
const carIcon = new Leaflet.Icon({
  iconUrl: "../src/assets/delivery.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function MapPage() {
  const position = [13.7563, 100.5018];

  return (
    <>
      <nav className="flex items-center justify-between bg-gray-200 p-3 h-15 mb-10">
        <div>
          <a href="/" className="text-xl">
            GPS TRACKING WEB
          </a>
        </div>
        <div className="gap-5 flex">
          <Link to="/vehicle/create">Create</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <section>
        <div className="h-screen w-full flex justify-center flex-col items-center">
          <h1 className="text-xl mb-3 text-center">GPS Tracking</h1>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            className="h-150 w-200 mb-10"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={position} icon={carIcon}>
              <Popup>
                You're Here! <br /> (Latitude: {position[0]}, Longitude:{" "}
                {position[1]})
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </>
  );
}
