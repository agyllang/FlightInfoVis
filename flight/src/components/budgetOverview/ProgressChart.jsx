import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { Row, Col, Container, Stack } from "react-bootstrap";
import { FlightsContext } from "../contexts/FlightsContext";
import { sortBy, getRandom } from "../utility/functions";
import Slider from "@mui/material/Slider";

const ProgressChart = ({ ...props }) => {
  const { flights, CO2eTotal } = useContext(FlightsContext);
  var sortedFlights = flights.sort(sortBy("echoTimeDate", false));
  var monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [quarter, setQuarter] = useState(1);

  const [plannedMonthly, setPlannedMonthly] = useState([]);
  console.log("plannedMonthly", plannedMonthly);

  const [plannedTrend, setPlannedTrend] = useState([]);
  console.log("plannedTrend", plannedTrend);

  var actualData = [
    1520, 1602, 1604, 500, 4048, 1344, 2374, 1444, 508, 442, 723, 854,
  ];

  const [actualMonthly, setActual] = useState([]);
  console.log("actualMonthly", actualMonthly);

  const [actualTrend, setActualTrend] = useState(
    actualMonthly.map((elem, index) =>
      actualMonthly.slice(0, index + 1).reduce((a, b) => Math.floor(a + b))
    )
  );
  console.log("actualTrend", actualTrend);

  useEffect(() => {
    var randomizedData = plannedMonthly.map((each, index) => {
      return index % 2 === 0 ? Math.floor(each * 1.5) : Math.floor(each * 0.5);
    });
    setActual(randomizedData.slice(0, quarter * 3));
  }, [plannedMonthly, quarter]);

  // useEffect(() => {
  //   var randomizedData = plannedMonthly.map((each) => {
  //     return Math.floor(getRandom(0.7, 1.3) * each);
  //   });
  //   setActual(randomizedData.slice(0, quarter * 3));
  // }, [quarter, plannedMonthly]);

  useEffect(() => {
    var trendbyQuarter = actualMonthly.map((elem, index) =>
      actualMonthly.slice(0, index + 1).reduce((a, b) => Math.floor(a + b))
    );

    setActualTrend(trendbyQuarter.slice(0, quarter * 3));
  }, [actualMonthly, quarter]);

  useEffect(() => {
    var monthData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    sortedFlights.map((flight) => {
      //  console.log(flight.travelDate[0].month)
      var month = new Date(flight.echoTimeDate).getMonth();
      monthData[month] += flight.totalco2e;
    });
    setPlannedMonthly(monthData);
  }, [flights]);

  useEffect(() => {
    var monthData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var straightLine = monthData.map((each, index) => {
      return Math.floor(CO2eTotal / 12) * (index + 1);
    });

    setPlannedTrend(straightLine);
  }, [CO2eTotal]);

  //   console.log("ProgressChart flights", flights);
  //   console.log("ProgressChart sortedFlights", sortedFlights);

  //   console.log("plannedMonthly", plannedMonthly);

  //   plannedMonthly.length>0 && var estimateLine = plannedMonthly.map((elem, index) =>
  //     plannedMonthly.slice(0, index + 1).reduce((a, b) => Math.floor(a + b))
  //   );
  //console.log("estimateLine", estimateLine);
  //   var actualData = [
  //     1520, 1602, 1604, 500, 4048, 1344, 2374, 1444, 508, 442, 723, 854,
  //   ];

  //   var actualData = [
  //     1520, 1602, 1604, 500, 4048, 1344, 2374, 1444, 508, 442, 723, 854,
  //   ];

  //   var actualLine = actualData.map((elem, index) =>
  //     actualData.slice(0, index + 1).reduce((a, b) => Math.floor(a + b))
  //   );
  //   var straightLine = monthData.map((each, index) => {
  //     return (17163 / 12) * (index + 1);
  //   });

  var series = [
    {
      name: "Planned emissions",
      type: "column",
      data: plannedMonthly,
    },
    {
      name: "Estimated budget trend",
      type: "line",
      data: plannedTrend,
    },
    {
      name: "Actual emissions",
      type: "column",
      data: actualMonthly,
    },

    {
      name: "Actual progress",
      type: "line",
      data: actualTrend,
    },
  ];

  var options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
    },

    dataLabels: {
      enabled: false,
    },
    colors: ["#0056F5", "#85AFFF", "#C0357A", "#E08FB8"],

    stroke: {
      curve: "straight",
      width: [2, 5, 2, 5],
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
      },
    },
    xaxis: {
      //   type: "category",
      categories: monthArray,
    },
    yaxis: [
      {
        seriesName: "Planned emissions",
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        title: {
          text: "CO2e kg",
        },
      },
      //   {
      //     seriesName: "Planned emissions",
      //     show: false,
      //   },

      //   {
      //     seriesName: "Actual progress",
      //     axisTicks: {
      //       show: true,
      //     },
      //     axisBorder: {
      //       show: true,
      //     },
      //     title: {
      //       text: "CO2e kg",
      //     },
      //   },

      //   {
      //     opposite: true,
      //     seriesName: "Estimated budget",
      //     axisTicks: {
      //       show: true,
      //     },
      //     axisBorder: {
      //       show: true,
      //     },
      //     title: {
      //       text: "Line",
      //     },
      //   },
    ],
    // yaxis: [
    //   {
    //     seriesName: "Planned emissions",
    //     axisTicks: {
    //       show: true,
    //     },
    //     axisBorder: {
    //       show: true,
    //     },
    //     title: {
    //       text: "CO2e kg",
    //     },
    //   },
    // //   {
    // //     seriesName: "Column B",
    // //     show: false,
    // //   },
    //   {
    //     opposite: true,
    //     seriesName: "Estimated budget",
    //     show: true,
    //     axisTicks: {
    //       show: true,
    //     },
    //     axisBorder: {
    //       show: true,
    //     },
    //     title: {
    //       text: "Line",
    //     },
    //   },
    // ],
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        show: true,
      },
      marker: {
        show: true,
        size: 4,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      offsetX: 0,
    },
    annotations: {
      yaxis: [
        {
          y: CO2eTotal,
          borderColor: "#85AFFF",
          borderWidth: 2,
          label: {
            offsetY: 20,
            offsetX: -270,

            borderColor: "#c0c0c0",
            style: {
              fontSize: "14px",
              color: "#fff",
              background: "#85AFFF",
              padding: {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5,
              },
            },
            text: `Planned carbon budget: ${CO2eTotal}`,
          },
        },
         { 
          y: actualTrend[quarter * 3 - 1],
          borderColor: "#E08FB8",
          borderWidth: 2,
          label: {
            offsetY:  quarter===4 ? 70: 20,
            offsetX: quarter===1 ? -130 : quarter===2 ? 0 : quarter===3 ?-230 : 0,
            // offsetX: (100+ (quarter*-100)),
            borderColor: "##E08FB8",
            style: {
              fontSize: "14px",
              color: "#fff",
              background: "#E08FB8",
              padding: {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5,
              },
            },
            
            text: `Actual progress by Q${quarter}:  ${
              actualTrend[quarter * 3 - 1]
            } `,
          },
        },
      ],
    }
  };

  const handleChange = (event, newValue) => {
    setQuarter(parseInt(newValue));
  };
  const quarterScale = [
    { label: "Q1", value: 1 },
    { label: "Q2", value: 2 },
    { label: "Q3", value: 3 },
    { label: "Q4", value: 4 },
  ];
  return (
    <Container className="component-container">
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}>
        <h5 className="component-title">Progress of budget 2022 </h5>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        {" "}
        Display actual emissions by quarters
        <Col md={6}>
          <Slider
            aria-label="Display quarters"
            defaultValue={0}
            //getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks={quarterScale}
            min={1}
            max={4}
            onChange={handleChange}
            value={quarter}
          />
        </Col>
      </Row>
      {flights.length > 0 ? (
        <Chart
          options={options}
          series={series}
          type="bar"
          height={400}
          width={550}
        />
      ) : (
        <Chart
          options={{
            chart: {
              height: 350,
              type: "line",
            },
            stroke: {
              width: [0],
            },
            // title: {
            //   text: "No flights added",
            // },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [0],
            },
            labels: ["No flights"],
            xaxis: {
              type: "category",
            },
            yaxis: [
              {
                title: {
                  text: "No flights",
                },
              },
            ],
          }}
          series={[
            {
              name: "No flights added",
              type: "column",
              data: [0],
            },
          ]}
          type="bar"
          height={400}
          width={550}
        />
      )}
    </Container>
  );
};

export default ProgressChart;
