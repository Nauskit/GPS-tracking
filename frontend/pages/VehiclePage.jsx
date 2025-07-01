import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

export default function VehiclePage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [licenser, setLicenser] = useState("");
  const [carType, setCarType] = useState("");


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

  const handleSumbit = async (e) => {
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

  return (
    <>
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {users[0]?.userId?.username || "Let's Login"}
          </h1>
          <div className="flex gap-3">


            <button
              onClick={() => setPopup(true)}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              + Create
            </button>
            <Link to='/map' className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600">Back</Link>
          </div>
        </header>
        {error && <div>{error}</div>}

        {!error && (
          <div className="bg-white rounded-lg shadow mt-10">
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-stone-400">
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Licensor Plate</th>
                    <th className="p-3 text-left">Driver name</th>
                    <th className="p-3 text-left">On Trip</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    return (
                      <tr key={user._id} className="border-b-2">
                        <td className="p-3">{user.carType}</td>
                        <td className="p-3">{user.licenserPlate}</td>
                        <td className="p-3">{user.driverName}</td>
                        <td className="p-3">{user.onTrip ? "On trip" : "Idle"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {popup && (
          <div
            className="fixed bg-black/50 min-h-screen z-10 w-screen flex
        justify-center items-center top-0 left-0"
          >
            <div className="bg-white p-4">
              <div className="flex flex-col gap-4 max-w-[400px]">
                <div className="flex justify-between">
                  <h2>Register Vehicle</h2>
                  <a
                    className="cursor-pointer"
                    onClick={() => setPopup(false)}
                  >
                    X
                  </a>
                </div>

                <form onSubmit={handleSumbit} className="space-y-4">
                  <div>
                    <label>Driver Name</label>
                    <input
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                      type="text"
                      placeholder="Somchai"
                      onChange={(e) => setDriverName(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label>Licensor Plate</label>
                    <input
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                      type="text"
                      placeholder="ทส1122"
                      onChange={(e) => setLicenser(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label>Car type</label>
                    <input
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                      type="text"
                      placeholder="truck"
                      onChange={(e) => setCarType(e.target.value)}
                    ></input>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md
                    hover:bg-blue-700 transition duration-200"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div >
        )
        }
      </main >
    </>
  );
}
