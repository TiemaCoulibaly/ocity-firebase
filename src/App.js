import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import SearchImage from "./components/SearchImage";

const App = () => {
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [term, setTerm] = useState("");

	const url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABY_API_KEY}&q=${term}&image_type=photo&pretty=true`;

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setImages(data.hits);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [term, url]);
	return (
		<div className="container mx-auto">
			<SearchImage searchTerm={(text) => setTerm(text)} />
			{isLoading ? (
				<div className="flex justify-center items-center mt-96">
					<div className="animate-spin rounded-full h-32 w-32  border-b-8 border-gray-600"></div>
				</div>
			) : (
				<div className="grid grid-cols-3 gap-4">
					{images.map((image, index) => (
						<Card key={index} image={image} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
