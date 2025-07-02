import { useEffect } from "react";
import { useState } from "react";


export default function TripPage() {
    const [licenserPlate, setLicenserPlate] = useState("");
    const [userVehicles, setUserVehicles] = useState([]);
    const [currentTrip, setCurrentTrip] = useState(null);
    const [loading, setLoading] = useState(false);

    const accessToken = localStorage.getItem("accessToken");


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

    const handleStartTrip = async () => {
        if (!licenserPlate) {
            alert("Please select licenser plate")
            return;
        }

        const vehicle = userVehicles.find(v =>
            v.licenserPlate === licenserPlate
        );



        if (!vehicle) {
            alert("Selected vehicle not found");
            return;
        }
        setLoading(true);

        try {
            const res = await fetch('http://localhost:3000/trip/start', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vehicleId: vehicle._id })
            })
            const data = await res.json();
            setCurrentTrip(data);
            alert("Trip started successfully")
            console.log(data);


        } catch (err) {
            alert("error starting trip: " + err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleFinishTrip = async () => {
        if (!currentTrip) {
            alert("No trip to finish");
            return;
        }
        console.log(currentTrip._id);


        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/trip/${currentTrip._id}/finish`, {
                method: "PUT",
            })
            if (!res.ok) {
                const data = await res.json();
                alert("Failed to finish trip: " + data.message)
            } else {
                setCurrentTrip(null);
                alert("Trip finished successfully")
            }

        } catch (err) {
            alert("error finishing trip: " + err.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 gap-10">
            <form className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm">
                <label className="block mb-4">
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

                <div className="flex gap-5">
                    <button
                        type="button"
                        onClick={handleStartTrip}
                        disabled={
                            loading || !licenserPlate || currentTrip !== null
                        }
                        className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mb-3 
                            ${loading || !licenserPlate || currentTrip !== null
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                    >
                        Ontrip
                    </button>
                    <button
                        type="button"
                        onClick={handleFinishTrip}
                        disabled={loading || currentTrip === null}
                        className={`w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mb-3 
                            ${loading || currentTrip === null
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                    >
                        Finish Trip
                    </button>
                </div>
            </form></div>
    )
}
