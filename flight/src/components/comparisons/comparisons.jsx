import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ComparisonBar from "../bars/comparisonBar";
import Select from "react-select";
const optionsYear = [
  { value: 2018, label: 2018 },
  { value: 2019, label: 2019 },
];
const optionsMonth = [
  { value: 0, label: "Jan" },
  { value: 1, label: "Feb" },
  { value: 2, label: "Mar" },
  { value: 3, label: "Apr" },
  { value: 4, label: "May" },
  { value: 5, label: "Jun" },
  { value: 6, label: "Jul" },
  { value: 7, label: "Aug" },
  { value: 8, label: "Sep" },
  { value: 9, label: "Okt" },
  { value: 10, label: "Nov" },
  { value: 11, label: "Dec" },
];
const Comparisons = ({ ...props }) => {
  const { dataCurrentYear, changeCurrentYear, currentYear, allData } = props;

  const [currentMonthIndex, setMonth] = useState();
  // @currentMonthIndex, integer - used as an index to decide what the current month is (is unde)
  const handleInputChangeYear = (event) => {
    // console.log("event:", event);
    changeCurrentYear(event.value);
  };
  const handleInputChangeMonth = (event) => {
    // console.log("event:", event);
    setMonth(event.value);
  };

  return (
    <Container gap={2} className="">
      <Row className="page-title">Comparisons</Row>
      <Row className="header-text-year">
        Displaying data from year
        <Col md={2}>
          <Select
            onChange={handleInputChangeYear}
            placeholder={currentYear ? currentYear : "Choose year"}
            options={optionsYear}
            styles={""}
          />
        </Col>
        in
        <Col md={2}>
          <Select
            onChange={handleInputChangeMonth}
            placeholder={
              currentMonthIndex
                ? optionsMonth[currentMonthIndex].value
                : "Choose month"
            }
            options={optionsMonth}
            styles={""}
          />
        </Col>
      </Row>
      <Row>
        <ComparisonBar
          currentYear={currentYear}
          currentMonthIndex={currentMonthIndex}
          yearForData={[2018, 2019]}
          allData={allData}
        />{" "}
      </Row>
    </Container>
  );
};

export default Comparisons;
