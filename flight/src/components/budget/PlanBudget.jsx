import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Container, Stack } from "react-bootstrap";
import { FlightsContext } from "../contexts/FlightsContext";

import FindFlight from "./FindFlight/FindFlight";
import FlightList from "./FlightList";
import BudgetProgressBar from "../progress/BudgetProgressBar";
import StepByStep from "./FindFlight/StepByStep";

const PlanBudget = ({ ...props }) => {
  const { flights, CO2eTotal } = useContext(FlightsContext);
  var max = Math.max.apply(
    Math,
    flights.map(function (o) {
      return o.totalco2e;
    })
  );

  const DataCard = ({ ...props }) => {
    const { title, value, unit } = props;
    return (
      // <Col xs lg="5" className="component-container">
      <Container className="component-container">
        <div style={{ color: "rgb(180,180,180)" }}>{title}</div>

        <div className="component-title" style={{ fontWeight: "700" }}>
          {value}
        </div>
        {unit && <div style={{ color: "rgb(180,180,180)" }}>{unit}</div>}
      </Container>
    );
  };
  return (
    <Container fluid>
      <Row className="page-title">Plan Carbon budget</Row>
      <Row>
        <Col xs={4}>
          <StepByStep />
        </Col>
        <Col>
          <BudgetProgressBar max={max}  />
          <FlightList />
        </Col>

        <Col xs={2}>
          <Stack gap={2}>
            <Col>
              <DataCard
                title="Budget Total"
                value={CO2eTotal}
                unit={"CO2e kg"}
              />
            </Col>
            <Col>
              <DataCard title="Largest trip" value={max} unit={"CO2e kg"} />
            </Col>
            <Col>
              <DataCard title="Number of flights" value={flights.length} />
            </Col>
          </Stack>
          {/* <Row>
          
          </Row> */}
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <FlightList />
        </Col>
      </Row> */}
    </Container>
  );
};

export default PlanBudget;
