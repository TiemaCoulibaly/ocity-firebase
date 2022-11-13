import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

type AuthContextProviderProps = {
  children: React.ReactNode;
  dispatch: React.DispatchWithoutAction;
  currentUser: string;
};

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user") as string),
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    //we cannot store object inside localstorage so we convert into json
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);
  return (
    <AuthContext.Provider
      value={
        {
          currentUser: state.currentUser,
          dispatch,
        } as AuthContextProviderProps
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
