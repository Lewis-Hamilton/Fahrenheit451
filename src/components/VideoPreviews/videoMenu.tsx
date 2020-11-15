import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Divider } from "@material-ui/core";
import ConfirmDialog from "./confirmDialog";

interface Props {
  handleCloseMenu: () => void;
  anchorEl: HTMLElement | null;
  handleDelete: () => void;
}

export default function VideoMenu(props: Props) {
  const { handleCloseMenu, anchorEl, handleDelete } = props;

  return (
    <div>
      <Menu
        id='video-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
