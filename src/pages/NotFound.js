import React from "react";

const NotFound = () => {
	return (
		<div class="bg-gradient-to-r from-green-400 to-blue-500 text-white min-h-screen flex items-center">
			<div class="container mx-auto p-4 flex flex-wrap items-center">
				<div class="w-full md:w-7/12 text-center md:text-left p-4">
					<div class="text-6xl font-medium">404</div>
					<div class="text-xl md:text-3xl font-medium mb-4">
						Oops. This page has gone missing.
					</div>
					<div class="text-lg mb-8">
						You may have mistyped the address or the page may have
						moved.
					</div>
					<a href="#ff" class="border border-white rounded p-4">
						Go Home
					</a>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
