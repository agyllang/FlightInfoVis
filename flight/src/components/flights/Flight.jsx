import React from "react";
import MapChart from "../map/FlightMap";
import { Row, Col, Container } from "react-bootstrap";

const Flight = ({ ...props }) => {
  const { flightData } = props;
  console.log("flightData", flightData);
  return (
    <Container>
      <Row>
        <Col className="flight-details">
          <Row>
            <b>
              {flightData["Flygplatskodföravreseort"]} -{" "}
              {flightData["Flygplatskodfördestination"]} :
              <div>{flightData["Slutdatum/-tidförresan"]}</div>
            </b>
          </Row>
          <Col className="ticket-info">
            <div>Date: {flightData["Slutdatum/-tidförresan"]}</div>
            <div>Emission: {Math.round(flightData["CO2"])} kg CO2</div>
            <div>Distance: {Math.round(flightData["Dist"])} km</div>

            <div>
              Price: {Math.round(flightData["Faktisk biljettbelopp (kr)"])} kr
            </div>
            <div>Airline: {flightData["Utfärdadbiljettflygbolag"]}</div>
            <div>Travel class: {flightData["Utfärdadbiljettkabintyp"]}</div>
          </Col>
        </Col>
        <Col className="map-chart-container">
          <MapChart
            trips={[
              [
                flightData["Flygplatskodföravreseort"],
                flightData["Flygplatskodfördestination"],
              ],
            ]}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Flight;
