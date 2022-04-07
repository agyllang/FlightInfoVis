import React,{useContext} from "react";
import { Row, Col, Container } from "react-bootstrap";
import { EmployeesContext } from "../contexts/EmployeesContext";

const EmployeeList = ({ ...props }) => {
  const { employees } = useContext(EmployeesContext);

  return (
    <Container className="component-container">
    {/* <Container className="addEmployee-container"> */}
      <Col>
      <h5 className="component-title">Employees ({employees.length})</h5>

        {/* <div className="page-header2">Employees ({employees.length})</div> */}
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
                key={`employeelist-item${index}`}
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
