import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
const PurposeOfTrip = () => {
  const [priorityValue, setPriorityValue] = useState(0);
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleChange = (event, newValue) => {
    setPriorityValue(newValue);
  };
  const handleChangeTextField = (event) => {
    setTextFieldValue(event.target.value);
  };

  const priorityScale = [
    { label: "Could do", value: 25 },
    { label: "Should do", value: 50 },
    { label: "Need to do", value: 75 },
    { label: "Must do", value: 100 },
  ];

  return (
    <div>
      <div>
        Priority rating: <b>{priorityValue}</b>
        <Box sx={{ width: "80%" }}>
          <Slider
            aria-label="Priority"
            defaultValue={0}
            //getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={5}
            marks={priorityScale}
            min={0}
            max={100}
            onChange={handleChange}
            value={priorityValue}
          />
        </Box>
      </div>
      <TextField
        id="outlined-textarea"
        label="Purpose"
        placeholder="Reason for the trip.."
        multiline
        value={textFieldValue}
        onChange={handleChangeTextField}
      />
    </div>
  );
};

export default PurposeOfTrip;
