import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

//Icon
const carIcon = new Leaflet.Icon({
  iconUrl: "../src/assets/delivery.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function MapPage() {
  // const [position, setPosition] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch("http://localhost:3000/vehicle", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) {
          throw new Error(error.message || "Ftch Failed");
        }
        if (accessToken) {
          setIsLogin(true);
        }
        const data = await res.json();
        setUsers(data.findVehicleId);
      } catch (err) {
        setError(err);
      }

    };


    fetchVehicle();


    const socket = io.connect("http://localhost:3000");


    socket.on("locationUpdate", (locationUpdate) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.licenserPlate === locationUpdate.licenserPlate ?
            { ...user, latitude: locationUpdate.latitude, longitude: locationUpdate.longitude }
            : user
        )
      )
    })

    socket.on("connect", () => {
      console.log("User connect");

    });
    return () => {
      socket.disconnect();
      console.log("User disconnect");
    };



  }, []);




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
          {isLogin && users ? (
            <div>{localStorage.getItem("role")}</div> //temporary user
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      <section>
        <div className="h-screen w-full flex justify-center flex-col items-center">
          <h1 className="text-xl mb-3 text-center">GPS Tracking</h1>
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={true}
            className="h-150 w-200 mb-10"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {users.map(user => {
              return (
                <Marker key={user._id} position={[user.latitude, user.longitude]} icon={carIcon}>
                  <Popup>
                    {user.driverName} <br />
                    Plate: {user.licenserPlate} <br />
                    Lat: {user.latitude}, Lng: {user.longitude}
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        </div>
      </section>
    </>
  );
}
