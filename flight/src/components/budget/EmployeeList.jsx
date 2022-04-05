import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const EmployeeList = ({ ...props }) => {
  const { employees } = props;

  return (
    <Container className="addEmployee-container">
      <Col>
        <div className="page-header2">Employees ({employees.length})</div>
      </Col>
      <Col >
        <Row
        style={{
          borderBottom: "1px solid grey",
        }}
        >
          {" "}
          <Col xs={5}>Name</Col>
          <Col xs={3}>ID</Col>{" "}
        </Row>
        {employees.length > 0
          ? employees.map((employee, index) => {
              return (
                <Row
                  className="addEmployee-row"
                  style={{
                    backgroundColor:
                      index % 2 ? "#ccdbfd" : "#b6ccfe",
                  }}
                >
                  <Col xs={5}>{employee.name}</Col>
                  <Col xs={3}>{employee.ID}</Col>
                </Row>
              );
            })
          : "No employees added"}
      </Col>
    </Container>
  );
};

export default EmployeeList;
