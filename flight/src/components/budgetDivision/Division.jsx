import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import AddEmployeeForm from "./AddEmployeeForm";

import EmployeeList from "./EmployeeList";
import Projects from "./Projects";
import ProjectsPieChart from "./ProjectsPieChart";

const Division = () => {
  return (
    <Container fluid>
      <Row className="page-title">Division and Employees</Row>
      <Row>
        <Col xs={3}>
          <AddEmployeeForm />
          {/* <AddEmployeeForm2/> */}
        </Col>
        <Col xs={5}>
          <EmployeeList />
        </Col>
        <Col xs={4}>
          <Projects />
          <ProjectsPieChart style={{marginTop:"1rem"}} />
        </Col>
      </Row>
    </Container>
  );
};

export default Division;
