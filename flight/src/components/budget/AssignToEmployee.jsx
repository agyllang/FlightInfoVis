import React, { useState, useEffect } from "react";
import { Row, Col,  Button } from "react-bootstrap";
// import TextField from "@mui/material/TextField";
import SelectFromArray from "./SelectFromArray";

const AssignToEmployee = ({ ...props }) => {
  const {
    employeesID,
    setEmployeeIDToFlight,
    handleAddFlight,
    // allResearchProjects,
  } = props;
  const [ID, setID] = useState("");
  const [disable, setDisable] = useState(true);
//   const [error, setError] = useState(false);
useEffect(() => {
    validateID(ID);

}, [ID])



//   console.log("error", error);
  const validateID = (ID) => {
    console.log("validateID", ID);
    // employeesID.includes(ID) ?
    // setError(!employeesID.includes(ID));

    setDisable(!employeesID.includes(ID));

    if (employeesID.includes(ID)) {
      setEmployeeIDToFlight(ID);
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
        <SelectFromArray placeholder={"EmployeeID"} array={employeesID} callback={(id)=>{setID(id)}} />
        {/* <TextField
          size={"small"}
          error={error}
          // sx={{ marginTop: "1rem" }}
          id="outlined-textarea"
          label="Employee ID"
          placeholder="ID"
          multiline
          value={ID}
          onChange={handleChangeTextField}
          helperText={error ? "ID is not recognized" : ""}
        />{" "} */}
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
