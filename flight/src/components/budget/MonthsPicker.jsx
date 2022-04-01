import React, { useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';



const MonthsPicker = ({ ...props }) => {
  const {} = props;
  const [value, setValue] = useState()
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={['year', 'month']}
          label="Month of planned trip"
          minDate={new Date("2022-01-01")}
          maxDate={new Date("2023-06-01")}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default MonthsPicker;
