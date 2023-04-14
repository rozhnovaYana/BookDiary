import {
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Colors, Fonts } from "../../constants/constants";

export default ({
  children,
  style,
  onPress,
  disabled = false,
}: {
  children: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.wrapper, style]}
      disabled={disabled}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.plum_500,
    paddingVertical: 10,
    width: "95%",
    borderRadius: 100,
    alignSelf: "center",
  },
  text: {
    color: Colors.plum_150,
    fontFamily: Fonts.medium,
    fontSize: 14,
    textAlign: "center",
  },
});
