import React, { useState, useEffect, useContext } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  Row,
  Col,
  Stack,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { FlightsContext } from "../contexts/FlightsContext";
import ColorScale from "./ColorScale";
import chroma from "chroma-js";
import { sortBy, returnMonthYear } from "../utility/functions";

const BudgetProgressBar = ({ ...props }) => {
  const { max, sortValue, reverseSorting } = props;
  // console.log("BudgetProgressBar, sortValue", sortValue);
  // const {  CO2eTotal } = useContext(FlightsContext);
  const { flights, CO2eTotal } = useContext(FlightsContext);
  //   console.log("budgetProgressBar flights", flights);
  var steps = 10;
  var sortedFlights = flights.sort(sortBy(sortValue, reverseSorting));
  // useEffect(() => {
  //   console.log("useEffect budgetProggressbar");
  //   console.log("useEffect budgetProggressbar");
  //   sortedFlights = flights.sort(sortBy(sortValue, reverseSorting));
  // }, [sortValue, flights, reverseSorting]);
  const procentFunc = (part, whole) => {
    var procent = Math.floor((part / whole) * 100);
    if (procent < 1) {
      return "<1 %";
    } else {
      return procent + "%";
    }
  };

  var chromaScale = chroma
    .scale("OrRd")
    .domain([0, max])
    .classes(steps)
    .padding([0.2, 0]);

  const [open, setOpen] = useState(true);
  return (
    <Container className="component-container">
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}>
        <h5 className="component-title">Carbon Budget Proposal </h5>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col md={"auto"}>
          <Alert
            style={{
              cursor: "pointer",
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px",
            }}
            severity="info"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {" "}
            <AlertTitle>
              {open ? "CO2e body of Budget Proposal" : "More info"}
            </AlertTitle>
            {open && <>Each section in the bar is a planned flight</>}
          </Alert>
        </Col>
      </Row>
      <Row>
        <ProgressBar
          style={{
            padding: 0,
            height: "30px",
            //    border: "3px solid grey"
          }}
        >
          {sortedFlights.length > 0 &&
            sortedFlights.map((flight, index) => {
              return (
                <OverlayTrigger
                  key={`overlay-trigger-${index}`}
                  //   placement={"top"}
                  overlay={
                    <Tooltip placement={"top"} id="tooltip-3">
                      <div style={{ display: "block" }}>
                        <div>FlightID: {flight.flightID}</div>
                        <div>Priority: {flight.priority}</div>
                        <div>
                          CO2e(kg):<b> {flight.totalco2e}</b>
                        </div>

                        <div>EmployeeID: {flight.ID}</div>
                        <div>Date: {returnMonthYear(flight.echoTimeDate)}</div>
                      </div>
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <ProgressBar
                      {...triggerHandler}
                      ref={ref}
                      key={`progbar-${index}`}
                      now={10}
                      // now={flight.totalco2e}
                      style={{
                        backgroundColor: `${chromaScale(
                          flight.totalco2e
                        ).hex()}`,
                        border: "0.2px solid black",
                        //   marginRight: "1px",
                        //   marginLeft: "1px",
                        cursor: "pointer",
                      }}
                      label={procentFunc(flight.totalco2e, CO2eTotal)}
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
      {/* <Row>
        <Col style={{ marginTop: "1rem" }}>
          <ColorScale max={max} steps={10} />
        </Col>
      </Row> */}
      <Row style={{ justifyContent: "flex-end" }}>
        <Col md={"auto"}>
          <b> {CO2eTotal}</b> CO2e(kg)
        </Col>
      </Row>
    </Container>
  );
};

export default BudgetProgressBar;
