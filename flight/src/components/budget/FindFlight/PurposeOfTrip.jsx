import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";


import { Row, Col, Container, Button } from "react-bootstrap";


const PurposeOfTrip = ({ ...props }) => {
  const { setPurposeOfTrip } = props;
  const [priorityValue, setPriorityValue] = useState(1);
  const [textFieldValue, setTextFieldValue] = useState("");

  const reverseValue = (num) => {
    var reversed = 0
    if(num===4){
      reversed= 1
    }
    if(num===3){
      reversed= 2
    }
    if(num===2){
      reversed= 3
    }
    if(num===1){
      reversed= 4
    }
    return reversed
  }

  useEffect(() => {
    setPurposeOfTrip(reverseValue(priorityValue), textFieldValue);
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
      {/* <h5 className="component-title">Prioritization of trip</h5> */}
      <h3 className="purposeOfTrip-header2">Whats the purpose of the trip?</h3>
      <Col>
        <TextField
          sx={{ marginBottom: "2rem" }}
          id="outlined-textarea"
          label="Purpose"
          // placeholder="Reason for the trip.."
          multiline
          value={textFieldValue}
          onChange={handleChangeTextField}
        />
        <h5 className="purposeOfTrip-header2">
          How would you prioritize this trip? <b> {reverseValue(priorityValue)}</b>
        </h5>
        {/* <Box sx={{ mx: "auto", width: "80%" }}> */}
          <Slider
            aria-label="Priority"
            defaultValue={0}
            //getAriaValueText={valuetext}
            // valueLabelDisplay="auto"
            step={1}
            marks={priorityScale}
            min={1}
            max={4}
            onChange={handleChange}
            value={priorityValue}
            // track={"inverted"}
          />
        {/* </Box> */}
      </Col>
    </Container>
  );
};

export default PurposeOfTrip;
