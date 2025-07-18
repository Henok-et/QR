import { Link } from "react-router-dom";

const ConfirmationPage = () => (
	<div className="max-w-md w-full bg-white rounded-lg shadow p-6 text-center">
		<h2 className="text-2xl font-bold mb-4 text-green-600">Thank you!</h2>
		<p className="mb-6">Your responses have been submitted.</p>
		<Link
			to="/"
			className="inline-block py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
		>
			Back to Home
		</Link>
	</div>
);

export default ConfirmationPage;
