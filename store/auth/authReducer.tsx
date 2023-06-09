import { ActionTypes, Auth, DELETE, SET } from "./authTypes";

export default (state: Auth, action: SET | DELETE) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET:
      return { token: payload.token, expiresIn: payload.expiresIn };
    case ActionTypes.DELETE:
      return { token: "", expiresIn: "0" };
    default:
      return state;
  }
};
