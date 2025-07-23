import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Topics = () => {
	console.log("Topics component mounted");
	const [topics, setTopics] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const API_BASE = import.meta.env.VITE_API_URL;
		console.log("[Topics] API_BASE:", API_BASE);
		if (!API_BASE) {
			setError("API URL is not configured.");
			setLoading(false);
			return;
		}

		fetch(`${API_BASE}/api/topics`, { mode: "cors" })
			.then((res) => {
				console.log("[Topics] Response status:", res.status);
				console.log(
					"[Topics] Response headers:",
					res.headers.get("content-type")
				);
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				console.log("[Topics] Fetched data:", data);
				if (!Array.isArray(data)) {
					throw new Error("Expected an array of topics");
				}
				setTopics(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("[Topics] Fetch error:", err.message);
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<div className="max-w-md w-full bg-white rounded-lg shadow p-6">
				<h2 className="text-2xl font-bold mb-4 text-center">Loading...</h2>
				<p>Loading topics...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="max-w-md w-full bg-white rounded-lg shadow p-6">
				<h2 className="text-2xl font-bold mb-4 text-center">Error</h2>
				<p className="text-red-500">{error}</p>
			</div>
		);
	}

	return (
		<div className="max-w-md w-full bg-white rounded-lg shadow p-6">
			<h2 className="text-2xl font-bold mb-4 text-center">
				Choose a Health Topic
			</h2>
			{topics.length === 0 ? (
				<p>No topics available.</p>
			) : (
				<ul className="space-y-3">
					{topics.map((topic) => (
						<li key={topic}>
							<button
								className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
								onClick={() =>
									navigate(`/questionnaire/${encodeURIComponent(topic)}`)
								}
							>
								{topic}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Topics;
