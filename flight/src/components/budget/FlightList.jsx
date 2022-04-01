import React from "react";
import { Row, Col } from "react-bootstrap";

const FlightList = ({ ...props }) => {
  const { flights } = props;
  return (
    <>
      <Col>
        <div className="page-header2">Flights ({flights.length})</div>
      </Col>
      <Col className="addEmployee-container">
        <Row
          style={{
            borderBottom: "1px solid grey",
          }}
        >
          {" "}
          <Col xs={3}>From</Col>
          <Col xs={3}>To</Col> <Col xs={3}>CO2</Col>{" "}
        </Row>
        {flights.length > 0
          ? flights.map((flight) => {
              return (
                <Row className="addEmployee-row">
                  <Col xs={3}>{flight.from}</Col>
                  <Col xs={3}>{flight.to}</Col>
                </Row>
              );
            })
          : "No flights added"}
      </Col>
    </>
  );
};

export default FlightList;
