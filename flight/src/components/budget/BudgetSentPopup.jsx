import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";

const BudgetSentPopup = ({ ...props }) => {
  const { budgetApproved } = props;
  const [open, setOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState("info");

  // const handleClick = () => {
  //   setOpen(true);
  // };

  useEffect(() => {
    setOpen(true);
    setSeverity("success");
    setAlertTitle(`Budget has been sent`);

    return () => {
      setOpen(false);
    };
  }, [budgetApproved]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertContent}
      </Alert>
    </Snackbar>
  );
};

export default BudgetSentPopup;
