import User from "../../../types/user.types";
import userActionTypes from "./user.action-types";

interface InitialState {
  currentUser: null | User;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  currentUser: null,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userActionTypes.LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };
    case userActionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
