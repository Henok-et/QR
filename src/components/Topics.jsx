import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Topics = () => {
	const [topics, setTopics] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const API_BASE = import.meta.env.VITE_API_URL;
		if (!API_BASE) {
			setError("API URL is not configured.");
			setLoading(false);
			return;
		}
		const fetchTopics = async (retries = 3, delay = 2000) => {
			try {
				const res = await fetch(`${API_BASE}/api/topics`, { mode: "cors" });
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				const data = await res.json();
				if (!Array.isArray(data)) {
					throw new Error("Expected an array of topics");
				}
				setTopics(data);
				setLoading(false);
			} catch (err) {
				if (retries > 0) {
					setTimeout(() => fetchTopics(retries - 1, delay), delay);
				} else {
					setError(err.message);
					setLoading(false);
				}
			}
		};
		fetchTopics();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-2">
				<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4 mt-8 mb-4 flex flex-col justify-center items-center">
					<h2 className="text-2xl font-bold mb-8 text-center text-blue-700">
						Loading...
					</h2>
					<p className="text-center text-gray-500">Loading topics...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-2">
				<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4 mt-8 mb-4 flex flex-col justify-center items-center">
					<h2 className="text-2xl font-bold mb-6 text-center text-red-700">
						Error
					</h2>
					<p className="text-center text-red-500 text-lg">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-2">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4 mt-8 mb-4 flex flex-col justify-center items-center">
				<h2 className="text-2xl font-bold mb-8 text-center text-blue-700">
					Choose a Health Topic
				</h2>
				{topics.length === 0 ? (
					<p className="text-center text-gray-500">No topics available.</p>
				) : (
					<div className="flex flex-col gap-6 w-full">
						{topics.map((topic) => (
							<button
								key={topic}
								className="w-full py-5 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl shadow-lg text-xl font-bold hover:from-blue-700 hover:to-blue-500 active:scale-95 transition-all border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
								onClick={() =>
									navigate(`/questionnaire/${encodeURIComponent(topic)}`)
								}
							>
								{topic}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
