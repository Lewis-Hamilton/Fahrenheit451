import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import VideoPreview from "../VideoPreviews";

const Dashboard = () => {
  const videos = useSelector((state: RootState) => state.videos);

  console.log(videos);

  return (
    <Grid container spacing={3}>
      {videos.body.map((video) => (
        <Grid key={video._id} item xs={12} sm={3}>
          <VideoPreview {...video} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
