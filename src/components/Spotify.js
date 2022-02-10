import React, { useState } from "react";

const Spotify = (props) => {
	//const [selectedValue, setSelectedValue] = useState("");
	const clicked = (e) => {
		e.preventDefault();
		//console.log("TIIIEMA", props.albums[0].id);
		console.log("COULYYYY", props.albums.artists);
		console.log("TIIIEMA", e.target.id);
		//	props.clicked(e.target.id);
	};

	return (
		<div className="max-w-sm mx-0.5 mt-10 bg-gradient-to-r from-green-100 to-blue-200  rounded overflow-hidden shadow-lg">
			{props.albums.map((album, idx) => (
				<button key={idx} onClick={clicked}>
					<img
						src={album.images[0].url}
						alt={album.name}
						className="w-full"
					/>

					<div className="px-6 py-4">
						<div className="font-bold text-purple-500 text-xl mb-2">
							{album.name}
						</div>
						<ul>
							<li>
								<strong>Release date: </strong>
								{album.release_date}
							</li>
							<li>
								<strong>total trakcs: </strong>
								{album.total_tracks}
							</li>
						</ul>
					</div>
				</button>
			))}
		</div>

		// <div>
		// 	<select
		// 		value={selectedValue}
		// 		onChange={(e) => setSelectedValue(e.target.value)}>
		// 		{props.options.map((item, id) => (
		// 			<option key={id} value={item.value}>
		// 				{item.name}
		// 			</option>
		// 		))}
		// 	</select>

		// 	<h1>{selectedValue}</h1>
		// </div>
	);
};

export default Spotify;
