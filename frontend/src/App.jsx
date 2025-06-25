import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MapPage from "../pages/MapPage";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import VehiclePage from "../pages/VehiclePage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/vehicle/create" element={<VehiclePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
