import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import AddEmployeeForm from "./AddEmployeeForm";
import AddEmployeePopup from "./AddEmpPopup";
import EmployeeList from "./EmployeeList";
import Projects from "./Projects";
import ProjectsPieChart from "./ProjectsPieChart";

const Division = () => {
  return (
    <Container fluid>
      <Row className="page-title" style={{ justifyContent: "flex-start" }}>
        <Col md={"auto"}> Division and Employees</Col>
        <Col md={"auto"}>
          <AddEmployeePopup />
        </Col>
      </Row>
      <Row>
        {/* <Col xs={3}>
          <AddEmployeeForm />
        </Col> */}
        <Col md={6}>
          <EmployeeList />
        </Col>
        <Col md={6}>
          <Projects />
          <ProjectsPieChart style={{ marginTop: "1rem" }} />
        </Col>
      </Row>
    </Container>
  );
};

export default Division;
