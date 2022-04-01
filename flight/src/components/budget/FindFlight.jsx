import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Spinner } from "react-bootstrap";
import Select from "react-select";
import RadioButton from "./RadioButton";
import SearchBar from "../search/SearchBar";
import FlightDetails from "./FlightDetails";
import PurposeOfTrip from "./PurposeOfTrip";
import MonthsPicker from "./MonthsPicker";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

// console.log("API_KEY_Qlimatic",API_KEY_Qlimatic)
const FindFlight = ({ ...props }) => {
  const {} = props;

  // Primary flight data fetch options
  const [airport1, setAirport1] = useState("");
  const [airport2, setAirport2] = useState("");

  // Used for multi city trips
  const [airport3, setAirport3] = useState("");
  const [airport4, setAirport4] = useState("");

  // Secondary flight data fetch  options
  const [oneWay, setOneWay] = useState(1);
  console.log("oneWay", oneWay);
  const [multiCity, setMultiCity] = useState(false);
  const [seatClass, setSeatClass] = useState("unknown");

  // Used for selecting seats
  const optionsSeat = [
    { value: "economy", label: "Economy Class" },
    { value: "business", label: "Business Class" },
    { value: "first", label: "First Class" },
    { value: "unknown", label: "Unknown" },
  ];
  const handleInputChangeSeat = (event) => {
    setSeatClass(event.value);
  };
  // Fetching data
  const [isLoading, setIsLoading] = useState(false);
  const [fetchMessage, setFetchMessage] = useState("");

  const [foundFlight, setFlight] = useState();

  //   useEffect(() => {
  //     //fetchFlightData(airport1,airport2,multicity,airport3,airport4,seatClass,1);
  //   }, []);

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
    setIsLoading(true);
    setFlight();
    if (
      airport1 === "" ||
      airport2 === "" ||
      (multiCity && (airport3 === "" || airport4 === ""))
    ) {
      setIsLoading(false);
      setFetchMessage("Please choose airports");
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

      console.log("legs", legs);

      var inputBody = JSON.stringify({
        legs: legs,
      });
      console.log("inputBody", inputBody);
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
          console.log("response", response);
          if (response.status === 200) {
            setFetchMessage("Result:");
            return response.json();
          }
          if (response.status === 404) {
            setFetchMessage(
              "No flights found between these airports. Try something else!"
            );
          }
          if (response.status === 400) {
            setFetchMessage(
              "No flights found, all input-fields has to be submitted!"
            );
          }
        })
        .then((data) => {
          if (multiCity) {
            setFlight({
              total: data.co2e,
              co2e_unit: data.co2e_unit,
              seatClass: seatClass,
              oneWay: oneWay,
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
              total: data.co2e,
              co2e_unit: data.co2e_unit,
              seatClass: seatClass,

              legs: [
                {
                  from: airport1,
                  to: airport2,
                  co2e: data.legs[0].co2e,
                },
              ],
            });
          }

          console.log("data", data);
        });
    }
  };
  return (
    <Container style={{ border: "2px solid black" }}>
      <Row className="page-header2">Plan a Flight</Row>
      <Row>
        {multiCity && <div>1.</div>}
        <Row>
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
            <div style={{ marginTop: "1rem" }}>2.</div>
            <Row>
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
            <RadioButton
              setNumberOfTrips={(no) => {
                setOneWay(no);
              }}
              setMultiCity={(multi) => {
                setMultiCity(multi);
              }}
            />
          </Col>

          <Col md={6}>
            <Select
              onChange={handleInputChangeSeat}
              placeholder={"Choose class"}
              // placeholder={seatClass ? seatClass : "Choose class"}
              options={optionsSeat}
              styles={""}
            />
          </Col>
        </Row>
        <Row>
          <MonthsPicker />
        </Row>
        <Row>
          <Button
            style={{ marginTop: "1rem" }}
            variant="primary"
            disabled={isLoading}
            onClick={handleButtonClick}
          >
            {isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            <span>{isLoading ? " Loading..." : " Estimate flight"}</span>
          </Button>{" "}
          {/* <Button variant={isLoading ?  : }> Estimate emissions</Button> */}
        </Row>
        <Row style={{ margin: "1rem" }}>{fetchMessage}</Row>
        <Row style={{ backgroundColor: "rgba(162, 245, 213, 0.55)" }}>
          <Row>
            {foundFlight && (
              <FlightDetails details={foundFlight} numberOfTrips={oneWay} />
            )}
          </Row>
          <Row>
            {foundFlight && (
              <>
                <Row style={{ marginTop: "1rem" }}>
                  {" "}
                  <PurposeOfTrip />
                </Row>

                <Row md={5} gap={2} style={{ marginTop: "1rem" }}>
                  <Button
                    variant="success"
                    // disabled={isLoading}
                    // onClick={handleButtonClick}
                  >
                    Assign to Employee
                  </Button>
                </Row>
              </>
            )}
          </Row>
        </Row>
      </Row>
    </Container>
  );
};

export default FindFlight;
