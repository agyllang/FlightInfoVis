import React, { useEffect, useContext, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import VBar from "./VBar";
// import ProgressChart from "./ProgressChart";
import ProgressChart2 from "./ProgressChart2";
import { FlightsContext } from "../contexts/FlightsContext";
import VBarEmployees from "./VBarEmployees";
// import UpcomingFlightList from "./UpcomingFlightList";
import ChooseQuarterBtns from "./ChooseQuarterBtns";
import OverviewFlightTable from "./OverviewFlightTable";

const BudgetOverview = ({ ...props }) => {
  // const {} = props;
  const { flights, addFlight } = useContext(FlightsContext);
  const [quarter, setQuarter] = useState(0);
  // console.log("BudgetOverview, flights in FlightContext", flights);
  // console.log("BudgetOverview, addFlight in FlightContext", addFlight);
  return (
    <Container fluid>
      <Row className="page-title" style={{ justifyContent: "flex-start" }}>
        <Col md={"auto"}>Budget Overview</Col>
        <Col
          md={"auto"}
          className="component-container"
          style={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            // boxShadow: "0 0 0 1px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ fontSize: "16px", marginRight: "10px" }}>
             Point in time {"  "}
          </div>
          <ChooseQuarterBtns setQuarter={(q) => setQuarter(q)} />
        </Col>
      </Row>
      <Row>
        {/* <Col md={"auto"}>
          <VBar flights={flights} />
        </Col> */}
        <Col md={4}>
          {/* <UpcomingFlightList /> */}
          <OverviewFlightTable quarter={quarter} />
        </Col>
        <Col md={4}>
          <ProgressChart2 quarter={quarter} />
        </Col>
        <Col md={4}>
          <VBarEmployees flights={flights} />
        </Col>
      </Row>
    </Container>
  );
};

export default BudgetOverview;
