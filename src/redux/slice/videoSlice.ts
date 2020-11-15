import { createSlice } from "@reduxjs/toolkit";

type videoData = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  creation_date: string;
};

type Video = {
  success: boolean;
  body: videoData[];
};

let initialState: Video = {
  success: true,
  body: [
    {
      _id: "",
      title: "",
      description: "",
      thumbnail: "",
      url: "",
      creation_date: "",
    },
  ],
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideos(state, action) {
      state.body = action.payload.body;
    },
  },
});

export const { setVideos } = videoSlice.actions;

export default videoSlice.reducer;
