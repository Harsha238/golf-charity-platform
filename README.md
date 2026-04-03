# ⛳ Golf Charity Platform

A full-stack web application where users submit golf scores to enter monthly draws, win rewards, and support charitable causes.

---

## 🚀 Features

* 🎯 Submit golf scores (1–45 range)
* 🏆 Automated monthly draw system
* 💰 Prize pool distribution
* ❤️ Charity management system
* 👥 User tracking and management
* 🔐 Authentication system (JWT-based)
* ⚡ Real-time winner updates using Socket.io
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

```
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
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── .env.example
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/golf-charity-platform.git
cd golf-charity-platform
```

---

### 2️⃣ Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

---

### 3️⃣ Setup environment variables

Create `.env` in backend:

```
PORT=5000
MONGO_URI=your_mongodb_url
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret_key
```

Create `.env` in frontend:

```
VITE_API_URL=http://localhost:5000
```

---

### 4️⃣ Run the project

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run dev
```

---

## 📸 Screenshots

* Dashboard
* Admin Panel
* Draw System
* Charity Management

*(Add screenshots here later)*

---

## 🌐 Future Improvements

* 🔔 Notifications system
* 💳 Payment integration
* 📊 Analytics dashboard
* 📱 Mobile app version

---

## 👩‍💻 Author

**Sai Harshitha Kummari**

* GitHub: https://github.com/YOUR_USERNAME
* LinkedIn: https://linkedin.com/in/YOUR_PROFILE

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
