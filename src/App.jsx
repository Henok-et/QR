import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topics from "./components/Topics";
import QuestionnaireForm from "./components/QuestionnaireForm";
import ConfirmationPage from "./components/ConfirmationPage";
import QRCodePage from "./components/QRCodePage";
import "./App.css";

function App() {
	const frontendUrl = "https://your-frontend.onrender.com"; // Replace with your actual Render frontend URL
	return (
		<Router>
			<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
				<Routes>
					<Route path="/qr" element={<QRCodePage />} />
					<Route path="/topics" element={<Topics />} />
					<Route path="/questionnaire/:topic" element={<QuestionnaireForm />} />
					<Route path="/confirmation" element={<ConfirmationPage />} />
					<Route path="/" element={<Topics />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
