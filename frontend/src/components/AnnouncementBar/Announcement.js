import React, { useContext } from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteAnnouncement } from "../../dynoFuncs";
import "./Announcement.css";
import { GlobalContext } from "../../GlobalState";

function Announcement({
  id,
  reloadPageVar,
  title,
  date,
  body,
  poster,
  reloadPageFunc,
}) {
  const [open, setOpen] = React.useState(false);
  const { currentUserInfo } = useContext(GlobalContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    deleteAnnouncement(id);
    setOpen(false);
    reloadPageFunc(reloadPageVar + 1);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const getDeleteIcon = () => { //eslint-disable-line
    if (currentUserInfo.is_Admin === "True") {
      return (
        <IconButton style={{ color: "#cee4bb" }} onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      );
    }
  };

  return (
    <Box bg="#576754" m={4} p={4} borderRadius="12px">
      <Box pb={4}>
        <Heading color="#CCDDBD" size="md">
          {" "}
          {title}{" "}
        </Heading>
        <Heading color="#CCDDBD" size="sm">
          {" "}
          {date}{" "}
        </Heading>
      </Box>
      <Box align="center">
        <Text color="white"> {body} </Text>
        <Text pt={3} color="#CCDDBD">
          {" "}
          - {poster}{" "}
        </Text>
      </Box>
      <div className="trash">{getDeleteIcon()}</div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this announcement?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can't be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="#CCDDBD">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="#CCDDBD" autoFocus>
            Delete Announcement
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Announcement;
