import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    //we cannot store object inside localstorage so we convert into json
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);
  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        dispatch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
