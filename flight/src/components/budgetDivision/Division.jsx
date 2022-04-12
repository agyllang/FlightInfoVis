import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import AddEmployeeForm from "./AddEmployeeForm";
import AddEmployeeForm2 from "./AddEmployeeForm2"
import EmployeeList from "./EmployeeList";
import Projects from "./Projects";

const Division = () => {
  return (
    <Container fluid>
      <Row className="page-title">Division and Employees</Row>
      <Row>
        <Col xs={3}>
          <AddEmployeeForm />
          {/* <AddEmployeeForm2/> */}
        </Col>
        <Col>
          <EmployeeList />
        </Col>
        <Col>
          <Projects />
        </Col>
      </Row>
    </Container>
  );
};

export default Division;
