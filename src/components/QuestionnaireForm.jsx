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
			className="max-w-md w-full bg-white rounded-lg shadow p-6 space-y-6"
		>
			<h2 className="text-xl font-bold mb-4">{topic} Questionnaire</h2>
			{questions.map((q) => (
				<div key={q.id} className="mb-4">
					<div className="mb-2 font-medium">{q.text}</div>
					<input
						type="text"
						name={`q${q.id}`}
						value={answers[q.id] || ""}
						onChange={(e) => handleChange(q.id, e.target.value)}
						className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
						required
					/>
				</div>
			))}
			<button
				type="submit"
				className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
			>
				Submit
			</button>
		</form>
	);
};

export default QuestionnaireForm;
