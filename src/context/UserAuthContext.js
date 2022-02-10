import { createContext, useContext } from "react";

const userAuthContext = createContext();

export function userAuthContextProvider({ children }) {
	return <userAuthContext.Provider>{children}</userAuthContext.Provider>;
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
