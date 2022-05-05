import React, { useState, useContext, useEffect } from "react";
import { FlightsContext } from "../contexts/FlightsContext";
import { EmployeesContext } from "../contexts/EmployeesContext";
import { Row, Col, Container, Stack } from "react-bootstrap";

import Chart from "react-apexcharts";

const ProjectsPieChartActual = ({ ...props }) => {
  const {
    employees,
    allResearchProjects,
    allResearchProjectsArray,
    getProjectFromProjectName,
  } = useContext(EmployeesContext);

  const { getProjectActualFlights, actualFlights } = useContext(FlightsContext);
  // console.log("allResearchProjects",allResearchProjects)
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // console.log(
    //   // "useEffect trigger allResearchProjectsArray",
    //   allResearchProjectsArray
    // );
    var labelsArr = [];
    var seriesArr = [];
    var colorsArr = [];
    allResearchProjects.length > 0 &&
      allResearchProjectsArray.length > 0 &&
      allResearchProjectsArray.forEach((p) => {
        // console.log()
        var currentP = getProjectActualFlights(p.project);
        //   console.log("currentP", currentP);
        labelsArr.push(currentP.project);
        seriesArr.push(currentP.projectCO2e);
        colorsArr.push(p.projectColor);
      });
    setLabels(labelsArr);
    setSeries(seriesArr);
    setColors(colorsArr);
  }, [allResearchProjects, allResearchProjectsArray]);

  //   var series = [44, 55, 13, 43, 22];

  var options = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: labels,
    colors: colors,
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        // console.log("series",series)
        // console.log("seriesIndex",seriesIndex)
        // console.log("dataPointIndex",dataPointIndex)
        // console.log("w",w)
        return (
          '<div style="background-color:rgba(240,240,240,0.5);padding:5px;">' +
          `<span style="color:${colors[seriesIndex]}">` +
          w.globals.labels[seriesIndex] +
          "</span>" +
          "<span>" +
          ": " +
          series[seriesIndex] +
          " CO2e kg" +
          "</span>" +
          "</div>"
        );
      },
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
    <Container className="component-container" {...props}>
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}>
        <h5 className="component-title-sm">
          {" "}
          Research Project's share of All Emissions{" "}
        </h5>
      </Row>
      <Row>
        {actualFlights.length > 0 ? (
          <Chart
            options={options}
            series={series}
            type="pie"
            height={200}
            //   width={550}
          />
        ) : (
          <div style={{ height: "200px" }}>
            {" "}
            No flights have been assigned yet
          </div>
        )}
      </Row>
    </Container>
  );
};

export default ProjectsPieChartActual;
