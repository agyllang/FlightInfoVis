import React, { useState,useEffect, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { FlightsContext } from "../contexts/FlightsContext";

const AddBuffer = ({ ...props }) => {
  const { setProcent } = props;
  const { setBuffer,bufferProcent } = useContext(FlightsContext);

  const [val, setVal] = useState(0);

  useEffect(() => {
    setVal(bufferProcent)
  }, [bufferProcent])
  
  const handleChange = (e) => {

    setProcent(Math.abs(e.target.value));

    setVal(Math.abs(e.target.value));

    setBuffer(Math.abs(e.target.value));
    
    console.log("e.target.value", e.target.value);
  };
  return (
    <FilledInput
      sx={{ width: "80px" }}
      size="small"
      type="number"
      id="standard-adornment-%"
      //   min={0}
      //   max={50}
      value={val}
      onChange={handleChange}
      endAdornment={<InputAdornment position="end">%</InputAdornment>}
      aria-describedby="standard-weight-helper-text"
      inputProps={{ min: "0", max: "100", padding:"0"  }} 
      variant="filled"
    />
  );
};

export default AddBuffer;
