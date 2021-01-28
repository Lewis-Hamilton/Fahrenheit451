import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  createVideo,
  getVideoById,
  getVideos,
  removeVideo,
  Video,
  VideoBody,
  VideoResults,
} from "../../api/susanwabbajacksucksAPI";
import {AppThunk} from "../store";

interface VideoState {
  videoData: Record<string, Video>;
  currentVideoData: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VideoState = {
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

const videos = createSlice({
  name: "videos",
  initialState: initialState,
  reducers: {
    postVideoStart: startLoading,
    getVideoStart: startLoading,
    getVideosStart: startLoading,
    deleteVideoStart: startLoading,
    getVideoSuccess(state, {payload}: PayloadAction<Video>) {
      const {_id} = payload;
      state.isLoading = false;
      state.error = null;
      state.videoData[_id] = payload;
    },
    getVideosSuccess(state, {payload}: PayloadAction<VideoResults>) {
      const {body} = payload;
      state.isLoading = false;
      state.error = null;

      body.forEach((video) => {
        state.videoData[video._id] = video;
      });

      state.currentVideoData = body.map((video) => video._id);
    },
    postVideoFailure: loadingFailed,
    getVideoFailure: loadingFailed,
    getVideosFailure: loadingFailed,
    deleteVideoFailure: loadingFailed,
  },
});

export const {
  getVideoStart,
  getVideosStart,
  getVideoSuccess,
  getVideosSuccess,
  getVideoFailure,
  getVideosFailure,
  postVideoFailure,
  postVideoStart,
  deleteVideoFailure,
  deleteVideoStart,
} = videos.actions;

export default videos.reducer;

export const fetchVideos = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getVideosStart());
    const videos = await getVideos();
    dispatch(getVideosSuccess(videos));
  } catch (err) {
    dispatch(getVideosFailure(err.toString()));
  }
};

export const fetchVideo = (_id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(getVideoStart());
    const video = await getVideoById(_id);
    dispatch(getVideoSuccess(video.body));
  } catch (err) {
    dispatch(getVideoFailure(err.string()));
  }
};

export const postVideo = (payload: VideoBody): AppThunk => async (dispatch) => {
  try {
    dispatch(postVideoStart());
    const createdvideo = await createVideo(payload);
    const _id = createdvideo.body._id;

    const video = await getVideoById(_id);
    dispatch(getVideoSuccess(video.body));
  } catch (err) {
    dispatch(postVideoFailure(err.toString()));
  }
};

export const deleteVideo = (_id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(deleteVideoStart());
    await removeVideo(_id);

    const videos = await getVideos();
    dispatch(getVideosSuccess(videos));
  } catch (err) {
    dispatch(deleteVideoFailure(err));
  }
};
