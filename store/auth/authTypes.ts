export type Auth = {
  token: string;
  expiresIn: string;
  refreshToken?: string;
  name: string;
  savedBiometrics?: boolean;
};
export interface AuthContextType {
  token: Auth;
  isAuthorizes: boolean;
  setAuthorization: (authtoken: Auth) => void;
  signOut: () => void;
}
export enum ActionTypes {
  SET = "SET",
  DELETE = "DELETE",
}
export type SET = {
  type: ActionTypes.SET;
  payload: Auth;
};
export type DELETE = {
  type: ActionTypes.DELETE;
  payload: {};
};
