import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
// import AddEmployeeForm from "../budgetDivision/AddEmployeeForm";
import FindFlight from "./FindFlight/FindFlight";
// import EmployeeList from "../budgetDivision/EmployeeList";
import FlightList from "./FlightList";
import BudgetProgressBar from "../progress/BudgetProgressBar";
import StepByStep from "./FindFlight/StepByStep";

const PlanBudget = ({ ...props }) => {
  return (
    <Container fluid>
      <Row className="page-title">Plan Carbon budget</Row>
      <Row>
        <BudgetProgressBar />
      </Row>
      <Row>
        <Col xs={4}>
          <StepByStep />
        </Col>
        {/* <Col xs={4}>
          <FindFlight />
        </Col> */}
        <Col>
          <FlightList />
        </Col>
      </Row>
    </Container>
  );
};

export default PlanBudget;
