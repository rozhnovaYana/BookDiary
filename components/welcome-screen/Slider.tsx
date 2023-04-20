import { View, Text, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";

import { slides } from "./Slides";
import PressableIcon from "../UI/PressableIcon";
import { Colors, Fonts } from "../../constants/constants";
import Slide from "./Slide";
import Button from "../UI/Button";
import { useState, useRef } from "react";
import { WelcomeScreenProps } from "../../screens/WelcomeScreen";

export default () => {
  const slider = useRef<AppIntroSlider>(null);
  const navigation = useNavigation<WelcomeScreenProps["navigation"]>();
  const [fullWidth, setFullWidth] = useState(false);
  const updateBottomWidth = (index: number | null = null) => {
    index === null || index === slides.length - 1
      ? setFullWidth(true)
      : setFullWidth(false);
  };
  return (
    <AppIntroSlider
      ref={slider}
      onSlideChange={updateBottomWidth}
      bottomButton={fullWidth}
      data={slides}
      renderItem={({ item }) => {
        return <Slide item={item} />;
      }}
      dotStyle={{
        width: 12,
        backgroundColor: "rgba(55, 55, 55, 0.3)",
        height: 6,
        borderRadius: 6,
        marginHorizontal: 4,
      }}
      activeDotStyle={{
        width: 32,
        height: 6,
        backgroundColor: Colors.plum_300,
      }}
      showSkipButton={true}
      renderSkipButton={() => (
        <View style={styles.skipBtn}>
          <Text style={styles.skipBtnText}>Skip</Text>
        </View>
      )}
      renderNextButton={() => (
        <PressableIcon
          name="arrow-forward-circle"
          color={Colors.plum_500}
          size={36}
        />
      )}
      renderDoneButton={() => (
        <Button
          onPress={() => {}}
          style={styles.doneBtn}
        >
          Get started
        </Button>
      )}
      onSkip={() => {
        slider.current?.goToSlide(slides.length - 1, true);
        updateBottomWidth;
      }}
    />
  );
};
const styles = StyleSheet.create({
  skipBtnText: {
    color: Colors.plum_500,
    fontFamily: Fonts.medium,
    fontSize: 14,
  },
  skipBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  doneBtn: {
    width: "100%",
  },
});
