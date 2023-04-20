import { useState } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Fonts } from "../../constants/constants";
import { useFocusEffect } from "@react-navigation/native";

export default () => {
  const [hasAuth, setHasAuth] = useState(false);
  useFocusEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if(compatible) {
        const savedBiometrics  = await LocalAuthentication.isEnrolledAsync();
        setHasAuth(savedBiometrics);
      }
    })();
  });

  const localAuth = async () => {
    try {
        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: "Login with Biometrics",
            disableDeviceFallback: true,
            cancelLabel: "Cancel",
            fallbackLabel: "Log"
        });
        if (biometricAuth.success) {
         console.log("SUCCES")
        }
    } catch (error) {
        console.log("ERROSc");
    }
  }
  if(!hasAuth) return null;
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
