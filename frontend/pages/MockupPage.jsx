import { useEffect } from "react";
import { useState } from "react";

export default function MockupPage() {
  const [location, setLocation] = useState("");
  const [licenserPlate, setLicenserPlate] = useState("");
  const [userVehicles, setUserVehicles] = useState([]);
  const [speed, setSpeed] = useState("");


  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location || !licenserPlate) {
      alert("Please select location & licenser Plate");
      return;
    }


    const [latitude, longitude] = location
      .replace("[", "")
      .replace("]", "")
      .split(",")
      .map((num) => parseFloat(num.trim()));

    try {
      const res = await fetch(
        `http://localhost:3000/vehicle/update/${licenserPlate}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
          body: JSON.stringify({ latitude, longitude }),
        }
      );

      if (res.ok) {
        alert("Location updated successfully");
      } else {
        const data = await res.json();
        alert("Failed to update: " + data.message);
      }
    } catch (err) {
      console.error(err.message);
    }


    const fetchVehicleLog = async () => {
      const vehicle = userVehicles.find(v =>
        v.licenserPlate === licenserPlate
      );

      try {
        const res = await fetch('http://localhost:3000/trip/log-location', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}`
          },
          body: JSON.stringify({ vehicleId: vehicle._id, latitude, longitude, speed })
        })
        if (res.ok) {
          console.log("Location updated successfully");
        } else {
          const data = await res.json();
          console.log("Failed to update: " + data.message);
        }
      } catch (err) {
        console.log("Failed to log location: " + err.message)
      }
    }
    fetchVehicleLog();
  };


  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const res = await fetch('http://localhost:3000/vehicle/getUser', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}`
          }
        })
        const data = await res.json();
        setUserVehicles(data);

      } catch (err) {
        console.log(err);
      }

    }
    fetchVehicleData();
  }, [accessToken])


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 gap-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm"
      >
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold mb-2 block">
            Mock data:
          </span>
          <select
            className="w-full p-2 border mb-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="mockData"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
            <option value="">Select location</option>
            <option value="[13.362458, 100.934921]">13.362458, 100.934921 : อ่างศิลา</option>
            <option value="[13.361143,	100.984673]">13.361143, 100.984673 : ตัวเมืองชลบุรี</option>
            <option value="[13.073463,	100.893261]">13.073463, 100.893261 : แหลมฉบัง</option>
            <option value="[13.006807, 100.912956]">13.006807, 100.912956 : พัทยาเหนือ</option>
          </select>

          <span className="text-gray-700 font-semibold mb-2 block">
            Speed data:
          </span>
          <select
            className="w-full p-2 border mb-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="mockData"
            onChange={(e) => setSpeed(e.target.value)}
            value={speed}
          >
            <option value="">Select speed</option>
            <option value="60">60</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option value="120">120</option>
          </select>

          <span className="text-gray-700 font-semibold mb-2 block">
            Licenser Plate:
          </span>


          <select
            className="w-full p-2 border mb-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="mockData"
            onChange={(e) => setLicenserPlate(e.target.value)}
            value={licenserPlate}

          ><option value="">Select licenser</option>
            {userVehicles.map((userVehicle) => {
              return (
                <option key={userVehicle._id}
                  value={userVehicle.licenserPlate}>
                  {userVehicle.licenserPlate}
                </option>
              )
            })}

          </select>
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mb-5 rounded-lg transition duration-200 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
