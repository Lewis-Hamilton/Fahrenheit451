import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  Avatar,
  IconButton,
  CardHeader,
  Grid,
  createStyles,
  Theme,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors";
import Logo from "../../media/ChannelLogo.png";
import VideoMenu from "./videoMenu";
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
  })
);

interface Props {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  creation_date: string;
}

const VideoPreview = (props: Props) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const viewVideo = (_id: string) => {
    history.push(`/watch/${_id}`);
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickOpenDialog = () => {
    handleCloseMenu();
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const { _id, title, description, thumbnail, creation_date } = props;

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
                  Posted {moment(creation_date, "YYYYMMDD").fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
      <VideoMenu
        anchorEl={anchorEl}
        handleCloseMenu={handleCloseMenu}
        handleDelete={handleClickOpenDialog}
      />
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
