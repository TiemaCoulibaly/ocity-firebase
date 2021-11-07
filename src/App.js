import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import AddCity from "./pages/AddCity";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Setting from "./pages/Setting";

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
		<>
			<Header searchTerm={(text) => setTerm(text)} />

			<div className="container-fluid mx-auto">
				{isLoading ? (
					<div className="flex justify-center items-center mt-96">
						<div className="animate-spin rounded-full h-32 w-32  border-b-8 border-gray-600"></div>
					</div>
				) : (
					<div className="flex justify-around flex-wrap">
						{images.map((image, index) => (
							<Card key={index} image={image} />
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default App;
