import { useState } from "react";
import axios from "axios";

export default function ScoreForm() {
  const [score, setScore] = useState("");

  const submit = async () => {
    await axios.post("http://localhost:5000/api/scores/add", {
      value: score
    });
    alert("Score Added ✅");
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-gray-700">
      <h3 className="mb-2">Enter Score</h3>

      <input
        type="number"
        className="p-2 rounded text-black"
        onChange={(e)=> setScore(e.target.value)}
      />

      <button
        onClick={submit}
        className="ml-2 bg-primary px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}