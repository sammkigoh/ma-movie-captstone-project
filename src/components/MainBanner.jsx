import React from "react";
import Navbar from "./Navbar";
import SearchComponent from "./SearchComponent";

const MainBanner = () => {
	return (
		<div className="flex flex-col justify-center items-center w-full relative">
			{/* <Navbar /> */}
			<div className="w-full h-[400px] md:h-[600px] overflow-hidden relative">
				<img
					src="https://res.cloudinary.com/dsbgi2jbh/image/upload/t_Banner 16:9/v1728204835/banner_ufn0ba.jpg"
					alt="top banner"
					className="w-full h-full object-cover"
				/>
			</div>
			<div className=" absolute inset-0 justify-center items-center bg-black bg-opacity-30  flex flex-col gap-4 text-white">
				<h1 className="text-4xl font-extrabold">
					Find Your Next Favorite Movie
				</h1>
				<p className="text-lg">Discover movies you'll love</p>
			</div>
		</div>
	);
};

export default MainBanner;
