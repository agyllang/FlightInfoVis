import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { EmployeesContext } from "../contexts/EmployeesContext";
import { FlightsContext } from "../contexts/FlightsContext";
import { returnMonthYear, getQuarter,getCorrectTextColor,sortBy } from "../utility/functions";
import Chip from "@mui/material/Chip";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import chroma from "chroma-js";
import { Button } from "@mui/material";

const DataCard = ({ ...props }) => {
  const { title, value, unit } = props;
  return (
    // <Col xs lg="5" className="component-container">
    <Container style={{ padding: "10px" }} className="component-container">
      <Row style={{ color: "rgb(180,180,180)" }}>{title}</Row>

      <Row>
        <Col className="component-title" style={{ fontWeight: "700" }}>
          {value}
        </Col>
      </Row>
      {unit && (
        <Row style={{ color: "rgb(180,180,180)", fontSize: "14px" }}>
          <Col>{unit}</Col>
        </Row>
      )}
    </Container>
  );
};
const ProjectComponent = ({
  projectDetails,
  goBack,
  projectFlights,
  quarter,
}) => {
  // console.log("ProjectComponent projectFlights", projectFlights);
  const { getNameFromID } = useContext(EmployeesContext);
  console.log("projectDetails", projectDetails);
  console.log("projectFlights", projectFlights);
  const [projectCurrentTotal, setTotal] = useState(0);
  const [filteredProjectFlights, setFilteredProjectFlights] = useState([]);
  // var filteredProjectFlights = [];
  useEffect(() => {
    var filteredByQuarter = projectFlights.projFlights.filter(
      (f) => getQuarter(f.echoTimeDate) <= quarter
    );
    var sumCO2e = 0;
    filteredByQuarter.length > 0 &&
      filteredByQuarter.forEach((flight) => {
        sumCO2e += parseInt(flight.totalco2e);
      });
    setFilteredProjectFlights(filteredByQuarter.sort(sortBy("echoTimeDate",true)));
    setTotal(sumCO2e);
  }, [quarter]);

  return (
    <Container>
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}>
        <Col md={"auto"}>
          <Button sx={{ padding: 0 }} onClick={goBack}>
            <ArrowBackIosIcon />
            Go back
          </Button>
        </Col>
        {/* <Col style={{ display: "flex", justifyContent: "center" }}> */}
        <Col>
          <h5
            style={{
              backgroundColor: `${projectDetails.projectColor}`,
              textAlign: "center",
              color: `${getCorrectTextColor(projectDetails.projectColor)}`,
            }}
            className="component-title"
          >
            {projectDetails.project}
          </h5>
        </Col>
        {quarter !== 0 && (
          <span style={{ color: "#c9c9c9" }}>
            : by <Chip label={`Q${quarter}`} color="primary" />
          </span>
        )}
      </Row>
      <Row>
        <Row>
          <Col xs={4}>
            <h5 className="component-title-sm">
              Employees ({projectDetails.employeesInProj.length}):
            </h5>
            {projectDetails.employeesInProj.length > 0 &&
              projectDetails.employeesInProj.map((employee, index) => {
                return (
                  <Row
                    key={`projectemployee-item${index}`}
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

          <Col xs={4}>
            <DataCard
              title={"Current emissions"}
              value={projectCurrentTotal}
              unit={"CO2e (kg)"}
            />
          </Col>

          {/*
          <Col xs={4}>
            <DataCard
              title={"Avg. emission/trip"}
              value={
                filteredProjectFlights.length > 0
                  ? Math.floor(
                      projectFlights.projectCO2e /
                        projectFlights.projFlights.length
                    )
                  : 0
              }
              unit={"CO2e (kg)"}
            />
          </Col> */}
        </Row>
      </Row>

      <Row>
        <Row
          style={{
            // borderTop: "1px solid #c6c6c6",
            // marginBottom: "5px",
            // fontSize: "13px",
            marginTop: "10px",
          }}
        >
          <h5 className="component-title-sm">
            Flights ({filteredProjectFlights.length})
          </h5>
        </Row>
        <Row
          style={{
            // borderTop: "1px solid #c6c6c6",
            // marginBottom: "5px",
            fontSize: "13px",
            // marginTop: "10px",
          }}
        >
          <Col className="list-project-column-header" xs={3}>
            Name
          </Col>
          <Col className="list-project-column-header" xs={2}>
            CO2e(kg)
          </Col>

          <Col className="list-project-column-header" xs={2}>
            CO2e(kg)/day
          </Col>
          <Col className="list-project-column-header" xs={2}>
            Priority
          </Col>
          <Col className="list-project-column-header" xs={3}>
            Date
          </Col>
        </Row>
        <div className="list-table-project">
          {filteredProjectFlights.length > 0 &&
            filteredProjectFlights.map((flight, index) => {
              return (
                <Row
                  key={`projflights-${index}`}
                  className=""
                  style={{
                    // border: index === focusedIndex ? "1px solid black" : "",
                    borderRadius: "1px",
                    margin: "3px",
                    backgroundColor:
                      flight.status === "planned"
                        ? "rgba(0, 86, 245,0.5)"
                        : "rgba(237, 108, 2,0.5)",
                    // backgroundColor: index % 2 ? "#eaeaea" : "#e4eaee",
                    fontSize: "13px",
                  }}
                >
                  <Col xs={3}>{getNameFromID(flight.ID)}</Col>
                  <Col xs={2}>{flight.totalco2e}</Col>
                  <Col xs={2}>{flight.co2ePerDay}</Col>
                  <Col xs={2}>{flight.priority}</Col>
                  <Col xs={3}>{returnMonthYear(flight.echoTimeDate)}</Col>
                </Row>
              );
            })}
        </div>
      </Row>
    </Container>
  );
};

const ProjectsActual = ({ ...props }) => {
  const { quarter } = props;
  const { employees, allResearchProjects, allResearchProjectsArray } =
    useContext(EmployeesContext);
  const { getProjectActualFlights } = useContext(FlightsContext);
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
            quarter={quarter}
            projectFlights={getProjectActualFlights(focusedProject.project)}
          />
        )}
        {/* <div className="page-header2">Employees ({employees.length})</div> */}
      </Col>
      {!displayProject && (
        <Col>
          <Row
            style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}
          >
            {/* <h5 className="component-title">Employees' aggregated emissions </h5> */}
            <Col md={"auto"}>
              <h5 className="component-title">
                Research Projects ({allResearchProjectsArray.length})
                {quarter !== 0 && (
                  <div style={{ color: "#c9c9c9" }}>
                    : by <Chip label={`Q${quarter}`} color="primary" />
                  </div>
                )}
              </h5>
            </Col>
            {/* <div className="page-header2">Employees ({employees.length})</div> */}
          </Row>
          {/* <Row
            style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}
          >
            <h5 className="component-title">
              Research Projects ({allResearchProjectsArray.length})
            </h5>
          </Row> */}
          <div
          // className="list-table"
          >
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
                      backgroundColor: "#fff",
                    }}
                    onClick={() => {
                      setDisplayProject(true);
                      setFocused(project);
                    }}
                  >
                    <Col
                      style={{
                        color: "#000",
                      }}
                      xs={5}
                    >
                      {project.project}
                    </Col>
                    {/* <Col xs={3}>{employee.ID}</Col> */}
                    <Col
                      style={{ color: "rgb(25, 118, 210)" }}
                      xs={{ span: 1, offset: 6 }}
                    >
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

export default ProjectsActual;
