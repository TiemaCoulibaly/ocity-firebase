import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import Alert from "../components/Alert.jsx";
import Loader from "../components/Loader.jsx";
import { AuthContext } from "../context/AuthContext";

import logo from "./../images/ocity-rmv.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    setIsFetching(true);
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
        setIsFetching(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsFetching(false);
      });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-24 w-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>

        <form className="mt-8 " onSubmit={handleLogin}>
          <label
            className="font-medium block mb-1 mt-6 text-gray-500"
            htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none rounded-none relative py-3 px-3 mb-5 block w-full border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
            type="email"
            name="email"
            placeholder="Entrez votre email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label
            className="font-medium block mb-1 mt-6 text-gray-500"
            htmlFor="password">
            Password
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              <label
                onClick={() => setShowPassword(!showPassword)}
                className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-gray-600 cursor-pointer"
                htmlFor="toggle">
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </label>
            </div>
            <input
              className="appearance-none border border-gray-300 w-full p-3 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10  placeholder-gray-500"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              placeholder="Entrez votre mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="group relative w-full flex justify-center p-3 mt-4 text-xl font-medium rounded-md bg-gradient-to-r from-green-500 to-green-800  hover:bg-green-600  text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            type="submit"
            disabled={isFetching}>
            {isFetching ? <Loader /> : "Login"}
          </button>
          {/* bg-gradient-to-r from-green-500 to-green-800  hover:bg-green-600  */}
        </form>
        {errorMessage && <Alert message={errorMessage} />}
      </div>
    </div>
  );
};

export default Login;
