import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface Props {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

const VideoPreview = (props: Props) => {
  const history = useHistory();

  const viewVideo = (_id: string) => {
    history.push(`/watch/${_id}`);
  };

  const classes = useStyles();
  const { _id, title, description, thumbnail } = props;
  return (
    <Card onClick={() => viewVideo(_id)} elevation={0} className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={thumbnail} title={title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VideoPreview;
