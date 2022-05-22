import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, dispatch } = useContext(AuthContext);

  console.log("curent", currentUser);
  // console.log("curentALL", currentUser);
  let navigate = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGOUT" });
      // await logOut();
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
      {!currentUser ? (
        <>
          <Link to="/login" className="text-xl p-4 bg-yellow-300 rounded-lg">
            LOGIN
          </Link>
          <Link to="/register" className="text-xl p-4 bg-yellow-300 rounded-lg">
            REGISTER
          </Link>
        </>
      ) : (
        <>
          <Link to="/addcity" className="text-xl p-4 bg-yellow-300 rounded-lg">
            AddCity
          </Link>

          <span className="text-white rounded bg-blue-600">
            Hello, {currentUser.displayName}
          </span>
          <button
            onClick={handleLogOut}
            className="text-xl p-4 bg-red-300 rounded-lg">
            logOUT
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
