import { combineReducers } from "redux";
import userReducer from "./reducers/user/user.reducer";
import cartReducer from "./toolkit/user/user.slice";
import categoryReducer from "./reducers/category/category.reducer";

const rootReducer = combineReducers({
  userReducer,
  cartReducer,
  categoryReducer,
});

export default rootReducer;
