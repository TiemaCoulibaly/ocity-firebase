import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  setDoc,
  collection,
  serverTimestamp,
  doc,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleAdd = async (e) => {
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

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center my-40">
      <form className="" onSubmit={handleAdd}>
        <input
          className="appearance-none rounded-none relative block w-full mb-5 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
          type="text"
          name="username"
          id="username"
          placeholder="username"
          onChange={handleInput}
        />
        <input
          className="appearance-none rounded-none relative block w-full mb-5 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
          type="email"
          name="email"
          id="name"
          placeholder="email"
          onChange={handleInput}
        />

        <input
          className="appearance-none rounded-none relative block w-full mb-5 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={handleInput}
        />
        <button
          className="group relative w-full flex justify-center p-3 mb-5 text-xl font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          type="submit">
          submit
        </button>
        <p className="bg-red-500 p-2 text-white">{error}</p>
      </form>
    </div>
  );
};

export default Register;
