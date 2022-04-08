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
import Sort from "./Sort";
import { Row, Col, Container, Stack } from "react-bootstrap";

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
  const [reverse, setReverse] = useState(false);
  const [sortValue, setSortValue] = useState("total");
  useEffect(() => {
    var maxco2e = Math.max.apply(
      Math,
      flights.map(function (o) {
        return o.totalco2e;
      })
    );
    setMax(maxco2e);
  }, [flights]);

  var colorScale = chroma.scale("OrRd").domain([0, max]).classes(15);
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

  var sortedFlights = fakeFlights.sort(sort_by(sortValue, reverse));
  // console.log("sortedFlights", sortedFlights);

  return (
    <Container className="component-container">
      {/* <div style={{ width: "50%" }}> */}
      <Row>
        <Col>
          <Sort
            placeholder={"Sort"}
            array={["totalco2e", "priority", "project"]}
            callback={(sort) => {
              setSortValue(sort);
            }}
          />
          <ColorScale max={max} step={10} />
        </Col>
      </Row>

      <VictoryChart
        padding={{ left: 90, top: 50, right: 0, bottom: 50 }}
        // theme={VictoryTheme.material}
        // strokeDasharray={"0"}
        height={500}
        width={500}
        domainPadding={{ x: 20, y: [10, 20] }}
        scale={{ x: "linear" }}
        // tickLabelComponent={<VictoryLabel style={{ fontSize: '12px'}} />}
        containerComponent={
          <VictoryVoronoiContainer
            mouseFollowTooltips
            voronoiDimension="x"
            labels={({ datum }) =>
              `Emp.ID: ${datum.ID} \n Project: ${datum.project} \n  CO2e: ${datum.totalco2e} \n Date: ${datum.travelDate[0].month}/${datum.travelDate[0].year} \n Prio: ${datum.priority} `
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
                  fill: "#868C97",
                  fontSize: 10,
                  fontWeight: 400,
                  textAnchor: "center",
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
              fontSize: 7,
            },
            axisLabel: {
              // fontFamily: "inherit",
              fontWeight: 500,
              letterSpacing: "1px",
              // stroke: "white",
              // fontSize: 20
              padding: 50,
            },
          }}
          label={"Flight ID"}
        />
        <VictoryAxis
          dependentAxis
          orientation="bottom"
          style={{
            tickLabels: { fontSize: 10 },
            grid: { stroke: "#F4F5F7", strokeWidth: 2 },
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
          // labels={({ datum }) =>
          //   `Emp.ID: ${datum.ID} \n Project: ${datum.project} \n  CO2e: ${
          //     datum.total * datum.oneWay
          //   } \n Date: ${datum.travelDate[0].month}/${
          //     datum.travelDate[0].year
          //   } \n Prio: ${datum.priority} `
          // }
          // labelComponent={
          //   <VictoryTooltip
          //     flyoutWidth={95}
          //     flyoutHeight={55}
          //     cornerRadius={2}
          //     pointerLength={15}
          //     pointerWidth={0.1}
          //     flyoutStyle={{
          //       stroke: "#868C97",
          //       strokeWidth: 1,
          //       fill: "#FFFFFF",
          //     }}
          //     style={{
          //       fill: "#868C97",
          //       fontSize: 10,
          //       fontWeight: 400,
          //       textAnchor: "center",
          //     }}
          //   />
          // }
        />
      </VictoryChart>
      {/* </div> */}
    </Container>
  );
};

export default VBar;
