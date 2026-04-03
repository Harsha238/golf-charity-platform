import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MyScores from "./pages/MyScores";
import Charities from "./pages/Charities";
import Draws from "./pages/Draws";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Routes>

      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Dashboard (Protected) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/charities"
  element={
    <ProtectedRoute>
      <Charities />
    </ProtectedRoute>
  }
/>

      {/* Other Pages */}
      <Route path="/scores" element={<MyScores />} />
      <Route path="/charities" element={<Charities />} />
      <Route path="/draws" element={<Draws />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  );
}

export default App;