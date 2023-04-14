import { useEffect, useRef, ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import { Slide } from "./Slides";

import { Colors, Fonts } from "../../constants/constants";

export default ({ item }: { item: Slide }) => {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    if (animation.current) {
      animation.current.play();
    }
  }, [animation.current]);

  const getSliderContent = (s: string): ReactNode => {
    const higlightedArr = s.match(/(?<=\{).*(?=\})/g);
    return s.split(/\{|\}/g).map((word, i) => {
      const higlighted = higlightedArr?.includes(word);
      return (
        <Text key={i} style={[higlighted && styles.highlighted]}>
          {word}
        </Text>
      );
    });
  };

  return (
    <View style={styles.slide}>
      <View style={styles.image}>
        <LottieView
          style={styles.animation}
          source={item.image}
          ref={animation}
          loop={item?.loop}
        />
      </View>
      <Text style={styles.text}>{getSliderContent(item.text)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 150
  },
  image: {
    justifyContent: "flex-end",
    flexGrow: 1,
  },
  animation: {
    position: "relative",
  },
  text: {
    fontFamily: Fonts.medium,
    fontSize: 20,
    color: Colors.black_700,
    textAlign: "center",
    flexGrow: 0,
    marginTop: 40
  },
  highlighted: {
    color: Colors.plum_500,
  },
});
