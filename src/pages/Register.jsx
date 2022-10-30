import React, { memo, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.tsx";
import Alert from "../components/Alert.tsx";

import logo from "./../images/ocity-03.png";

const Register = () => {
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleAdd = async (e) => {
    setIsFetching(true);
    setShowMessage(false);
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      await updateProfile(auth.currentUser, {
        displayName: data.username,
      });

      await addDoc(collection(db, "users"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      setShowMessage(true);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      if (err.code === "auth/weak-password") {
        setErrorMessage("Mot de passe faible");
      } else if (err.code === "auth/email-already-in-use") {
        setErrorMessage("Email déjà utilisé");
      } else if (err.code === "auth/invalid-email") {
        setErrorMessage("Email non valide");
      }
      setIsFetching(false);
      setShowMessage(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-24 w-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>
        {showMessage ? (
          <Alert
            message={
              "Votre compte a bien été crée vous allez être redirigées pour vous connecter 🙂"
            }
            color={"green"}
          />
        ) : (
          <form className="mt-8" onSubmit={handleAdd}>
            <label
              className="font-medium block mb-1 mt-6 text-gray-500"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="appearance-none rounded-none relative block w-full p-3 mb-5 border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
              type="text"
              placeholder="Entrez votre username"
              id="username"
              name="username"
              onChange={handleInput}
              required
            />

            <label
              className="font-medium block mb-1 mt-6 text-gray-500"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none rounded-none relative block w-full p-3 mb-5 border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
              placeholder="Entrez votre email"
              type="email"
              name="email"
              id="name"
              onChange={handleInput}
              required
            />

            <label
              className="font-medium block mb-1 mt-6 text-gray-500"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 right-0 flex items-center px-2">
                <label
                  onClick={() => setShowPassword(!showPassword)}
                  className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-gray-600 cursor-pointer"
                  htmlFor="toggle"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
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
                      stroke="currentColor"
                    >
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
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                placeholder="Entrez votre mot de passe"
                name="password"
                onChange={handleInput}
                required
              />
            </div>

            <button
              className="group relative w-full flex justify-center p-3 my-5 text-xl font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? <Loader /> : "Register"}
            </button>
          </form>
        )}

        {errorMessage && <Alert message={errorMessage} color="red" />}
      </div>
    </div>
  );
};
Register.propTypes = {
  data: PropTypes.object,
  errorMessage: PropTypes.string,
  isFetching: PropTypes.bool,
  showPassword: PropTypes.bool,
  handleInput: PropTypes.func,
  handleAdd: PropTypes.func,
};
export default memo(Register);
