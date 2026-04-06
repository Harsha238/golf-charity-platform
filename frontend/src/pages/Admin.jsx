import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Shield, Trophy, Heart, Users } from "lucide-react";
import { io } from "socket.io-client";
import { BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer } from "recharts";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("draws");
  const [showModal, setShowModal] = useState(false);
  const [editCharity, setEditCharity] = useState(null);
  const API = import.meta.env.VITE_API_URL || "https://golf-charity-platform-qlvk.onrender.com";
  const socket = io(API);

  const [charities, setCharities] = useState([]);
  const [winners, setWinners] = useState([]);
  const [users, setUsers] = useState([]);
  const [draws, setDraws] = useState([]);
  const [amount, setAmount] = useState(1000);
  const [isOpen, setIsOpen] = useState(false);
  const chartData = draws
  .filter(d => d.amount) // only valid data
  .map((d) => ({
    name: new Date(d.date).toLocaleDateString(),
    amount: Number(d.amount)
  }));
  

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "other",
    website: "",
    logo: ""
  });

  useEffect(() => {
    fetchDraws();
    fetchWinners();
    fetchUsers();
  }, []);

  useEffect(() => {
    socket.on("newWinner", (newWinner) => {
      setWinners((prev) => {
        if (prev.find(w => w._id === newWinner._id)) return prev;
        return [newWinner, ...prev];
      }); 
      setActiveTab("winners");
    });

    return () => socket.disconnect();
  }, []);

  

  useEffect(() => {
    const savedCharities = JSON.parse(localStorage.getItem("charities")) || [];
    setCharities(savedCharities);
  }, []);



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateCharity = () => {
  if (!form.name) {
    alert("Name required");
    return;
  }

  let updated;

  if (editCharity) {
    // ✅ UPDATE
    updated = charities.map(c =>
      c.id === editCharity.id ? { ...c, ...form } : c
    );
  } else {
    // ✅ CREATE
    const newCharity = {
      id: Date.now(),
      ...form
    };
    updated = [...charities, newCharity];
  }

  setCharities(updated);
  localStorage.setItem("charities", JSON.stringify(updated));

  setShowModal(false);
  setEditCharity(null);

  setForm({
    name: "",
    description: "",
    category: "other",
    website: "",
    logo: ""
  });
};

  const fetchDraws = async () => {
  const data = await fetch(`${API}/api/draw`).then(res => res.json());
  setDraws(data);
};

const fetchWinners = async () => {
  const data = await fetch(`${API}/api/winners`).then(res => res.json());
  setWinners(data);
};

const fetchUsers = async () => {
  const data = await fetch(`${API}/api/users`).then(res => res.json());
  setUsers(data);
};

