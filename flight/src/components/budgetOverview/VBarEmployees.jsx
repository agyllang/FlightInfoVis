import React, { useState, useEffect, useContext } from "react";
import {
  VictoryBar,
  VictoryChart,
  Bar,
  VictoryLabel,
  VictoryTooltip,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryVoronoiContainer,
} from "victory";
import chroma from "chroma-js";
import { Row, Col, Container } from "react-bootstrap";
import { sortBy } from "../utility/functions";

import Sort from "./Sort";
import { EmployeesContext } from "../contexts/EmployeesContext";
import { FlightsContext } from "../contexts/FlightsContext";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import { Button } from "@mui/material";

// import fakeFlights from "../../fakeData";
import ColorScale from "../progress/ColorScale";

// const handleMouseOver = () => {
//   const fillColor = this.state.clicked ? "blue" : "tomato";
//   const clicked = !this.state.clicked;
//   this.setState({
//     clicked,
//     style: {
//       data: { fill: fillColor },
//     },
//   });
// };

const VBarEmployees = ({ ...props }) => {
  // const { flights } = props;
  const { getNameFromID, employeesID } = useContext(EmployeesContext);
  const { getEmployeeFlights,flights } = useContext(FlightsContext);

  const [xAxis, setX] = useState("name");
  const [yAxis, setY] = useState("totalco2e");
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [sortValue, setSortValue] = useState("totalco2e");
  const [reverseSorting, setReverseSorting] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    var flightsGroupedByEmployee = [];
    employeesID.length > 0 &&
      employeesID.forEach((ID) => {
        var employee = {};
        employee.name = getNameFromID(ID);
        // console.log("employee name", employee.name);
        var employeeFlights = getEmployeeFlights(ID);
        // console.log("employeeFlights", employeeFlights);
        employee.flights = employeeFlights;

        employee.numberOfFlights = employeeFlights.length;

        employee.totalco2e = employeeFlights.reduce(
          (a, b) => a + b.totalco2e,
          0
        );

        flightsGroupedByEmployee.push(employee);
      });
    // console.log("flightsGroupedByEmployee", flightsGroupedByEmployee);
    setData(flightsGroupedByEmployee.sort(sortBy(sortValue,reverseSorting)));
  }, [flights,employeesID]);

  useEffect(() => {
    if (data.length > 0) {
      var maxco2e = Math.max.apply(
        Math,
        data.map(function (o) {
          return o.totalco2e;
        })
      );
      setMax(maxco2e);
    }
  }, [data]);
  // console.log("max", max);

  var colorScale = chroma
    .scale("OrRd")
    .domain([0, max])
    .classes(15)
    .padding([0.2, 0]);

  // .padding([0.2, 0]);

  const ColorBar = ({ ...props }) => {
    const { datum } = props;

    // console.log("datum", datum);
    // console.log("datum", datum.flights);
    return <Bar {...props} style={{ fill: colorScale(datum._y).hex() }}></Bar>;
  };

  // var sortedFlights = flights.sort(sortBy(sortValue, reverseSorting));

  return (
    <Container className="component-container">
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}>
        <h5 className="component-title">Employees' emission </h5>

        {/* <div className="page-header2">Employees ({employees.length})</div> */}
      </Row>
      {/* <div style={{ width: "50%" }}> */}
      <Row style={{ justifyContent: "center",marginBottom:"1rem" }}>
        <Col md={"auto"}>
          <ColorScale max={max} step={10} />
        </Col>
        {/* <Col
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
              { value: "ID", label: "Employee" },
              { value: "totalco2e", label: "CO2e" },
              { value: "co2ePerDay", label: "CO2e/day" },
              { value: "priority", label: "Priority" },
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
        </Col> */}
      </Row>

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
            voronoiDimension="x"
            labels={({ datum }) =>
              `  ${datum.name}\n CO2e: ${datum.totalco2e}\n Flights: ${datum.numberOfFlights}\n `
            }
            labelComponent={
              <VictoryTooltip
                constrainToVisibleArea
                flyoutWidth={95}
                flyoutHeight={75}
                cornerRadius={2}
                pointerLength={15}
                pointerWidth={0.1}
                flyoutStyle={{
                  stroke: "#868C97",
                  strokeWidth: 1,
                  fill: "#FFFFFF",
                }}
                style={{
                  fill: "#000",
                  fontSize: 10,
                  fontWeight: 400,
                  textAnchor: "start",
                }}
              />
            }
            // labelComponent={<VictoryTooltip dy={-7} constrainToVisibleArea />}
          />
          // containerComponent={<VictoryZoomContainer/>
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
        <VictoryBar
          horizontal
          dataComponent={
            <ColorBar
            //  events={{ onMouseOver: handleMouseOver }}
            />
          }
          data={data}
          // data accessor for x values
          x={xAxis}
          // data accessor for y values
          y={yAxis}
        />
      </VictoryChart>
      {/* </div> */}
    </Container>
  );
};

export default VBarEmployees;
