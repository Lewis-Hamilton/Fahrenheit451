import { combineReducers } from "redux";
import videos from "../slice/videoSlice";
import search from "../slice/searchSlice";
import user from "../slice/userSlice";
import notificationSlice from "../slice/notificationSlice";

const rootReducer = combineReducers({
  videos: videos,
  search: search,
  user: user,
  notifications: notificationSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
