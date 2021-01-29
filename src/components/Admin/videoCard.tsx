import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  Grid,
  createStyles,
  Theme,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {useHistory} from "react-router-dom";
import React from "react";
import {red} from "@material-ui/core/colors";
import ConfirmDialog from "./confirmDialog";
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
  description: string;
  thumbnail: string;
  url: string;
  creationDate: string;
}

const VideoPreview = (props: Props) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const viewVideo = (_id: string) => {
    history.push(`/watch/${_id}`);
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
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
        </CardActionArea>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <Typography gutterBottom variant='h6' component='h2'>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography color='textSecondary' component='p'>
                  Posted {moment(creationDate, "YYYYMMDD").fromNow()}
              </Typography>
            </Grid>
            <Grid item><EditIcon /></Grid>
            <Grid item><DeleteIcon onClick={handleClickOpenDialog} /></Grid>
          </Grid>
        </CardContent>
      </Card>
      <ConfirmDialog
        {...props}
        option={"delete"}
        open={open}
        handleClose={handleCloseDialog}
      />
    </>
  );
};

export default VideoPreview;
