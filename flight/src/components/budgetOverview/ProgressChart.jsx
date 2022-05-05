import React, { useState, useEffect, useContext, useMemo } from "react";
import Chart from "react-apexcharts";
import { Row, Col, Container, Stack } from "react-bootstrap";
import { FlightsContext } from "../contexts/FlightsContext";
import { sortBy, getRandom } from "../utility/functions";
import Chip from "@mui/material/Chip";

// import Slider from "@mui/material/Slider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import InformationTooltip from "./InformationTooltip";
// import Snackbar from "@mui/material/Snackbar";
import PopUpAlert from "./PopUpAlert";

const ProgressChart = ({ ...props }) => {
  const { quarter } = props;

  const { flights, actualFlights, CO2eTotal, bufferProcent, actualCO2eTotal } =
    useContext(FlightsContext);

  var CO2eTotalBuffer =
    CO2eTotal + Math.floor((CO2eTotal * bufferProcent) / 100);

  var sortedFlights = flights.sort(sortBy("echoTimeDate", false));
  var sortedActualFlights = actualFlights.sort(sortBy("echoTimeDate", false));

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

  // const [quarter, setQuarter] = useState(0);

  const [plannedMonthly, setPlannedMonthly] = useState([]);

  //accumulated co2e from planned flights by month
  // console.log("plannedMonthly", plannedMonthly);
  useEffect(() => {
    //accumulating the planned flights by month
    var array12 = new Array(12).fill(0);

    sortedFlights.map((flight) => {
      var month = new Date(flight.echoTimeDate).getMonth();
      array12[month] += flight.totalco2e;
    });

    setPlannedMonthly(array12);
  }, [flights]);

  const [plannedTrend, setPlannedTrend] = useState([]);
  //a straight trend-line based from the total planned co2e
  // console.log("plannedTrend", plannedTrend);
  useEffect(() => {
    //set a straight line based on the total planned co2e (total/12)
    var array12 = new Array(12).fill(0);

    var straightLine = array12.map((each, index) => {
      return Math.floor(CO2eTotalBuffer / 12) * (index + 1);
    });

    setPlannedTrend(straightLine);
  }, [CO2eTotalBuffer]);

  const [dottedProgress, setDottedProgress] = useState([]);
  //a continuation from the actual progress with the planned flights
  //console.log("dottedProgress", dottedProgress);

  const [actualMonthly, setActual] = useState([]);
  // the actual emissions (generated) by months
  useEffect(() => {
    //accumulating the planned flights by month
    var array12 = new Array(12).fill(0);

    sortedActualFlights.map((flight) => {
      var month = new Date(flight.echoTimeDate).getMonth();
      array12[month] += flight.totalco2e;
    });

    if (quarter !== 5) {
      setActual(array12.slice(0, quarter * 3));
    }
  }, [actualFlights, quarter]);


  const [actualTrend, setActualTrend] = useState([]);
  // the actual accumulated progress line
  // console.log("actualTrend", actualTrend);

  const generateActualTrend = (actualMonthly) => {
    var trendbyQuarter = actualMonthly.map((elem, index) =>
      actualMonthly.slice(0, index + 1).reduce((a, b) => Math.floor(a + b))
    );
    return trendbyQuarter;
  };
  const actualTrendByQuarter = useMemo(
    () => generateActualTrend(actualMonthly),
    [actualMonthly]
  );

  //   var trendbyQuarter = actualMonthly.map((elem, index) =>
  //     actualMonthly.slice(0, index + 1).reduce((a, b) => Math.floor(a + b))
  //   );
  //   setActualTrend(trendbyQuarter.slice(0, quarter * 3));

  useEffect(() => {
    // displaying the actual trend based on what quarter is chosen
    if (quarter !== 5) {
      setActualTrend(actualTrendByQuarter.slice(0, quarter * 3));
    }
  }, [actualMonthly, quarter]);

  const changeDottedTrend = () => {
    var remainingPlanned = [];
    var startFrom = 0;
    var arr;
    //console.log("actualTrend", actualTrend);

    if (quarter === 0) {
      remainingPlanned = [];
    }

    if (quarter === 1) {
      startFrom = actualTrend[2];
      if (startFrom === undefined) {
        return;
      }

      remainingPlanned = plannedMonthly.slice(-9);

      remainingPlanned = remainingPlanned.map((elem, index) =>
        remainingPlanned
          .slice(0, index + 1)
          .reduce((a, b) => Math.floor(a + b), startFrom)
      );

      arr = new Array(3).fill(null);
      arr[2] = startFrom;

      remainingPlanned = arr.concat(remainingPlanned);
    }
    if (quarter === 2) {
      startFrom = actualTrend[5];

      if (startFrom === undefined) {
        return;
      }
      remainingPlanned = plannedMonthly.slice(-6);
      remainingPlanned = remainingPlanned.map((elem, index) =>
        remainingPlanned
          .slice(0, index + 1)
          .reduce((a, b) => Math.floor(a + b), startFrom)
      );

      arr = new Array(6).fill(null);
      arr[5] = startFrom;

      remainingPlanned = arr.concat(remainingPlanned);
    }
    if (quarter === 3) {
      startFrom = actualTrend[8];

      if (startFrom === undefined) {
        return;
      }
      remainingPlanned = plannedMonthly.slice(-3);

      remainingPlanned = remainingPlanned.map((elem, index) =>
        remainingPlanned
          .slice(0, index + 1)
          .reduce((a, b) => Math.floor(a + b), startFrom)
      );

      arr = new Array(9).fill(null);
      arr[8] = startFrom;

      remainingPlanned = arr.concat(remainingPlanned);
    }
    if (quarter === 4) {
      // remainingPlanned = plannedMonthly.slice();
      // startFrom = actualTrend[11];
    }
    if (quarter === 5) {
      // remainingPlanned = plannedMonthly.slice();
      // startFrom = actualTrend[11];
    }
    console.log("remainingPlanned", remainingPlanned);

    setDottedProgress(remainingPlanned);
  };
  useEffect(() => {
    //used to set a dotted line with the planned trips progression from the actual progress
    changeDottedTrend();
  }, [plannedMonthly, quarter, actualTrend]);

  const [overShoot, setOverShoot] = useState(0);
  useEffect(() => {
    // console.log("over SHOOOT ___dottedProgress", dottedProgress);
    if (quarter !== 4) {
      if (dottedProgress[11] !== isNaN) {
        // console.log("overShoot _______",CO2eTotal - dottedProgress[11])
        setOverShoot(plannedTrend[11] - dottedProgress[11]);
      }
    }
    if (quarter === 4) {
      setOverShoot(plannedTrend[11] - actualTrend[11]);
    }
  }, [plannedTrend, actualTrend, dottedProgress]);
  var series = [
    {
      name: "Planned emissions",
      type: "column",
      data: plannedMonthly,
      color: "#0056F5",
    },
    {
      name: "Budget trend",
      type: "line",
      data: plannedTrend,
      color: "#85AFFF",
    },
    {
      name: "Actual emissions",
      type: "column",
      data: actualMonthly,
      color: "#C0357A",
    },

    {
      name: "Actual progress",
      type: "line",
      data: actualTrend,
      color: "#E08FB8",
    },
    {
      name: "Actual progress + Planned emissions forecast",
      type: "line",

      data: dottedProgress,

      color: "#87BC5E",
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
      animations: {
        speed: 1000,
        enabled: true,
      },
    },

    dataLabels: {
      enabled: false,
    },
    // colors: ["#0056F5", "#85AFFF", "#C0357A", "#E08FB8",],

    stroke: {
      width: [3, 5, 3, 5, 5],
      curve: "straight",
      dashArray: [0, 0, 0, 0, 9],
      lineCap: "square",
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
      },
    },
    xaxis: {
      categories: monthArray,
    },

    yaxis: [
      {
        seriesName: "Planned emissions",
        axisTicks: {
          show: true,
        },
        tickAmount: 10,
        min: 0,
        max: Math.round(actualCO2eTotal / 1000) * 1000 + 2000,
        axisBorder: {
          show: true,
        },
        title: {
          text: "CO2e kg",
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        show: true,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      offsetX: 0,
      showForNullSeries: false,
      showForZeroSeries: false,
    },
    annotations: {
      yaxis: [
        {
          y: CO2eTotalBuffer,
          borderColor: "#85AFFF",
          borderWidth: 2,
          label: {
            offsetY: 20,
            offsetX: -270,
            // opacity: 0.2,
            borderColor: "#85AFFF",

            // borderColor: "#c0c0c0",
            style: {
              fontSize: "14px",
              color: "#000",
              background: "rgba(133, 175, 255, 0.15)",
              padding: {
                // left: 5,
                // right: 5,
                // top: 5,
                // bottom: 5,
              },
            },
            text: `Planned Carbon Budget: ${CO2eTotalBuffer}`,
          },
        },
        quarter !== 0 && {
          y: quarter !== 5 ? actualTrend[quarter * 3 - 1] : actualTrend[11],
          borderColor: "#E08FB8",
          borderWidth: 2,

          label: {
            offsetY: quarter < 4 ? 20 : -0,
            offsetX:
              quarter === 1 ? 0 : quarter === 2 ? 0 : quarter === 3 ? 0 : 0,
            borderColor: "#E08FB8",

            style: {
              fontSize: "14px",
              color: "#000",
              background: "rgba(224, 143, 184, 0.15)",
              opacity: 0.2,

              padding: {
                // left: 5,
                // right: 5,
                // top: 5,
                // bottom: 5,
              },
            },

            text: `Actual progress by Q${quarter}:  ${actualTrend[quarter * 3 - 1]
              }`,

            // text: `Actual progress by Q${quarter}:  ${
            //   actualTrend[quarter * 3 - 1]
            // } `,
          },
        },

        quarter !== 4 &&
        quarter !== 0 && {
          y: dottedProgress[11],
          borderColor: "#87BC5E",
          borderWidth: 2,
          label: {
            offsetY: 20,
            offsetX: 0,

            borderColor: "#87BC5E",
            style: {
              fontSize: "14px",
              color: "#000",
              background: "rgba(135, 188, 94, 0.15)",
              padding: {
                // left: 5,
                // right: 5,
                // top: 5,
                // bottom: 5,
              },
            },
            text: `Actual + Planned Forecast: ${dottedProgress[11]}`,
          },
        },
        quarter === 4 &&
        overShoot < 0 && {
          y: plannedTrend[11],
          y2: actualTrend[11],
          // borderColor: "rgba(242, 85, 85)",
          fillColor: "rgba(242, 85, 85)",
          opacity: 0.2,
          borderWidth: 2,

          label: {
            offsetY: 20,
            offsetX: -200,
            border: 0,
            style: {
              fontSize: "14px",
              color: "#000",
              background: "rgba(242, 85, 85,0.05)",
              border: 0,
              opacity: 0.2,

              padding: {
                // left: 5,
                // right: 5,
                // top: 5,
                // bottom: 5,
              },
            },

            text: `Budget overshoot: ${Math.abs(
              plannedTrend[11] - actualTrend[11]
            )} `,

            // text: `Actual progress by Q${quarter}:  ${
            //   actualTrend[quarter * 3 - 1]
            // } `,
          },
        },
      ],
    },
  };


  function getQuarter(echo) {
    var date = new Date(echo);
    var quarter = Math.floor(date.getMonth() / 3 + 1);
    // if (quarter === q) {
    //   // console.log()
    //   // console.log("same month:", quarter);
    // }
    return parseInt(quarter);
  }
  const completedFlights = () => {
    var completed = 0
    actualFlights.forEach(f => {
      if (getQuarter(f.echoTimeDate) <= quarter) { completed += 1 }
    })
    return completed
  }
  return (
    <Container className="component-container">

      <Row
        style={{
          borderBottom: "2px solid #c6c6c6",
          marginBottom: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Col md={10}>
          <h5 className="component-title">
            Progress 2022 budget{" "}
            {quarter !== 0 && (
              <span style={{ color: "#c9c9c9" }}>
                : displaying <Chip label={`Q${quarter}`} color="primary" />
              </span>
            )}
          </h5>
        </Col>
        <Col md={"auto"}>
          <InformationTooltip buttonText={"Info"}>
            <Container style={{ padding: "1rem", borderRadius: "4px" }}>
              <Row
                style={
                  {
                    // borderBottom: "2px solid #c6c6c6",
                    // marginBottom: "1rem",
                    // justifyContent: "space-between",
                  }
                }
              >
                <Col md={"auto"}>
                  <h5 className="component-title">Chart information</h5>
                </Col>
              </Row>
              <Stack style={{ fontSize: "14px" }}>
                <span style={{ borderBottom: "1px solid #c6c6c6" }}>Bars</span>
                <Col style={{ marginBottom: "10px" }}>
                  <span className="spanBox1"> """</span>{" "}
                  <span style={{ fontWeight: "bolder" }}>
                    Planned emissions
                  </span>
                  <span>
                    {" "}
                    - Monthly emissions based on budgeted flights{" "}
                  </span>
                </Col>
                <Col style={{ marginBottom: "10px" }}>
                  <span className="spanBox3"> """</span>{" "}
                  <span style={{ fontWeight: "bolder" }}>Actual emissions</span>
                  <span>
                    {" "}
                    - Monthly emissions from completed budgeted and unbudgeted
                    flights
                  </span>
                </Col>

                <span style={{ borderBottom: "1px solid #c6c6c6" }}>Lines</span>
                <Col style={{ marginBottom: "10px" }}>
                  <span className="spanBox2"> """</span>{" "}
                  <span style={{ fontWeight: "bolder" }}>Budget trend</span>
                  <span>
                    {" "}
                    - The planned budget as a trend line over the full year
                  </span>
                </Col>
                <Col style={{ marginBottom: "10px" }}>
                  <span className="spanBox4"> """</span>{" "}
                  <span style={{ fontWeight: "bolder" }}>Actual progress</span>
                  <span>
                    {" "}
                    - Aggregated emissions from budgeted and unbudgeted flights
                  </span>
                </Col>
                <Col style={{ marginBottom: "10px" }}>
                  <span className="spanBox5"> """</span>{" "}
                  <span style={{ fontWeight: "bolder" }}>
                    Actual progress + Planned emissions forecast
                  </span>
                  <span>
                    {" "}
                    - Forecast of total emissions by end of year, this is based
                    on the current actual progress and the planned trips for the
                    remaining months
                  </span>
                </Col>
              </Stack>
            </Container>
          </InformationTooltip>
        </Col>
      </Row>

      <Row style={{ justifyContent: "center" }}>
        <Col md={"auto"}>
          <PopUpAlert
            quarter={quarter}
            overShoot={overShoot}
            CO2eTotal={CO2eTotalBuffer}
            forecast={dottedProgress[11]}
            actualTrend={actualTrend[11]}
          />
        </Col>

      </Row>
      <Row>
        {quarter > 0 && <Col>
          <Alert
            style={{
              cursor: "pointer",
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px",
            }}
            severity="info"
          >
            {" "}
            <AlertTitle sx={{ fontWeight: "bolder" }}>
              Progress
            </AlertTitle>
            <>
              Completed flights by Q{quarter}: (<b>{completedFlights()}</b>)
              <br />
              {/*               
              <br /> Accumulatively calculated to <b>{CO2eTotal}</b> CO2e
              (kg), with a buffer of <b>{bufferState}</b>% = <b>
                {Math.floor((CO2eTotal * bufferState) / 100)} </b> CO2e (kg)
              <br />
              Total Carbon Budget Proposal = <b>{CO2eTotal}</b> +{" "}
              <b>{Math.floor((CO2eTotal * bufferState) / 100)}</b> ={" "}
              <b>
                {CO2eTotal +
                  Math.floor((CO2eTotal * bufferState) / 100)}
              </b>{" "} */}
              Budget : <b>{actualTrend[quarter * 3 - 1]}</b> / <b>{CO2eTotalBuffer}</b> CO2e (kg)
            </>
          </Alert>
        </Col>}

      </Row>
      {flights.length > 0 ? (
        <Chart
          options={options}
          series={series}
          type="bar"
          height={500}
          width={"100%"}
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
