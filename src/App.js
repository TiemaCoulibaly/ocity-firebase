import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import { UserAuthContextProvider } from "./context/UserAuthContext";
import Navbar from "./components/Navbar";
import Setting from "./pages/Setting";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
	const user = false;
	return (
		<>
			<BrowserRouter>
				<UserAuthContextProvider>
					<Navbar />

					<Routes>
						<Route
							path="/setting"
							element={
								<ProtectedRoute>
									<Setting />
								</ProtectedRoute>
							}
						/>
						<Route exact path="/" element={<Home />} />
						<Route
							path="/login"
							element={user ? <Home /> : <Login />}
						/>
						<Route
							path="/register"
							element={user ? <Home /> : <Register />}
						/>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</UserAuthContextProvider>
			</BrowserRouter>
		</>
	);
};

export default App;
