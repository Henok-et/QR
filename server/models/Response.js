// server/models/Response.js
const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
	topic: { type: String, required: true },
	answers: [
		{
			questionId: Number,
			answer: String,
		},
	],
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Response", ResponseSchema);
