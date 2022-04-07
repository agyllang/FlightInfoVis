import React, { useEffect, useContext, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import VBar from "./VBar";
import { FlightsContext } from "../contexts/FlightsContext";

const BudgetOverview = ({ ...props }) => {
  // const {} = props;
  const { flights, addFlight } = useContext(FlightsContext);
  console.log("BudgetOverview, flights in FlightContext", flights);
  console.log("BudgetOverview, addFlight in FlightContext", addFlight);
  return (
    <Container fluid>
      <Row className="page-title">Budget Overview</Row>
      <VBar flights={flights} />
    </Container>
  );
};

export default BudgetOverview;
