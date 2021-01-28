import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {RootState} from "../../redux/reducers";
import {searchVideoResults} from "../../redux/slice/searchSlice";
import {VideoCard} from "../VideoPlayer/VideoCard";
import queryString from "query-string";

const SearchResults = () => {
  const dispatch = useDispatch();
  const {videoData, currentVideoData} = useSelector(
      (state: RootState) => state.search,
  );
  const location = useLocation();

  const parsed = queryString.parse(location.search);

  useEffect(() => {
    dispatch(searchVideoResults(parsed.search as string));
  }, [location.search]);

  const videos = currentVideoData.map((_id) => videoData[_id]);

  console.log(videos);
  return (
    <>
      {!videos.length ? (
        <Grid container alignContent='center' alignItems='center'>
          <Card>
            <CardContent>
              <Typography>
                No results found for &quot;{parsed.search}&quot;
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        <Grid container spacing={1} item xs={12} sm={4} zeroMinWidth>
          {videos.map((video) => (
            <Grid key={video._id} item xs={12} sm={6}>
              {console.log(video)}
              <VideoCard {...video} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default SearchResults;
