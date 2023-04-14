import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "../../constants/constants";

export default ({ children }: { children: string }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.line} />
      <Text style={styles.text}>{children}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#757575",
    fontSize: 14,
    fontFamily: Fonts.medium,
    paddingHorizontal: 8,
  },
  line: {
    height: 2,
    backgroundColor: "#F5EAFB",
    flex: 1,
  },
});
