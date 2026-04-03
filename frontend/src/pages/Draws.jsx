import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function Draws() {
  const [scores, setScores] = useState([]);
  const [draws, setDraws] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ FETCH DATA
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // fetch scores
    fetch("http://localhost:5000/api/scores")
      .then(res => res.json())
      .then(data => {
        setScores(data);
      });

    // fetch draws
    fetch("http://localhost:5000/api/draw")
      .then(res => res.json())
      .then(data => setDraws(data));
  }, []);

  // ✅ USER NUMBERS
  const userNumbers = scores.map(s => s.value);

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
          Monthly Draws
        </h1>

        <p className="text-gray-600 mt-1">
          Your scores are your numbers. Match them to win!
        </p>

        {/* Your Numbers */}
        <div className="mt-6 bg-white p-6 rounded-xl border shadow-sm">

          <h2 className="font-semibold text-gray-900 mb-4">
            Your Numbers
          </h2>

          <div className="flex items-center gap-3">
            {userNumbers.map((num, i) => (
              <div
                key={i}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white font-bold"
              >
                {num}
              </div>
            ))}
          </div>

          {/* Match Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">

            <div className="bg-gray-50 p-5 rounded-xl text-center border border-gray-200">
              <p className="font-semibold text-green-700 text-lg">5 Match</p>
              <p className="text-sm text-gray-500 mt-1">40% of prize pool</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl text-center border border-gray-200">
              <p className="font-semibold text-yellow-600 text-lg">4 Match</p>
              <p className="text-sm text-gray-500 mt-1">35% of prize pool</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl text-center border border-gray-200">
              <p className="font-semibold text-gray-800 text-lg">3 Match</p>
              <p className="text-sm text-gray-500 mt-1">25% of prize pool</p>
            </div>

          </div>

        </div>

        {/* Draw History */}
        <div className="mt-8">

          <h2 className="font-semibold text-gray-900 mb-4">
            Draw History
          </h2>

          {draws.map((draw) => {

            const numbers = Array.from({ length: 5 }, () =>
              Math.floor(Math.random() * 45) + 1
            );

            return (
              <div
                key={draw._id}
                className="bg-white p-5 rounded-xl border shadow-sm mb-4"
              >

                {/* Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {draw.date?.slice(0, 7)}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(draw.date).toDateString()}
                    </p>
                  </div>

                  <span className={`text-xs px-3 py-1 rounded-full ${
                    draw.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}>
                    {draw.status}
                  </span>
                </div>

                {/* Winning Numbers */}
                {draw.status === "completed" && (
                  <>
                    <p className="text-sm text-gray-500 mt-4 mb-2">
                      WINNING NUMBERS
                    </p>

                    <div className="flex gap-2 mb-3">
                      {numbers.map((n, i) => (
                        <div
                          key={i}
                          className="w-9 h-9 flex items-center justify-center bg-green-600 text-white rounded-full text-sm font-semibold"
                        >
                          {n}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Footer */}
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <p>💰 Pool: ₹{draw.amount}</p>
                  <p>👥 Players: 1</p>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}