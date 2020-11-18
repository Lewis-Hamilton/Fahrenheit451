import { combineReducers } from "redux";
import videos from "../slice/videoSlice";
import search from "../slice/searchSlice";
import user from "../slice/userSlice";

const rootReducer = combineReducers({
  videos: videos,
  search: search,
  user: user,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
