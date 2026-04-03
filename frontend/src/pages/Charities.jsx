import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function Charities() {
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [donation, setDonation] = useState(45);
  const [search, setSearch] = useState("");

  const [charities, setCharities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("charities"));

  if (!saved || saved.length < 6) {
    const defaultCharities = [
      {
        id: 1,
        name: "Children’s Hope Foundation",
        category: "Youth",
        description:
          "Providing education and healthcare to underprivileged children around the world.",
        icon: "👶",
      },
      {
        id: 2,
        name: "Green Earth Initiative",
        category: "Environment",
        description:
          "Dedicated to environmental conservation, reforestation, and sustainability.",
        icon: "🌍",
      },
      {
        id: 3,
        name: "Veterans Support Network",
        category: "Veterans",
        description:
          "Supporting military veterans with mental health services and housing.",
        icon: "🎖️",
      },
      {
        id: 4,
        name: "Community Health Alliance",
        category: "Health",
        description:
          "Bringing accessible healthcare and wellness programs to underserved communities.",
        icon: "🏥",
      },
      {
        id: 5,
        name: "Literacy for All",
        category: "Education",
        description:
          "Promoting literacy and education access for children and adults.",
        icon: "📚",
      },
      {
        id: 6,
        name: "Animal Rescue League",
        category: "Animals",
        description:
          "Rescuing and rehabilitating abandoned animals and promoting adoption.",
        icon: "🐾",
      },
    ];

    setCharities(defaultCharities);
    localStorage.setItem("charities", JSON.stringify(defaultCharities));
  } else {
    setCharities(saved);
  }
}, []);

  useEffect(() => {
    const savedSelected = JSON.parse(localStorage.getItem("selectedCharity"));
    if (savedSelected) {
      setSelectedCharity(savedSelected);
    }
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


        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900">
          🌍 Charities
        </h1>
        <p className="text-gray-600 mt-1">
          Choose a charity to receive a portion of your winnings 💖
        </p>

        {/* Donation Card */}
        <div className="mt-6 bg-white p-6 rounded-xl border shadow-sm">

          <h2 className="font-semibold text-gray-900 mb-2">
            ❤️ Your Charity Contribution
          </h2>

          <p className="text-gray-600 mb-2">
            Select a charity below to start donating from your winnings 💰
          </p>

          <p className="text-sm text-gray-700 mt-2">
            🎯 Selected: {selectedCharity?.name || "None"}
          </p>

          <p className="font-medium mt-2">
            Donation Percentage:
            <span className="text-green-600 font-bold ml-2">
              {donation}% 💚
            </span>
          </p>

          <input
            type="range"
            min="10"
            max="100"
            value={donation}
            onChange={(e) => setDonation(Number(e.target.value))}
            className="w-full mt-3 accent-green-600"
          />

          <p className="text-sm text-gray-500 mt-2">
            Minimum 10% of winnings goes to your selected charity 🙌
          </p>
        </div>

        {/* Search */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="🔍 Search charities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white text-black focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">

          {charities
            .filter((c) =>
              c.name?.toLowerCase().includes(search.toLowerCase())
            )
            .map((charity) => (

              <div
                key={charity.id}
                onClick={() => {
                  setSelectedCharity(charity);
                  localStorage.setItem("selectedCharity", JSON.stringify(charity));
                }}
                className={`p-5 rounded-xl border shadow-sm cursor-pointer transition 
                  ${
                    selectedCharity?.id === charity.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:shadow-md hover:-translate-y-1"
                  }`}
              >
                <div className="text-2xl mb-2">
                  {charity.icon}
                </div>

                <h3 className="font-semibold text-gray-900">
                  {charity.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {charity.category} 🏷️
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {charity.description}
                </p>

                <p className="text-green-600 text-sm mt-3">
                  Visit Website ↗ 🌐
                </p>
              </div>
            ))}

        </div>

      </div>
    </div>
  );
}