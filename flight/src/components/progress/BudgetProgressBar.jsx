import React, { useState, useEffect, useContext } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Row, Col, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FlightsContext } from "../contexts/FlightsContext";
import ColorScale from "./ColorScale";
import chroma from "chroma-js";

const sort_by = (field, reverse, primer) => {
  const key = primer
    ? function (x) {
        return primer(x[field]);
      }
    : function (x) {
        return x[field];
      };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
  };
};

const BudgetProgressBar = ({ ...props }) => {
  const { max } = props;
  const { flights, CO2eTotal } = useContext(FlightsContext);
  //   console.log("budgetProgressBar flights", flights);

  var steps = 10;

  var sortedFlights = flights.sort(sort_by("priority", false));

  var chromaScale = chroma
    .scale("OrRd")
    .domain([0, max])
    .classes(steps)
    .padding([0.2, 0]);
  return (
    <Container className="component-container">
      <h5 className="component-title">Planned Carbon Budget </h5>
      <Row>
        <ProgressBar
          style={{
            padding: 0,
            height: "50px",
            //    border: "3px solid grey"
          }}
        >
          {sortedFlights.length > 0 &&
            sortedFlights.map((flight, index) => {
              return (
                <OverlayTrigger
                  delay={0}
                  //   placement={"top"}
                  overlay={
                    <Tooltip placement={"top"} id="tooltip-3">
                      <div>
                        <div>Priority: {flight.priority}</div>
                        <div>
                          CO2e(kg):<b> {flight.totalco2e}</b>
                        </div>
                        <div>FlightID: {flight.flightID}</div>
                        <div>Emp.ID: {flight.ID}</div>
                      </div>
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <ProgressBar
                      {...triggerHandler}
                      ref={ref}
                      key={index}
                      now={flight.totalco2e}
                      style={{
                        backgroundColor: `${chromaScale(
                          flight.totalco2e
                        ).hex()}`,
                        border: "0.2px solid black",
                        //   marginRight: "1px",
                        //   marginLeft: "1px",
                        cursor: "pointer",
                      }}
                      // onClick={() => {
                      //   setFocus(flight);
                      // }}
                      isChild={true}
                    ></ProgressBar>
                  )}
                </OverlayTrigger>
              );
            })}
        </ProgressBar>
      </Row>
      <Row>
        <Col style={{ marginTop: "1rem" }}>
          <ColorScale max={max} steps={10} />
        </Col>
      </Row>
    </Container>
  );
};

export default BudgetProgressBar;
