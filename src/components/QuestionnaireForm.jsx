import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuestionnaireForm = () => {
	const { id } = useParams();
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`/api/questionnaires/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setQuestions(data.questions);
				setLoading(false);
			});
	}, [id]);

	const handleChange = (qid, answer) => {
		setAnswers((a) => ({ ...a, [qid]: answer }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await fetch("/api/responses", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				questionnaireId: id,
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
			<h2 className="text-xl font-bold mb-4">Questionnaire</h2>
			{questions.map((q) => (
				<div key={q.id} className="mb-4">
					<div className="mb-2 font-medium">{q.text}</div>
					<div className="flex flex-wrap gap-2">
						{q.options.map((opt) => (
							<label
								key={opt}
								className="flex items-center gap-1 cursor-pointer"
							>
								<input
									type="radio"
									name={`q${q.id}`}
									value={opt}
									checked={answers[q.id] === opt}
									onChange={() => handleChange(q.id, opt)}
									className="accent-blue-500"
									required
								/>
								{opt}
							</label>
						))}
					</div>
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
