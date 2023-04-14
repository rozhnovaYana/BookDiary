import { View, StyleSheet, StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Slider from "../components/welcome-screen/Slider";
import { RootNavigator } from "../navigation/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type WelcomeScreenProps = NativeStackScreenProps<
  RootNavigator,
  "WelcomeScreen"
>;

export default () => {
  useFocusEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
    };
  });
  return (
    <View style={styles.wrapper}>
      <Slider />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  lottie: {
    flex: 1,
  },
});
