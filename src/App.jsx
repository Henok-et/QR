import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import Topics from "./components/Topics";
import QuestionnaireForm from "./components/QuestionnaireForm";
import ConfirmationPage from "./components/ConfirmationPage";
import QRCodePage from "./components/QRCodePage";
import "./App.css";

function DebugRouteLogger() {
	const location = useLocation();
	React.useEffect(() => {
		console.log("[Router] Navigated to:", location.pathname);
	}, [location]);
	return null;
}

function App() {
	React.useEffect(() => {
		console.log("[App] App component mounted");
	}, []);
	return (
		<Router>
			<DebugRouteLogger />
			<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
				<Routes>
					<Route path="/qr" element={<QRCodePage />} />
					<Route path="/topics" element={<Topics />} />
					<Route path="/questionnaire/:topic" element={<QuestionnaireForm />} />
					<Route path="/confirmation" element={<ConfirmationPage />} />
					<Route path="/" element={<QRCodePage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
