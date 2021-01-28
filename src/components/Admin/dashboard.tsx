import React, {useEffect} from "react";
import Publish from "../Publish/dashboard";
import {Grid, List, ListItem} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {fetchVideos} from "../../redux/slice/videoSlice";
import VideoPreview from "./videoCard";
import {TitleComponent} from "../Title/TitleComponent";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const {videoData, currentVideoData} = useSelector(
      (state: RootState) => state.videos,
  );
  const videos = currentVideoData.map((_id) => videoData[_id]);

  useEffect(() => {
    if (!videos.length) {
      dispatch(fetchVideos());
    }
  }, []);

  return (
    <>
      <TitleComponent title="Admin"/>
      <Grid
        style={{paddingLeft: "5%", paddingRight: "5%", paddingTop: "2%"}}
        container
        spacing={3}
      >
        <Grid item xs={12} sm={6}>
          <Publish />
        </Grid>
        <Grid item xs={12} sm={6}>
          <List>
            {videos.reverse().map((video) => (
              <ListItem key={video._id}>
                <VideoPreview {...video} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
};
export default AdminDashboard;
