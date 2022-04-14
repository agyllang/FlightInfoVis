import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
// import TextField from "@mui/material/TextField";
import SelectFromArray from "./SelectFromArray";

const AssignToEmployee = ({ ...props }) => {
  const { setEmployeeToFlight, handleAddFlight, employees, handleNext } = props;

  const [ID, setID] = useState("");
  const [project, setProject] = useState("");
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    //changes state of disable
    setDisable(ID === "" || project === "");
    if (ID !== "" && project !== "") {
      setEmployeeToFlight(ID, project);
    }
  }, [ID, project]);

  useEffect(() => {
    //if ID of employee changes reset project value

    setProject("");
  }, [ID]);

  const getProject = (ID) =>
    employees.filter((obj) => obj.ID == ID).map((obj) => obj.projects);

  const onClick = () => {
    handleAddFlight();
    handleNext();
  };

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
        <Col>
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
      </Row>
      <Row>
        <Button
          variant={!disable ? "success" : "secondary"}
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
