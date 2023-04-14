import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "../constants/constants";
import Logo from "../components/UI/Logo";
import SignUp from "../components/authentication/SignUp";

export default () => {
  return (
    <View style={styles.wrapper}>
      <Logo />
      <Text style={styles.title}>Login to your Account</Text>
      <SignUp />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 40,
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: "black",
    marginVertical: 32,
  },
});
