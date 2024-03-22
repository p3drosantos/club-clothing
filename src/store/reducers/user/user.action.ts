import User from "../../../types/user.types";
import userActionTypes from "./user.action-types";

export const loginUser = (payload: User) => ({
  type: userActionTypes.LOGIN,
  payload,
});

export const logoutUser = () => ({
  type: userActionTypes.LOGOUT,
});
