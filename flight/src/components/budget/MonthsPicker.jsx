import React, { useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const MonthsPicker = ({ ...props }) => {
  const { setDate, setWorkdays } = props;
  const [value, setValue] = useState();
  const whatMonth = (date) => {
    const [month, year] = [date.getMonth(), date.getFullYear()];
    console.log("date", month + ":" + year);
    setValue(date);

    var monthYear =[ { month: month, year: year }]
    console.log("monthYear",monthYear)
    // var departureDate = new Date(date);
    // var departureMonthIndex = date.getMonth();
    // var departureYear = date.getYear()-100;
    setDate(monthYear);
    // console.log("date", date);
    // console.log("departureMonthIndex", departureMonthIndex);
    // console.log("departureyear", departureYear);
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={["month", "year"]}
          label="Month of planned trip"
          minDate={new Date("2022-01-01")}
          maxDate={new Date("2023-06-01")}
          value={value}
          onChange={(newValue) => {
            whatMonth(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
      <TextField
        type="number"
        id="outlined-basic"
        label="Workdays"
        variant="outlined"
        helperText="*Efficient workdays while away"
        min={0}
        onChange={(event) => {
          console.log("val",event.target.value)
          setWorkdays(event.target.value);
        }}
      />
    </Box>
  );
};

export default MonthsPicker;
