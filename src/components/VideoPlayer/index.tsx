import { Card, CardContent, Grid } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import VideoPreview from "../VideoPreviews";
import "./index.css";

const { Player } = require("video-react");

type Video = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
};

const VideoPlayer = () => {
  const videos = useSelector((state: RootState) => state.videos);
  const [playingVideo, setPlayingVideo] = useState<Video>();
  const location = useLocation();
  const _id = location.pathname.split("/")[2];

  useEffect(() => {
    Axios.get(
      `https://susanwabbajacksucks.herokuapp.com/api/video/${_id}`
    ).then((response) => {
      setPlayingVideo(response.data.body);
    });
  }, [location]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={8}>
        <Player
          playsInline
          poster={playingVideo?.thumbnail}
          src={playingVideo?.url}
        />
      </Grid>
      <Grid direction='column' item xs={12} sm={4}>
        {videos.body.map((video) => (
          <Grid key={video._id} item xs={12} sm={6}>
            <VideoPreview {...video} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default VideoPlayer;
