import { useCallback, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import RootNavigation from "./navigation/RootNavigation";

import { Fonts, Colors } from "./constants/constants";

import AuthContext from "./store/auth/authContext";

import { getToken } from "./utills/auth";
import { Auth } from "./store/auth/authTypes";

import * as LocalAuthentication from "expo-local-authentication";

SplashScreen.preventAutoHideAsync();
export default () => {
  const [token, setToken] = useState({
    token: "",
    expiresIn: "",
    name: "",
    savedBiometrics: false,
    isLoading: true,
  });

  const { light, medium, regular, bold } = Fonts;

  const [fontsLoaded] = useFonts({
    [light]: require("./assets/fonts/Poppins-Light.ttf"),
    [medium]: require("./assets/fonts/Poppins-Medium.ttf"),
    [regular]: require("./assets/fonts/Poppins-Regular.ttf"),
    [bold]: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !token.isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const tokenHadler = async () => {
      const initialToken: Auth = await getToken();
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const savedBiometrics =
        compatible && (await LocalAuthentication.isEnrolledAsync());
      if (initialToken) {
        return setToken((t) => ({
          ...t,
          ...initialToken,
          savedBiometrics,
          isLoading: false,
        }));
      }
    };

    try {
      tokenHadler();
    } catch (err) {
      console.log(err);
    } finally {
      setToken((t) => ({
        ...t,
        isLoading: false,
      }));
    }
  }, []);

  if (!fontsLoaded || token.isLoading) return null;
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" backgroundColor={Colors.plum_100} />
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <AuthContext initialToken={token}>
            <RootNavigation />
          </AuthContext>
        </SafeAreaView>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
