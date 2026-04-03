import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-white via-green-50 to-white text-center">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-white/70 border-b z-50 px-8 py-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">GolfDraw</h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition"
        >
          Get Started →
        </button>
      </nav>

      {/* ================= HERO ================= */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-6 pt-24">

        <span className="fade-up bg-green-200 text-green-900 px-4 py-1 rounded-full text-sm mb-4">
          ✨ Play Golf. Win Prizes. Give Back.
        </span>

        <h1 className="fade-up delay-1 text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Your Golf Scores <br />
          <span className="text-green-700">Could Win Big</span>
        </h1>

        <p className="fade-up delay-2 mt-4 text-gray-800 max-w-xl text-lg">
          Track your rounds, enter monthly draws with your scores, and support your 
          favorite charity with every win.
        </p>

        <div className="fade-up delay-3 mt-8 flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-green-600 to-green-800 text-white px-7 py-3 rounded-lg shadow-lg hover:scale-105 transition"
          >
            Start Playing →
          </button>

          <button
            onClick={() => document.getElementById("how").scrollIntoView()}
            className="border-2 border-green-700 text-green-700 px-7 py-3 rounded-lg hover:bg-green-100 transition"
          >
            View Charities
          </button>

          <div 
  onClick={() => document.getElementById("how").scrollIntoView()}
  className="mt-12 cursor-pointer animate-bounce"
>
  <div className="w-6 h-10 border-2 border-green-700 rounded-full flex justify-center items-start p-1">
    <div className="w-1 h-2 bg-green-700 rounded-full"></div>
  </div>
          </div>
          
          <button
  onClick={() => document.getElementById("pricing").scrollIntoView()}
  className="mt-10 bg-green-700 text-white px-6 py-2 rounded-lg"
>
  View Pricing ↓
          </button>
          
        </div>

      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="py-24 px-6 bg-white">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 fade-up">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {/* Card */}
          <div className="fade-up group bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-3 hover:bg-green-50">
            <div className="text-4xl mb-3 transition-transform group-hover:scale-110">🏆</div>
            <h3 className="font-semibold mb-2 text-lg group-hover:text-green-700">Track Your Scores</h3>
            <p className="text-gray-700 text-sm">
              Log your latest golf rounds and keep your 5 most recent scores.
            </p>
          </div>

          <div className="fade-up delay-1 group bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-3 hover:bg-green-50">
            <div className="text-4xl mb-3 transition-transform group-hover:scale-110">🎟️</div>
            <h3 className="font-semibold mb-2 text-lg group-hover:text-green-700">Monthly Draws</h3>
            <p className="text-gray-700 text-sm">
              Your scores become your lottery numbers. Match to win prizes.
            </p>
          </div>

          <div className="fade-up delay-2 group bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-3 hover:bg-green-50">
            <div className="text-4xl mb-3 transition-transform group-hover:scale-110">💚</div>
            <h3 className="font-semibold mb-2 text-lg group-hover:text-green-700">Support Charities</h3>
            <p className="text-gray-700 text-sm">
              A portion of every win goes directly to the charity of your choice.
            </p>
          </div>

        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-white to-green-50">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 fade-up">Simple Pricing</h2>
        <p className="text-gray-700 mb-10 fade-up delay-1">
          Choose a plan and start winning today.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* Monthly */}
          <div className="fade-up delay-1 border-2 border-gray-200 p-8 rounded-xl shadow-sm hover:shadow-md transition bg-white">
            <h3 className="text-xl font-semibold mb-4">Monthly</h3>
            <p className="text-3xl font-bold mb-6">€9.99 /month</p>

            <ul className="text-left space-y-2 text-gray-800 mb-6">
              <li>✓ Score tracking</li>
              <li>✓ Monthly draw entry</li>
              <li>✓ Charity selection</li>
              <li>✓ Winner dashboard</li>
            </ul>

            <button
              onClick={() => navigate("/login")}
              className="w-full border-2 border-green-700 text-green-700 rounded-lg py-2 hover:bg-green-100"
            >
              Get Started
            </button>
          </div>

          {/* Yearly */}
          <div className="fade-up delay-2 border-2 border-green-700 p-8 rounded-xl shadow-lg relative bg-white hover:scale-105 transition">

            <span className="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-green-700 text-white px-4 py-1 text-sm rounded-full shadow">
              Most Popular
            </span>

            <h3 className="text-xl font-semibold mb-4">Yearly</h3>
            <p className="text-3xl font-bold mb-6">€89.99 /year</p>

            <ul className="text-left space-y-2 text-gray-800 mb-6">
              <li>✓ Everything in Monthly</li>
              <li>✓ 25% savings</li>
              <li>✓ Priority support</li>
              <li>✓ Bonus draw entries</li>
            </ul>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-2 rounded-lg shadow-md hover:scale-105 transition"
            >
              Get Started
            </button>
          </div>

        </div>
      </section>
      {/* ================= FOOTER ================= */}
<footer className="border-t mt-10 py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-600">

  {/* Left */}
  <div className="flex items-center gap-2 font-medium text-gray-800">
    ✨ <span>GolfDraw</span>
  </div>

  {/* Right */}
  <div>
    © 2026 GolfDraw. All rights reserved.
  </div>

</footer>

    </div>
  );
}