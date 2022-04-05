import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

const FlightList = ({ ...props }) => {
  const { flights } = props;
  console.log("flights", flights);
  const [focusedIndex, setFocused] = useState();
  console.log("focused", focusedIndex);

  const handleFocus = (index) => {
    console.log("handleFocus");
    if (index === focusedIndex) {
      setFocused();
    } else {
      setFocused(index);
    }
  };
  return (
    <Container className="addEmployee-container">
      <Col>
        <div className="page-header2">Flights ({flights.length})</div>
      </Col>
      <Col>
        <Row
          style={{
            borderBottom: "1px solid grey",
          }}
        >
          {" "}
          <Col xs={2}>ID</Col>
          <Col xs={2}>Date</Col>
          <Col xs={2}>CO2e(kg)</Col>
          <Col xs={2}>Prio</Col>
          {/* <Col xs={3}>PRIO</Col> */}
        </Row>
        {flights.length > 0 &&
          flights.map((flight, index) => {
            console.log("flight", flight);
            return (
              <Row
                key={`flightList-row-${index}`}
                className="addEmployee-row"
                style={{
                  border:
                    index === focusedIndex
                      ? "2px solid black"
                      : "0.5px solid grey",
                  borderRadius: "4px",
                  margin: "3px",
                  backgroundColor: index % 2 ? "#ccdbfd" : "#b6ccfe",
                }}
                onClick={() => handleFocus(index)}
              >
                <Col xs={2}>{flight.ID}</Col>
                <Col xs={2}>
                  {flight.travelDate[0].month}/{flight.travelDate[0].year}
                </Col>
                <Col xs={2}>{Math.floor(flight.total)}</Col>
                <Col xs={2}>{flight.priority}</Col>
                <Col xs={{ span: 2, offset: 2 }}>
                  {focusedIndex === index ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Col>

                {focusedIndex === index && (
                  <Container>
                    <b>Flight details</b>
                    <Row>
                      <Col xs={3}>From</Col>

                      <Col xs={3}>To </Col>
                      <Col xs={3}>CO2e(kg)/leg</Col>
                    </Row>

                    {flight.legs.map((leg, i) => {
                      return (
                        <Row>
                          <Col xs={3}>
                            <FlightTakeoffIcon />
                            {leg.from}
                          </Col>

                          <Col xs={3}>
                             <FlightLandIcon /> {leg.to}
                          </Col>
                          <Col xs={2}>{Math.floor(leg.co2e)}</Col>
                        </Row>
                      );
                    })}

                    <Container>
                      <Row xs={3}>Purpose: {flight.purpose}</Row>

                      <Row xs={3}>Workdays: {flight.workDays}</Row>
                      <Row xs={3}>SeatClass: {flight.seatClass}</Row>

                      {/* <Col xs={3}>CO2e</Col> */}
                    </Container>
                  </Container>
                )}
              </Row>
            );
          })}
      </Col>
    </Container>
  );
};

export default FlightList;
