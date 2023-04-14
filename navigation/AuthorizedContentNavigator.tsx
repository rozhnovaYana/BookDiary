import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthorizedContentNavigator } from "./types";
import { Colors } from "../constants/constants";
import UserBooksScreen from "../screens/UserBooksScreen";

const { Navigator, Screen } =
  createNativeStackNavigator<AuthorizedContentNavigator>();

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
      <Screen name="UserBooksScreen" component={UserBooksScreen} />
    </Navigator>
  );
};
