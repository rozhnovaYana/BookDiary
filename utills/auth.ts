import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_KEY from "../security/apiToken";
const BASE_URL = `https://identitytoolkit.googleapis.com/v1/`;

const request = async (
  option: "signUp" | "signInWithPassword",
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}accounts:${option}?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    const { idToken, expiresIn } = response.data;
    return {
      token: idToken,
      expiresIn: (+expiresIn + +new Date().getTime()).toString(),
    };
  } catch (err: any) {
    throw new Error(err.response.data.error.message);
  }
};

export const signInWithPassword = (email: string, password: string) =>
  request("signInWithPassword", email, password);
export const signUp = (email: string, password: string) =>
  request("signUp", email, password);

export const getToken = async () => {
  const newDate = new Date().getTime();
  const json = await AsyncStorage.getItem("token");
  if (json) {
    const { token, expiresIn } = JSON.parse(json);
    if (newDate > expiresIn) {
      return {
        token,
        expiresIn,
      };
    }
    return;
  }
};
