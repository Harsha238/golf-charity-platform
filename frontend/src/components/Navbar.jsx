import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-black/30 backdrop-blur-lg border-b border-gray-800">

      <h1 className="text-xl font-bold text-purple-400">
        Fairway Fund
      </h1>

      <div className="flex gap-6 text-gray-300">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/draws">Draws</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </div>
  );
}