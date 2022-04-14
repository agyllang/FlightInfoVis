import React, { useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import MonthPicker from "@mui/lab/MonthPicker";
// import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { Row, Col, Container } from "react-bootstrap";

const MonthsPicker = ({ ...props }) => {
  const { setDate, setWorkdays } = props;
  const [value, setValue] = useState(new Date(2022, 0));
  // console.log(" Monthspicker value", value);

  const whatMonth = (t) => {
    console.log("t", t);
    // console.log("t typeof",typeof t)
    setValue(t);

    if (t !== null) {
      // console.log("t",t)
      const [month, year] = [t.getMonth(), t.getFullYear()];
      // reset to echotime to beginning of month and year

      var time = new Date(year, month).getTime();
      // var date = [{ month: month, year: year, echoTime: time }];
      // console.log("monthYear",monthYear)

      setDate(time);
      // console.log("date", date);
      // console.log("departureMonthIndex", departureMonthIndex);
      // console.log("departureyear", departureYear);
    }
  };

  return (
    // <Container>
      <Row>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Col>
            Month of travel
            {/* <DatePicker
            views={["month"]}
            // views={["month", "year"]}
            label="Date"
            variant="standard"
            minDate={new Date("2022-01-01")}
            maxDate={new Date("2022-12-01")}
            value={value}
            // defaultCalendarMonth={"January"}
            onChange={(newValue) => {
              whatMonth(newValue);
            }}
            renderInput={(params) => (
              <TextField
                variant="standard"
                // mask={"__/__/"}
                // helperText=
                // onClick={ ()=> showToolbar}
                helperText={"*Month and year of planned trip"}
                {...params}
              />
            )}
          /> */}
            <MonthPicker
              style={{
                border: "2px solid rgb(220, 220, 220) ",
                // borderTop: 0,
                // borderBottomLeftRadius: "10px",
                // borderBottomRightRadius: "10px",
                borderRadius: "10px",
                // borderRadius: "10px",
                paddingLeft: "5px",
                paddingRight: "5px",
                paddingBottom: "5px",
                width: "200px",
                height: "210px",
              }}
              date={value}
              // views={["month"]}
              // value={value}

              minDate={new Date("2022-01-01")}
              maxDate={new Date("2022-12-01")}
              onChange={(newValue) => {
                whatMonth(newValue);
              }}
            />
          </Col>
        </LocalizationProvider>
      </Row>
    // </Container>
  );
};

export default MonthsPicker;
