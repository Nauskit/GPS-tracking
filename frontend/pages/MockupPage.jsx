import { useEffect, useState } from "react";

export default function MockupPage() {
  const [location, setLocation] = useState("");
  const [licenserPlate, setLicenserPlate] = useState("");

  //Can't fetch
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
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
            <option value="[13.000, 18.000]">13.000, 18.000</option>
            <option value="[14.000, 19.000]">14.000, 19.000</option>
            <option value="[15.000, 20.000]">15.000, 20.000</option>
            <option value="[16.000, 21.000]">16.000, 21.000</option>
          </select>
          <span className="text-gray-700 font-semibold mb-2 block">
            Licenser Plate:
          </span>
          <select
            className="w-full p-2 border mb-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="mockData"
            onChange={(e) => setLicenserPlate(e.target.value)}
            value={licenserPlate}
          >
            <option value="">Select licenser</option>
            <option value="กต1425">กต1425</option>
            <option value="บล1443">บล1443</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
