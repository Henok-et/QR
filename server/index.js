// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Models
const Questionnaire = require("./models/Questionnaire");
const Response = require("./models/Response");

// List 7 questionnaires (static for now)
app.get("/api/questionnaires", async (req, res) => {
	// In a real app, fetch from DB. Here, return static list.
	const questionnaires = [
		{ _id: "1", name: "Depression" },
		{ _id: "2", name: "Academic" },
		{ _id: "3", name: "Anxiety" },
		{ _id: "4", name: "Stress" },
		{ _id: "5", name: "Wellbeing" },
		{ _id: "6", name: "Lifestyle" },
		{ _id: "7", name: "Sleep" },
	];
	res.json(questionnaires);
});

// Get questionnaire questions (static for now)
app.get("/api/questionnaires/:id", async (req, res) => {
	// In a real app, fetch from DB. Here, return static questions.
	const questions = Array.from({ length: 10 }).map((_, i) => ({
		id: i + 1,
		text: `Question ${i + 1}`,
		options: ["A", "B", "C", "D"],
	}));
	res.json({ questions });
});

// List 5 health topics
app.get("/api/topics", (req, res) => {
	const topics = [
		"Mental Health",
		"Nutrition",
		"Exercise and Fitness",
		"Sleep Hygiene",
		"Stress Management",
	];
	res.json(topics);
});

// Get 10 questions for a topic
app.get("/api/questions/:topic", (req, res) => {
	const topic = req.params.topic;
	// For demo, use static questions. Replace with DB lookup for real app.
	const questions = Array.from({ length: 10 }).map((_, i) => ({
		id: i + 1,
		text: `${topic} Question ${i + 1}`,
	}));
	res.json({ topic, questions });
});

// Save response for a topic
app.post("/api/responses", async (req, res) => {
	try {
		const { topic, answers } = req.body;
		const response = new Response({
			topic,
			answers,
			createdAt: new Date(),
		});
		await response.save();
		res.status(201).json({ message: "Response saved" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => console.error(err));
