import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  searchVideo,
  Video,
  VideoResults,
} from "../../api/susanwabbajacksucksAPI";
import { AppThunk } from "../store";

interface VideoState {
  videoData: Record<string, Video>;
  currentVideoData: string[];
  isLoading: boolean;
  error: string | null;
}

let initialState: VideoState = {
  videoData: {},
  currentVideoData: [],
  isLoading: false,
  error: null,
};

function startLoading(state: VideoState) {
  state.isLoading = true;
}

function loadingFailed(state: VideoState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const searchResults = createSlice({
  name: "searchResults",
  initialState: initialState,
  reducers: {
    searchVideoStart: startLoading,
    searchVideoFailure: loadingFailed,
    searchVideoSuccess(state, { payload }: PayloadAction<VideoResults>) {
      const { body } = payload;
      state.isLoading = false;
      state.error = null;

      body.forEach((video) => {
        state.videoData[video._id] = video;
      });

      state.currentVideoData = body.map((video) => video._id);
    },
  },
});

export const {
  searchVideoFailure,
  searchVideoStart,
  searchVideoSuccess,
} = searchResults.actions;

export default searchResults.reducer;

export const searchVideoResults = (search: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(searchVideoStart());
    const result = await searchVideo(search);
    dispatch(searchVideoSuccess(result));
  } catch (err) {
    dispatch(searchVideoFailure(err.toString()));
  }
};
