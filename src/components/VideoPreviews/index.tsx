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
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors";
import Logo from "../../media/ChannelLogo.png";
import VideoMenu from "./videoMenu";
import ConfirmDialog from "./confirmDialog";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  avatar: {
    backgroundColor: red[500],
  },
});

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
        <CardHeader
          avatar={
            <Avatar
              src={Logo}
              aria-label='recipe'
              className={classes.avatar}
            ></Avatar>
          }
          action={
            <IconButton onClick={handleClickMenu} aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title='Conservative Christian'
          subheader={creation_date}
        />
        <CardActionArea onClick={() => viewVideo(_id)}>
          <CardMedia
            className={classes.media}
            image={thumbnail}
            title={title}
          />
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
