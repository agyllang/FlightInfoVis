import React, { useState, useEffect } from "react";
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
import { Row, Col, Container, Stack } from "react-bootstrap";

import Sort from "./Sort";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Button } from "@mui/material";

import fakeFlights from "../../fakeData";
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

const VBar = ({ ...props }) => {
  const { flights } = props;
  const [xAxis, setX] = useState("flightID");
  const [yAxis, setY] = useState("totalco2e");
  const [max, setMax] = useState(2500);
  const [min, setMin] = useState(0);
  const [sortValue, setSortValue] = useState("totalco2e");
  const [reverseSorting, setReverseSorting] = useState(false);

  useEffect(() => {
    var maxco2e = Math.max.apply(
      Math,
      flights.map(function (o) {
        return o.totalco2e;
      })
    );
    setMax(maxco2e);
  }, [flights]);

  var colorScale = chroma
    .scale("OrRd")
    .domain([0, max])
    .classes(15)
    .padding([0.2, 0]);

  // .padding([0.2, 0]);

  const sort_by = (field, reverse, primer) => {
    const key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };

  //   var dNew = d.sort(sort_by("x",true,(a) => a.toUpperCase()));
  //   var dNew = d.sort(sort_by("y", false));

  const ColorBar = ({ ...props }) => {
    const { datum } = props;
    // console.log("datum", datum);
    return <Bar {...props} style={{ fill: colorScale(datum._y).hex() }}></Bar>;
  };

  var sortedFlights = flights.sort(sort_by(sortValue, reverseSorting));
  // console.log("sortedFlights", sortedFlights);

  return (
    <Container className="component-container">
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}>
        <h5 className="component-title">All planned flights of budget </h5>

        {/* <div className="page-header2">Employees ({employees.length})</div> */}
      </Row>
      {/* <div style={{ width: "50%" }}> */}
      <Row>
        <Col md={"auto"}>
          <ColorScale max={max} step={10} />
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

      <VictoryChart
        padding={{ left: 90, top: 0, right: 0, bottom: 50 }}
        // theme={VictoryTheme.material}
        // strokeDasharray={"0"}
        height={300}
        width={400}
        domainPadding={{ x: 20, y: [10, 20] }}
        scale={{ x: "linear" }}
        // tickLabelComponent={<VictoryLabel style={{ fontSize: '12px'}} />}
        containerComponent={
          <VictoryVoronoiContainer
            mouseFollowTooltips
            voronoiDimension="x"
            labels={({ datum }) =>
              `Emp.ID: ${datum.ID} \n Project: ${datum.project} \n  CO2e: ${datum.totalco2e} \n Date: ${new Date(datum.echoTimeDate).getMonth()}/${new Date(datum.echoTimeDate).getFullYear()} \n Prio: ${datum.priority} `
            }
            labelComponent={
              <VictoryTooltip
                constrainToVisibleArea
                flyoutWidth={95}
                flyoutHeight={55}
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
          label={"Flight ID"}
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
          data={sortedFlights}
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

export default VBar;
