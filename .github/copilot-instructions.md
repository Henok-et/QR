<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a MERN stack app. The backend is in the `server` folder (Express + Mongoose), and the frontend is a Vite React app. Use TailwindCSS for UI. The main flow is: scan QR code → list 7 questionnaires → select one → fill ~10 MCQ form → submit → save answers to MongoDB via `/api/responses` POST endpoint.

Frontend components: `QuestionnaireList`, `QuestionnaireForm`, `ConfirmationPage`. Backend models: `Questionnaire`, `Response`.
