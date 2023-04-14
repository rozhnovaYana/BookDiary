import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavigator } from "./types";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import { Colors } from "../constants/constants";

const { Navigator, Screen } = createNativeStackNavigator<AuthNavigator>();

export default () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.plum_100,
        },
      }}
    >
      <Screen name="AuthenticationScreen" component={AuthenticationScreen} />
    </Navigator>
  );
};
