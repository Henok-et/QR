import { QRCodeCanvas } from "qrcode.react";

const QRCodePage = () => {
	// Use the actual deployed frontend URL for the QR code
	const frontendUrl = "https://qr-1-knkx.onrender.com/topics";
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
			<h2 className="text-2xl font-bold mb-2 text-blue-700 text-center">
				African Union Health Department
			</h2>
			<h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
				Health & Wellbeing Survey
			</h3>
			<QRCodeCanvas value={frontendUrl} size={200} />
			<div className="mt-4 text-gray-500 text-xs break-all text-center">
				{frontendUrl}
			</div>
			<div className="mt-6 max-w-xs text-center text-sm text-gray-700 bg-white rounded-lg p-3 shadow">
				<p className="mb-2">
					This survey is conducted by the African Union Health Department to
					better understand the health and wellbeing of our community. Your
					participation helps us improve health services and support.
				</p>
				<p className="mb-2">
					<span className="font-semibold">
						Your responses are confidential.
					</span>{" "}
					Data will only be used for research and policy improvement. No
					personal information will be shared or used for any other purpose.
				</p>
				<p>Thank you for your valuable input!</p>
			</div>
		</div>
	);
};

export default QRCodePage;
