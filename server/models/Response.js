// server/models/Response.js (ESM)
import mongoose from "mongoose";

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

const Response = mongoose.model("Response", ResponseSchema);
export default Response;
