import React from "react";
import { Row, Col } from "react-bootstrap";

const EmployeeList = ({ ...props }) => {
  const { employees } = props;

  return (
    <>
      <Col>
        <div className="page-header2">Employees ({employees.length})</div>
      </Col>
      <Col className="addEmployee-container">
        <Row
          style={{
            borderBottom: "1px solid grey",
          }}
        >
          {" "}
          <Col xs={3}>Name</Col>
          <Col xs={3}>ID</Col>{" "}
        </Row>
        {employees.length > 0
          ? employees.map((employee) => {
              return (
                <Row className="addEmployee-row">
                  <Col xs={3}>{employee.name}</Col>
                  <Col xs={3}>{employee.ID}</Col>
                </Row>
              );
            })
          : "No employees added"}
      </Col>
    </>
  );
};

export default EmployeeList;
