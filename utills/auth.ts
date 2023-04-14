import axios from "axios";
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
      expiresIn: expiresIn + new Date(),
    };
  } catch (err: any) {
    throw new Error(err.response.data.error.message);
  }
};

export const signInWithPassword = (email: string, password: string) =>
  request("signInWithPassword", email, password);
export const signUp = (email: string, password: string) =>
  request("signUp", email, password);
