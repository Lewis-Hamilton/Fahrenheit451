import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { fetchVideos } from "../../redux/slice/videoSlice";
import VideoPreview from "../VideoPreviews";
import { TitleComponent } from '../Title/TitleComponent';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { videoData, currentVideoData } = useSelector(
    (state: RootState) => state.videos
  );

  const videos = currentVideoData.map((_id) => videoData[_id]);

  useEffect(() => {
    if (!videos.length) {
      dispatch(fetchVideos());
    }
  }, []);

  return (
    <>
      <TitleComponent title= "Videos"/>
      <Grid style={{padding: '2%' }} container spacing={3}>
      {videos.reverse().map((video) => (
        <Grid key={video._id} item xs={12} sm={3}>
          <VideoPreview {...video} />
        </Grid>
      ))}
      </Grid>
      </>
  );
};

export default Dashboard;
