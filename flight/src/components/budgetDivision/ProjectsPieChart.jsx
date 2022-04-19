import React, { useState, useContext } from "react";
import { FlightsContext } from "../contexts/FlightsContext";
import { EmployeesContext } from "../contexts/EmployeesContext";
import { Row, Col, Container, Stack } from "react-bootstrap";

import Chart from "react-apexcharts";

const ProjectsPieChart = ({ ...props }) => {
  const { employees, allResearchProjects, getProjectFromProjectName } =
    useContext(EmployeesContext);
  const { getProjectFlights } = useContext(FlightsContext);
  // console.log("allResearchProjects",allResearchProjects)
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [colors, setColors] = useState([]);
  useState(() => {
    var labelsArr = [];
    var seriesArr = [];
    var colorsArr = [];

    allResearchProjects.forEach((p) => {
      var currentP = getProjectFlights(p);
    //   console.log("currentP", currentP);
      labelsArr.push(currentP.project);
      seriesArr.push(currentP.projectCO2e);
      colorsArr.push(getProjectFromProjectName(p).projectColor);
    });
    setLabels(labelsArr);
    setSeries(seriesArr);
    setColors(colorsArr);
  }, [employees, allResearchProjects]);

  //   var series = [44, 55, 13, 43, 22];

  var options = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: labels,
    colors: colors,
    tooltip: {
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
            // console.log("series",series)
            // console.log("seriesIndex",seriesIndex)
            // console.log("dataPointIndex",dataPointIndex)
            // console.log("w",w)
          return (
            '<div style="background-color:rgba(240,240,240,0.5);padding:5px;">' +
            `<span style="color:${colors[seriesIndex]}">` +
            w.globals.labels[seriesIndex] +'</span>' +
             '<span>' + ": " +
            series[seriesIndex] 
            + " CO2e kg" +
            "</span>" +
            "</div>"
          );
        }
      },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <Container className="component-container" {...props} >
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}>
        <h5 className="component-title"> Research Project's share of Total Emissions </h5>
      </Row>
      <Row>
        <Chart
          options={options}
          series={series}
          type="pie"
         height={200}
          //   width={550}
        />
      </Row>
    </Container>
  );
};

export default ProjectsPieChart;
