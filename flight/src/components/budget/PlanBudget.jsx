import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Container, Stack } from "react-bootstrap";
import { FlightsContext } from "../contexts/FlightsContext";
import Sort from "../budgetOverview/Sort";
// import FindFlight from "./FindFlight/FindFlight";
import FlightList from "./FlightList";
import BudgetProgressBar from "../progress/BudgetProgressBar";
import StepByStep from "./FindFlight/StepByStep";
import ColorScale from "../progress/ColorScale";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Button } from "@mui/material";

const PlanBudget = ({ ...props }) => {
  const { flights, CO2eTotal } = useContext(FlightsContext);
  const [sortValue, setSortValue] = useState("totalco2e");
  const [reverseSorting, setReverseSorting] = useState(false);

  var max = Math.max.apply(
    Math,
    flights.map(function (o) {
      return o.totalco2e;
    })
  );

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
  return (
    <Container fluid>
      <Row className="page-title">Plan Carbon budget</Row>
      <Row>
        <Col md={4}>
          <StepByStep />
        </Col>
        <Col lg={6} style={{ paddingTop: 0 }} className="component-container">
          <BudgetProgressBar
            max={max}
            sortValue={sortValue}
            reverseSorting={reverseSorting}
          />

          <Row style={{ justifyContent: "space-between" }}>
            <Col md={"auto"}>
              <ColorScale max={max} steps={10} />
            </Col>
            <Col
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Sort
                placeholder={"Sorting on"}
                array={[
                  { value: "totalco2e", label: "CO2e" },
                  { value: "priority", label: "Priority" },
                  { value: "ID", label: "ID" },
                  { value: "workDays", label: "Work days" },
                  { value: "echoTimeDate", label: "Date" },
                ]}
                callback={(sort) => {
                  setSortValue(sort);
                }}
              />

              {reverseSorting ? (
                <ArrowDownwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              ) : (
                <ArrowUpwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              )}
            </Col>
          </Row>

          <FlightList sortValue={sortValue} reverseSorting={reverseSorting} />
        </Col>

        <Col md={"auto"}>
          <Stack gap={2}>
            <Col>
              <DataCard
                title="Budget Total"
                value={CO2eTotal}
                unit={"CO2e kg"}
              />
            </Col>
            <Col>
              <DataCard title="Largest trip" value={max} unit={"CO2e kg"} />
            </Col>
            <Col>
              <DataCard title="Number of flights" value={flights.length} />
            </Col>
          </Stack>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <FlightList />
        </Col>
      </Row> */}
    </Container>
  );
};

export default PlanBudget;
