import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";

const PopUpAlert = ({ ...props }) => {
  const { quarter, overShoot, CO2eTotal, forecast, actualTrend } = props;
  const [open, setOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState("info");

  // const handleClick = () => {
  //   setOpen(true);
  // };
  useEffect(() => {
    if (quarter !== 0) {
      if (overShoot < 0 && quarter !== 4  && quarter !== 5) {
        setSeverity("warning");
        setAlertTitle(`Q${quarter} follow-up`);
        setAlertContent(
          `Actual emissions and planned trips forecast will result in budget overshoot = ${Math.abs(
            CO2eTotal - forecast
          )} CO2e kg`
        );
      }

      if (overShoot > 0 && quarter !== 4) {
        setSeverity("info");
        setAlertTitle(`Q${quarter} follow-up`);
        setAlertContent(
          `Actual emissions and planned trips forecast are within budget limits`
        );
      }
      if (quarter === 4 && overShoot > 0) {
        setSeverity("success");
        setAlertTitle(`Q${quarter} follow-up`);
        setAlertContent(`Budget was made, good job!`);
      }
      if (quarter ===4 && overShoot < 0) {
        setSeverity("error");
        setAlertTitle(`Q${quarter} follow-up`);
        setAlertContent(
          `Budget was not made, overshoot = ${Math.abs(
            overShoot
          )} CO2e kg`
        );
      }
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [quarter, overShoot, CO2eTotal, forecast, actualTrend]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
        autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertContent}
      </Alert>
    </Snackbar>
  );
};

export default PopUpAlert;
