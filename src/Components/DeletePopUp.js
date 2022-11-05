import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function DeletePopUp({ id }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const resp = await fetch(
        `http://localhost:3211/deleteCampGrounds/${id}`,
        requestOptions
      );

      if (resp.status === 200) {
        window.location.reload();
      } else {
        alert("error");
        console.log("error");
      }
    } catch (error) {
      alert("error");
      console.log("error=>", error);
    }
  };

  return (
    <div style={{ position: "absolute", right: ".5%" }}>
      <Button onClick={handleClickOpen}>
        <MdOutlineDeleteOutline size={30} />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">ALERT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this Camp Ground ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "red" }} autoFocus onClick={handleClose}>
            Discard
          </Button>
          <Button onClick={() => handleDelete()} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
