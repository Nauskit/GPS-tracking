import { useEffect, useState } from "react";
import image from "../src/assets/transport-unsplash.jpg";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  return (
    <div
      className="bg-center bg-cover h-screen relative overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 backdrop-blur-sm h-screen">
        <div className="h-screen w-screen flex justify-center items-center flex-col text-white">
          <div className="text-6xl md:text-7xl font-bold mb-8 animate-fade-in-down">
            <h1>GPS Tracking</h1>
          </div>
          <div className="flex gap-6">
            <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
              <Link to="/map">Get Started</Link>
            </button>
            {!accessToken && (
              <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                <Link to="/login">Login</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}