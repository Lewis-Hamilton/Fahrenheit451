import { combineReducers } from "redux";
import videoSlice from "../slice/videoSlice";

const rootReducer = combineReducers({
  videos: videoSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
