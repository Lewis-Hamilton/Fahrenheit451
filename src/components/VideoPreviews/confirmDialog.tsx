import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Axios from "axios";

interface Props {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  creation_date: string;
  option: "delete";
  open: boolean;
  handleClose: () => void;
}

export default function ConfirmDialog(props: Props) {
  const { _id, title, open, option, handleClose } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const Action = () => {
    if (option === "delete") {
      Axios.delete(`https://susanwabbajacksucks.herokuapp.com/api/video/${_id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          handleClose();
        });
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
          {"susanwabbajacksucks"}
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
