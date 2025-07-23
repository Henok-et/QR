/* global process */
// server/index.js (ESM)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Questionnaire from "./models/Questionnaire.js";
import Response from "./models/Response.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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
	const topic = req.params.topic.toLowerCase();
	let questions = [];
	if (topic === "depression" || topic === "mental health") {
		// PHQ-9
		questions = [
			{ id: 1, text: "Little interest or pleasure in doing things" },
			{ id: 2, text: "Feeling down, depressed, or hopeless" },
			{
				id: 3,
				text: "Trouble falling or staying asleep, or sleeping too much",
			},
			{ id: 4, text: "Feeling tired or having little energy" },
			{ id: 5, text: "Poor appetite or overeating" },
			{
				id: 6,
				text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
			},
			{
				id: 7,
				text: "Trouble concentrating on things, such as reading the newspaper or watching television",
			},
			{
				id: 8,
				text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
			},
			{
				id: 9,
				text: "Thoughts that you would be better off dead or of hurting yourself in some way",
			},
		];
	} else if (topic === "anxiety") {
		// GAD-7
		questions = [
			{ id: 1, text: "Feeling nervous, anxious, or on edge" },
			{ id: 2, text: "Not being able to stop or control worrying" },
			{ id: 3, text: "Worrying too much about different things" },
			{ id: 4, text: "Trouble relaxing" },
			{ id: 5, text: "Being so restless that it is hard to sit still" },
			{ id: 6, text: "Becoming easily annoyed or irritable" },
			{ id: 7, text: "Feeling afraid as if something awful might happen" },
		];
	} else if (topic === "sleep" || topic === "sleep hygiene") {
		questions = [
			{ id: 1, text: "How many hours do you usually sleep at night?" },
			{ id: 2, text: "Do you have trouble falling asleep?" },
			{ id: 3, text: "Do you wake up frequently during the night?" },
			{ id: 4, text: "Do you feel rested when you wake up?" },
			{ id: 5, text: "Do you use electronic devices before bed?" },
			{ id: 6, text: "Do you consume caffeine in the evening?" },
			{ id: 7, text: "Do you nap during the day?" },
			{ id: 8, text: "Do you have a regular bedtime routine?" },
			{
				id: 9,
				text: "Do you snore or has anyone observed you stop breathing during sleep?",
			},
			{ id: 10, text: "Do you feel sleepy during the day?" },
		];
	} else if (topic === "nutrition") {
		questions = [
			{
				id: 1,
				text: "How many servings of fruits and vegetables do you eat per day?",
			},
			{ id: 2, text: "How often do you eat fast food or processed foods?" },
			{ id: 3, text: "Do you drink enough water daily?" },
			{ id: 4, text: "Do you skip meals?" },
			{ id: 5, text: "Do you read nutrition labels on food packages?" },
			{ id: 6, text: "Do you take any dietary supplements?" },
			{ id: 7, text: "Do you have any food allergies or intolerances?" },
			{ id: 8, text: "How often do you eat breakfast?" },
			{ id: 9, text: "Do you limit your intake of sugary drinks?" },
			{ id: 10, text: "Do you plan your meals ahead of time?" },
		];
	} else if (topic === "stress" || topic === "stress management") {
		questions = [
			{ id: 1, text: "How often do you feel stressed?" },
			{ id: 2, text: "What are your main sources of stress?" },
			{ id: 3, text: "How do you usually cope with stress?" },
			{
				id: 4,
				text: "Do you practice relaxation techniques (e.g., deep breathing, meditation)?",
			},
			{ id: 5, text: "Do you feel overwhelmed by your responsibilities?" },
			{ id: 6, text: "Do you have someone to talk to when you feel stressed?" },
			{ id: 7, text: "Do you exercise to manage stress?" },
			{ id: 8, text: "Do you have trouble sleeping due to stress?" },
			{
				id: 9,
				text: "Do you experience physical symptoms (e.g., headaches, stomachaches) when stressed?",
			},
			{ id: 10, text: "How would you rate your overall stress level?" },
		];
	} else if (topic === "exercise" || topic === "exercise and fitness") {
		questions = [
			{ id: 1, text: "How many days per week do you exercise?" },
			{ id: 2, text: "What types of physical activity do you do?" },
			{ id: 3, text: "How long is your average workout session?" },
			{ id: 4, text: "Do you set fitness goals?" },
			{ id: 5, text: "Do you exercise alone or with others?" },
			{ id: 6, text: "Do you track your physical activity?" },
			{ id: 7, text: "Do you stretch before or after exercise?" },
			{ id: 8, text: "Do you have any injuries that affect your exercise?" },
			{ id: 9, text: "How do you stay motivated to exercise?" },
			{ id: 10, text: "How would you rate your overall fitness level?" },
		];
	} else if (topic === "wellbeing" || topic === "lifestyle") {
		questions = [
			{ id: 1, text: "How satisfied are you with your overall wellbeing?" },
			{ id: 2, text: "Do you have a good work-life balance?" },
			{ id: 3, text: "Do you have hobbies or activities you enjoy?" },
			{ id: 4, text: "Do you feel connected to your community?" },
			{ id: 5, text: "Do you get regular health checkups?" },
			{ id: 6, text: "Do you have supportive relationships?" },
			{ id: 7, text: "Do you feel safe in your environment?" },
			{ id: 8, text: "Do you practice gratitude or mindfulness?" },
			{ id: 9, text: "Do you have goals for your personal growth?" },
			{ id: 10, text: "How would you rate your quality of life?" },
		];
	} else {
		questions = [{ id: 1, text: "How are you feeling today?" }];
	}
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
