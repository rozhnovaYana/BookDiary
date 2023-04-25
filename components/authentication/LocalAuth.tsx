import { useState } from "react";
import { StyleSheet, Image, Text, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";

import { Fonts } from "../../constants/constants";
import { getToken } from "../../utills/auth";
import { Auth } from "../../store/auth/authTypes";

export default ({ faceIDLogin }: { faceIDLogin: (token: Auth) => void }) => {
  const [token, setToken] = useState<null | Auth>(null);
  useFocusEffect(() => {
    (async () => {
      const token = await getToken();
      setToken(token);
    })();
  });

  const localAuth = async () => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        disableDeviceFallback: true,
        cancelLabel: "Cancel",
        fallbackLabel: "Log",
      });
      if (biometricAuth.success && token) {
        faceIDLogin(token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!token) return null;
  return (
    <Pressable style={styles.faceIDWrapper} onPress={localAuth}>
      <Image
        style={styles.faceIDImg}
        source={require("../../assets/images/auth/face-id.png")}
      />
      <Text style={styles.faceIDTitle}>Use Face ID</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
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
