import { Grid } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import "./index.css";
import { VideoCard } from "./VideoCard";

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
  }, [location, _id]);

  return (
    <Grid container spacing={1}>
      <Grid container spacing={1} direction='column' item xs={12} sm={8}>
        <Grid style={{ maxHeight: "700px" }} item xs={12} sm={12}>
          <iframe
            title={playingVideo?.title}
            className='responsive-iframe'
            src={playingVideo?.url}
            allow='clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen={true}
            frameBorder='0'
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        direction='column'
        item
        xs={12}
        sm={4}
        zeroMinWidth
      >
        {videos.body.map((video) => (
          <Grid key={video._id} item xs={12} sm={6}>
            <VideoCard {...video} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default VideoPlayer;
