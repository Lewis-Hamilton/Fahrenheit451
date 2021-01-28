import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  createStyles,
  makeStyles,
  Theme,
  CardActionArea,
} from "@material-ui/core";
import React from "react";
import {useHistory} from "react-router-dom";

interface Props {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100px",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);

export const VideoCard = (props: Props) => {
  const {_id, title, description, thumbnail} = props;
  const classes = useStyles();
  const history = useHistory();

  const viewVideo = (_id: string) => {
    history.push(`/watch/${_id}`);
  };

  return (
    <Card onClick={() => viewVideo(_id)} elevation={0} className={classes.root}>
      <CardMedia className={classes.cover} image={thumbnail} title={title} />
      <div className={classes.details}>
        <CardActionArea>
          <CardContent className={classes.content}>
            <Typography variant='body1'>{title}</Typography>
            <Typography variant='body2' color='textSecondary'>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </div>
    </Card>
  );
};
