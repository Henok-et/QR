import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionnaireList from "./components/QuestionnaireList";
import QuestionnaireForm from "./components/QuestionnaireForm";
import ConfirmationPage from "./components/ConfirmationPage";
import QRCode from "./components/QRCode";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
				<QRCode url={window.location.origin} />
				<Routes>
					<Route path="/" element={<QuestionnaireList />} />
					<Route path="/questionnaire/:id" element={<QuestionnaireForm />} />
					<Route path="/confirmation" element={<ConfirmationPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
