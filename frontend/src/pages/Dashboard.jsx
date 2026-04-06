import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Trophy, DollarSign, Heart, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { API } from "../config";

export default function Dashboard() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "https://golf-charity-platform-qlvk.onrender.com";

  const [user, setUser] = useState(null);
  const [scores, setScores] = useState([]);
  const [winners, setWinners] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const winnersRes = await fetch(`${API}/api/scores`);
        const winnersData = await winnersRes.json();

        // ✅ FIX: get scores from localStorage (NOT backend)
        const localScores = JSON.parse(localStorage.getItem("scores")) || [];

        setScores(localScores);
        setWinners(Array.isArray(winnersData) ? winnersData.reverse() : []);

        const savedUser = JSON.parse(localStorage.getItem("user")) || null;
        const savedCharity =
          JSON.parse(localStorage.getItem("selectedCharity")) || null;

        setUser(savedUser);
        setSelectedCharity(savedCharity);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

    // ✅ REAL-TIME UPDATE
    useEffect(() => {
  const socket = io(API);

  socket.on("update", () => {
    const updatedScores = JSON.parse(localStorage.getItem("scores")) || [];
    setScores(updatedScores);
  });

  return () => socket.disconnect();
    }, []);
  
  

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 p-4 md:p-8 md:ml-64 overflow-y-auto">
        <div className="md:hidden mb-4 relative z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gray-200 p-2 rounded shadow"
          >
            ☰
          </button>
        </div>


        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-black font-medium"
        >
          ← Back to Home
        </button>

        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || "User"}!
        </h1>

        <p className="text-gray-600 mt-1">
          Here's your golf & draw overview.
        </p>

        <div className="mt-6 p-5 bg-white rounded-xl border shadow-sm flex items-center gap-3">
          <div className="bg-green-100 text-green-600 p-2 rounded-full">✨</div>
          <div>
            <p className="font-semibold text-gray-900">Active Subscription</p>
            <p className="text-sm text-gray-500">Monthly Plan</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          ❤️ Charity: {selectedCharity?.name || "None"}
        </p>

        <div className="grid md:grid-cols-4 gap-5 mt-6">
          <StatCard
            title="Scores Logged"
            value={scores.length}
            sub="Last 5 rounds"
            icon={<Trophy />}
            color="green"
          />

          <StatCard
            title="Total Winnings"
            value={`€${winners.length * 100}`}
            icon={<DollarSign />}
            color="yellow"
          />

          <StatCard
            title="Donated"
            value={`€${scores.length * 10}`}
            icon={<Heart />}
            color="red"
          />

          <StatCard
            title="Draws Entered"
            value={scores.length}
            icon={<Ticket />}
            color="gray"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Recent Scores */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg text-gray-900">
                Recent Scores
              </h2>

              <p
                onClick={() => navigate("/scores")}
                className="text-sm text-gray-500 cursor-pointer hover:underline"
              >
                View All →
              </p>
            </div>

            {scores.length === 0 ? (
              <p className="text-gray-500">No scores yet</p>
            ) : (
              scores.slice(0, 5).map((s, index) => (
                <div
                  key={s._id || s.id || index}
                  className="bg-white p-5 rounded-xl border shadow-sm flex justify-between items-center mb-2"
                >
                  <div className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-lg">
                    {s.score}
                  </div>

                  <p className="text-gray-500 text-sm">
                    {new Date(s.date).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Recent Draws */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg text-gray-900">
                Recent Draws
              </h2>

              <p
                onClick={() => navigate("/draws")}
                className="text-sm text-green-600 cursor-pointer hover:underline font-medium"
              >
                View All →
              </p>
            </div>

            {winners.length === 0 ? (
              <p className="text-gray-500">No draws yet</p>
            ) : (
              winners.slice(0, 2).map((w, index) => (
                <div
                  key={w._id || w.id || index}
                  className="bg-white p-5 rounded-xl border shadow-sm mb-2"
                >
                  <h3 className="font-semibold text-gray-900">
                    Winner Score: {w.score}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {w.date
                      ? new Date(w.date).toLocaleDateString()
                      : "No date"}
                  </p>

                  <div className="mt-2 text-sm text-gray-700">
                    💰 Prize: €100
                  </div>

                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded mt-2 inline-block">
                    Completed
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon, color }) {
  const colors = {
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-500",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="p-5 bg-white rounded-xl border shadow-sm flex justify-between items-center hover:shadow-lg transition">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">{value}</h2>
        {sub && <p className="text-xs text-gray-500">{sub}</p>}
      </div>

      <div className={`p-3 rounded-lg ${colors[color]}`}>
        {icon}
      </div>
    </div>
  );
}