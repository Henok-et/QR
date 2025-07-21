import { QRCode } from "qrcode.react";

const QRCodePage = () => {
	const frontendUrl = "https://your-frontend.onrender.com/topics"; // Replace with your actual Render frontend URL
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
			<h2 className="text-2xl font-bold mb-4">Scan to Start Questionnaire</h2>
			<QRCode value={frontendUrl} size={200} />
			<div className="mt-4 text-gray-500 text-xs break-all">{frontendUrl}</div>
		</div>
	);
};

export default QRCodePage;
