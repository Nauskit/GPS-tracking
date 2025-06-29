import image from "../src/assets/transport-unsplash.jpg";
import { Link } from "react-router-dom";

export default function HomePage() {


  return (
    <>
      <div
        className="bg-center bg-cover h-screen"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="bg-white/30 backdrop-blur-sm h-screen">
          <div className="h-screen w-screen flex justify-center items-center flex-col">
            <div className="text-5xl mb-5">
              <h1>GPS Tracking</h1>
            </div>
            <div className="flex gap-5">
              <button className="hover:text-blue-600 border-2 p-2 bg-gray-100">
                <Link to="/map">Get Start</Link>
              </button>

              <button className="hover:text-blue-500 p-2">
                <Link to="/login">Login</Link>
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
