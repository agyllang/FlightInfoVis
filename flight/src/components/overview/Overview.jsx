<<<<<<< Updated upstream
import React from "react";
import FlightMap from "../map/FlightMap";
=======
import React, { useEffect, useState } from "react";
// import FlightMap from "../map/FlightMap";
import ProgressBarYearly from "../progress/progressbar";
import Select from "react-select";
import { Row, Col, Container, Card} from "react-bootstrap";


>>>>>>> Stashed changes
// import VerticalBar from "./VerticalBar";

const Overview = ({ ...props }) => {
  const { data } = props;
  //   console.log("Employees props", props);

  return (
<<<<<<< Updated upstream
    <div className="page">
      <div className="page-title"> Overview</div>
      <div>Progress bar?</div>
      <div className="row">
        <div>
          This month?
          <div
            style={{
              margin: "20px",

              height: "100px",
              width: "100px",
              backgroundColor: "#3d73df",
            }}
          ></div>
        </div>
        <div>
          Next month?
          <div
            style={{
              margin: "20px",

              height: "100px",
              width: "100px",
              backgroundColor: "#3d13df",
            }}
          ></div>
        </div>
        <div>
          This year?
          <div
            style={{
              margin: "20px",

              height: "100px",
              width: "100px",
              backgroundColor: "#37f3df",
            }}
          ></div>
        </div>
        
        <FlightMap
          trips={[
            ["ARN", "OSL"],
            ["ARN", "GLA"],
          ]}
        />
      </div>
      {/* <VerticalBar values={[1,2,3,4,5,6,7]} labels={[1,2,3,4,5,6,7]}/> */}
    </div>
=======
    <Container className="">
      <Row className="page-title">Overview</Row>
      <Row>
        <Col md={2}>
          <Select
            onChange={handleInputChangeYear}
            placeholder={currentYear ? currentYear : "Choose year"}
            options={optionsYear}
            styles={""}
          />
        </Col>
        <Col md={2}>
          <Select
            onChange={handleInputChangeMonth}
            placeholder={
              currentMonth ? optionsMonth[currentMonth].value : "Choose month"
            }
            options={optionsMonth}
            styles={""}
          />
        </Col>
      </Row>
      <Row>
      <div>Displaying data from year {currentYear} </div>
      </Row>
      <Row>
      {calendar.length > 0 && (
        <ProgressBarYearly
          calendarSection={calendar.slice(0, currentMonth + 1)}
          calendar={calendar}
          selectedCO2sum={selectedCO2sum}
          totalyearCO2={totalCO2year}
        />
      )}
      </Row>
      <Row>
      <Col md={3}>
      <Card style ={{width: '18rem'}}>
        <Card.Header>{`Emitted ${currentYear}`}</Card.Header>
        <Card.Body>{`${selectedCO2sum} CO2e/kg`}</Card.Body>
      </Card>
      </Col>
      <Col md={3}>
      <Card style ={{width: '18rem'}}>
        <Card.Header>{`Total ${currentYear}`}</Card.Header>
        <Card.Body>{`${totalCO2year} CO2e/kg`}</Card.Body>
      </Card>
      </Col>
      </Row>
    </Container>
>>>>>>> Stashed changes
  );
};

export default Overview;
