import React, { useState, useEffect, useContext } from "react";
import { FlightsContext } from "../contexts/FlightsContext";
import { EmployeesContext } from "../contexts/EmployeesContext";
import { sortBy, returnMonthYear } from "../utility/functions";
import { Row, Col, Container } from "react-bootstrap";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";


const FlightList = ({ ...props }) => {
  const { sortValue,setSortValue, reverseSorting, setReverseSorting} = props;
  // console.log("FlightList flights", flights);
  const { flights } = useContext(FlightsContext);
  const { getNameFromID } = useContext(EmployeesContext);

  var sortedFlights = flights.sort(sortBy(sortValue, reverseSorting));
  console.log(" flightList sortedFlights:", sortedFlights);
  useEffect(() => {
    //add new flight on top
    console.log("flights", flights);
  }, [flights]);

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
          <Col className="list-column-header">FlightID</Col>
          <Col onClick={()=>{setSortValue("ID")}}
            className={
              sortValue === "ID"
                ? "list-column-header-sortFocus"
                : "list-column-header"
            }
          >
            Employee {sortValue==="ID" && <>
              {reverseSorting ? (
                <ArrowDownwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              ) : (
                <ArrowUpwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              )}</> }
          </Col>
          <Col onClick={()=>{setSortValue("totalco2e")}}
            className={
              sortValue === "totalco2e"
                ? "list-column-header-sortFocus"
                : "list-column-header"
            }
          >
            CO2e(kg) {sortValue==="totalco2e" && <>
              {reverseSorting ? (
                <ArrowDownwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              ) : (
                <ArrowUpwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              )}</> }
          </Col>

          <Col onClick={()=>{setSortValue("co2ePerDay")}}
            className={
              sortValue === "co2ePerDay"
                ? "list-column-header-sortFocus"
                : "list-column-header"
            }
          >
            CO2e(kg)/day {sortValue==="co2ePerDay" && <>
              {reverseSorting ? (
                <ArrowDownwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              ) : (
                <ArrowUpwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              )}</> }
          </Col>
          <Col onClick={()=>{setSortValue("priority")}}
            className={
              sortValue === "priority"
                ? "list-column-header-sortFocus"
                : "list-column-header"
            }
          >
            Priority {sortValue==="priority" && <>
              {reverseSorting ? (
                <ArrowDownwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              ) : (
                <ArrowUpwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              )}</> }
          </Col>
          <Col onClick={()=>{setSortValue("echoTimeDate")}}
            className={
              sortValue === "echoTimeDate"
                ? "list-column-header-sortFocus"
                : "list-column-header"
            }
          >
            Date {sortValue==="echoTimeDate" && <>
              {reverseSorting ? (
                <ArrowDownwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              ) : (
                <ArrowUpwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              )}</> }
          </Col>
          <Col xs={{ span: 1 }} />

          {/* <Col xs={3}> {"a "}</Col> */}
          {/* <Col xs={3}>PRIO</Col> */}
        </Row>
        <div className="list-table">
          {sortedFlights.length > 0 &&
            sortedFlights.map((flight, index) => {
              // console.log("flight", flight);
              const ref = React.createRef();

              const handleClick = (e) => {
                handleFocus(index);
                // ref.current.scrollIntoView(
                //   {
                //   behavior: "smooth",
                //   block: "center",
                // }
                // );
              };

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
                  <Col>{flight.flightID}</Col>
                  <Col>{getNameFromID(flight.ID)}</Col>
                  <Col>{flight.totalco2e}</Col>
                  <Col>{flight.co2ePerDay}</Col>
                  <Col>{flight.priority}</Col>
                  <Col> {returnMonthYear(flight.echoTimeDate)}</Col>

                  {/* <Col> */}
                  <Col xs={{ span: 1 }}>
                    {focusedIndex === index ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </Col>

                  {focusedIndex === index && (
                    <Container>
                      <Container>
                        <Row className="flightListDetails-header">
                          Flight details
                        </Row>

                        <Row>
                          <Col md={"auto"}>Seat class:</Col>
                          <Col md={"auto"} className="flightListDetails-item">
                            {flight.seatClass}
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={2}>From:</Col>

                          <Col xs={2}>To:</Col>
                          <Col xs={2}>CO2e(kg)/leg</Col>
                        </Row>

                        {flight.legs.map((leg, i) => {
                          return (
                            <Row key={`flightleg-${i}`}>
                              <Col className="flightListDetails-item" xs={2}>
                                <FlightTakeoffIcon />
                                {leg.from}
                              </Col>

                              <Col className="flightListDetails-item" xs={2}>
                                <FlightLandIcon /> {leg.to}
                              </Col>
                              <Col className="flightListDetails-item" xs={2}>
                                {Math.floor(leg.co2e)}
                              </Col>
                            </Row>
                          );
                        })}
                        <Row>
                          <Col xs={2}>
                            {flight.oneWay === 1 ? "(One-way)" : "(Round trip)"}
                          </Col>
                          <Col xs={2}> </Col>
                          <Col xs={4} className="flightListDetails-item">
                            {" "}
                            x{flight.oneWay}{" "}
                          </Col>
                        </Row>
                      </Container>

                      <Container>
                        <Row style={{ borderTop: "0.5px solid grey" }}>
                          <Col>
                            <Row className="flightListDetails-header">
                              {/* <Col className="flightListDetails-header"> */}
                              Purpose details
                              {/* </Col> */}
                            </Row>
                            <Row>
                              Purpose of flight:{" "}
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
                          </Col>
                          <Col>
                            <Row className="flightListDetails-header">
                              Employee details
                            </Row>
                            <Row>
                              Employee :{" "}
                              <Col className="flightListDetails-item">
                                {getNameFromID(flight.ID)}
                              </Col>
                            </Row>
                            <Row>
                              Employee ID:{" "}
                              <Col className="flightListDetails-item">
                                {flight.ID}
                              </Col>
                            </Row>
                            <Row>
                              Project:
                              <Col className="flightListDetails-item">
                                {flight.project}
                              </Col>{" "}
                            </Row>
                          </Col>
                        </Row>
                      </Container>
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
