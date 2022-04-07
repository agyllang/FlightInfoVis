import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

  
const Sort = ({...props}) => {
    const { placeholder, array, callback } = props;
    console.log("Sort, array", array);
    const [value, setVal] = useState("");
  
    const handleChange = (event) => {
      setVal(event.target.value);
      callback(event.target.value);
    };
  return (
    <>
    <FormControl sx={{ m: 1, minWidth: 100 }}>
      <InputLabel id="demo-simple-select-autowidth-label">
        {placeholder}
      </InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={value}
        onChange={handleChange}
        autoWidth
        label={placeholder}
      >
      
        {array.length > 0 &&
          array.map((each, index) => {
            return (
              <MenuItem key={index} value={each}>
                {each}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
    </>
  )
}

export default Sort