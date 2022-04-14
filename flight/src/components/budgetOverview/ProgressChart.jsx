import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { Row, Col, Container, Stack } from "react-bootstrap";
import { FlightsContext } from "../contexts/FlightsContext";
import { sortBy } from "../utility/functions";

const ProgressChart = ({ ...props }) => {
  const { flights } = useContext(FlightsContext);
  var sortedFlights = flights.sort(sortBy("echoTimeDate", false));

  var monthData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  console.log(monthData[0]);

  console.log("ProgressChart flights", flights);
  console.log("ProgressChart sortedFlights", sortedFlights);

  sortedFlights.map((flight) => {
    //  console.log(flight.travelDate[0].month)
    var month = new Date(flight.echoTimeDate).getMonth()
    monthData[month] += flight.totalco2e;
  });
  console.log("monthData", monthData);

  var estimateLine = monthData.map((elem, index) =>
    monthData.slice(0, index + 1).reduce((a, b) => Math.floor(a + b))
  );
  console.log("estimateLine", estimateLine);
//   var actualData = [
//     1520, 1602, 1604, 500, 4048, 1344, 2374, 1444, 508, 442, 723, 854,
//   ];
  var actualData = [
    1520, 1602, 1604, 500, 4048, 1344, 2374, 1444, 508, 442, 723, 854,
  ];

  var actualLine = actualData.map((elem, index) =>
    actualData.slice(0, index + 1).reduce((a, b) => Math.floor(a + b))
  );
  var straightLine = monthData.map((each, index) => {
    return (17163 / 12) * (index + 1);
  });

  var series = [
    {
      name: "Planned flights CO2e",
      type: "column",
      data: monthData,
    },
    {
        name: "Estimated budget",
        type: "line",
        data: straightLine,
      },
    {
      name: "Actual CO2e",
      type: "column",
      data: actualData,
    },
 
    {
      name: "Actual progress",
      type: "line",
      data: actualLine,
    },
  ];

  var options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
    },

    dataLabels: {
      enabled: false,
    },
    colors: ["#0056F5", "#85AFFF","#C0357A", "#E08FB8"],

    stroke: {
      curve: "straight",
      width: [4, 4, 5, 5],
    },
    plotOptions: {
      bar: {
        columnWidth: "10%",
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
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  return (
    <Container className="component-container">
       <Row style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}>
        <h5 className="component-title">Progress of budget </h5>
      </Row>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={400}
        width={500}
      />
    </Container>
  );
};

export default ProgressChart;
