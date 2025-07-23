import { QRCodeCanvas } from "qrcode.react";

const QRCodePage = () => {
	// Use the actual deployed frontend URL for the QR code
   const frontendUrl = "https://qr-1-knkx.onrender.com/topics";
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
			<h2 className="text-2xl font-bold mb-4">Scan to Start Questionnaire</h2>
			<QRCodeCanvas value={frontendUrl} size={200} />
			<div className="mt-4 text-gray-500 text-xs break-all">{frontendUrl}</div>
		</div>
	);
};

export default QRCodePage;
