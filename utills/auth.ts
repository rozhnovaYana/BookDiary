import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import API_KEY from "../security/apiToken";

const BASE_URL = `https://identitytoolkit.googleapis.com/v1/`;

const request = async (
  option: "signUp" | "signInWithPassword",
  email: string,
  password: string,
  displayName?: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}accounts:${option}?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
        displayName,
      }
    );
    const {
      idToken,
      expiresIn,
      refreshToken,
      displayName: name,
    } = response.data;
    return {
      token: idToken,
      expiresIn: (+expiresIn + +new Date().getTime()).toString(),
      refreshToken,
      name,
    };
  } catch (err: any) {
    throw new Error(err.response.data.error.message);
  }
};

export const getToken = async () => {
  const newDate = new Date().getTime();
  const json = await AsyncStorage.getItem("token");
  if (json) {
    const { expiresIn, refreshToken, name } = JSON.parse(json);
    if (newDate > expiresIn) {
      return JSON.parse(json);
    } else if (refreshToken && newDate <= expiresIn) {
      const { data } = await axios.post(`${BASE_URL}token?key=${API_KEY}`, {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      });
      const newData = {
        token: data.id_token,
        expiresIn: (+data.expires_in + +new Date().getTime()).toString(),
        refreshToken: data.refresh_token,
        name,
      };
      await AsyncStorage.setItem("token", JSON.stringify(newData));
      return newData;
    }
    return;
  }
};

export const signInWithPassword = (email: string, password: string) =>
  request("signInWithPassword", email, password);
export const signUp = (email: string, password: string, displayName: string) =>
  request("signUp", email, password, displayName);
