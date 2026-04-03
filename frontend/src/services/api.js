const API = import.meta.env.VITE_API_URL;

export const fetchScores = () => fetch(`${API}/api/scores`);
export const fetchDraw = () => fetch(`${API}/api/draw`);
export const fetchWinners = () => fetch(`${API}/api/winners`);