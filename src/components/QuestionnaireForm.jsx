import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuestionnaireForm = () => {
	const { topic } = useParams();
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const API_BASE = import.meta.env.VITE_API_URL || "";
		fetch(`${API_BASE}/api/questions/${encodeURIComponent(topic)}`)
			.then((res) => res.json())
			.then((data) => {
				setQuestions(data.questions);
				setLoading(false);
			});
	}, [topic]);

	const handleChange = (qid, answer) => {
		setAnswers((a) => ({ ...a, [qid]: answer }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const API_BASE = import.meta.env.VITE_API_URL || "";
		await fetch(`${API_BASE}/api/responses`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				topic,
				answers: Object.entries(answers).map(([questionId, answer]) => ({
					questionId: Number(questionId),
					answer,
				})),
			}),
		});
		navigate("/confirmation");
	};

	if (loading) return <div>Loading...</div>;

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md w-full min-h-screen bg-white rounded-t-2xl shadow-lg p-4 flex flex-col space-y-6 mx-auto"
			style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
		>
			<h2 className="text-2xl font-bold mb-2 text-center text-blue-600 sticky top-0 bg-white z-10 py-2">
				{topic} Questionnaire
			</h2>
			<div className="flex-1 overflow-y-auto">
				{questions.map((q) => (
					<div key={q.id} className="mb-6">
						<div className="mb-3 font-medium text-base text-gray-800">
							{q.text}
						</div>
						<input
							type="text"
							name={`q${q.id}`}
							value={answers[q.id] || ""}
							onChange={(e) => handleChange(q.id, e.target.value)}
							className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
							required
							autoComplete="off"
							inputMode="text"
						/>
					</div>
				))}
			</div>
			<button
				type="submit"
				className="w-full py-3 px-4 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition font-semibold mt-2 mb-2"
				style={{ minHeight: 56 }}
			>
				Submit
			</button>
		</form>
	);
};

export default QuestionnaireForm;
