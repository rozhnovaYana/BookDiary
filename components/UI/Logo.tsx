import { StyleSheet, Text, View } from "react-native";

import { Fonts, Colors } from "../../constants/constants";

export default () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Books</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50
  },
  text: {
    color: Colors.plum_500,
    fontFamily: Fonts.bold,
    fontSize: 60,
    textAlign: "center",
  },
});
