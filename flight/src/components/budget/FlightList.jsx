import React, { useState, useContext } from "react";
import { FlightsContext } from "../contexts/FlightsContext";

import { Row, Col, Container } from "react-bootstrap";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

const FlightList = ({ ...props }) => {
  // const { flights } = props;

  const { flights } = useContext(FlightsContext);
  // console.log("FlightList flights", flights);

  const [focusedIndex, setFocused] = useState();
  // console.log("focused", focusedIndex);

  const handleFocus = (index) => {
    // console.log("handleFocus");
    if (index === focusedIndex) {
      setFocused();
    } else {
      setFocused(index);
    }
  };
  return (
    <Container className="component-container">
      <h5 className="component-title"> Planned Flights ({flights.length}) </h5>

      <Col>
        <Row>
          <Col className="list-column-header" xs={3}>
            FlightID
          </Col>
          <Col className="list-column-header" xs={2}>
            Date
          </Col>
          <Col className="list-column-header" xs={2}>
            CO2e(kg)
          </Col>
          <Col className="list-column-header" xs={2}>
            EmployeeID
          </Col>
          {/* <Col xs={3}>PRIO</Col> */}
        </Row>
        <div className="list-table">
          {flights.length > 0 &&
            flights.map((flight, index) => {
              // console.log("flight", flight);
              const ref = React.createRef();

              const handleClick = (e) => {
                  handleFocus(index)
                  ref.current.scrollIntoView(
                    {
                    behavior: "smooth",
                    block: "center",
                  }
                  );
                }

            

              return (
                <Row
                  ref={ref}
                  key={`flightList-row-${index}`}
                  className="addEmployee-row"
                  style={{
                    border: index === focusedIndex ? "2px solid black" : "",
                    borderRadius: "1px",
                    margin: "3px",
                    backgroundColor: index % 2 ? "#eaeaea" : "#ffffff",
                  }}
                  onClick={handleClick}
                >
                  <Col xs={3}>{flight.flightID}</Col>
                  <Col xs={2}>
                    {flight.travelDate[0].month}/{flight.travelDate[0].year}
                  </Col>
                  <Col xs={2}>{flight.totalco2e}</Col>
                  <Col xs={2}>{flight.ID}</Col>
                  <Col xs={{ span: 1, offset: 2 }}>
                    {focusedIndex === index ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </Col>

                  {focusedIndex === index && (
                    <Container>
                      <Row>
                        <Col className="flightListDetails-header">
                          Flight details
                        </Col>
                      </Row>
                      <Col
                        xs={3}
                        style={{
                          borderRadius: "4px",
                          border: "0.2px solid rgba(240, 240, 240,0.3)",
                          marginBottom: "1rem",
                        }}
                      >
                        Seat Class:
                        <Col className="flightListDetails-item">
                          {flight.seatClass}
                        </Col>
                      </Col>
                      <Row>
                        <Col xs={3}>From:</Col>

                        <Col xs={3}>To:</Col>
                        <Col xs={3}>CO2e(kg)/leg</Col>
                      </Row>

                      {flight.legs.map((leg, i) => {
                        return (
                          <Row>
                            <Col className="flightListDetails-item" xs={3}>
                              <FlightTakeoffIcon />
                              {leg.from}
                            </Col>

                            <Col className="flightListDetails-item" xs={3}>
                              <FlightLandIcon /> {leg.to}
                            </Col>
                            <Col className="flightListDetails-item" xs={2}>
                              {Math.floor(leg.co2e)}
                            </Col>
                          </Row>
                        );
                      })}
                      <Row>
                        <Col xs={3}>
                          {flight.oneWay === 1 ? "(One-way)" : "(Round trip)"}
                        </Col>
                        <Col xs={3}> </Col>
                        <Col xs={4} className="flightListDetails-item">
                          {" "}
                          x{flight.oneWay}{" "}
                        </Col>
                      </Row>
                      <Row style={{ borderTop: "0.5px solid grey" }}>
                        <Col className="flightListDetails-header">
                          Purpose details
                        </Col>
                      </Row>
                      <Container>
                        <Row>
                          Purpose:{" "}
                          <Col className="flightListDetails-item">
                            {flight.purpose}
                          </Col>
                        </Row>
                        <Row>
                          Priority value:
                          <Col className="flightListDetails-item">
                            {flight.priority}
                          </Col>{" "}
                        </Row>

                        <Row>
                          Number of workdays:{" "}
                          <Col className="flightListDetails-item">
                            {flight.workDays}
                          </Col>
                        </Row>
                      </Container>
                      {/* <Col xs={3}>CO2e</Col> */}
                    </Container>
                  )}
                </Row>
              );
            })}
        </div>
      </Col>
    </Container>
  );
};

export default FlightList;
