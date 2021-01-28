import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  Avatar,
  Grid,
  createStyles,
  Theme,
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import React from "react";
import {red} from "@material-ui/core/colors";
import Logo from "../../media/ChannelLogo.svg";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      backgroundColor: "transparent",
    },
    media: {
      height: 140,
    },
    avatar: {
      backgroundColor: red[500],
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  }),
);

interface Props {
  _id: string;
  title: string;
  thumbnail: string;
  url: string;
  creationDate: string;
}

const VideoPreview = (props: Props) => {
  const history = useHistory();

  const viewVideo = (_id: string) => {
    history.push(`/watch/${_id}`);
  };

  const classes = useStyles();
  const {_id, title, thumbnail, creationDate} = props;

  return (
    <>
      <Card elevation={0} className={classes.root}>
        <CardActionArea onClick={() => viewVideo(_id)}>
          <CardMedia
            className={classes.media}
            image={thumbnail}
            title={title}
          />
          <CardContent>
            <Grid container spacing={0}>
              <Grid item xs={2}>
                <Avatar
                  sizes='small'
                  src={Logo}
                  aria-label='recipe'
                  className={classes.avatar}
                ></Avatar>
              </Grid>
              <Grid item xs={10}>
                <Typography gutterBottom variant='h6' component='h2'>
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <Typography color='textSecondary' component='p'>
                  Conservative Christian
                </Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <Typography color='textSecondary' component='p'>
                  Posted {moment(creationDate, "YYYYMMDD").fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default VideoPreview;
