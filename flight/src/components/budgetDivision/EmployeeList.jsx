import React, { useContext, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { EmployeesContext } from "../contexts/EmployeesContext";
import { FlightsContext } from "../contexts/FlightsContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const EmployeeDetails = ({ employeeFlights }) => {
  console.log("EmployeeDetails employeeFlights", employeeFlights);
  var total = 0;
  employeeFlights.forEach((each) => {
    total += each.totalco2e;
  });

  return (
    <Container style={{ marginTop: "1rem" }}>
      <Row>
        {/* <Col style={{ display: "flex", justifyContent: "center" }}> */}
        <Col>
          <h5
            style={{
              backgroundColor: `${employeeFlights.projectColor}`,
              textAlign: "center",
            }}
            className="component-title"
          >
            {employeeFlights.project}
          </h5>
        </Col>
      </Row>

      <Row style={{ borderBottom: "2px solid #c6c6c6" }}>
        <Row>
          <Col className="list-column-header">
            Flights ({employeeFlights.length}):
          </Col>
          <Col className="list-column-header">Priority </Col>
          <Col>
            <Col className="list-column-header">CO2e kg </Col>
            <Col style={{ fontSize: "14px", color: "grey" }}>
              Total(<b style={{ color: "black" }}>{total}</b>)
            </Col>
          </Col>
          <Col className="list-column-header">From/To</Col>
        </Row>
      </Row>
      <Row>
        {employeeFlights.length > 0 &&
          employeeFlights.map((f, index) => {
            return (
              <Row
                key={`employeeflight-item${index}`}
                style={{
                  backgroundColor:  "#ffffff",
                  // backgroundColor: index % 2 ? "#e1effc" : "#ffffff",

                  borderBottom:  "1px solid #e1effc" ,
                  // borderRadius: "1px",
                  margin: "3px",
                }}
              >
                <Row>
                  <Col>{f.flightID}</Col>
                  <Col>{f.priority}</Col>
                  <Col>{f.totalco2e}</Col>
                  <Col>
                    {f.legs.map((leg, index) => {
                      return (
                        <Row key={`leg-${index}`}>
                          {leg.from}/{leg.to}
                        </Row>
                      );
                    })}
                    {/* ({f.oneWay === 1 ? "One-way" : "Round trip"}) */}
                  </Col>
                  {/* <Col xs={3}>{employee.ID}</Col> */}
                </Row>
                <Row
                //  style={{ borderBottom: "0.2px solid grey" }}
                >
                  <Col
                    style={{ color: "grey", fontStyle: "italic" }}
                    md={"auto"}
                  >
                    {" "}
                    "{f.purpose}"
                  </Col>
                </Row>
              </Row>
            );
          })}

        {/* <Col>
            <DataCard
              title={"Emissions"}
              value={projectFlights.projectCO2e}
              unit={"CO2e kg"}
            />
          </Col>
          <Col>
            <DataCard
              title={"Flights"}
              value={projectFlights.projFlights.length}
              // unit={"CO2e kg"}
            />
          </Col> */}
      </Row>
    </Container>
  );
};

const EmployeeList = ({ ...props }) => {
  const { employees } = useContext(EmployeesContext);
  const { getEmployeeFlights } = useContext(FlightsContext);
  const [focusedIndex, setFocused] = useState();
  // console.log(getEmployeeFlights("p1"));
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
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}>
        <h5 className="component-title">Employees ({employees.length})</h5>

        {/* <div className="page-header2">Employees ({employees.length})</div> */}
      </Row>
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
                    border: index === focusedIndex ? "1px solid black" : "",
                    borderRadius: "1px",
                    margin: "3px",
                    backgroundColor: index % 2 ? "#eaeaea" : "#e4eaee",
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
                  {focusedIndex === index && (
                    <Container>
                      <EmployeeDetails
                        employeeFlights={getEmployeeFlights(employee.ID)}
                      />
                    </Container>
                  )}
                </Row>
              );
            })}
        </div>
      </Col>
    </Container>
  );
};

export default EmployeeList;
