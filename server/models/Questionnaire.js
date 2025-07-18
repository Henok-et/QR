// server/models/Questionnaire.js
const mongoose = require("mongoose");

const QuestionnaireSchema = new mongoose.Schema({
	name: { type: String, required: true },
	questions: [
		{
			text: String,
			options: [String],
		},
	],
});

module.exports = mongoose.model("Questionnaire", QuestionnaireSchema);
