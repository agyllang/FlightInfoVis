import { React, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const TripListOverview = ({ ...props }) => {
  const { tripsCurrentMonth, plannedCalendar } = props;
  // console.log("tripsCurrentMonth", tripsCurrentMonth);
  console.log("plannedCalendar", plannedCalendar);
  const [totalCO2, setTotalCO2] = useState(0);
  // useEffect(() => {
  //   var sumCO2 = 0;

  //   tripsCurrentMonth.length > 0 &&
  //     tripsCurrentMonth.forEach((trip) => {
  //       sumCO2 += parseInt(trip.CO2);
  //     });

  //   console.log("sumCO2", sumCO2);
  //   setTotalCO2(sumCO2);
  // }, [tripsCurrentMonth]);
  // useEffect(() => {
  //   effect;
  //   return () => {
  //     cleanup;
  //   };
  // }, [plannedCalendar]);
  return (
    <Container className="triplist-container">
      <Col>
        <Row>
          <Col className="triplist-column-header">Trip</Col>
          <Col className="triplist-column-header">Emissions (CO2e/kg)</Col>

          <Col className="triplist-column-header">Departure date</Col>
        </Row>
        {/* To display trips current month */}
        {tripsCurrentMonth &&
          tripsCurrentMonth.length > 0 &&
          tripsCurrentMonth.map((trip, index) => {
            return (
              <Row className="triplist-item" key={`${trip.ID}-${index}`}>
                <Col>
                  {" "}
                  {trip.Avreseort.split(",")[0]} -{" "}
                  {trip.Destinationsplats.split(",")[0]}{" "}
                </Col>
                <Col> {Math.round(trip.CO2)} </Col>
                <Col> {trip["Avresedatum/-tid"]}</Col>
              </Row>
            );
          })}
        {/* To display planned trips */}
        {plannedCalendar &&
          plannedCalendar
            .filter((monthObj) => Object.values(monthObj)[0].length > 0)
            .map((month, index) => {
              return (
                <Col key={`${index}-month-planned`}>
                  <Row className="triplist-item-month">
                    {Object.keys(month)[0]}
                  </Row>
                  {Object.values(month)[0].map((trip, index) => {
                    return (
                      <Row
                        className="triplist-item"
                        key={`${index}-row-planned`}
                      >
                        <Col>
                          {" "}
                          {trip.Avreseort.split(",")[0]} -{" "}
                          {trip.Destinationsplats.split(",")[0]}{" "}
                        </Col>
                        <Col> {Math.round(trip.CO2)} </Col>
                        <Col> {trip["Avresedatum/-tid"]}</Col>
                      </Row>
                    );
                  })}
                </Col>
              );
            })}
      </Col>
    </Container>
  );
};

export default TripListOverview;
