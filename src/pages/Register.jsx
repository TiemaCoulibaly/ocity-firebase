import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { signUp } = useUserAuth();
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signUp(email, password, username);
			navigate("/login");
		} catch (err) {
			setError(err.message);
		}
	};
	return (
		<div className="flex justify-center my-40">
			<form
				className="w-full max-w-lg rounded-lg  p-10 shadow-lg"
				onSubmit={handleSubmit}>
				{error && <span className="p-1 bg-red-300 mb-4">{error}</span>}
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
							Username
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							id="grid-first-name"
							type="text"
							placeholder="Enter username"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="w-full md:w-1/2 px-3">
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
							Email
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							type="text"
							placeholder="Enter your email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
							Password
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							type="password"
							placeholder="Enter password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className="flex items-center">
							<button
								className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit">
								Register
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;
