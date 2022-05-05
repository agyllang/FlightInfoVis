import React, { useEffect, useContext, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
// import VBar from "./VBar";
import EmployeeFlightsChart from "./EmployeeFlightsChart";
// import ProgressChart from "./ProgressChart";
import ProgressChart from "./ProgressChart";
// import { FlightsContext } from "../contexts/FlightsContext";
// import VBarEmployees from "./VBarEmployees";
// import UpcomingFlightList from "./UpcomingFlightList";
import ChooseQuarterBtns from "./ChooseQuarterBtns";
import OverviewFlightTable from "./OverviewFlightTable";
// import * as React from 'react';
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Projects from "../budgetDivision/Projects";
import ProjectsPieChart from "../budgetDivision/ProjectsPieChart";
import ProjectsPieChartActual from "../budgetDivision/ProjectsPieChartActual";
import ProjectsActual from "../budgetDivision/ProjectsActual";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BudgetOverview = ({ ...props }) => {
  const { budgetApproved } = props;
  // const { flights, addFlight } = useContext(FlightsContext);
  const [quarter, setQuarter] = useState(0);
  // console.log("BudgetOverview, flights in FlightContext", flights);
  // console.log("BudgetOverview, addFlight in FlightContext", addFlight);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container fluid>
      <Row
        className="page-title"
        style={{ justifyContent: "flex-start", alignItems: "center" }}
      >
        <Col md={"auto"}>
          Budget Overview{" "}
          {!budgetApproved && (
            <span style={{ fontSize: "26px" }}>
              {" "}
              - (budget has not been approved yet)
            </span>
          )}{" "}
        </Col>

        <Col
          md={"auto"}
          // className="component-container"
          style={{
            borderRadius: "4px",
            // backgroundColor: "#fff",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            // boxShadow: "0 0 0 1px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ fontSize: "16px", marginRight: "10px" }}>
            Point in time {"  "}
          </div>
          <ChooseQuarterBtns
            quarter={quarter}
            setQuarter={(q) => setQuarter(q)}
          />
        </Col>
      </Row>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Budget Progress" {...a11yProps(0)} />
          <Tab label="Employees and Projects" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <>
          <Row>
            <Col md={5}>
              {/* <UpcomingFlightList /> */}
              <OverviewFlightTable quarter={quarter} />
            </Col>
            <Col md={7}>
              <ProgressChart quarter={quarter} />
            </Col>
          </Row>
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Row>
          {/* <Col xs={3}>
          <AddEmployeeForm />
        </Col> */}
          <Col md={4}>
            {/* <VBarEmployees flights={flights} /> */}
            <EmployeeFlightsChart quarter={quarter} />
          </Col>
          <Col md={5}>
            {/* <Projects /> */}
            <ProjectsActual quarter={quarter}/>
          </Col>
          <Col md={3}>
            {/* <ProjectsPieChart /> */}
            {quarter === 4 && <ProjectsPieChartActual />}
          </Col>
        </Row>
      </TabPanel>
    </Container>
  );
};

export default BudgetOverview;
