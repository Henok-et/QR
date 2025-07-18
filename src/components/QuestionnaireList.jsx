import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionnaireList = () => {
	const [questionnaires, setQuestionnaires] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetch("/api/questionnaires")
			.then((res) => res.json())
			.then(setQuestionnaires);
	}, []);

	return (
		<div className="max-w-md w-full bg-white rounded-lg shadow p-6">
			<h2 className="text-2xl font-bold mb-4 text-center">
				Select a Questionnaire
			</h2>
			<ul className="space-y-3">
				{questionnaires.map((q) => (
					<li key={q._id}>
						<button
							className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
							onClick={() => navigate(`/questionnaire/${q._id}`)}
						>
							{q.name}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default QuestionnaireList;
