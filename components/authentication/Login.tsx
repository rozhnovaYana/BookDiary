import { useContext, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { User } from "../../types/user";
import { signInWithPassword } from "../../utills/auth";
import { checkIsEmail, checkPassword } from "../../utills/validation";
import { AuthContext } from "../../store/auth/authContext";
import LoginForm from "./LoginForm";

import Subtitle from "../UI/Subtitle";
import LocalAuth from "./LocalAuth";
import { Auth } from "../../store/auth/authTypes";

export default () => {
  const [error, setError] = useState<any>();
  const authContext = useContext(AuthContext);
  const initialItem = {
    value: "",
    isValid: true,
  };
  const [user, setUser] = useState<User>({
    name: initialItem,
    email: initialItem,
    password: initialItem,
  });

  const onChangeHandler = (option: keyof User, value: string) => {
    setUser((user) => ({ ...user, [option]: { isValid: true, value } }));
  };

  const faceIDLogin = (token: Auth) => {
    authContext?.setAuthorization(token);
  };

  const loginHandler = async () => {
    const { email, password } = user;
    const emailIsValid = checkIsEmail(email.value);
    const passwordIsValid = checkPassword(password.value);
    setUser((user) => ({
      ...user,
      email: {
        ...user.email,
        isValid: emailIsValid,
      },
      password: {
        ...user.password,
        isValid: passwordIsValid,
      },
    }));
    if (!emailIsValid || !passwordIsValid) return;
    try {
      const token = await signInWithPassword(email.value, password.value);
      authContext?.setAuthorization(token);
    } catch (err: any) {
      setError(err);
    }
  };
  if (error) {
    Alert.alert("Something went wrong...", "Please, check you data");
    setError(false);
  }
  return (
    <View>
      <LoginForm
        onChangeHandler={onChangeHandler}
        loginHandler={loginHandler}
        user={user}
      />
      <Subtitle>or Sign up with</Subtitle>
      {authContext?.token.savedBiometrics && (
        <LocalAuth faceIDLogin={faceIDLogin} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    marginVertical: 12,
  },
  button: {
    marginTop: 32,
    marginBottom: 36,
  },
});
