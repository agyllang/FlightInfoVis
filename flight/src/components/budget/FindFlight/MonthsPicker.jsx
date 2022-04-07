import React, { useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Row, Col, Container, Button, Spinner } from "react-bootstrap";

const MonthsPicker = ({ ...props }) => {
  const { setDate, setWorkdays } = props;
  const [value, setValue] = useState(["2022"]);
  console.log(" Monthspicker value", value);

  const whatMonth = (t) => {
    const [month, year] = [t.getMonth(), t.getFullYear()];
    // console.log("date", month + ":" + year);
    setValue(t);

    var time = new Date(year, month).getTime();
    var date = [{ month: month, year: year, echoTime: time }];
    // console.log("monthYear",monthYear)

    setDate(date);
    // console.log("date", date);
    // console.log("departureMonthIndex", departureMonthIndex);
    // console.log("departureyear", departureYear);
  };

  return (
    <Row>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Col>
          <DatePicker
            views={["month", "year"]}
            label="Date of trip"
            minDate={new Date("2022-01-01")}
            maxDate={new Date("2023-06-01")}
            value={value}
            onChange={(newValue) => {
              whatMonth(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </Col>
      </LocalizationProvider>
      <Col>
        <TextField
          type="number"
          id="outlined-basic"
          label="Workdays"
          variant="outlined"
          helperText="*Efficient workdays while away"
          min={0}
          onChange={(event) => {
            console.log("val", event.target.value);
            setWorkdays(event.target.value);
          }}
        />
      </Col>
    </Row>
  );
};

export default MonthsPicker;
