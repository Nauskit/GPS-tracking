
import LoginPage from '../pages/LoginPage'
import MapPage from '../pages/MapPage'
import { Routes, BrowserRouter, Route } from "react-router-dom"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/map' element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