const createDraw = async () => {
  try {
    const res = await fetch(`${API}/api/draw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: Number(amount) })
    });

    const data = await res.json();

    fetchDraws(); // ✅ STEP 2 FIX
    alert("Draw created ✅");

  } catch (err) {
    console.log(err);
  }
};

  const runDraw = async (id) => {
    try {
      await fetch(`${API}/api/draw/run/${id}`, {
        method: "POST"
      });
      fetchDraws(); // ✅ STEP 2 FIX
      fetchWinners(); // ✅ STEP 2 FIX
      alert("Draw completed");
    }
    catch (err) {
      console.log(err);
    }
  };

  
  console.log("CHART DATA:", chartData);
  console.log("DRAWS:", draws);

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
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="bg-gray-200 p-2 rounded-full">
            <Shield className="text-gray-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Panel
            </h1>
            <p className="text-gray-700 text-sm font-medium">
              Manage the platform
            </p>
          </div>
        </div>

        {/* ✅ ADD THIS STATS SECTION HERE */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Draws</p>
    <p className="text-xl font-bold">{draws.length}</p>
  </div>

  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Winners</p>
    <p className="text-xl font-bold">{winners.length}</p>
  </div>

  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Users</p>
    <p className="text-xl font-bold">{users.length}</p>
  </div>

  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Pool</p>
    <p className="text-xl font-bold">
      ₹{draws.reduce((a, b) => a + (b.amount || 0), 0)}
    </p>
  </div>

</div>

        <div className="flex gap-3 mt-6 overflow-x-auto pb-2 sticky top-0 bg-gray-100 z-10">
          <Tab label="Draws" icon={<Trophy />} active={activeTab === "draws"} onClick={() => setActiveTab("draws")} />
          <Tab label="Winners" icon={<Trophy />} active={activeTab === "winners"} onClick={() => setActiveTab("winners")} />
          <Tab label="Charities" icon={<Heart />} active={activeTab === "charities"} onClick={() => setActiveTab("charities")} />
          <Tab label="Users" icon={<Users />} active={activeTab === "users"} onClick={() => setActiveTab("users")} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow mt-6">

  <h2 className="text-lg font-semibold text-gray-900 mb-4">
    Draw Analytics
  </h2>

  {chartData.length === 0 ? (
    <p className="text-gray-400 text-center">
      No data available
    </p>
  ) : (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" />
      </BarChart>
    </ResponsiveContainer>
  )}

</div>

        <div className="mt-6">

          {activeTab === "draws" && (
            <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-4">
                Create Monthly Draw
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="border p-2 rounded-lg w-full sm:w-48 text-gray-900"
                />

                <button
                  onClick={createDraw}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  + Create Draw
                </button>
              </div>

              <h2 className="mt-6 font-semibold text-gray-900">Upcoming Draws</h2>

              <div className="mt-3 space-y-3 max-h-[250px] overflow-y-auto pr-2">
                {draws.filter(d => d.status === "upcoming").map(d => (
                  <div
  key={d._id}
  className="p-4 rounded-xl bg-white shadow hover:shadow-md transition flex justify-between items-center border"
>
  <div>
    <p className="font-semibold text-gray-900">
      {new Date(d.date).toDateString()}
    </p>
    <p className="text-sm text-gray-500">
      Pool: ₹{d.amount}
    </p>
  </div>

  <button
    onClick={() => runDraw(d._id)}
    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
  >
    ▶ Run
  </button>
</div>
                ))}
              </div>

              <h2 className="mt-6 font-semibold text-gray-900">Completed Draws</h2>

<div className="grid md:grid-cols-2 gap-6 mt-3 max-h-[350px] overflow-y-auto pr-2">

  {draws
    .filter((d) => d.status === "completed")
    .map((draw) => {

      const numbers = draw.winningNumbers||[];

      return (
        <div
          key={draw._id}
        className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl hover:shadow-xl transition border"
        >

          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="font-semibold text-gray-900">
                {new Date(draw.date).toDateString()}
              </p>
              <p className="text-sm text-gray-500">
                📅 {new Date(draw.date).toDateString()}
              </p>
            </div>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Completed
            </span>
          </div>

          {/* Winning Numbers */}
          <p className="text-sm text-gray-500 mt-3 mb-2">
            WINNING NUMBERS
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {numbers.map((n, i) => (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full font-semibold"
              >
                {n}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between text-sm text-gray-600">
            <p>💰 Pool: ₹{draw.amount}</p>
            <p>👥 Players: {draw.players?.length || 0}</p>
          </div>

        </div>
      );
    })}

</div>

            </div>
          )}

          {activeTab === "winners" && (
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="font-semibold text-gray-900">
                Winners Management
              </h2>

              <div className="mt-4 space-y-3 max-h-[250px] overflow-y-auto pr-2">
                {winners.map((w) => (
                  <div
  key={w._id || w.id}
  className="bg-yellow-50 p-4 rounded-xl shadow flex justify-between items-center border"
>
  <div>
    <p className="text-black font-bold text-lg">🏆 {w.name}</p>
    <p className="text-sm text-gray-600">Score: {w.score}</p>
    <p className="text-green-600 font-semibold">₹{w.prize}</p>
  </div>

  <div className="text-gray-400 text-xs">
    {new Date(w.date).toDateString()}
  </div>
</div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "charities" && (
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">
                  Charities ({charities.length})
                </h2>

                <button
  onClick={() => {
    setEditCharity(null); // ✅ clear edit mode

    setForm({
      name: "",
      description: "",
      category: "other",
      website: "",
      logo: ""
    });

    setShowModal(true);
  }}
  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
>
  + Add Charity
</button>
              </div>

              <div className="mt-4 space-y-3 max-h-[250px] overflow-y-auto pr-2">
                {charities.map((c) => (
                  <div key={c.id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full font-bold text-gray-700">
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{c.name}</p>
                        <p className="text-sm text-gray-600">{c.category}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">

  {/* EDIT */}
  <button
    onClick={() => {
      setEditCharity(c);
      setForm({
        name: c.name,
        category: c.category,
        description: c.description || "",
        website: c.website || "",
        logo: c.logo || ""
      });
      setShowModal(true);
    }}
    className="text-blue-600"
  >
    ✏️
  </button>

  {/* DELETE */}
  <button
    onClick={() => {
      const updated = charities.filter(item => item.id !== c.id);
      setCharities(updated);
      localStorage.setItem("charities", JSON.stringify(updated));
    }}
    className="text-red-500"
  >
    🗑️
  </button>

</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-4">Users</h2>

              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                {users.map((u, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{u.name}</p>
                    <p className="text-sm text-gray-600">{u.email}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">

    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">

      <h2 className="font-semibold mb-4">Add Charity</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full mb-3 p-2 border rounded"
            />
            
<select
  value={form.category}
  onChange={(e) => setForm({ ...form, category: e.target.value })}
  className="w-full p-2 border rounded-lg text-black"
>
  <option value="">Select Category</option>
  <option value="health">Health</option>
  <option value="education">Education</option>
  <option value="environment">Environment</option>
  <option value="community">Community</option>
  <option value="youth">Youth</option>
  <option value="veterans">Veterans</option>
  <option value="animals">Animals</option>
  <option value="other">Other</option>
</select>

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-3 p-2 border rounded"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowModal(false)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleCreateCharity}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Add
        </button>
      </div>

    </div>

  </div>
)}
    </div>
  );
}

function Tab({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0 border ${
        active
          ? "bg-green-600 text-white shadow font-semibold border-green-600"
          : "bg-white text-gray-700 hover:bg-gray-100 border-gray-200"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}