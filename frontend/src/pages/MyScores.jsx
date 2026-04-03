import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function MyScores() {
  const [score, setScore] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const API = import.meta.env.VITE_API_URL || "https://golf-charity-platform-qlvk.onrender.com";

  // ✅ Load from localStorage (UI only)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("scores")) || [];
    setScores(saved);
  }, []);

  const handleAddScore = async () => {
    if (!score || !date) {
      alert("Enter score and date");
      return;
    }

    if (score < 1 || score > 45) {
      alert("Score must be between 1 and 45");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const newScore = {
      id: Date.now(),
      score: Number(score),
      date,
      course,
    };

    // ✅ Keep UI (localStorage)
    const updatedScores = [newScore, ...scores].slice(0, 5);
    setScores(updatedScores);
    localStorage.setItem("scores", JSON.stringify(updatedScores));

    // ✅ SAVE TO BACKEND (IMPORTANT FIX)
    try {
  const res = await fetch(`${API}/api/scores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      value: Number(score),
      name: user?.name,
      userId: user?.email
    })
  });

  const data = await res.json();

  console.log("SCORE RESPONSE:", data); // 🔥 ADD THIS

} catch (err) {
  console.log("ERROR:", err);
}

    // reset inputs
    setScore("");
    setDate("");
    setCourse("");
  };

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

        <h1 className="text-3xl font-bold text-gray-900">
          My Scores
        </h1>

        <p className="text-gray-600 mt-1">
          Track your last 5 golf rounds. These scores are your draw numbers!
        </p>

        <div className="mt-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">

          <h2 className="font-semibold text-gray-900 mb-4">
            Add New Score
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <label className="text-sm text-gray-600">
                Score (1–45)
              </label>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg text-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Date Played
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg text-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Course (optional)
              </label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg text-black"
              />
            </div>

          </div>

          <button
            onClick={handleAddScore}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Score
          </button>

        </div>

        <div className="mt-8">

          <h2 className="font-semibold text-gray-900 mb-4">
            Your Scores ({scores.length}/5)
          </h2>

          {scores.length === 0 ? (
            <p className="text-gray-500">No scores added yet</p>
          ) : (
            scores.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl border shadow-sm flex items-center gap-4 mb-3"
              >
                <div className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-lg">
                  {item.score}
                </div>

                <p className="text-gray-600 text-sm">
                  {new Date(item.date).toDateString()}
                  {item.course && ` • ${item.course}`}
                </p>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}