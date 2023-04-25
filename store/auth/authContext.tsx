import { Alert } from "react-native";
import { ReactNode, createContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActionTypes, Auth, AuthContextType } from "./authTypes";
import authReducer from "./authReducer";

export const AuthContext = createContext<AuthContextType | null>(null);

export default ({
  children,
  initialToken,
}: {
  children: ReactNode;
  initialToken: Auth;
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    token: initialToken.token,
    expiresIn: initialToken.expiresIn,
    name: initialToken.name,
    savedBiometrics: initialToken.savedBiometrics
  });

  const setAuthorization = async (authtoken: Auth) => {
    dispatch({
      type: ActionTypes.SET,
      payload: authtoken,
    });
    await AsyncStorage.setItem("token", JSON.stringify(authtoken));
    Alert.alert(
      "Do you want to use the credentials for Biometrics?",
      "It will work in case you have Biometrics",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "default",
          onPress: async () => {
            await AsyncStorage.setItem("biometrics", JSON.stringify(authtoken));
          },
        },
      ]
    );
  };

  const signOut = async () => {
    dispatch({
      type: ActionTypes.DELETE,
      payload: {},
    });
    await AsyncStorage.removeItem("token");
  };

  const value = {
    token: state,
    isAuthorizes: !!state.token,
    setAuthorization,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
