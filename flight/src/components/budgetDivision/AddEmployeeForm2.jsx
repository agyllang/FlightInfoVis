import React, { useState, useContext } from "react";
import { EmployeesContext } from "../contexts/EmployeesContext";
import { Button, Container } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";

import TextField from "@mui/material/TextField";

// import { useForm, useField, splitFormProps } from "react-form";

const AddEmployeeForm2 = ({ ...props }) => {
  // const { addNew, addToEmployeesID, employeesID } = props;
  const { employeesID, addNewEmployee, employees } =
    useContext(EmployeesContext);
  // console.log("props",props)
  const [toggle, setToggle] = useState(false);

  const [name, setName] = useState("");
  console.log("name", name);
  const [projects, setProjects] = useState([]);
  console.log("projects", projects);
  const [inputProject, setInputProject] = useState();

  const submit = () => {
    // addNewEmployee({
    //   name: name,
    //   id: `p${employees.length + 1}`,
    //   projects: projects,
    // });
    setToggle(!toggle);
  };

  const removeProject = (projectName) => {
    setProjects(projects.filter((project) => project !== projectName));
  };

  const addProject = (newProject) => {
    setProjects((prevState) => [...prevState, newProject]);
  };
  return (
    <Container className="component-container">
      <h5 className="component-title">Add new employee</h5>
      {toggle && (
        <div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Name"
              defaultValue="Hello World"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {/* <InputField
              className="addNewInput"
              placeholder="Name"
              field="name"
              validate={fakeCheckValidName}
            /> */}
          </div>
          <div>
            <TextField
              id="outlined-read-only-input"
              label="Employee ID"
              helperText="ID was generated"
              // defaultValue="Hello World"
              value={`p${employees.length + 1}`}
              InputProps={{
                readOnly: true,
              }}
            />
            {/* <InputField
              disabled
              className="addNewInput"
              placeholder="ID"
              field="ID"
              value={`p${employees.length + 1}`}
              validate={validateID}
              style={{
                marginTop: "1rem",
              }}
            /> */}
          </div>
          <div
            style={{
              // border: "1px solid black",
              marginTop: "1rem",
              marginBottom: "2rem",
              padding: "1rem",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              backgroundColor: "rgba(177, 195, 240, 0.32)",
            }}
          >
            <h5>Research Projects</h5>
            Research projects employee is working with
            <div>
              {projects.length > 0 &&
                projects.map((p, i) => (
                  <div key={i}>
                    <label>Project:</label>
                    <TextField
                      id="outlined-read-only-input"
                      label=""
                      // helperText="ID was generated"
                      // defaultValue="Hello World"
                      value={p}
                      InputProps={{
                        readOnly: true,
                      }}
                    >
                      {" "}
                    </TextField>

                    <CloseIcon id="clearBtn" onClick={() => removeProject(p)} />
                  </div>
                ))}
              <TextField
                id="outlined-read-only-input"
                label="Employee ID"
                // helperText="ID was generated"
                // defaultValue="Hello World"
                value={inputProject}
                onChange={(e) => {
                  setInputProject(e.target.value);
                }}
              >
                {" "}
              </TextField>
              <Button
                style={{
                  marginTop: "1rem ",
                }}
                variant="primary"
                onClick={()=> addProject(inputProject)}
              >
                Add new project
              </Button>
            </div>
          </div>
        </div>
      )}
      <div>
        <Button
          type="submit"
          // style={{ backgroundColor: canSubmit ? "#357BF3" : "#8D9198" }}
          // disabled={name !== ""}
          // style={{
          //   marginTop: "1rem ",
          // }}
          variant="success"
          onClick={() =>setToggle(!toggle)}
        >
          Add employee
        </Button>
      </div>
    </Container>
  );
};

export default AddEmployeeForm2;
