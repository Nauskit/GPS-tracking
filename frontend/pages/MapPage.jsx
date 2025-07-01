import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
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
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [pathLocation, setPathLocation] = useState([]);

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



    const socket = io("http://localhost:3000");


    socket.on("locationUpdate", (locationUpdate) => {
      console.log(locationUpdate.licenserPlate);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.licenserPlate === locationUpdate.licenserPlate ?
            { ...user, latitude: locationUpdate.latitude, longitude: locationUpdate.longitude, speed: locationUpdate.speed }
            : user
        )
      )
    })

    socket.on("overspeed", (data) => {
      console.log(data);
      alert(`${data.licenserPlate} overpeed: ${data.speed}`)
    })

    socket.on("connect", () => {
      console.log("User connect");

    });
    return () => {
      socket.disconnect();
      console.log("User disconnect");
    };


  }, []);




  const handleSubmitPolyline = async (e) => {
    e.preventDefault();
    setPathLocation([]); //clear polyline when fetch
    try {
      const res = await fetch(`http://localhost:3000/trip/${selectedVehicleId}`)
      const data = await res.json();
      setPathLocation(data.path || []);
    } catch (err) {
      alert("Not found Path or null ")
      console.log(err);

    }
  }








  const position = [13.7563, 100.5018];


  return (
    <>
      <nav className="flex items-center justify-between bg-gray-200 p-3 h-20">
        <div>
          <a href="/" className="text-xl outline-0">
            GPS TRACKING WEB
          </a>
        </div>
        <div className="gap-5 flex">
          <Link to="/vehicle/create">Dashboard</Link>
          {isLogin && users ? (
            <div>{localStorage.getItem("role")}</div> //temporary user
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>

      <section className="flex flex-row">
        <main className="h-screen w-full flex flex-2 justify-center flex-col items-center">

          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {users.map(user => {
              return (
                <Marker key={user._id}
                  position={[user.latitude, user.longitude]} icon={carIcon}>
                  <Popup>
                    {user.driverName} <br />
                    Plate: {user.licenserPlate} <br />
                    Lat: {user.latitude}, Lng: {user.longitude} <br />
                    Status: {user.onTrip ? "On Trip" : "Idle"} <br />
                    Speed: {user.speed}
                  </Popup>
                </Marker>
              )
            })}
            {pathLocation.length > 0 && (
              <Polyline positions={pathLocation.map(p => [p.latitude, p.longitude])} color="blue" />
            )}
          </MapContainer>
        </main>
        <aside className="h-screen bg-white flex-1">
          <div>
            <h1>Licenser</h1>
            <select value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}>
              <option value="">Select Licenser</option>
              {users.map(user => {
                return (
                  <option key={user._id} value={user._id}>
                    {user.licenserPlate}
                  </option>
                )
              })}
            </select>
            <button
              className="cursor-pointer"
              type="button"
              onClick={handleSubmitPolyline}>Send</button>
          </div>


        </aside>
      </section>

    </>
  );
}
