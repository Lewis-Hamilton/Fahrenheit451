import { Grid } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import "./index.css";
import { VideoCard } from "./VideoCard";
import { fetchVideos } from "../../redux/slice/videoSlice";

const VideoPlayer = () => {
  const dispatch = useDispatch();
  const { videoData, currentVideoData } = useSelector(
    (state: RootState) => state.videos
  );
  const videos = currentVideoData.map((_id) => videoData[_id]);
  const location = useLocation();
  const _id = location.pathname.split("/")[2];

  useEffect(() => {
    if (!videos.length) {
      dispatch(fetchVideos());
    }
  }, [_id]);

  return (
    <Grid container spacing={1}>
      <Grid style={{ minHeight: "700px" }} item xs={12} sm={12}>
        <iframe
          title={videos.length ? videoData[_id].title : ""}
          className='responsive-iframe'
          src={videos.length ? videoData[_id].url : ""}
          allow='clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen={true}
          frameBorder='0'
        />
      </Grid>

      <Grid container spacing={1} item xs={12} sm={4} zeroMinWidth>
        {videos.map((video) => (
          <Grid key={video._id} item xs={12} sm={6}>
            <VideoCard {...video} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default VideoPlayer;
