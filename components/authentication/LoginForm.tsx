import { StyleSheet, View } from "react-native";

import { Fonts } from "../../constants/constants";

import Input from "../UI/Input";
import Button from "../UI/Button";
import PasswordInput from "./PasswordInput";
import { User } from "../../types/user";

export default ({
  user,
  onChangeHandler,
  loginHandler,
}: {
  user: User;
  onChangeHandler: (option: keyof User, value: string) => void;
  loginHandler: () => void;
}) => {
  const { email, password } = user;
  return (
    <View>
      <Input
        isValid={email?.isValid}
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email.value}
        onChangeText={(t) => onChangeHandler("email", t)}
      />
      <PasswordInput
        isValid={password.isValid}
        style={styles.input}
        placeholder="Password"
        textContentType="password"
        value={password.value}
        onChangeText={(t) => onChangeHandler("password", t)}
      >
        Forgot password?
      </PasswordInput>
      <Button style={styles.button} onPress={loginHandler}>
        Sign In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 12,
  },
  forgotPasswordText: {
    color: "#757575",
    fontFamily: Fonts.medium,
    fontSize: 11,
    textAlign: "right",
    marginTop: -8,
  },
  button: {
    marginTop: 32,
    marginBottom: 36,
  },
});
