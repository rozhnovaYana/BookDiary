import { View, Button, StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../store/auth/authContext";

export default () => {
  const authContext = useContext(AuthContext);
  return (
    <View style={styles.wrapper}>
      <Button onPress={authContext?.signOut} title="LOG OUT" />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
