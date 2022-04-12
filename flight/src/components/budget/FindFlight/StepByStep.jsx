import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { EmployeesContext } from "../../contexts/EmployeesContext";
import { FlightsContext } from "../../contexts/FlightsContext";

// import Select from "react-select";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import RadioButtonGroup from "./RadioButton";
import SearchBar from "../../search/SearchBar";
import FlightDetails from "./FlightDetails";
import PurposeOfTrip from "./PurposeOfTrip";
import MonthsPicker from "./MonthsPicker";

import AssignToEmployee from "./AssignToEmployee";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const StepByStep = () => {
  const { employeesID, allResearchProjects, employees } =
    useContext(EmployeesContext);
  const { addNewFlight } = useContext(FlightsContext);

  const [flight, setFlight] = useState();
  console.log("StepByStep building Flight obj.:", flight);

  //   const [openContainer, setToggle] = useState(false);
  // Primary flight data fetch options
  const [airport1, setAirport1] = useState("");
  const [airport2, setAirport2] = useState("");

  // Used for multi city trips
  const [airport3, setAirport3] = useState("");
  const [airport4, setAirport4] = useState("");

  // Secondary flight data fetch  options
  const [oneWay, setOneWay] = useState(1);
  const [multiCity, setMultiCity] = useState(false);
  const [seatClass, setSeatClass] = useState("");

  // const [travelDate, setDate] = useState([{ month: "1", year: "2022", echoTime: 1646089200000  }]);
  const [travelDate, setDate] = useState(1640991600000);
  const [workDays, setWorkdays] = useState("");


  // Fetching data
  const [isLoading, setIsLoading] = useState(false);
  // const [fetchMessage, setFetchMessage] = useState("");
  // console.log("fetchMessage:")
  const setPurposeOfTrip = (prioValue, purpose) => {
    setFlight((prevState) => ({
      ...prevState,
      priority: prioValue,
      purpose: purpose,
    }));
  };

  const createFlightID = function () {
    var d = Date.now().toString();

    return "fID-" + d.slice(-4);
  };
  const setEmployeeToFlight = (ID, project) => {
    setFlight((prevState) => ({
      ...prevState,
      ID: ID,
      project: project,
      flightID: createFlightID(),
    }));
  };

  const resetAll = () => {
    setFlight();
    setAirport1("");
    setAirport2("");
    setAirport3("");
    setAirport4("");

    setDate(1640991600000);

    setOneWay(1);
    setMultiCity(false);
    setSeatClass("");
    setWorkdays("");
    // setToggle(!openContainer);
  };
  const handleAddFlight = () => {
    addNewFlight(flight);
    // resetAll();
  };

  const handleButtonClick = () => {
    fetchFlightData(
      airport1,
      airport2,
      multiCity,
      airport3,
      airport4,
      seatClass,
      1
    );
  };
  const fetchFlightData = (
    from,
    to,
    multiCity,
    from2,
    to2,
    seatClass = "economy",
    passengers = 1
  ) => {
    seatClass = seatClass === "" ? "economy" : seatClass;

    setIsLoading(true);
    setFlight();
    if (
      airport1 === "" ||
      airport2 === "" ||
      (multiCity && (airport3 === "" || airport4 === ""))
    ) {
      setIsLoading(false);
      // setFetchMessage("Please choose airports");
    } else {
      var legs = [];
      if (multiCity) {
        legs = [
          {
            from: from,
            to: to,
            passengers: passengers,
            class: seatClass,
          },
          {
            from: from2,
            to: to2,
            passengers: passengers,
            class: seatClass,
          },
        ];
      } else {
        legs = [
          {
            from: from,
            to: to,
            passengers: passengers,
            class: seatClass,
          },
        ];
      }

      // console.log("legs", legs);

      var inputBody = JSON.stringify({
        legs: legs,
      });
      // console.log("inputBody", inputBody);
      fetch("https://beta3.api.climatiq.io/travel/flights", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY_QLIMATIC} `,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: inputBody,
      })
        .then((response) => {
          setIsLoading(false);
          console.log("FindFlight response", response);
          if (response.status === 200) {
            // setFetchMessage("Result:");
            return response.json();
          }
          if (response.status === 404) {
            // setFetchMessage(
            //   "No flights found between these airports. Try something else!"
            // );
          }
          if (response.status === 400) {
            // setFetchMessage(
            //   "No flights found, all input-fields has to be submitted!"
            // );
          }
        })
        .then((data) => {
          if (multiCity) {
            setFlight({
              totalco2e: Math.floor(data.co2e) * oneWay,
              co2e: Math.floor(data.co2e),
              co2e_unit: data.co2e_unit,
              seatClass: seatClass,
              oneWay: oneWay,
              // travelDate: travelDate,
              echoTimeDate: travelDate,
              workDays: workDays,
              legs: [
                {
                  from: airport1,
                  to: airport2,
                  co2e: data.legs[0].co2e,
                },
                { from: airport3, to: airport4, co2e: data.legs[1].co2e },
              ],
            });
          } else {
            setFlight({
              totalco2e: Math.floor(data.co2e) * oneWay,
              co2e: Math.floor(data.co2e),
              co2e_unit: data.co2e_unit,
              seatClass: seatClass,
              oneWay: oneWay,
              // travelDate: travelDate,
              echoTimeDate: travelDate,

              workDays: workDays,

              legs: [
                {
                  from: airport1,
                  to: airport2,
                  co2e: data.legs[0].co2e,
                },
              ],
            });
          }
          handleNext();

          console.log("FindFlight, data from fetch:", data);
        });
    }
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container className="component-container">
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={"Plan trip"}>
          <StepLabel>{"Plan trip"}</StepLabel>
          <StepContent>
            <Row>
              {/* {multiCity && <div>1.</div>} */}
              <Col md={6}>
                <FlightTakeoffIcon />
                <label>From:</label>
                <SearchBar
                  placeholder={"Choose airport"}
                  select={(airport) => setAirport1(airport)}
                />
              </Col>
              <Col md={6}>
                <FlightLandIcon />
                <label>To:</label>
                <SearchBar
                  placeholder={"Choose airport"}
                  select={(airport) => setAirport2(airport)}
                />
              </Col>
            </Row>
            {multiCity && (
              <>
                {/* <div style={{ marginTop: "1rem" }}>2.</div> */}
                <Row style={{ marginTop: "1rem" }}>
                  <Col md={6}>
                    <FlightTakeoffIcon />

                    <label>From:</label>
                    <SearchBar
                      placeholder={"Choose airport"}
                      select={(airport) => setAirport3(airport)}
                    />
                  </Col>
                  <Col md={6}>
                    <FlightLandIcon />
                    <label>To:</label>
                    <SearchBar
                      placeholder={"Choose airport"}
                      select={(airport) => setAirport4(airport)}
                    />
                  </Col>
                </Row>
              </>
            )}
            <Row gap={2} style={{ marginTop: "2rem" }}>
              <Col md={6}>
                <RadioButtonGroup
                  setNumberOfTrips={(number) => {
                    setOneWay(number);
                  }}
                  setMultiCity={(multi) => {
                    setMultiCity(multi);
                  }}
                  multiCity={multiCity}
                />
              </Col>

              <Col md={6}>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Seat Class
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={seatClass}
                    label="Seat Class"
                    onChange={(event) => {
                      setSeatClass(event.target.value);
                    }}
                  >
                    {[
                      { value: "economy", label: "Economy Class" },
                      { value: "business", label: "Business Class" },
                      { value: "first", label: "First Class" },
                    ].map((seat, index) => {
                      return (
                        <MenuItem key={`seat-${index}`} value={seat.value}>
                          {seat.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
              </Col>
            </Row>

            <MonthsPicker
              setDate={(date) => {
                setDate(date);
              }}
              setWorkdays={(days) => setWorkdays(days)}
            />

            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  variant="contained"
                  onClick={handleButtonClick}
                  sx={{ mt: 1, mr: 1 }}
                  disabled={isLoading}
                >
                  {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                  Estimate trip
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>

        <Step key={"Emissions estimate"}>
          <StepLabel>{"Emissions estimate"}</StepLabel>
          <StepContent>
            {flight && (
              <FlightDetails details={flight} numberOfTrips={oneWay} />
            )}
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                  Continue
                </Button>
                <Button
                  //disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
        <Step key={"Assign trip"}>
          <StepLabel>{"Assign trip"}</StepLabel>
          <StepContent>
            {flight && (
              <>
                <PurposeOfTrip
                  setPurposeOfTrip={(prioVal, purpose) => {
                    setPurposeOfTrip(prioVal, purpose);
                  }}
                />

                <AssignToEmployee
                  allResearchProjects={allResearchProjects}
                  employeesID={employeesID}
                  setEmployeeToFlight={(ID, project) =>
                    setEmployeeToFlight(ID, project)
                  }
                  handleAddFlight={handleAddFlight}
                  employees={employees}
                  handleNext={handleNext}
                />
              </>
            )}
            <Box sx={{ mb: 2 }}>
              <div>
                {/* <Button
                  variant="contained"
                  style={{backgroundColor:"green"}}
                  onClick={ handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Assign
                </Button> */}
                <Button
                  //disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === 3 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Flight has been added to budget estimate</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Plan new trip
          </Button>
        </Paper>
      )}
    </Container>
  );
};
export default StepByStep;
