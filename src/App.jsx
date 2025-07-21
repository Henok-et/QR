import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionnaireList from "./components/QuestionnaireList";
import QuestionnaireForm from "./components/QuestionnaireForm";
import ConfirmationPage from "./components/ConfirmationPage";
import QRCode from "./components/QRCode";
import "./App.css";

function App() {
	const frontendUrl = "https://your-frontend.onrender.com"; // Replace with your actual Render frontend URL
	return (
		<Router>
			<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
				{/* Only show QR code on the landing page */}
				<Routes>
					<Route
						path="/"
						element={
							<>
								<QRCode url={frontendUrl} />
								<QuestionnaireList />
							</>
						}
					/>
					<Route path="/questionnaire/:id" element={<QuestionnaireForm />} />
					<Route path="/confirmation" element={<ConfirmationPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
