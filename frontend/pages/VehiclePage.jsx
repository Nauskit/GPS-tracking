import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

export default function VehiclePage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [licenser, setLicenser] = useState("");
  const [carType, setCarType] = useState("");
  const [popupLog, setPopupLog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [locationLogs, setLocationLogs] = useState([]);


  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchVehicle = async () => {
      try {
        const res = await fetch("http://localhost:3000/vehicle", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) {
          throw new Error(error.message || "Fetch data failed");
        }
        const data = await res.json();
        setUsers(data.findVehicleId);
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    };
    fetchVehicle();
  }, []);

  const handleSubmit = async (e) => {
    const accessToken = localStorage.getItem("accessToken");
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/vehicle/create", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          driverName: driverName,
          licenserPlate: licenser,
          carType: carType
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error");
      }
      alert(data.message);
      setPopup(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmitLog = async (driverId) => {
    try {
      const res = await fetch(`http://localhost:3000/locationlog/${driverId}`)
      const data = await res.json();
      setLocationLogs(data);
    } catch (err) {
      setError(err)
    }
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">
            {users[0]?.userId?.username || "Let's Login"}
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setPopup(true)}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
            >
              + Create Vehicle
            </button>
            <Link to="/map" className="bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md">
              Back to Map
            </Link>
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg shadow">
            {error}
          </div>
        )}

        {!error && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-4 text-left font-semibold">Type</th>
                    <th className="p-4 text-left font-semibold">License Plate</th>
                    <th className="p-4 text-left font-semibold">Driver Name</th>
                    <th className="p-4 text-left font-semibold">Status</th>
                    <th className="p-4 text-left font-semibold">Location Log</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-4">{user.carType}</td>
                      <td className="p-4">{user.licenserPlate}</td>
                      <td className="p-4">{user.driverName}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${user.onTrip ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                        >
                          {user.onTrip ? "On Trip" : "Idle"}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={async () => {
                            setSelectedVehicle(user);
                            setPopupLog(true);
                            await handleSubmitLog(user._id);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          View Log
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {popup && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-800">Register Vehicle</h2>
                <button
                  onClick={() => setPopup(false)}
                  className="text-gray-600 hover:text-gray-800 font-bold text-lg"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Driver Name</label>
                  <input
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Somchai"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">License Plate</label>
                  <input
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="ทส1122"
                    value={licenser}
                    onChange={(e) => setLicenser(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Car Type</label>
                  <input
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Truck"
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
                >
                  Create Vehicle
                </button>
              </form>
            </div>
          </div>
        )}

        {popupLog && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white
            p-8 rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-800">Location Log for {selectedVehicle?.driverName}</h2>
                <button
                  onClick={() => setPopupLog(false)}
                  className="text-gray-600 hover:text-gray-800 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <p className="font-semibold text-gray-800">Driver Name: {selectedVehicle?.driverName}</p>
                <p className="text-gray-600">License Plate: {selectedVehicle?.licenserPlate}</p>
              </div>

              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-blue-800">
                    <th className="p-4 text-left font-semibold">Trip ID</th>
                    <th className="p-4 text-left font-semibold">Latitude</th>
                    <th className="p-4 text-left font-semibold">Longitude</th>
                    <th className="p-4 text-left font-semibold">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {locationLogs.length > 0 ? (
                    locationLogs.map((location, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-4">{location.tripId || '-'}</td>
                        <td className="p-4">{location.latitude}</td>
                        <td className="p-4">{location.longitude}</td>
                        <td className="p-4">{new Date(location.createdAt).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-600">No location logs available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
