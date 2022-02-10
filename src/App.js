import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const App = () => {
	const user = false;
	return (
		<BrowserRouter>
			<nav className="flex justify-around p-2 bg-gray-400">
				<Link to="/" className="text-xl p-4 bg-yellow-300 rounded-lg">
					Home
				</Link>
				{!user && (
					<>
						<Link
							to="/login"
							className="text-xl p-4 bg-yellow-300 rounded-lg">
							LOGIN
						</Link>
						<Link
							to="/register"
							className="text-xl p-4 bg-yellow-300 rounded-lg">
							REGISTER
						</Link>
					</>
				)}
			</nav>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/login" element={user ? <Home /> : <Login />} />
				<Route
					path="/register"
					element={user ? <Home /> : <Register />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
