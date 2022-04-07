import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import AddEmployeeForm from "./AddEmployeeForm";
import FindFlight from "./FindFlight/FindFlight";
import EmployeeList from "./EmployeeList";
import FlightList from "./FlightList";
import BudgetProgressBar from "../progress/BudgetProgressBar";

const PlanBudget = ({ ...props }) => {
  // const {  } = props;
  // const [employees, setEmployee] = useState([
  //   {
  //     ID: "p123",
  //     name: "Rachel Smith",
  //     projects: ["PROJECT1", "PROJECT2"],
  //   },
  //   {
  //     ID: "p146",
  //     name: "Roland Andersson",
  //     projects: ["PROJECT2"],
  //   },
  //   {
  //     ID: "p430",
  //     name: "Anna Johnsson",
  //     projects: [],
  //   },
  // ]);
  // console.log("employees:", employees);

  // const [flights, setFlight] = useState([]);
  // console.log("flights:", flights);

  // const [employeesID, setEmployeesID] = useState(["p123", "p146", "p430"]);

  // const [allResearchProjects, setResearchProject] = useState([]);
  // // console.log("allResearchProjects", allResearchProjects);
  // useEffect(() => {
  //   var allProjects = [];

  //   employees.length > 0 &&
  //     employees.map((emp) => {
  //       emp.projects.length > 0 &&
  //         emp.projects.map((project) => {
  //           allProjects.indexOf(project) === -1 && allProjects.push(project);
  //         });
  //       // console.log("employee", emp);
  //     });

  //   setResearchProject([...allProjects]);
  //   console.log("allProjects", allProjects);
  // }, [employees]);

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
      <Row>
        <BudgetProgressBar></BudgetProgressBar>
      </Row>
      <Row>
        <Col>
          <EmployeeList />
          <AddEmployeeForm />
        </Col>

        <Col>
          <FlightList />
          <FindFlight />
        </Col>
      </Row>
    </Container>
  );
};

export default PlanBudget;
