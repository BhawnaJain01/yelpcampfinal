import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdModeEditOutline } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [price, setPrice] = useState();

  const body = {
    id: data._id,
    name: name,
    location: location,
    price: price,
  };

  const handleEdit = async () => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };

      const resp = await fetch(
        "http://localhost:3211/editCampGrounds",
        requestOptions
      );

      if (resp.ok) {
        window.location.reload();
      } else {
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };

  console.log("data=>", data);

  return (
    <div style={{ position: "absolute", right: "6%" }}>
      <Button onClick={handleOpen}>
        {" "}
        <MdModeEditOutline size={30} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Camp Ground
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              style={{ width: "400px", marginBottom: "20px" }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              defaultValue={data.name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={{ width: "400px", marginBottom: "20px" }}
              id="outlined-basic"
              label="Location"
              variant="outlined"
              defaultValue={data.location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <TextField
              style={{ width: "400px", marginBottom: "20px" }}
              id="outlined-basic"
              label="Price/day"
              variant="outlined"
              defaultValue={data.price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Typography>

          <Button
            onClick={() => handleEdit()}
            style={{ marginLeft: "150px" }}
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
