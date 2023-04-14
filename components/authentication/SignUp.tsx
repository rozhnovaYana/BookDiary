import { useContext, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import Form from "./Form";
import { User } from "../../types/user";
import { signUp } from "../../utills/auth";
import { checkIsEmail, checkPassword } from "../../utills/validation";
import { AuthContext } from "../../store/auth/authContext";

export default () => {
  const [error, setError] = useState<any>();
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState<User>({
    name: {
      value: "",
      isValid: true,
    },
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
  });

  const onChangeHandler = (option: keyof User, value: string) => {
    setUser((user) => ({ ...user, [option]: { isValid: true, value } }));
  };

  const createUser = async () => {
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
      const token = await signUp(email.value, password.value);
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
      <Form
        onChangeHandler={onChangeHandler}
        createUser={createUser}
        user={user}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
