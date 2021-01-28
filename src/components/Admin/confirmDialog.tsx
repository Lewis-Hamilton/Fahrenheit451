import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {deleteVideo} from "../../redux/slice/videoSlice";

interface Props {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  creationDate: string;
  option: "delete";
  open: boolean;
  handleClose: () => void;
}

export default function ConfirmDialog(props: Props) {
  const {_id, title, open, option, handleClose} = props;
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const Action = () => {
    if (option === "delete") {
      dispatch(deleteVideo(_id));
      handleClose();
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {"Warning"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to ${option} ${title}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={Action} color='primary' autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
