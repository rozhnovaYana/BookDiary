import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Colors, Fonts } from "../constants/constants";
import Logo from "../components/UI/Logo";
import SignUp from "../components/authentication/SignUp";
import { useState } from "react";
import Login from "../components/authentication/Login";

export default () => {
  const [authStatus, setAuthStatus] = useState<"login" | "signUp">("login");
  const isLogin = authStatus === "login";
  const title = isLogin ? "Login to your Account" : "Create Account";
  return (
    <ScrollView style={styles.wrapper}>
      <Logo />
      <Text style={styles.title}>{title}</Text>
      {isLogin ? <Login /> : <SignUp />}
      <View style={styles.changeMethodWrapper}>
        <Text>
          {isLogin ? "Don`t have an account?" : "Already have an account?s"}
        </Text>
        <Pressable
          onPress={() => {
            setAuthStatus(() => {
              return isLogin ? "signUp" : "login";
            });
          }}
        >
          <Text style={styles.changeMethodButton}>
            {isLogin ? "Sign up" : "Sign in"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
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
  changeMethodWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
  },
  changeMethodButton: {
    color: Colors.plum_300,
    fontFamily: Fonts.medium,
    fontSize: 14,
  },
});
