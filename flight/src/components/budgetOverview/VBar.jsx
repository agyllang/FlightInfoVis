import React, { useState } from "react";
import { VictoryBar, VictoryChart, Bar,VictoryLabel  } from "victory";
import chroma from "chroma-js";

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
  const {flights} = props;
  const [xAxis, setX] = useState("flightID");
  const [yAxis, setY] = useState("total");
  const [max, setMax] = useState(2500);
  const [min, setMin] = useState(0);
  const [reverse, setReverse] = useState(false);
  
  
  var chromaScale =  chroma.scale('OrRd').domain([min,max]).classes(8).padding([0.2, 0]);
 
//   console.log("chroma scale",chromaScale)
  const handleMouseOver = (e) => {
    console.log("handleMouseOver event", e);
  };
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
  var newArry = [
    {
      ID: "p773",
      co2e_unit: "kg",
      legs: [],
      oneWay: "2",
      priority: 4,
      purpose: "very importamnt",
      seatClass: "business",
      total: 2037.9306406651401,
      travelDate: [],
      workDays: "34",
    },
    {
      ID: "p1233",
      co2e_unit: "kg",
      legs: [],
      oneWay: "2",
      priority: 4,
      purpose: "very importamnt",
      seatClass: "business",
      total: 2037.9306406651401,
      travelDate: [],
      workDays: "34",
    },
    {
      ID: "p143",
      co2e_unit: "kg",
      legs: [],
      oneWay: "2",
      priority: 3,
      purpose: "very importamnt",
      seatClass: "business",
      total: 207,
      travelDate: [],
      workDays: "4",
    },
    {
      ID: "p323",
      co2e_unit: "kg",
      legs: [],
      oneWay: "2",
      priority: 1,
      purpose: "very importamnt",
      seatClass: "economy",
      total: 537.9,
      travelDate: [],
      workDays: "3",
    },
    {
      ID: "p555",
      co2e_unit: "kg",
      legs: [],
      oneWay: "1",
      priority: 2,
      purpose: "very importamnt",
      seatClass: "first",
      total: 1237.9,
      travelDate: [],
      workDays: "2",
    },
    {
        ID: "p333",
        co2e_unit: "kg",
        legs: [],
        oneWay: "2",
        priority: 4,
        purpose: "very importamnt",
        seatClass: "business",
        total: 1437.9306406651401,
        travelDate: [],
        workDays: "34",
      },
      {
        ID: "p222",
        co2e_unit: "kg",
        legs: [],
        oneWay: "2",
        priority: 4,
        purpose: "very importamnt",
        seatClass: "business",
        total: 1737.9306406651401,
        travelDate: [],
        workDays: "34",
      },
      {
        ID: "p111",
        co2e_unit: "kg",
        legs: [],
        oneWay: "2",
        priority: 3,
        purpose: "very importamnt",
        seatClass: "business",
        total: 307,
        travelDate: [],
        workDays: "4",
      },
      {
        ID: "p888",
        co2e_unit: "kg",
        legs: [],
        oneWay: "2",
        priority: 1,
        purpose: "very importamnt",
        seatClass: "economy",
        total: 837.9,
        travelDate: [],
        workDays: "3",
      },
      {
        ID: "p850",
        co2e_unit: "kg",
        legs: [],
        oneWay: "1",
        priority: 2,
        purpose: "very importamnt",
        seatClass: "first",
        total: 937.9,
        travelDate: [],
        workDays: "2",
      },
  ];


  //   var dNew = d.sort(sort_by("x",true,(a) => a.toUpperCase()));
  //   var dNew = d.sort(sort_by("y", false));
 

  const ColorScaleBar = ({ ...props }) => {
    const { datum } = props;
    // console.log("datum", datum);
    return (
      <Bar {...props} style={{ fill: chromaScale(datum._y).hex() }}></Bar>
    );
  };

  var sortedFlights = flights.sort(sort_by("total", true));
  console.log("sortedFlights",sortedFlights);

  return (
    <div style={{ width: "50%" }}>
        
      <VictoryChart
        // theme={VictoryTheme.material}
        // strokeDasharray={"0"}
        height={400}
        width={400}
        domainPadding={{ x: 20, y: [0, 20] }}
        scale={{ x: "linear" }}
        tickLabelComponent={<VictoryLabel dy={30}/>}

      >
        <VictoryBar
          horizontal
          dataComponent={
            <ColorScaleBar
            //  events={{ onMouseOver: handleMouseOver }}
            />
          }
          //   style={this.state.style}
          data={sortedFlights}
          // data accessor for x values
          x={xAxis}
          // data accessor for y values
          y={yAxis}
        />
      </VictoryChart>
    </div>
  );
};

export default VBar;
