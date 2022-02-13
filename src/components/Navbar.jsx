import React from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const { logOut, user } = useUserAuth();
	let navigate = useNavigate();

	const handleLogOut = async (e) => {
		e.preventDefault();
		try {
			await logOut();
			navigate("/login");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<nav className="flex justify-around p-2 bg-gray-400">
			<Link to="/" className="text-xl p-4 bg-yellow-300 rounded-lg">
				Home
			</Link>
			{!user ? (
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
			) : (
				<button
					onClick={handleLogOut}
					className="text-xl p-4 bg-red-300 rounded-lg">
					logOUT
				</button>
			)}
		</nav>
	);
};

export default Navbar;
