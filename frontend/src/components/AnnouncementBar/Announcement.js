import React from "react";
import { deleteAnnouncement } from "../../dynoFuncs";
import { Box, Text, Heading } from "@chakra-ui/react";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./Announcement.css";

const Announcement = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    console.log(typeof props.id);
    console.log(props.id);
    deleteAnnouncement("admin_announcements", props.id);
    alert(
      "Announcement Successfully Deleted. \nPlease refresh page to see change."
    );
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Box bg="#576754" m={4} p={4} borderRadius="12px">
      <Box pb={4}>
        <div className="topRow">
          <Heading color="#CCDDBD" size="md">
            {" "}
            {props.title}{" "}
          </Heading>
          <IconButton style={{ color: "#cee4bb" }} onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete this announcement?"}
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
        </div>
        <Heading color="#CCDDBD" size="sm">
          {" "}
          {props.date}{" "}
        </Heading>
      </Box>
      <Box align="center">
        <Text color="white"> {props.body} </Text>
        <Text pt={3} color="#CCDDBD">
          {" "}
          - {props.poster}{" "}
        </Text>
      </Box>
    </Box>
  );
};

export default Announcement;
