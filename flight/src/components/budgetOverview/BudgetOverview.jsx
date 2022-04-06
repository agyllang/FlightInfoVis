import React, { useEffect, useContext, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import VBar from "./VBar";
import { FlightsContext } from "../contexts/FlightsContext";


const BudgetOverview = ({ ...props }) => {
  // const {} = props;
  console.log("budetOverview")
  const {flights, addFlight} = useContext(FlightsContext)
  console.log("flights in FlightContext",flights)
  console.log("addFlight in FlightContext",addFlight)
  return (
    <Container>
      <Row className="page-title">Budget Overview</Row>
      <Button onClick={()=>{addFlight("third flight")}}></Button>
      {/* <VerticalBar /> */}
      <VBar />
    </Container>
  );
};

export default BudgetOverview;
