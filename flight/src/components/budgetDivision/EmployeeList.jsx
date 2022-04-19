import React, { useContext, useState,useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { EmployeesContext } from "../contexts/EmployeesContext";
import { FlightsContext } from "../contexts/FlightsContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getCorrectTextColor } from "../utility/functions";

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
                  backgroundColor: "#ffffff",
                  // backgroundColor: index % 2 ? "#e1effc" : "#ffffff",

                  borderBottom: "1px solid #e1effc",
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
  const { employees, getProjectFromProjectName, allResearchProjectsArray } =
    useContext(EmployeesContext);
    const [employeesArr, setEmployeesArr] = useState(employees)
    
    useEffect(() => {
      setEmployeesArr(employees)
    }, [allResearchProjectsArray])
    
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
      </Row>
      <Col>
        <Row>
          <Col className="list-column-header" xs={4}>
            Name
          </Col>
          <Col className="list-column-header" xs={3}>
            ID
          </Col>
          <Col className="list-column-header" xs={3}>
            Project
          </Col>
        </Row>
        <div className="list-table">
          {employeesArr.length > 0 &&
            allResearchProjectsArray.length > 0 &&
            employeesArr.map((employee, index) => {
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
                  <Col xs={4}>{employee.name}</Col>
                  <Col xs={3}>{employee.ID}</Col>
                  <Col xs={3}>
                    {employee.projects.length > 0 &&
                      employee.projects.map((p, index) => {
                        // console.log("emplist project",p)
                        // console.log("emplist employee", employee)
                        // console.log("getProjectFromProjectName(p).projectColor",getProjectFromProjectName(p).projectColor)
                        return (
                          <div
                            key={`p-${index}`}
                            style={{
                              borderRadius: "4px",
                              paddingLeft: "2px",
                              paddingRight: "2px",
                              margin: "2px",
                              display: "inline-block",
                              // width: "50%",
                              // backgroundColor: `#cf58c6`
                              //   ,
                              backgroundColor: `${getProjectFromProjectName(p).projectColor}`
                                ,
                              // color: "#fff",
                              color: getCorrectTextColor(
                                getProjectFromProjectName(p).projectColor
                              ),
                            }}
                          >
                            {" "}
                            {p}{" "}
                          </div>
                        );
                      })}
                  </Col>
                  <Col xs={{ span: 1, offset: 1 }}>
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
