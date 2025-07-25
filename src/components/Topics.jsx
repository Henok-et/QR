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
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
				<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
					<h2 className="text-2xl font-bold mb-4 text-blue-700">Loading...</h2>
					<p className="text-gray-500">Loading topics...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
				<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
					<h2 className="text-2xl font-bold mb-4 text-red-700">Error</h2>
					<p className="text-red-500 text-lg">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-2 py-4">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center">
				<h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
					Choose a Health Topic
				</h2>
				{topics.length === 0 ? (
					<p className="text-center text-gray-500">No topics available.</p>
				) : (
					<div className="flex flex-col gap-5 w-full">
						{topics.map((topic, idx) => (
							<button
								key={topic}
								className="flex items-center gap-3 w-full py-5 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl shadow-lg text-lg sm:text-xl font-bold hover:from-blue-700 hover:to-blue-500 active:scale-95 transition-all border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
								onClick={() =>
									navigate(`/questionnaire/${encodeURIComponent(topic)}`)
								}
							>
								<span className="flex-shrink-0 bg-white text-blue-600 font-extrabold rounded-full w-8 h-8 flex items-center justify-center shadow mr-2 border border-blue-200">
									{idx + 1}
								</span>
								<span className="text-left flex-1">{topic}</span>
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Topics;
