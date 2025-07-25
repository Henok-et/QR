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

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-screen text-blue-700 text-xl">
				Loading...
			</div>
		);

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md w-full min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 rounded-t-2xl shadow-lg p-2 flex flex-col space-y-4 mx-auto"
			style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
		>
			{/* Step Indicator */}
			<div className="w-full flex justify-center items-center mb-2 sticky top-0 z-20 bg-blue-50 rounded-t-2xl">
				<span className="text-blue-700 font-semibold text-base">
					{questions.length > 0
						? `Answer all questions below`
						: "No questions found"}
				</span>
			</div>
			<h2 className="text-3xl font-extrabold mb-4 text-center text-blue-700 sticky top-0 bg-white z-10 py-4 rounded-t-2xl shadow">
				{topic} Questionnaire
			</h2>
			<div className="flex-1 overflow-y-auto pb-2">
				{questions.map((q, idx) => (
					<section
						key={q.id}
						className="mb-10 bg-white rounded-2xl shadow-md px-4 py-6 flex flex-col gap-3 border border-blue-100"
					>
						<div className="flex items-center mb-2">
							<span className="inline-block bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-xl font-extrabold mr-3">
								{idx + 1}
							</span>
							<span className="font-bold text-lg sm:text-xl text-gray-900 text-left">
								{q.text}
							</span>
						</div>
						<textarea
							name={`q${q.id}`}
							value={answers[q.id] || ""}
							onChange={(e) => handleChange(q.id, e.target.value)}
							className="w-full border-2 border-blue-300 bg-blue-50 rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400 min-h-[100px] resize-y"
							required
							autoComplete="off"
							placeholder="Type your answer..."
						/>
					</section>
				))}
			</div>
			<div className="sticky bottom-0 left-0 w-full bg-gradient-to-r from-blue-700 to-green-500 rounded-b-2xl p-2 z-20 shadow-lg">
				<button
					type="submit"
					className="w-full py-4 px-4 bg-gradient-to-r from-blue-700 to-green-500 text-white text-2xl rounded-xl font-extrabold shadow-lg hover:from-blue-800 hover:to-green-600 active:scale-95 transition border-2 border-blue-400"
					style={{ minHeight: 56, boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
				>
					Submit
				</button>
			</div>
		</form>
	);
};

export default QuestionnaireForm;
