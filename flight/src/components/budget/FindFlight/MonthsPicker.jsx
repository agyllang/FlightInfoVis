import React, { useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { Row, Col } from "react-bootstrap";

const MonthsPicker = ({ ...props }) => {
  const { setDate, setWorkdays } = props;
  const [value, setValue] = useState(new Date(2022, 1));
  // console.log(" Monthspicker value", value);

  const whatMonth = (t) => {
    // console.log("t",t)
    const [month, year] = [t.getMonth(), t.getFullYear()];
    // reset to echotime to beginning of month and year
    setValue(t);

    var time = new Date(year, month).getTime();
    // var date = [{ month: month, year: year, echoTime: time }];
    // console.log("monthYear",monthYear)

    setDate(time);
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
