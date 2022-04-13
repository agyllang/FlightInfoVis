import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
// import TextField from "@mui/material/TextField";
import SelectFromArray from "./SelectFromArray";

const AssignToEmployee = ({ ...props }) => {
  const {
    employeesID,
    setEmployeeToFlight,
    handleAddFlight,
    allResearchProjects,
    employees,
    handleNext,
  } = props;
  const [ID, setID] = useState("");
  const [project, setProject] = useState("");
  const [disable, setDisable] = useState(true);
  //   const [error, setError] = useState(false);
  useEffect(() => {
    validateID(ID, project);
  }, [ID, project]);

  const findEmployeeProjects = (ID) => {
    employees.filter((obj) => obj.ID == ID).map((obj) => obj.projects);
  };

  const getProject = (ID) =>
    employees.filter((obj) => obj.ID == ID).map((obj) => obj.projects);

  //   console.log("error", error);
  const validateID = (ID, project) => {
    console.log("validateID", ID);
    // employeesID.includes(ID) ?
    // setError(!employeesID.includes(ID));

    setDisable(!employeesID.includes(ID) && project !== "");

    if (employeesID.includes(ID) && project !== "") {
      setEmployeeToFlight(ID, project);
    }
  };
  const onClick = () => {
    handleAddFlight();
    handleNext();
  };
  console.log(employees);
  //   const handleChangeTextField = (event) => {
  //     setID(event.target.value);
  //     validateID(event.target.value);
  //   };
  return (
    <Container
      style={
        {
          // marginTop: "1.5rem",
          // marginBottom: "1rem",
          // alignItems: "center",
          // display: "flex",
          // flexDirection: "column",
        }
      }
    >
      <h5 className="purposeOfTrip-header">Assign trip to employee </h5>
      <Row style={{ justifyContent: "space-between" }}>
        <Col md={"auto"}>
          <SelectFromArray
            placeholder={"Employee"}
            array={employees}
            callback={(id) => {
              setID(id);
            }}
            propValue={"ID"}
            propLabel={"name"}
          />
        </Col>
        <Col md={"auto"}>
          {ID && (
            <SelectFromArray
              placeholder={"Project"}
              array={getProject(ID)[0]}
              callback={(project) => {
                setProject(project);
              }}
            />
          )}
        </Col>

        <Button
          variant={!disable ? "success" : "secondary"}
          //   size="lg"
          // style={{ width: "auto" }}
          disabled={disable}
          onClick={onClick}
        >
          Assign
        </Button>
      </Row>
    </Container>
  );
};

export default AssignToEmployee;
