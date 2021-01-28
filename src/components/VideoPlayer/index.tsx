import {
  Button,
  Divider,
  Grid,
  Input,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {RootState} from "../../redux/reducers";
import "./index.css";
import {VideoCard} from "./VideoCard";
import {fetchVideos} from "../../redux/slice/videoSlice";
import {Share} from "@material-ui/icons";
import {setNotifcation} from "../../redux/slice/notificationSlice";
import {Helmet} from "react-helmet";

const VideoPlayer = () => {
  const dispatch = useDispatch();
  const {videoData, currentVideoData} = useSelector(
      (state: RootState) => state.videos,
  );
  const videos = currentVideoData.map((_id) => videoData[_id]);
  const location = useLocation();
  const _id = location.pathname.split("/")[2];
  const [share, setShare] = useState<boolean>(false);

  useEffect(() => {
    if (!videos.length) {
      dispatch(fetchVideos());
    }
  }, [_id]);

  const handleShare = () => {
    setShare((prevState) => !prevState);
  };

  const copyToClipboard = () => {
    navigator.clipboard
        .writeText(`https://susanwabbajacksucks.com/${location.pathname}`)
        .finally(() => {
          dispatch(
              setNotifcation({
                severity: "info",
                message: "Copied link to clipboard",
              }),
          );
        });
  };

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <meta
          property='og:title'
          content={videos.length ? videoData[_id].title : ""}
        />
        <meta
          property='og:image'
          content={videos.length ? videoData[_id].thumbnail : ""}
        />
        <meta
          property='og:description'
          content={videos.length ? videoData[_id].description : ""}
        />
        <title>{videos.length ? videoData[_id].title : ""}</title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid style={{minHeight: "700px"}} item xs={12} sm={12}>
          <iframe
            title={videos.length ? videoData[_id].title : ""}
            className='responsive-iframe'
            src={videos.length ? videoData[_id].url : ""}
            allow='clipboard-write;encrypted-media;gyroscope;picture-in-picture'
            allowFullScreen={true}
            frameBorder='0'
          />
        </Grid>
        <Grid container spacing={1} item xs={12} sm={12}>
          <Grid item xs={12} sm={10}>
            <Grid container spacing={2}>
              <Typography style={{flexGrow: 0.95}} variant='h4'>
                {videos.length ? videoData[_id].title : ""}
              </Typography>
              {share ? (
                <Input
                  value={`https://susanwabbajacksucks.com/${location.pathname}`}
                  endAdornment={
                    <InputAdornment position='end'>
                      <Button onClick={copyToClipboard}>Copy</Button>
                    </InputAdornment>
                  }
                />
              ) : (
                <Button onClick={handleShare} startIcon={<Share />}>
                  Share
                </Button>
              )}

              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Typography color='textSecondary' variant='subtitle1'>
                  {videos.length ? videoData[_id].description : ""}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid direction='column' container spacing={2} item xs={12} sm={2}>
            {videos.map((video) => (
              <Grid key={video._id} item xs={12} sm={12}>
                <VideoCard {...video} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default VideoPlayer;
