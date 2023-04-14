import { View, Text, StyleSheet } from "react-native";
import PressableIcon from "./PressableIcon";
import { Colors, Fonts } from "../../constants/constants";

export default ({
  isChecked,
  children,
  onPress,
}: {
  isChecked: boolean;
  children: string;
  onPress: () => void;
}) => {
  return (
    <View style={styles.wrapper}>
      <PressableIcon
        size={20}
        name={isChecked ? "checkbox" : "ios-square-outline"}
        color={Colors.plum_500}
        onPress={onPress}
      />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#000000",
    fontSize: 14,
    fontFamily: Fonts.medium,
    letterSpacing: 0.25,
    marginLeft: 8,
  },
});
