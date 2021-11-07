import React, { useState } from "react";

const ImageSearch = ({ searchTerm }) => {
	const [value, setValue] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		searchTerm(value);
	};
	return (
		<div className="w-full">
			<form
				className="w-80 md:mt-5 sm:mt-5 sm:flex sm:justify-center"
				onSubmit={handleSubmit}>
				{/* <input
					type="text"
					className="w-full border-2 border-indigo-600 rounded-md p-2 mt-5"
					placeholder="Search a city..."
					onChange={(e) => setValue(e.target.value)}
				/> */}
				<input
					className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none  border-b border-indigo-500"
					type="text"
					placeholder="Clichy..."
					aria-label="Full name"
					onChange={(e) => setValue(e.target.value)}
				/>

				<button
					className="flex-shrink-0 text-base font-medium bg-indigo-500 p-2 hover:bg-blue-700 hover:border-blue-700  text-white rounded my-2 w-15 sm:flex justify-center"
					type="submit">
					Search
				</button>
			</form>
		</div>
	);
};

export default ImageSearch;
