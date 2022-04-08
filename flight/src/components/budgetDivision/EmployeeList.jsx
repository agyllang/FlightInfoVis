import React, { useContext, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { EmployeesContext } from "../contexts/EmployeesContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const EmployeeList = ({ ...props }) => {
  const { employees } = useContext(EmployeesContext);
  const [focusedIndex, setFocused] = useState();

  const handleFocus = (index) => {
    // console.log("handleFocus");
    if (index === focusedIndex) {
      setFocused();
    } else {
      setFocused(index);
    }
  };
  return (
    <Container className="component-container">
      {/* <Container className="addEmployee-container"> */}
      <Col>
        <h5 className="component-title">Employees ({employees.length})</h5>

        {/* <div className="page-header2">Employees ({employees.length})</div> */}
      </Col>
      <Col>
        <Row>
          <Col className="list-column-header" xs={5}>
            Name
          </Col>
          <Col className="list-column-header" xs={3}>
            ID
          </Col>
        </Row>
        <div className="list-table">
          {employees.length > 0 &&
            employees.map((employee, index) => {
              const ref = React.createRef();

              const handleClick = (e) => {
                handleFocus(index);
                ref.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              };
              return (
                <Row
                  ref={ref}
                  key={`employeelist-item${index}`}
                  className="addEmployee-row"
                  style={{
                    border: index === focusedIndex ? "2px solid black" : "",
                    borderRadius: "1px",
                    margin: "3px",
                    backgroundColor: index % 2 ? "#eaeaea" : "#ffffff",
                  }}
                  onClick={handleClick}
                >
                  <Col xs={5}>{employee.name}</Col>
                  <Col xs={3}>{employee.ID}</Col>
                  <Col xs={{ span: 1, offset: 3 }}>
                    {focusedIndex === index ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </Col>
                  {focusedIndex === index && <Container></Container>}{" "}
                </Row>
              );
            })}
        </div>
      </Col>
    </Container>
  );
};

export default EmployeeList;
