import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import SmartToyIcon from "@mui/icons-material/SmartToy"; // For "Test Bot"
import { IoCopy } from "react-icons/io5";
import { useState, type MouseEvent } from "react";

interface ActionsMenuProps {
  id: number;
  status: string;
  name: string;
  onEdit: (id: number) => void;
  onBlock: (id: number) => void;
  onDelete: (id: number) => void;
  onTest: (id: string | number, name: string) => void;
  onCDNCopy: (id: string | number) => void;
}

const ActionsMenu = ({ id, name, status, onEdit, onBlock, onDelete, onTest, onCDNCopy }: ActionsMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onEdit(id);
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onBlock(id);
            handleClose();
          }}
        >
          <ListItemIcon>
            {status === "blocked" ? (
              <LockOpenIcon fontSize="small" />
            ) : (
              <BlockIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {status === "blocked" ? "Unblock" : "Block"}
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onDelete(id);
            handleClose();
          }}
          sx={{ color: "red" }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: "red" }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onTest(id, name);
            handleClose();
          }}
        >
          <ListItemIcon>
            <SmartToyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Test Bot</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onCDNCopy(id);
            handleClose();
          }}
        >
          <ListItemIcon>
            <IoCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy CDN Link</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionsMenu;
