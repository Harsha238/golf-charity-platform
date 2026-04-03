import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Scores", path: "/scores" },
    { name: "Charities", path: "/charities" },
    { name: "Draws", path: "/draws" },
    { name: "Admin Panel", path: "/admin" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 sm:w-64 bg-black text-white flex flex-col justify-between z-[100] transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* TOP SECTION */}
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
            <h1
              onClick={() => navigate("/")}
              className="text-lg font-bold text-green-400 cursor-pointer"
            >
              GolfDraw
            </h1>

            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-white p-2 z-[110] relative"
            >
              <X size={26} />
            </button>
          </div>

          {/* Menu */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {menu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg transition ${
                  location.pathname === item.path
                    ? "bg-green-600"
                    : "hover:bg-green-500"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="p-4 border-t border-gray-700">
          <p className="text-sm">{user?.name || "Guest"}</p>
          <p className="text-xs text-gray-400">
            {user?.email || "No email"}
          </p>

          <button
            onClick={() => {
              logout();
              localStorage.removeItem("user");
              navigate("/");
            }}
            className="mt-2 text-sm text-red-400 hover:underline"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}