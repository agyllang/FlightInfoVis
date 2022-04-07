import React, { useState, useEffect, useContext } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Row, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FlightsContext } from "../contexts/FlightsContext";
import chroma from "chroma-js";

var chromaScale = chroma
  .scale("OrRd")
  .domain([0, 2500])
  .classes(8)
  .padding([0.2, 0]);

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
 const {  } = props;
  const { flights, CO2eTotal } = useContext(FlightsContext);
  //   console.log("budgetProgressBar flights", flights);
  const [flightInFocus, setFocus] = useState();

  var sortedFlights = flights.sort(sort_by("total", false));
  return (
    <Row className="">
      <ProgressBar
        style={{ padding: 0, height: "100px", border: "4px solid grey" }}
      >
        {sortedFlights.length > 0 &&
          sortedFlights.map((flight, index) => {
            return (
              <ProgressBar
                key={index}
                now={flight.totalco2e}
                style={{
                  backgroundColor: `${chromaScale(flight.totalco2e).hex()}`,
                //   marginRight: "1px",
                //   marginLeft: "1px",
                }}
               
              ></ProgressBar>
            );
          })}
      </ProgressBar>

      <div>Accumulated: {CO2eTotal} CO2e kg</div>
    </Row>
  );
};

export default BudgetProgressBar;
