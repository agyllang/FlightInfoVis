import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
// import TextField from "@mui/material/TextField";
import SelectFromArray from "./SelectFromArray";

const AssignToEmployee = ({ ...props }) => {
  const {
    employeesID,
    setEmployeeToFlight,
    handleAddFlight,
    allResearchProjects,
    employees,
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

    setDisable(!employeesID.includes(ID));

    if (employeesID.includes(ID)) {
      setEmployeeToFlight(ID, project);
    }
  };

  //   const handleChangeTextField = (event) => {
  //     setID(event.target.value);
  //     validateID(event.target.value);
  //   };
  return (
    <Col
      style={{
        marginTop: "1.5rem",
        marginBottom: "1rem",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h5 className="purposeOfTrip-header">Assign trip to employee </h5>
      <Row>
        <Col>
          <SelectFromArray
            placeholder={"EmployeeID"}
            array={employeesID}
            callback={(id) => {
              setID(id);
            }}
          />
        </Col>
        <Col>
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
          variant="success"
          //   size="lg"
          // style={{ width: "auto" }}
          disabled={disable}
          onClick={handleAddFlight}
        >
          Assign
        </Button>
      </Row>
    </Col>
  );
};

export default AssignToEmployee;
