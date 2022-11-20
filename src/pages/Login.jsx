import React, { useState, useContext, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import GoogleButton from "react-google-button";

import { AuthContext } from "../context/AuthContext";

import logo from "./../images/oc-green.png";
import ModalLogin from "../components/ModalLogin.tsx";

import PropTypes from "prop-types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    setIsFetching(true);
    e.preventDefault();
    if (email && password)
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          dispatch({ type: "LOGIN", payload: user });
          navigate("/");
          setIsFetching(false);
        })
        .catch((err) => {
          setIsFetching(false);
          if (err.code === "auth/wrong-password") {
            setErrorMessage("Mot de passe incorrect");
          } else if (err.code === "auth/user-not-found") {
            setErrorMessage("Utilisateur introuvable");
          } else if (err.code === "auth/invalid-email") {
            setErrorMessage("Email non valide");
          } else if (err.code === "auth/too-many-requests") {
            setErrorMessage("Veuillez réeassayer plus tard");
          }
        });
  };

  const signInWithGoogle = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleAuthProvider).then((userCredential) => {
      const user = userCredential.user;
      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
    });
  };

  const forgotPassword = async (e) => {
    e.preventDefault();

    email &&
      (await sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          setAlert(true);
        })
        .catch((err) => {
          // const errorCode = err.code;
          // console.log("code", errorCode);
          const errorMessage = err.message;
          setErrorMessage(errorMessage);
        }));
  };
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img className="mx-auto h-48 w-auto" src={logo} alt="logo" />
          <h2 className="text-center text-3xl font-semibold text-gray-900">
            Aide-nous à répertorier tout les city-stades en France
          </h2>
          <div className="flex justify-center my-5">
            <GoogleButton
              label="Continuer avec Google"
              className="text-center"
              onClick={signInWithGoogle}
            />
          </div>
          <p className="text-center ">
            Tu as déjà un compte ?{" "}
            <a
              href="##"
              onClick={() => setVisible(!visible)}
              className="text-green-500 underline hover:no-underline cursor-pointer"
            >
              Se connecter{" "}
            </a>
          </p>
          <p className="text-center ">
            Ou inscris-toi avec{" "}
            <Link
              to="/register"
              className="text-green-500 underline hover:no-underline cursor-pointer"
            >
              E-mail{" "}
            </Link>
          </p>
        </div>

        {visible && (
          <ModalLogin
            handleLogin={handleLogin}
            setEmail={setEmail}
            setShowPassword={setShowPassword}
            setPassword={setPassword}
            forgotPassword={forgotPassword}
            showPassword={showPassword}
            isFetching={isFetching}
            visible={visible}
            setVisible={setVisible}
            setAlert={setAlert}
            alert={alert}
            errorMessage={errorMessage}
          />
        )}
      </div>
    </div>
  );
};

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  errorMessage: PropTypes.string,
  showPassword: PropTypes.bool,
  isFetching: PropTypes.bool,
  visible: PropTypes.bool,
  alert: PropTypes.bool,
  handleLogin: PropTypes.func,
  signInWithGoogle: PropTypes.func,
  forgotPassword: PropTypes.func,
};
export default memo(Login);
