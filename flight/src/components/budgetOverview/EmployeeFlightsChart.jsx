import React, { useState, useEffect, useContext } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryStack,
  Bar,
  VictoryTooltip,
  VictoryAxis,
  VictoryVoronoiContainer,
} from "victory";
import Chip from "@mui/material/Chip";

import { Row, Col, Container } from "react-bootstrap";
import { sortBy, getQuarter } from "../utility/functions";

import { EmployeesContext } from "../contexts/EmployeesContext";
import { FlightsContext } from "../contexts/FlightsContext";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import { Button } from "@mui/material";

const EmployeeFlightsChart = ({ ...props }) => {
  const { quarter } = props;
  const { getNameFromID, employeesID } = useContext(EmployeesContext);
  const {
    getEmployeeFlights,
    getEmployeeActualFlights,
    flights,
    actualFlights,
  } = useContext(FlightsContext);

  const [xAxis, setX] = useState("name");
  const [yAxis, setY] = useState("totalco2e");
  // const [max, setMax] = useState(0);
  // const [min, setMin] = useState(0);
  const [sortValue, setSortValue] = useState("name");
  const [reverseSorting, setReverseSorting] = useState(true);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    var flightsGroupedByEmployee = [];
    flights.length > 0 &&
      employeesID.length > 0 &&
      employeesID.forEach((ID) => {
        var employee = {};
        employee.name = getNameFromID(ID);
        // console.log("employee name", employee.name);
        var allEmployeeFlights = getEmployeeFlights(ID);

        var employeeFlightsByQuarter = allEmployeeFlights.filter(
          (f) => getQuarter(f.echoTimeDate) <= quarter
        );

        employee.flights = employeeFlightsByQuarter;
        employee.status = "planned";
        employee.numberOfFlights = employeeFlightsByQuarter.length;

        employee.totalco2e = employeeFlightsByQuarter.reduce(
          (a, b) => a + b.totalco2e,
          0
        );

        flightsGroupedByEmployee.push(employee);
      });
    // console.log("flightsGroupedByEmployee", flightsGroupedByEmployee);
    // setData(flightsGroupedByEmployee);
    setData(flightsGroupedByEmployee.sort(sortBy(sortValue, reverseSorting)));
  }, [flights, employeesID, quarter]);

  useEffect(() => {
    var flightsGroupedByEmployee = [];
    actualFlights.length > 0 &&
      employeesID.length > 0 &&
      employeesID.forEach((ID) => {
        var employee = {};
        employee.name = getNameFromID(ID);
        // console.log("employee name", employee.name);
        var allEmployeeFlights = getEmployeeActualFlights(ID);
        var employeeFlightsByQuarter = allEmployeeFlights.filter(
          (f) => getQuarter(f.echoTimeDate) <= quarter
        );
        // console.log("employeeFlights", employeeFlights);
        var unplannedEmployeeFlights = employeeFlightsByQuarter.filter(
          (f) => f.status === "unplanned"
        );
        employee.status = "unplanned";
        employee.flights = unplannedEmployeeFlights;

        employee.numberOfFlights = unplannedEmployeeFlights.length;

        employee.totalco2e = unplannedEmployeeFlights.reduce(
          (a, b) => a + b.totalco2e,
          0
        );

        flightsGroupedByEmployee.push(employee);
      });
    // console.log("flightsGroupedByEmployee", flightsGroupedByEmployee);
    // setData2(flightsGroupedByEmployee);
    setData2(flightsGroupedByEmployee.sort(sortBy(sortValue, reverseSorting)));
  }, [actualFlights, quarter, employeesID]);
  console.log("data2", data2);
  console.log("data", data);
  useEffect(() => {}, [quarter]);

  const ColorBar = ({ ...props }) => {
    const { datum } = props;
    // console.log("ColorBar datum", datum);

    // console.log("datum", datum);
    // console.log("datum", datum.flights);
    return <Bar {...props} style={{ fill: "#0056f5" }}></Bar>;
  };

  const ColorBarUnplanned = ({ ...props }) => {
    const { datum } = props;

    // console.log("ColorBarUnplanned datum", datum);
    // console.log("datum", datum.flights);
    return <Bar {...props} style={{ fill: "#ed6c02" }}></Bar>;
  };

  return (
    <Container className="component-container">
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}>
        {/* <h5 className="component-title">Employees' aggregated emissions </h5> */}
        <Col md={"auto"}>
          <h5 className="component-title">
            Employees' actual emissions
            {quarter !== 0 && (
              <div style={{ color: "#c9c9c9" }}>
                : by <Chip label={`Q${quarter}`} color="primary" />
              </div>
            )}
          </h5>
        </Col>
        {/* <div className="page-header2">Employees ({employees.length})</div> */}
      </Row>
      {/* <div style={{ width: "50%" }}> */}
      <Row style={{ justifyContent: "center", marginBottom: "1rem" }}>
        {/* <Col md={"auto"}>
          <ColorScale max={max} step={10} />
        </Col> */}
      </Row>
      {data.length > 0 && (
        <VictoryChart
          padding={{ left: 90, top: 20, right: 0, bottom: 50 }}
          // theme={VictoryTheme.material}
          // strokeDasharray={"0"}
          height={500}
          width={550}
          domainPadding={{ x: 20, y: [10, 20] }}
          scale={{ x: "linear" }}
          // tickLabelComponent={<VictoryLabel style={{ fontSize: '12px'}} />}
          containerComponent={
            <VictoryVoronoiContainer
              // mouseFollowTooltips
              // voronoiDimension="x"
              labels={({ datum }) =>
                `  ${datum.name}\n CO2e: ${datum.totalco2e}\n Flights: ${datum.numberOfFlights}\n  ${datum.status} flights\n `
              }
              labelComponent={
                <VictoryTooltip
                  constrainToVisibleArea
                  // flyoutWidth={105}
                  // flyoutHeight={105}
                  flyoutPadding={10}
                  cornerRadius={2}
                  pointerLength={15}
                  pointerWidth={0.1}
                  flyoutStyle={{
                    stroke: ({ datum }) =>
                      datum.status === "planned" ? "#0056f5" : "#ed6c02",
                    strokeWidth: 3,
                    fill: "#FFFFFF",
                  }}
                  style={{
                    fill: "#000",
                    fontSize: 11,
                    fontWeight: 500,
                    textAnchor: "start",
                  }}
                />
              }
            />
          }
        >
          <VictoryAxis
            style={{
              tickLabels: {
                fontSize: 9,
                fontWeight: "400",
                fontFamily: "Helvetica, Arial, sans-serif",
              },
              axisLabel: {
                fontFamily: "Helvetica, Arial, sans-serif !important",
                fontWeight: 700,
                // whiteSpace: "nowrap",
                // textAlign: "start",
                // textSizeAdjust: "100%",
                // letterSpacing: "1px",
                // stroke: "white",
                fontSize: 11,
                padding: 60,
              },
            }}
            // label={"Employees"}
          />
          <VictoryAxis
            dependentAxis
            orientation="bottom"
            style={{
              tickLabels: { fontSize: 10 },
              grid: { stroke: "#ecebf4", strokeWidth: 2 },
              axisLabel: {
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "Helvetica, Arial, sans-serif !important",

                // letterSpacing: "1px",
                // stroke: "white",
                // fontSize: 20
                padding: 30,
              },
            }}
            tick
            label={"CO2e kg"}
          />
          <VictoryStack>
            {data.length > 0 && (
              <VictoryBar
                // style={{ labels: { fill: "#0056f5" } }}

                horizontal
                dataComponent={<ColorBar />}
                data={data}
                // data accessor for x values
                x={xAxis}
                // data accessor for y values
                y={yAxis}
              />
            )}

            {data2.length > 0 && (
              <VictoryBar
                style={{
                  data: { fill: "#ed6c02" },
                  labels: { fill: "#ed6c02" },
                }}
                label
                horizontal
                dataComponent={<ColorBarUnplanned />}
                data={data2}
                // data accessor for x values
                x={xAxis}
                // data accessor for y values
                y={yAxis}
              />
            )}
          </VictoryStack>
        </VictoryChart>
      )}

      {/* </div> */}
    </Container>
  );
};

export default EmployeeFlightsChart;
