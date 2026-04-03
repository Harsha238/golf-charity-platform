import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API } from "../config";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // ✅ now works
  const API = import.meta.env.VITE_API_URL || "https://golf-charity-platform-qlvk.onrender.com";

  const handleLogin = (e) => {
  e.preventDefault();

  if (!name || !email) {
    alert("Enter name and email");
    return;
  }

  // ✅ Create user object
  const newUser = {
    name,
    email,
    _id: Date.now().toString() // 👈 important for draw
  };

  // ✅ Save current logged-in user
  localStorage.setItem("user", JSON.stringify(newUser));

  // ✅ Get existing users
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // ✅ Avoid duplicates
  const alreadyExists = existingUsers.find(u => u.email === email);

  let updatedUsers;

  if (alreadyExists) {
    updatedUsers = existingUsers.map(u =>
      u.email === email ? newUser : u
    );
  } else {
    updatedUsers = [...existingUsers, newUser];
  }

  // ✅ Save users list
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // ✅ Redirect
  const redirectPath = location.state?.from || "/dashboard";
  navigate(redirectPath);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[360px]">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin}>

          <div className="mb-4">
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 
                         focus:outline-none focus:ring-2 focus:ring-green-400 
                         text-black placeholder-gray-500"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 
                         focus:outline-none focus:ring-2 focus:ring-green-400 
                         text-black placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white 
                       font-semibold py-2 rounded-lg transition duration-200 shadow-md"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Welcome to Golf Charity ⛳
        </p>

      </div>

    </div>
  );
}