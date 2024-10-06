import React from "react";

const Footer = () => {
	return (
		<footer className="bg-transparent text-white p-4 text-center">
			<p className="text-sm">
				&copy; {new Date().getFullYear()} Ma-Movie. All Rights Reserved.{" "}
			</p>
			<div className="mt-2">
				<a href="/about" className="text-white hover:underline mx-2">
					About Me
				</a>
				<a
					href="https://policies.google.com/privacy?hl=en-US"
					className="text-white hover:underline mx-2"
				>
					Privacy Policy
				</a>
				<a
					href="https://policies.google.com/terms?hl=en-US"
					className="text-white hover:underline mx-2"
				>
					Terms of Service
				</a>
			</div>
		</footer>
	);
};

export default Footer;
