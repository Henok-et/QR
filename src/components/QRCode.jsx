import { useEffect, useState } from "react";

const QRCode = ({ url }) => {
	const [src, setSrc] = useState("");

	useEffect(() => {
		// Use a free API to generate QR code image
		setSrc(
			`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
				url
			)}`
		);
	}, [url]);

	return (
		<div className="flex flex-col items-center my-6">
			<img src={src} alt="QR Code" className="w-40 h-40 border rounded" />
			<div className="text-xs mt-2 break-all text-gray-500">{url}</div>
		</div>
	);
};

export default QRCode;
