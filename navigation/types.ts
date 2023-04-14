import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthNavigator = {
  AuthenticationScreen: undefined;
};
export type AuthorizedContentNavigator = {
  UserBooksScreen: undefined;
};

export type RootNavigator = {
  WelcomeScreen: undefined;
  AuthNavigator: NavigatorScreenParams<AuthNavigator>;
  AuthorizedContentNavigator: NavigatorScreenParams<AuthorizedContentNavigator>;
};
