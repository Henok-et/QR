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
			className="max-w-md w-full min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 rounded-t-2xl shadow-lg p-2 flex flex-col space-y-4 mx-auto"
			style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
		>
			<h2 className="text-2xl font-bold mb-2 text-center text-blue-700 sticky top-0 bg-white z-10 py-2 rounded-t-2xl shadow">
				{topic} Questionnaire
			</h2>
			<div className="flex-1 overflow-y-auto pb-2">
				{questions.map((q) => (
					<div key={q.id} className="mb-6">
						<div className="mb-3 font-medium text-base text-gray-800 bg-white rounded-lg px-3 py-2 shadow-sm">
							{q.text}
						</div>
						<input
							type="text"
							name={`q${q.id}`}
							value={answers[q.id] || ""}
							onChange={(e) => handleChange(q.id, e.target.value)}
							className="w-full border-2 border-blue-200 bg-blue-50 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400"
							required
							autoComplete="off"
							inputMode="text"
							placeholder="Type your answer..."
						/>
					</div>
				))}
			</div>
			<button
				type="submit"
				className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-green-500 text-white text-lg rounded-xl shadow-md hover:from-blue-700 hover:to-green-600 active:scale-95 transition font-semibold mt-2 mb-2"
				style={{ minHeight: 56 }}
			>
				Submit
			</button>
		</form>
	);
};

export default QuestionnaireForm;
