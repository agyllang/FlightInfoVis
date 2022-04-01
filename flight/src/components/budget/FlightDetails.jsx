import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";

const FlightDetails = ({ ...props }) => {
  const { details, numberOfTrips } = props;
//   var flightFactor = oneWay ? 1 : 2;
  var total = Math.floor(details.total);
  return (
    <Container style={{ backgroundColor: "rgba(162, 245, 213, 0.55)" }}>
      <Row className="page-header2">Estimated Flight Details</Row>
      <Row style={{ fontWeight: "bold" }}>
        <Col>Flight</Col>
        <Col>CO2e (kg)</Col>
      </Row>
      <>
        {details.legs.map((trip, index) => {
          return (
            <Row key={`trip-leg-${index}`}>
              <Col>
                {trip.from} - {trip.to}{" "}
              </Col>
              <Col>{Math.floor(trip.co2e)}</Col>
            </Row>
          );
        })}
      </>
      <Row
        style={{ fontWeight: "bold", borderBottom: "2px solid grey" }}
        md={2}
      >
        <Col>Summary:</Col>
      </Row>
      <Row>
        <Col>Class: {details.seatClass} </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col> </Col>
        <Col>{total}</Col>
      </Row>
      <Row>
        <Col>{numberOfTrips==1 ? "(One way)" : "(Round trip)"}</Col>
        <Col> x{numberOfTrips}  </Col>
      </Row>
      <Row>
        <Col>Total</Col>
        <Col>
          = {total * numberOfTrips} {details.co2e_unit} CO2e{" "}
        </Col>
      </Row>
      <Row gap={2} style={{marginTop:"1rem"}}>
        <Button
          variant="success"
          // disabled={isLoading}
          // onClick={handleButtonClick}
        >
          Assign to Employee
        </Button>

      </Row>
    </Container>
  );
};

export default FlightDetails;
