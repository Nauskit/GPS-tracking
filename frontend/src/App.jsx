import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MapPage from "../pages/MapPage";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import VehiclePage from "../pages/VehiclePage";
import MockupPage from "../pages/MockupPage";
import TripPage from "../pages/TripPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/vehicle/create" element={<VehiclePage />} />
        <Route path="/mockup" element={<MockupPage />} />
        <Route path="/trip" element={<TripPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
