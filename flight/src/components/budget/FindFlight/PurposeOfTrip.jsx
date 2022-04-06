import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Row, Col, Container, Button } from "react-bootstrap";

const PurposeOfTrip = ({ ...props }) => {
  const { setPurposeOfTrip } = props;
  const [priorityValue, setPriorityValue] = useState(1);
  const [textFieldValue, setTextFieldValue] = useState("");

  useEffect(() => {
    setPurposeOfTrip(priorityValue, textFieldValue);
  }, [priorityValue, textFieldValue]);

  const handleChange = (event, newValue) => {
    setPriorityValue(parseInt(newValue));
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
    <Container className="purposeOfTrip-container">
      <h4 className="purposeOfTrip-header">Prioritization of trip</h4>
      <h5 className="purposeOfTrip-header2">Whats the purpose of the trip?</h5>
      <TextField
        sx={{ marginBottom:"2rem" }}
        id="outlined-textarea"
        label="Purpose"
        placeholder="Reason for the trip.."
        multiline
        value={textFieldValue}
        onChange={handleChangeTextField}
      />
      <h5 className="purposeOfTrip-header2">
        How would you rate the priority? <b> {priorityValue}/4</b>
      </h5>
      <Box sx={{ mx: "auto", width: "80%", }}>
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
    </Container>
  );
};

export default PurposeOfTrip;
