import React, { useState } from "react";
//import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddEmployeeForm from "./AddEmployeeForm";
import { Button } from "react-bootstrap";

const AddEmployeePopup = ({ ...props }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant={"success"}>
        + Add New Employee
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new employee to your division</DialogTitle>
        <DialogContent>
          <AddEmployeeForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddEmployeePopup;
