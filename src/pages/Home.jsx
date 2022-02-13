import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
const Home = () => {
	const { user } = useUserAuth();

	return (
		<div className="text-center py-8">Welcome to {user && user.email}</div>
	);
};

export default Home;
