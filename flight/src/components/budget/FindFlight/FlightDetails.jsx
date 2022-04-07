import React from "react";
import { Row, Col, Container,  } from "react-bootstrap";

const FlightDetails = ({ ...props }) => {
  const { details, numberOfTrips } = props;
  //   var flightFactor = oneWay ? 1 : 2;
  // console.log("details", details);
  var total = Math.floor(details.total);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];
  return (
    <Container>
      <h2 className="page-header2">Estimated Flight Details</h2>
      <Row style={{marginTop:"1.5rem",marginBottom:"1.5rem"}}>
        <Col>
          <Col>
            Date: {months[details.travelDate[0].month]}{" "}
            {details.travelDate[0].year}{" "}
          </Col>
          <Col>Workdays: {details.workDays}</Col>
        </Col>

        <Col>Seat Class: {details.seatClass} </Col>
      </Row>
      <Row style={{ fontWeight: "bold" }}>
        <Col>Flight</Col>
        <Col>CO2e (kg)</Col>
      </Row>
      <>
        {details.legs.map((trip, index) => {
          return (
            <Row key={`trip-leg-${index}`}>
              <Col>
                {index + 1} . {trip.from} - {trip.to}{" "}
              </Col>
              <Col>{Math.floor(trip.co2e)}</Col>
            </Row>
          );
        })}
      </>
      <Row>
        <Col style={{ fontWeight: "bold" }}>Summary:</Col>
      </Row>

      <Row>
        <Col> </Col>
        <Col>{details.co2e}</Col>
      </Row>
      <Row>
        <Col>{numberOfTrips == 1 ? "(One way)" : "(Round trip)"}</Col>
        <Col> x{numberOfTrips} </Col>
      </Row>
      <Row style={{ fontWeight: "bold", borderBottom: "2px solid grey" }}>
        <Col>Total</Col>
        <Col>
          = {details.totalco2e} {details.co2e_unit} CO2e{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default FlightDetails;
