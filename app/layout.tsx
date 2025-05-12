import { SandPackCSS } from "@/components/sand-pack-css";
import type { PropsWithChildren } from "react";
import "./globals.css";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html lang="en">
			<head>
				<SandPackCSS />
			</head>
			<body className="dark bg-stone-950 text-white">{children}</body>
		</html>
	);
}
