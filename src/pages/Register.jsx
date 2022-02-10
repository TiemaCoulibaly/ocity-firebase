import React from "react";

const Register = () => {
	return (
		<div className="flex justify-center my-40">
			<form className="w-full max-w-lg rounded-lg  p-10 shadow-lg">
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-first-name">
							Username
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							id="grid-first-name"
							type="text"
							placeholder="Jane"
						/>
					</div>
					<div className="w-full md:w-1/2 px-3">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-last-name">
							Email
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-last-name"
							type="text"
							placeholder="Doe"
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-password">
							Password
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-password"
							type="password"
							placeholder="******************"
						/>
						<div className="flex items-center">
							<button
								className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="button">
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
