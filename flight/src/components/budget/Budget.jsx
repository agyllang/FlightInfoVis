import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import AddEmployeeForm from "./AddEmployeeForm";
import FindFlight from "./FindFlight";
import EmployeeList from "./EmployeeList";
import FlightList from "./FlightList";
//import Select from "react-select";

const Budget = ({ ...props }) => {
  const { dataCurrentYear, changeCurrentYear, currentYear, allData } = props;
  const [employees, setEmployee] = useState([]);
  const [flights, setFlights] = useState([]);
  console.log("employees:", employees);

  const [addEmployee, setAddEmployee] = useState(false);
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
    <Container gap={2} className="">
      <Row className="page-title">Budget</Row>
        <Row className="container">
          <Col>
            <EmployeeList employees={employees} />
            <Col xs={4}>
              <AddEmployeeForm
                addNew={(newEmployee) =>
                  setEmployee((oldArr) => [...oldArr, newEmployee])
                }
              />
            </Col>
          </Col>

          <Col>
            <FlightList flights />
            <FindFlight/>
            <Col>

              {/* <AddFlightForm
                addNew={(newFlight) =>
                  setFlights((oldArr) => [...oldArr, newFlight])
                }
              /> */}
            </Col>
          </Col>
        </Row>
        
    </Container>
  );
};

export default Budget;
