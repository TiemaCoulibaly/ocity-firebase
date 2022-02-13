import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { logIn, googleSignIn } = useUserAuth();
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await logIn(email, password);
			navigate("/");
		} catch (err) {
			setError(err.message);
		}
	};

	const handleGoogleSignIn = async (e) => {
		e.preventDefault();
		try {
			await googleSignIn();
			navigate("/");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="flex justify-center my-40">
			<form
				className="w-3/12 rounded-lg shadow-lg border  px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}>
				{error && <span className="p-1 bg-red-300 mb-4">{error}</span>}
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Email
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							onChange={(e) => setEmail(e.target.value)}
							type="text"
							placeholder="email"
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="password"
						/>
					</div>
					<div className="text-center">
						Don't have an account?
						<Link to="/register" className="p-2 bg-yellow-200 mx-3">
							Register
						</Link>
					</div>
				</div>
				<div className="flex items-center">
					<button
						className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit">
						Login
					</button>
				</div>
				<GoogleButton
					className="g-btn"
					type="dark"
					onClick={handleGoogleSignIn}
				/>
			</form>
		</div>
	);
};

export default Login;
