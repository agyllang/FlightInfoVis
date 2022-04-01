import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Row, Col, Container, Button } from "react-bootstrap";

const PurposeOfTrip = () => {
  const [priorityValue, setPriorityValue] = useState(1);
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleChange = (event, newValue) => {
    setPriorityValue(newValue);
  };
  const handleChangeTextField = (event) => {
    setTextFieldValue(event.target.value);
  };

  const priorityScale = [
    { label: "Could do", value: 1 },
    { label: "Should do", value: 2 },
    { label: "Need to do", value: 3 },
    { label: "Must do", value: 4 },
  ];

  return (
    <div className="purposeOfContainer">
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        What is the reason of the trip?
      </div>
      <TextField sx={{width:"100%"}}
        id="outlined-textarea"
        label="Purpose"
        placeholder="Reason for the trip.."
        multiline
        value={textFieldValue}
        onChange={handleChangeTextField}
      />
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        How would you rate the priority? {" "}
          <b> {priorityValue}/4</b>
        <div>
          <Box sx={{ mx: "auto", width: "70%" }}>
            <Slider
              aria-label="Priority"
              defaultValue={0}
              //getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks={priorityScale}
              min={1}
              max={4}
              onChange={handleChange}
              value={priorityValue}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default PurposeOfTrip;
