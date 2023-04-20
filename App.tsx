import { useCallback, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Fonts } from "./constants/constants";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigation/RootNavigation";
import { Colors } from "./constants/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "./store/auth/authContext";
import { getToken } from "./utills/auth";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [token, setToken] = useState({
    initialtoken: "",
    initialexpiresIn: "",
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
      setToken((t) => ({
        ...t,
        isLoading: true,
      }));
      try {
        const token = await getToken();
        if (token) {
          setToken((t) => ({
            ...t,
            initialexpiresIn: token.expiresIn,
            initialtoken: token.token,
          }));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setToken((t) => ({
          ...t,
          isLoading: false,
        }));
      }
    };
    tokenHadler();
  }, []);

  if (!fontsLoaded || token.isLoading) return null;
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" backgroundColor={Colors.plum_100} />
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <AuthContext
            initialtoken={token.initialtoken}
            initialexpiresIn={token.initialexpiresIn}
          >
            <RootNavigation />
          </AuthContext>
        </SafeAreaView>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
