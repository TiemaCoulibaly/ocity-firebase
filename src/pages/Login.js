import React from "react";

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
						<p className="text-gray-600 text-xs italic">
							Make it as long and as crazy as you'd like
						</p>
					</div>
				</div>
				<div className="flex items-center">
					<button
						className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button">
						Login
					</button>
					<div class="text-center">
						<a
							class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
							href="#hh">
							Forgot Password?
						</a>
					</div>
					<div class="text-center">
						<a
							class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
							href="./index.html">
							Already have an account? Login!
						</a>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
