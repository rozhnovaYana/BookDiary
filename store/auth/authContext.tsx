import { ReactNode, createContext, useReducer } from "react";
import { ActionTypes, Auth, AuthContextType } from "./authTypes";
import authReducer from "./authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext<AuthContextType | null>(null);

export default ({
  children,
  initialexpiresIn,
  initialtoken,
}: {
  children: ReactNode;
  initialexpiresIn: string;
  initialtoken: string;
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    token: initialtoken,
    expiresIn: initialexpiresIn,
  });

  const setAuthorization = async (authtoken: Auth) => {
    const { token, expiresIn } = authtoken;
    dispatch({
      type: ActionTypes.SET,
      payload: {
        token,
        expiresIn,
      },
    });
    await AsyncStorage.setItem("token", JSON.stringify(authtoken));
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
