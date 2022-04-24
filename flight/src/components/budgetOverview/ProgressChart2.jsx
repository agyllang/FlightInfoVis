import React, { useState, useEffect, useContext, useMemo } from "react";
import Chart from "react-apexcharts";
import { Row, Col, Container, Stack } from "react-bootstrap";
import { FlightsContext } from "../contexts/FlightsContext";
import { sortBy, getRandom } from "../utility/functions";
import Slider from "@mui/material/Slider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import InformationTooltip from "./InformationTooltip";
import Snackbar from "@mui/material/Snackbar";
import PopUpAlert from "./PopUpAlert";

const ProgressChart2 = ({ ...props }) => {
  const { flights, actualFlights, CO2eTotal } = useContext(FlightsContext);
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

  const [quarter, setQuarter] = useState(0);

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
      return Math.floor(CO2eTotal / 12) * (index + 1);
    });

    setPlannedTrend(straightLine);
  }, [CO2eTotal]);

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

    setActual(array12.slice(0, quarter * 3));
  }, [actualFlights, quarter]);

  // console.log("actualMonthly", actualMonthly);

  // const generateRandomData = (plannedMonthly) => {
  //   var randomFactor = [
  //     1.033373321767236, 1.6746459307550344, 0.7430802272803592,
  //     0.8276842023709565, 1.0359546054446984, 0.7057509503497508,
  //     1.5736249845755048, 0.8016678534716615, 1.4133420050357888,
  //     1.04862386697987, 1.1571902280020052, 1.2668687591296221,
  //   ];
  //   var randomizedData = plannedMonthly.map((each, index) => {
  //     return Math.floor(each * randomFactor[index]);
  //   });
  //   return randomizedData;
  // };

  // const actualDataRandomized = useMemo(
  //   () => generateRandomData(plannedMonthly),
  //   [plannedMonthly]
  // );
  // useEffect(() => {
  //   setActual(actualDataRandomized.slice(0, quarter * 3));
  // }, [quarter, plannedMonthly]);

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

    setActualTrend(actualTrendByQuarter.slice(0, quarter * 3));
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
    console.log("remainingPlanned", remainingPlanned);

    setDottedProgress(remainingPlanned);
  };
  useEffect(() => {
    //used to set a dotted line with the planned trips progression from the actual progress
    changeDottedTrend();
  }, [plannedMonthly, quarter, actualTrend]);

  var series = [
    {
      name: "Planned emissions",
      type: "column",
      data: plannedMonthly,
      color: "#0056F5",
    },
    {
      name: "Estimated budget trend",
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
      name: "Actual progress + planned trips forecast",
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
        max: Math.round(CO2eTotal / 1000) * 1000 + 5000,
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
          y: CO2eTotal,
          borderColor: "#85AFFF",
          borderWidth: 2,
          label: {
            offsetY: 20,
            offsetX: -270,
            opacity: 0.2,

            // borderColor: "#c0c0c0",
            style: {
              fontSize: "14px",
              color: "#000",
              background: "rgba(133, 175, 255, 0.23)",
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
        quarter !== 0 && {
          y: actualTrend[quarter * 3 - 1],
          borderColor: "#E08FB8",
          borderWidth: 2,

          label: {
            offsetY: quarter === 4 ? 70 : 20,
            offsetX:
              quarter === 1 ? 0 : quarter === 2 ? 0 : quarter === 3 ? 0 : 0,
            // offsetX: (100+ (quarter*-100)),
            // borderColor: "#E08FB8",
            style: {
              fontSize: "14px",
              color: "#000",
              background: "rgba(224, 143, 184, 0.23)",
              opacity: 0.2,

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
        quarter !== 4 &&
          quarter !== 0 && {
            y: dottedProgress[11],
            borderColor: "#87BC5E",
            borderWidth: 2,
            label: {
              offsetY: 20,
              offsetX: 0,

              // borderColor: "#c0c0c0",
              style: {
                fontSize: "14px",
                color: "#000",
                background: "rgba(135, 188, 94, 0.23)",
                padding: {
                  left: 5,
                  right: 5,
                  top: 5,
                  bottom: 5,
                },
              },
              text: `Actual + Planned Forecast: ${dottedProgress[11]}`,
            },
          },
      ],
    },
  };

  const handleChange = (event, newValue) => {
    setQuarter(parseInt(newValue));
  };
  const quarterScale = [
    { label: "Start", value: 0 },
    { label: "Q1", value: 1 },
    { label: "Q2", value: 2 },
    { label: "Q3", value: 3 },
    { label: "Q4", value: 4 },
  ];

  const [overShoot, setOverShoot] = useState(0);
  useEffect(() => {
    // console.log("over SHOOOT ___dottedProgress", dottedProgress);
    if (quarter !== 4) {
      if (dottedProgress[11] !== isNaN) {
        // console.log("overShoot _______",CO2eTotal - dottedProgress[11])
        setOverShoot(CO2eTotal - dottedProgress[11]);
      }
    }
    if (quarter === 4) {
      setOverShoot(CO2eTotal - actualTrend[11]);
    }
  }, [plannedTrend, dottedProgress]);


  return (
    <Container className="component-container">
      <Row
        style={{
          borderBottom: "2px solid #c6c6c6",
          marginBottom: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Col md={"auto"}>
          <h5 className="component-title">Progress of 2022 budget</h5>
        </Col>
        <Col md={"auto"}>
          <InformationTooltip buttonText={"Information"}>
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
              <Stack>
                <Col style={{ marginBottom: "10px" }}>
                  <span className="spanBox1"> """</span>{" "}
                  <span style={{ fontWeight: "bolder" }}>
                    Planned emissions
                  </span>
                  <span>
                    - Monthly emissions based on flights from the planned budget{" "}
                  </span>
                </Col>

                <Col style={{ marginBottom: "10px" }}>
                  <span className="spanBox2"> """</span>{" "}
                  <span style={{ fontWeight: "bolder" }}>
                    Estimated budget trend
                  </span>
                  <span>
                    - The planned budget as a trend line over the full year
                  </span>
                </Col>
                <Col style={{ marginBottom: "10px" }}>
                  <span className="spanBox3"> """</span>{" "}
                  <span style={{ fontWeight: "bolder" }}>Actual emissions</span>
                  <span>
                    - Emissions from conducted planned and unplanned flights
                  </span>
                </Col>
                <Col style={{ marginBottom: "10px" }}>
                  <span className="spanBox4"> """</span>{" "}
                  <span style={{ fontWeight: "bolder" }}>Actual progress</span>
                  <span>
                    - Accumulated emissions from planned and unplanned flights
                  </span>
                </Col>
                <Col style={{ marginBottom: "10px" }}>
                  <span className="spanBox5"> """</span>{" "}
                  <span style={{ fontWeight: "bolder" }}>
                    Actual progress + planned trips forecast
                  </span>
                  <span>
                    - Forecast total emissions by end of year, this is based on
                    the current actual progress and the planned trips for the
                    upcomming months
                  </span>
                </Col>
              </Stack>
            </Container>
          </InformationTooltip>
        </Col>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <Col md={"auto"}>
          Display actual emissions by quarters
          <Slider
            aria-label="Display quarters"
            defaultValue={0}
            //getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks={quarterScale}
            min={0}
            max={4}
            onChange={handleChange}
            value={quarter}
          />
        </Col>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <Col md={"auto"}>
          <PopUpAlert quarter={quarter} overShoot={overShoot} CO2eTotal={CO2eTotal} forecast={dottedProgress[11]} actualTrend={actualTrend[11]}  />
          {/* <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              <AlertTitle>Q{quarter} follow-up</AlertTitle>
              Actual emissions and planned trips forecast will result in budget
              overshoot
              <b> </b>
            </Alert> */}

            {/* 
          {overShoot < 0 && quarter !== 4 && (
            <Alert severity="warning">
              <AlertTitle>Q{quarter} follow-up (Warning)</AlertTitle>
              Actual emissions and planned trips forecast will result in budget
              overshoot
              <b>
                {" "}
                {<br />} {CO2eTotal} - {dottedProgress[11]} ={" "}
                {CO2eTotal - dottedProgress[11]} CO2e kg
              </b>
            </Alert>
          )}
          {overShoot > 0 && quarter !== 4 && (
            <Alert severity="info" icon={false}>
              <AlertTitle>Q{quarter} follow-up</AlertTitle>
              Actual emissions and planned trips forecast are within budget
              limits
            </Alert>
          )}
          {quarter === 4 && overShoot > 0 && (
            <Alert severity="success" icon={false}>
              <AlertTitle>Q{quarter} follow-up (Success)</AlertTitle>
              Budget was made, good job!
            </Alert>
          )}
          {quarter === 4 && overShoot < 0 && (
            <Alert severity="error">
              <AlertTitle> Q{quarter} follow-up (Overshoot)</AlertTitle>
              Budget was not made!
              <b>
                {" "}
                {<br />} {CO2eTotal} - {actualTrend[11]} ={" "}
                {CO2eTotal - actualTrend[11]} CO2e kg
              </b>
            </Alert>
          )} */}
          {/* </Snackbar> */}
        </Col>
      </Row>
      {flights.length > 0 ? (
        <Chart
          options={options}
          series={series}
          type="bar"
          height={500}
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

export default ProgressChart2;
