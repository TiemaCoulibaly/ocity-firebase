import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import Alert from "../components/Alert.jsx";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="flex justify-center my-40">
      <form
        onSubmit={handleLogin}
        className="w-3/12 rounded-lg shadow-lg border  px-8 pt-6 pb-8 mb-4">
        {error && <Alert message={"mot de passe incorrect/email"} />}
        <input
          className="border-solid border-2"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-solid border-2"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 p-2 ">
          login
        </button>

        {/* <GoogleButton
					className="g-btn"
					type="dark"
					
				/> */}
      </form>
    </div>
  );
};

export default Login;
