import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import Leaflet from "leaflet";
import { Link, useNavigate } from "react-router-dom";
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
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

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
          throw new Error(error.message || "Fetch Failed");
        }
        if (accessToken) {
          setIsLogin(true);
        }
        const data = await res.json();
        setUsers(data.findVehicleId);
        console.log(data.findVehicleId);
      } catch (err) {
        setError(err);
      }
    };
    fetchVehicle();

    const socket = io("http://localhost:3000");

    socket.on("locationUpdate", (locationUpdate) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.licenserPlate === locationUpdate.licenserPlate
            ? {
                ...user,
                latitude: locationUpdate.latitude,
                longitude: locationUpdate.longitude,
                speed: locationUpdate.speed,
                onTrip: locationUpdate.onTrip,
              }
            : user
        )
      );
    });

    socket.on("overspeed", (data) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.licenserPlate === data.licenserPlate
            ? { ...user, isOverspeed: true }
            : user
        )
      );
    });

    socket.on("connect", () => {
      console.log("User connect");
    });
    return () => {
      socket.disconnect();
      console.log("User disconnect");
    };
  }, []);

  const handleSubmitPolylineById = async (vehicleId) => {
    setPathLocation([]); // clear polyline first

    try {
      const res = await fetch(`http://localhost:3000/trip/${vehicleId}`);
      const data = await res.json();

      if (data.status === "onTrip") {
        setPathLocation(data.path || []);
      } else {
        setPathLocation([]); // clear polyline
        console.log("Finish Trip");
      }
    } catch (err) {
      alert("Not found Path or null");
      console.error(err);
    }
  };

  const handleClearOverspeed = async (vehicleId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/trip/${vehicleId}/clear-overspeed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to clear overspeed status");
      }
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === vehicleId ? { ...u, isOverspeed: false } : u
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    setShowLogoutPopup(false);
    setIsLogin(false);
    navigate("/");
  };

  const position = [13.7563, 100.5018];

  return (
    <>
      <nav className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 p-4 h-16 shadow-lg">
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-blue-200 transition-colors"
          >
            GPS TRACKING WEB
          </Link>
        </div>
        <div className="flex gap-6 text-white">
          <Link
            to="/vehicle/create"
            className="hover:text-blue-200 transition-colors"
          >
            Dashboard
          </Link>
          {isLogin && users ? (
            <div
              className="font-semibold cursor-pointer select-none"
              onClick={() => setShowLogoutPopup(true)}
            >
              {localStorage.getItem("username") || "user"}
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      {showLogoutPopup && (
        <div className="relative">
          <div className="bg-white rounded-lg p-6 w-80 shadow-xl text-center absolute top-0 right-0">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="flex flex-row h-[calc(100vh-4rem)]">
        <main className="flex-3 w-full">
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            {users.map((user) => (
              <Marker
                key={user._id}
                position={[user.latitude, user.longitude]}
                icon={carIcon}
              >
                <Popup>
                  <div className="font-semibold">{user.driverName}</div>
                  <div>Plate: {user.licenserPlate}</div>
                  <div>
                    Lat: {user.latitude}, Lng: {user.longitude}
                  </div>
                  <div>Status: {user.onTrip ? "On Trip" : "Idle"}</div>
                  <div>Speed: {user.speed} km/h</div>
                </Popup>
              </Marker>
            ))}
            {pathLocation.length > 0 && (
              <Polyline
                positions={pathLocation.map((p) => [p.latitude, p.longitude])}
                color="blue"
              />
            )}
          </MapContainer>
        </main>
        <aside className="flex-1 bg-gray-50 shadow-inner h-full overflow-y-auto">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
              Vehicles on Road
            </h1>
            <ul className="space-y-3">
              {users.map((user) => (
                <li
                  key={user._id}
                  onClick={() => {
                    setSelectedVehicleId(user._id);
                    handleSubmitPolylineById(user._id);
                  }}
                  className={`flex justify-between items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedVehicleId === user._id
                      ? "bg-blue-100 border-l-4 border-blue-600"
                      : "bg-white hover:bg-gray-100"
                  } shadow-sm`}
                >
                  <div className="flex items-center">
                    <img
                      className="h-6 w-6 mr-4"
                      src={
                        user.onTrip
                          ? "../src/assets/greenSign.png"
                          : "../src/assets/redSign.png"
                      }
                      alt={user.onTrip ? "On Trip" : "Idle"}
                    />
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {user.driverName}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {user.licenserPlate}
                      </p>
                    </div>
                  </div>
                  <img
                    className="h-6 w-6 cursor-pointer"
                    src={
                      user.isOverspeed
                        ? "../src/assets/notification-red.png"
                        : "../src/assets/notification.png"
                    }
                    alt={user.isOverspeed ? "Overspeed" : "Normal"}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (user.isOverspeed) {
                        handleClearOverspeed(user._id);
                        alert("Overspeed cleared");
                      }
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
