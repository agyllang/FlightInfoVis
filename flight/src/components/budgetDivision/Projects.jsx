import React, { useContext, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { EmployeesContext } from "../contexts/EmployeesContext";
import { FlightsContext } from "../contexts/FlightsContext";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import chroma from "chroma-js";
import { Button } from "@mui/material";
const DataCard = ({ ...props }) => {
  const { title, value, unit } = props;
  return (
    // <Col xs lg="5" className="component-container">
    <Container className="component-container">
      <div style={{ color: "rgb(180,180,180)" }}>{title}</div>

      <div className="component-title" style={{ fontWeight: "700" }}>
        {value}
      </div>
      {unit && <div style={{ color: "rgb(180,180,180)" }}>{unit}</div>}
    </Container>
  );
};
const ProjectComponent = ({ projectDetails, goBack, projectFlights }) => {
  // console.log("ProjectComponent projectFlights", projectFlights);
  return (
    <div>
      <Row style={{ borderBottom: "2px solid #c6c6c6",marginBottom:"1rem"  }}>
        <Col xs={3}>
          <Button sx={{ padding: 0 }} onClick={goBack}>
            <ArrowBackIosIcon />
            Go back
          </Button>
        </Col>
        <Col xs={4}>
          <h5
            style={{
              backgroundColor: `${projectDetails.projectColor}`,
              textAlign: "center",
            }}
            className="component-title"
          >
            {projectDetails.project}
          </h5>
        </Col>
      </Row>
      <Row>
        <Row>
          <Col xs={6}>
            Employees ({projectDetails.employeesInProj.length}):
            {projectDetails.employeesInProj.length > 0 &&
              projectDetails.employeesInProj.map((employee, index) => {
                return (
                  <Row
                    key={`projectemployee-item${index}`}
                    className="addEmployee-row"
                    style={{
                      // border: index === focusedIndex ? "2px solid black" : "",
                      borderRadius: "1px",
                      margin: "3px",
                    }}
                  >
                    <Col>{employee.name}</Col>
                    {/* <Col xs={3}>{employee.ID}</Col> */}
                  </Row>
                );
              })}
          </Col>

          <Col xs={2}>
            <DataCard
              title={"Emissions"}
              value={projectFlights.projectCO2e}
              unit={"CO2e kg"}
            />
          </Col>
          <Col xs={2}>
            <DataCard
              title={"Flights"}
              value={projectFlights.projFlights.length}
              // unit={"CO2e kg"}
            />
          </Col>
        </Row>
      </Row>
      <Row></Row>
    </div>
  );
};

const Projects = ({ ...props }) => {
  const { employees, allResearchProjects, allResearchProjectsArray } =
    useContext(EmployeesContext);
  const { getProjectFlights } = useContext(FlightsContext);
  const [focusedProject, setFocused] = useState(null);
  const [displayProject, setDisplayProject] = useState(false);
  // console.log("allResearchProjectsArray", allResearchProjectsArray);

  // console.log("projectColor",projectColor[0].luminance(0.5))
  // console.log("projectColor",projectColor[0].luminance(0.5))
  // var col1 = chroma('aquamarine').luminance(0.5);
  // console.log("col1",col1.hex())

  // const handleClick = (project) => {
  //   // console.log("handleFocus");

  //   setFocused(project);
  // };

  return (
    <Container className="component-container">
      {/* <Container className="addEmployee-container"> */}
      <Col>
        {displayProject && (
          <ProjectComponent
            projectDetails={focusedProject}
            goBack={() => {
              setDisplayProject(false);
            }}
            projectFlights={getProjectFlights(focusedProject.project)}
          />
        )}
        {/* <div className="page-header2">Employees ({employees.length})</div> */}
      </Col>
      {!displayProject && (
        <Col>
          <Row style={{ borderBottom: "2px solid #c6c6c6",marginBottom:"1rem" }}>
            <h5 className="component-title">
              Research Projects ({allResearchProjectsArray.length})
            </h5>
          </Row>
          <div className="list-table">
            {allResearchProjectsArray.length > 0 &&
              allResearchProjectsArray.map((project, index) => {
                const ref = React.createRef();
                // console.log("project", project);
                // project.color = projectColor[index];
                return (
                  <Row
                    ref={ref}
                    key={`projectlist-item${index}`}
                    className="addEmployee-row"
                    style={{
                      // border: index === focusedIndex ? "2px solid black" : "",
                      borderRadius: "1px",
                      margin: "3px",
                      backgroundColor: project.projectColor,
                    }}
                    onClick={() => {
                      setDisplayProject(true);
                      setFocused(project);
                    }}
                  >
                    <Col xs={5}>{project.project}</Col>
                    {/* <Col xs={3}>{employee.ID}</Col> */}
                    <Col xs={{ span: 1, offset: 6 }}>
                      <ArrowForwardIosIcon />
                    </Col>
                  </Row>
                );
              })}
          </div>
        </Col>
      )}
    </Container>
  );
};

export default Projects;