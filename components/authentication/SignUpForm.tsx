import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Fonts } from "../../constants/constants";

import Input from "../UI/Input";
import Button from "../UI/Button";
import Checkbox from "../UI/Checkbox";
import PasswordInput from "./PasswordInput";
import { User } from "../../types/user";

export default ({
  user,
  onChangeHandler,
  createUser,
}: {
  user: User;
  onChangeHandler: (option: keyof User, value: string) => void;
  createUser: () => void;
}) => {
  const [agreement, setAgreement] = useState<boolean>(false);
  const agreementHandler = () => {
    setAgreement((state) => !state);
  };
  const { email, password, name } = user;
  return (
    <View>
      <Input
        isValid={name?.isValid}
        style={styles.input}
        placeholder="Name"
        value={name?.value}
        onChangeText={(t) => onChangeHandler("name", t)}
      />
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
        at least 8 characters
      </PasswordInput>
      <Checkbox onPress={agreementHandler} isChecked={agreement}>
        I agree to the Terms and Privacy
      </Checkbox>
      <Button style={styles.button} disabled={!agreement} onPress={createUser}>
        Sign up
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
