import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const About = () => {
	return (
		<div className="flex flex-col md:flex-row p-4 text-white">
			<div className="flex-1 flex justify-center items-center mb-4 md:mb-0">
				<img
					src="https://res.cloudinary.com/dsbgi2jbh/image/upload/v1727975215/samm_lge0qk.png"
					alt="Me"
					className="rounded-ful w-96 h-96 object-cover"
				/>
			</div>

			<div className="flex-1 ml-0 md:ml-4">
				<h1 className="text-2xl text-current font-bold mb-2">Hello</h1>
				<p className="mb-4 text-current">
					I'm Samuel, a passionate front-end engineer and product
					designer based in Nairobi, Kenya. With a solid foundation in
					hospitality management and over eight years of experience in
					digital marketing, I've transitioned into product design,
					focusing on creating user-centered experiences that resonate
					with African audiences. I believe technology should enhance
					everyday life, and I strive to design products that are both
					functional and delightful. Currently, I'm honing my skills
					in React and Tailwind CSS while developing a movie search
					application that showcases my dedication to seamless user
					experiences. Outside of coding, I enjoy running and organic
					farming, drawing inspiration from nature to inform my design
					approach. Join me on this exciting journey as I explore the
					intersection of technology, culture, and creativity.
				</p>
			</div>

			<div className="flex space-x-4 mt-4">
				<a
					href="https://www.linkedin.com/in/samuel-kigo-kihara"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 hover:text-blue-700"
				>
					{" "}
					<FaLinkedinIn size={24} />{" "}
				</a>
				<a
					href="https://github.com/sammkigoh"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 hover:text-blue-700"
				>
					{" "}
					<FaGithub size={24} />
				</a>
			</div>
		</div>
	);
};

export default About;
