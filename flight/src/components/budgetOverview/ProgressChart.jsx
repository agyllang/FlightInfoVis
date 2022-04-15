import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { Row, Col, Container, Stack } from "react-bootstrap";
import { FlightsContext } from "../contexts/FlightsContext";
import { sortBy } from "../utility/functions";
import Slider from "@mui/material/Slider";

const ProgressChart = ({ ...props }) => {
  const { flights, CO2eTotal } = useContext(FlightsContext);
  const [quarter, setQuarter] = useState(1);

  const [plannedMonthly, setPlannedMonthly] = useState([]);

  const [plannedTrend, setPlannedTrend] = useState([]);

  var actualData = [
    1520, 1602, 1604, 500, 4048, 1344, 2374, 1444, 508, 442, 723, 854,
  ];
  const [actualMonthly, setActual] = useState(actualData);

  const [actualTrend, setActualTrend] = useState(
    actualMonthly.map((elem, index) =>
      actualMonthly.slice(0, index + 1).reduce((a, b) => Math.floor(a + b))
    )
  );
  useEffect(() => {
    setActual(actualData.slice(0, quarter * 3));
  }, [quarter]);

  useEffect(() => {
    setActualTrend(
      actualMonthly.map((elem, index) =>
        actualMonthly.slice(0, index + 1).reduce((a, b) => Math.floor(a + b))
      )
    );
  }, [actualMonthly]);

  var sortedFlights = flights.sort(sortBy("echoTimeDate", false));

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
      categories: [
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
      ],
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
          borderColor: "#00E396",
          borderWidth: 2,
          label: {
            offsetY: -10,
            borderColor: "#c0c0c0",
            style: {
              fontSize: "14px",
              color: "#fff",
              background: "#00E396",
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
      ],
    },
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
      <Row>
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
      <Chart
        options={options}
        series={series}
        type="bar"
        height={400}
        width={550}
      />
    </Container>
  );
};

export default ProgressChart;
