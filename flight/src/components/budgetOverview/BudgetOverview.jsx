import React, { useEffect, useContext, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import VBar from "./VBar";
import ProgressChart from "./ProgressChart";
import ProgressChart2 from "./ProgressChart2";
import { FlightsContext } from "../contexts/FlightsContext";
import VBarEmployees from "./VBarEmployees";
import UpcomingFlightList from "./UpcomingFlightList";

const BudgetOverview = ({ ...props }) => {
  // const {} = props;
  const { flights, addFlight } = useContext(FlightsContext);
  console.log("BudgetOverview, flights in FlightContext", flights);
  console.log("BudgetOverview, addFlight in FlightContext", addFlight);
  return (
    <Container fluid>
      <Row className="page-title">Budget Overview</Row>
      <Row>
        {/* <Col md={"auto"}>
          <VBar flights={flights} />
        </Col> */}
        <Col md={4}>
          <UpcomingFlightList />
        </Col>
        <Col md={4}>
          <ProgressChart2 />
        </Col>
        <Col md={4}>
          <VBarEmployees flights={flights} />
        </Col>
      </Row>
    </Container>
  );
};

export default BudgetOverview;
