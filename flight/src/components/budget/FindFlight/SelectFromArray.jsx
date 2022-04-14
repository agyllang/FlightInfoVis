import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectFromArray = ({ ...props }) => {
  const { placeholder, array, callback, propValue, propLabel } = props;
  // console.log("SelectFromArray, array", array);
  const [value, setVal] = useState("");
  useEffect (()=>{
      setVal("")
  },[array])

  const handleChange = (event) => {
    setVal(event.target.value);
    callback(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select">{placeholder}</InputLabel>
      <Select
        labelId="demo-simple-select"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
        // autoWidth
        label={placeholder}
      >
        {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
        {array.length > 0 &&
          array.map((each, index) => {
            return (
              <MenuItem key={index} value={propValue ? each[propValue] : each}>
                {propLabel ? each[propLabel] : each}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default SelectFromArray;
