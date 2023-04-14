import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";

import { Fonts } from "../../constants/constants";

import PressableIcon from "../UI/PressableIcon";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Subtitle from "../UI/Subtitle";
import Form from "./Form";

export default () => {
  const [passwordVisible, setPasswordVisibility] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility((passwordVisible) => !passwordVisible);
  };
  return (
    <View>
      <Form isLogin={true} />
      <Subtitle>or Sign up with</Subtitle>
      <View style={styles.faceIDWrapper}>
        <Image
          style={styles.faceIDImg}
          source={require("../../assets/images/auth/face-id.png")}
        />
        <Text style={styles.faceIDTitle}>Use Face ID</Text>
      </View>
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
  faceIDWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  faceIDImg: {
    width: 40,
    height: 40,
  },
  faceIDTitle: {
    color: "#1C1B1E",
    fontSize: 14,
    fontFamily: Fonts.medium,
    marginTop: 5,
  },
});
