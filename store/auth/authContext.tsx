import { ReactNode, createContext, useReducer } from "react";
import { ActionTypes, Auth, AuthContextType } from "./authTypes";
import authReducer from "./authReducer";

export const AuthContext = createContext<AuthContextType | null>(null);

export default ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    token: "",
    expiresIn: "0",
  });



  const setAuthorization = (authtoken: Auth) => {
    const { token, expiresIn } = authtoken;
    dispatch({
      type: ActionTypes.SET,
      payload: {
        token,
        expiresIn,
      },
    });
    
  };

  const signOut = () => {
    dispatch({
      type: ActionTypes.DELETE,
      payload: {},
    });
  };

  const value = {
    token: state,
    isAuthorizes: !!state.token,
    setAuthorization,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
