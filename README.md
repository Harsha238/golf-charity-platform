# ⛳ Golf Charity Platform

A full-stack web application where users submit golf scores to enter monthly draws, win rewards, and support charitable causes.

🌐 Live Demo: https://golf-charity-platform-tau-taupe.vercel.app/

---

## 🚀 Features

* 🎯 Submit golf scores (1–45 range)
* 🏆 Automated draw system
* 💰 Prize distribution based on winners
* ❤️ Charity support integration
* 👥 User creation & tracking
* ⚡ Real-time updates (Socket.io)
* 📊 Admin panel for managing draws
* 📱 Fully responsive UI (mobile + desktop)

---

## 🖥️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Realtime

* Socket.io

---

## 📂 Project Structure

golf-charity-platform/

│
├── backend/

│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/

│   ├── src/
│   ├── pages/
│   ├── components/
│   └── App.jsx
│
├── .env.example
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/Harsha238/golf-charity-platform.git
cd golf-charity-platform

---

### 2️⃣ Install dependencies

cd backend
npm install

cd ../frontend
npm install

---

### 3️⃣ Setup environment variables

#### backend/.env

PORT=5000
MONGO_URI=your_mongodb_url
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret_key

#### frontend/.env

VITE_API_URL=http://localhost:5000

---

### 4️⃣ Run the project

#### Backend:

cd backend
npm start

#### Frontend:

cd frontend
npm run dev

---

## 🌐 Deployment

Frontend: Vercel
Backend: Render

---

## 🌟 Future Improvements

* 🔔 Notification system
* 💳 Payment integration
* 📊 Analytics dashboard
* 📱 Mobile app version
* 🔐 Full authentication system

---

## 👩‍💻 Author

Sai Harshitha Kummari

GitHub: https://github.com/Harsha238
LinkedIn: (Add your profile link)

---

## ⭐ Support

If you like this project:
Give it a ⭐ on GitHub
Share it with others

---

## 📌 About

Golf Charity Platform is a full-stack application that combines gaming, rewards, and social impact by allowing users to participate in draws while supporting charities.
