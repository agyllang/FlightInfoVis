import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import AddEmployeeForm from "./AddEmployeeForm";
import FindFlight from "./FindFlight";
import EmployeeList from "./EmployeeList";
import FlightList from "./FlightList";

const Budget = ({ ...props }) => {
  const { dataCurrentYear, changeCurrentYear, currentYear, allData } = props;
  const [employees, setEmployee] = useState([
    {
      ID: "p123",
      name: "Rachel Smith",
      projects: ["PROJECT1", "PROJECT2"],
    },
    {
      ID: "p146",
      name: "Roland Andersson",
      projects: ["PROJECT2"],
    },
    {
      ID: "p430",
      name: "Anna Johnsson",
      projects: [],
    },
  ]);
  console.log("employees:", employees);

  const [flights, setFlight] = useState([]);
  console.log("flights:", flights);

  const [employeesID, setEmployeesID] = useState(["p123", "p146", "p430"]);

  const [allResearchProjects, setResearchProject] = useState([]);
  console.log("allResearchProjects", allResearchProjects);
  useEffect(() => {
    var allProjects = [];

    employees.length > 0 &&
      employees.map((emp) => {
        emp.projects.length > 0 &&
          emp.projects.map((project) => {
            allProjects.indexOf(project) === -1 && allProjects.push(project);
          });
        // console.log("employee", emp);
      });

    setResearchProject([...allProjects]);
    console.log("allProjects", allProjects);
  }, [employees]);

  // const [addEmployee, setAddEmployee] = useState(false);
  //setAddEmployee( arr => [...arr, `${arr.length}`]);
  //   const handleInputChangeYear = (event) => {
  //     // console.log("event:", event);
  //     changeCurrentYear(event.value);
  //   };
  //   const handleInputChangeMonth = (event) => {
  //     // console.log("event:", event);
  //     setMonth(event.value);
  //   };

  return (
    <Container>
      <Row className="page-title">Plan Carbon budget</Row>
      <Row className="container">
        <Col>
          <EmployeeList employees={employees} />
          <Col>
            <AddEmployeeForm
              addNew={(newEmployee) =>
                setEmployee((oldArr) => [...oldArr, newEmployee])
              }
              addToEmployeesID={(ID) =>
                setEmployeesID((oldArr) => [...oldArr, ID])
              }
              employeesID={employeesID}
            />
          </Col>
        </Col>

        <Col>
          <FlightList flights={flights} />
          <FindFlight
            employeesID={employeesID}
            addNewFlight={(flight) => {
              setFlight((prevState) => [...prevState, flight]);
            }}
            allResearchProjects={allResearchProjects}
          />
          <Col></Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Budget;
