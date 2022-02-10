import React from "react";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";

const Login = () => {
	return (
		<div className="flex justify-center my-40">
			<form className="w-3/12 rounded-lg shadow-lg border  px-8 pt-6 pb-8 mb-4">
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							for="username">
							Username
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Username"
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							for="password">
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="******************"
						/>
					</div>
					<div class="text-center">
						Don't have an account?
						<Link to="/register" className="p-2 bg-yellow-200 mx-3">
							Register
						</Link>
					</div>
				</div>
				<div className="flex items-center">
					<button
						className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button">
						Login
					</button>
				</div>
				<GoogleButton
					className="g-btn"
					type="dark"
					onClick={(e) => console.log(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default Login;
