import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const logIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};
	const signUp = (email, password, username) => {
		return createUserWithEmailAndPassword(auth, email, password, username);
	};
	const logOut = () => {
		return signOut(auth);
	};
	const googleSignIn = () => {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	};
	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			setUser(currentuser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<userAuthContext.Provider
			value={{
				user,
				logIn,
				signUp,
				logOut,
				googleSignIn,
				resetPassword,
			}}>
			{children}
		</userAuthContext.Provider>
	);
};

export function useUserAuth() {
	return useContext(userAuthContext);
}
