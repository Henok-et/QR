import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Topics = () => {
	console.log("Topics component mounted");
	const [topics, setTopics] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const API_BASE = import.meta.env.VITE_API_URL || "";
		console.log("[Topics] API_BASE:", API_BASE);
		fetch(`${API_BASE}/api/topics`)
			.then((res) => {
				console.log("[Topics] Response status:", res.status);
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				console.log("Fetched topics:", data);
				setTopics(data);
			})
			.catch((err) => {
				console.error("[Topics] Fetch error:", err);
			});
	}, []);

	return (
		<div className="max-w-md w-full bg-white rounded-lg shadow p-6">
			<h2 className="text-2xl font-bold mb-4 text-center">
				Choose a Health Topic
			</h2>
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
		</div>
	);
};

export default Topics;
