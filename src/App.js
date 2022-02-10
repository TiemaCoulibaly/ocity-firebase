import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import AddCity from "./pages/AddCity";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Setting from "./pages/Setting";
import Spotify from "./components/Spotify";

import axios from "axios";

const App = () => {
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [term, setTerm] = useState("");
	const [lien, setLien] = useState("");

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

	const data = [
		{ value: 1, name: "Lundi" },
		{ value: 2, name: "Mardi" },
		{ value: 3, name: "Mercredi" },
	];

	const [token, setToken] = useState("");
	const [albumNewRelease, setAlbumNewRelease] = useState([]);
	const [artistId, setArtistId] = useState("");

	useEffect(() => {
		// justin const ide = "3P5WIUJO0Ots1lQx09TOxk";
		const id = "5e5kGSnnDPARPjjrUdGWjf";
		//Récuperer le token
		axios("https://accounts.spotify.com/api/token", {
			data: "grant_type=client_credentials",
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization:
					"Basic " +
					btoa(
						"482eaa2242094c3893e02b1a435c115e" +
							":" +
							"95b126ba8c844f1cbfcc5251a56719fa"
					),
			},
		}).then((tokenResponse) => {
			setToken(tokenResponse.data.access_token);

			//Recuperer l'album dun artist

			axios(`https://api.spotify.com/v1/browse/new-releases`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + tokenResponse.data.access_token,
				},
			})
				.then((albumResponse) => {
					setAlbumNewRelease(albumResponse.data.albums.items);
					console.log("je suis data", albumResponse.data);
					console.log(
						"je suis album",
						albumResponse.data.albums.items
					);
					console.log(
						"je veux id",
						albumResponse.data.albums.items[4].id
					);
					setArtistId(albumResponse.data.albums.items[4].id);
					// console.log(
					// 	"light link",
					// 	albumResponse.data.albums.items[3].href
					// );

					//setLien(albumResponse.data.albums.items[3].href);
				})
				.catch((err) => console.log(err));

			axios(`https://api.spotify.com/v1/albums/${artistId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + tokenResponse.data.access_token,
				},
			})
				.then((res) => {
					console.log("Encore", res.data);

					//--- album.tracks
					// console.log("NNNNNPOOOOO", res.data.items);
					// console.log("POUAAAAAH", res.data.items[0].artists);
				})
				.catch((err) => console.log(err));
		});
	}, [artistId]);

	const handleClick = (val) => {
		console.log("TIEMA CLIQUER VAL", val);
	};

	return (
		<>
			<Header searchTerm={(text) => setTerm(text)} />
			<div className="container-fluid mx-auto">
				<div className="flex justify-around flex-wrap">
					<Spotify
						onClick={handleClick}
						albums={albumNewRelease}
						artistId={artistId}
						clicked={handleClick}
					/>
				</div>
			</div>

			<form
				className="text-center p-5 "
				onSubmit={(e) => e.preventDefault()}>
				<button
					className="mt-5 bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit">
					Submit
				</button>
			</form>

			{/* <div className="container-fluid mx-auto">
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
			</div> */}
		</>
	);
};

export default App;
