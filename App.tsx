import { useCallback } from "react";
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

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { light, medium, regular, bold } = Fonts;

  const [fontsLoaded] = useFonts({
    [light]: require("./assets/fonts/Poppins-Light.ttf"),
    [medium]: require("./assets/fonts/Poppins-Medium.ttf"),
    [regular]: require("./assets/fonts/Poppins-Regular.ttf"),
    [bold]: require("./assets/fonts/Poppins-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" backgroundColor={Colors.plum_100} />
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <AuthContext>
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
