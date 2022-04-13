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
    console.log("t",t)
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
    <Row style={{ justifyContent: "space-between" }}>
      <Col md={"auto"}>
        <TextField
          type="number"
          id="outlined-basic"
          label="Workdays"
          variant="standard"
          helperText="*Efficient workdays while away"
          min={0}
          onChange={(event) => {
            console.log("val", event.target.value);
            setWorkdays(event.target.value);
          }}
        />
      </Col>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Col md={"auto"}>
          <DatePicker
            views={["month", "year"]}
            label="Date"
            variant="standard"
            minDate={new Date("2022-01-01")}
            maxDate={new Date("2023-06-01")}
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
          />
        </Col>
      </LocalizationProvider>
    </Row>
  );
};

export default MonthsPicker;
