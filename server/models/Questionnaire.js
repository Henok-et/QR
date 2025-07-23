// server/models/Questionnaire.js (ESM)
import mongoose from "mongoose";

const QuestionnaireSchema = new mongoose.Schema({
	name: { type: String, required: true },
	questions: [
		{
			text: String,
			options: [String],
		},
	],
});

const Questionnaire = mongoose.model("Questionnaire", QuestionnaireSchema);
export default Questionnaire;
