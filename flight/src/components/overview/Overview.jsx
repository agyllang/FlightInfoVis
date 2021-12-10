import React, { useEffect, useState } from "react";
// import FlightMap from "../map/FlightMap";
import ProgressBarYearly from "../progress/progressbar";
import Select from "react-select";
import { Row, Col, Container } from "react-bootstrap";
import DataCard from "../cards/datacard";
// import ComparisonBar from "../bars/comparisonBar";
import TripListOverview from "../flights/TripListOverview";
// import ProgressBarPlanned from "../progress/progressbarplanned";
import DataCardProgress from "../cards/datacardProgress";
import DataCardPlanned from "../cards/datacardPlanned";

// const isEmptyObj = (obj) => {
//   return Object.keys(obj).length === 0 && obj.constructor === Object;
// };

const optionsYear = [
  { value: 2018, label: 2018 },
  { value: 2019, label: 2019 },
];
const optionsMonth = [
  { value: 0, label: "Jan" },
  { value: 1, label: "Feb" },
  { value: 2, label: "Mar" },
  { value: 3, label: "Apr" },
  { value: 4, label: "May" },
  { value: 5, label: "Jun" },
  { value: 6, label: "Jul" },
  { value: 7, label: "Aug" },
  { value: 8, label: "Sep" },
  { value: 9, label: "Okt" },
  { value: 10, label: "Nov" },
  { value: 11, label: "Dec" },
];

// Used to iterate over to get String value by index of a month,
//ex. [0="Jan",....,11="Dec"]
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec",
];

const categorizeFlightByMonth = (array) => {
  //
  var structureCalendar = [
    { Jan: [] },
    { Feb: [] },
    { Mar: [] },
    { Apr: [] },
    { May: [] },
    { Jun: [] },
    { Jul: [] },
    { Aug: [] },
    { Sep: [] },
    { Okt: [] },
    { Nov: [] },
    { Dec: [] },
  ];
  array.forEach((each) => {
    var date = new Date(each["Avresedatum/-tid"]);
    var monthIndex = date.getMonth();
    var monthKey = months[monthIndex];
    structureCalendar[monthIndex][monthKey].push(each);
  });
  return structureCalendar;
};

const plannedFlightByMonth = (array, currentMonthIndex) => {
  //fills the structureCalendar with all the trips that has been booked in upcoming months
  var structureCalendar = [
    { Jan: [] },
    { Feb: [] },
    { Mar: [] },
    { Apr: [] },
    { May: [] },
    { Jun: [] },
    { Jul: [] },
    { Aug: [] },
    { Sep: [] },
    { Okt: [] },
    { Nov: [] },
    { Dec: [] },
  ];
  array.forEach((each) => {
    var departureDate = new Date(each["Avresedatum/-tid"]);
    var departureMonthIndex = departureDate.getMonth();

    var bookingDate = new Date(each["Bokningsdatum"]);

    var bookingMonthIndex = bookingDate.getMonth();

    if (bookingMonthIndex === currentMonthIndex) {
      if (departureMonthIndex > currentMonthIndex) {
        // console.log("____________________________________");
        // console.log("bookingMonthIndex", bookingMonthIndex);
        // console.log("departureMonthIndex", departureMonthIndex);
        // console.log("currentMonthIndex", currentMonthIndex);
        // console.log("____________________________________");
        // console.log("each", each);
        var month = months[departureMonthIndex];
        structureCalendar[departureMonthIndex][month].push(each);
      }
    }
  });
  return structureCalendar;
};

const Overview = ({ ...props }) => {
  const { dataCurrentYear, changeCurrentYear, currentYear } = props;

  const [calendar, setCalendar] = useState([]);
  // @calendar, array - stores a years' trips, categorized in objects for every month.

  const [plannedCalendar, setPlanned] = useState([]);
  // @plannedCalendar, array - stores the planned trips, for upcomming months.

  const [currentMonthIndex, setMonth] = useState();
  // @currentMonthIndex, integer - used as an index to decide what the current month is (is unde)

  const [selectedCO2sum, setSelectedCO2sum] = useState(0);
  // @selectedCO2sum, integer - sums up the selected months CO2

  const [plannedCO2Sum, setPlannedCO2Sum] = useState(0);
  // @plannedCO2Sum, integer - sums up the planned months CO2

  const [totalCO2year, setTotalCO2year] = useState(0);
  // @totalCO2year, integer - total CO2 emissions that given year

  const [budget, setBudget] = useState(0);
  // @budget, integer - CO2 budget for current year

  // Changing the budget depending on the year
  useEffect(() => {
    currentYear === 2018 && setBudget(65000);
    // just some random numbers (as of now)

    currentYear === 2019 && setBudget(45000);
  }, [currentYear]);

  useEffect(() => {
    //Categorize and map all flights to a certain month based on when it was taking place ("Avresedatum/-tid")

    dataCurrentYear &&
      setCalendar(categorizeFlightByMonth(dataCurrentYear, currentYear));
  }, [dataCurrentYear, currentYear]);

  useEffect(() => {
    // Upcomming Planned/Booked flights
    currentMonthIndex !== undefined &&
      setPlanned(
        plannedFlightByMonth(dataCurrentYear, currentMonthIndex, currentYear)
      );
  }, [dataCurrentYear, currentMonthIndex, currentYear]);

  console.log("calendar", calendar);
  console.log("_________________________plannedCalendar", plannedCalendar);

  // Handling input selections
  const handleInputChangeYear = (event) => {
    // console.log("event:", event);
    changeCurrentYear(event.value);
  };
  const handleInputChangeMonth = (event) => {
    // console.log("event:", event);
    setMonth(event.value);
  };

  //To calculate the total CO2 emission of the entire year
  useEffect(() => {
    var sumTotalCO2Year = 0;
    calendar.length > 0 &&
      months.forEach((month, index) => {
        calendar[index][month].forEach((trip) => {
          // console.log("trip",trip.CO2)
          sumTotalCO2Year += parseInt(trip.CO2);
          // setTotalCO2Year(prevCO2=> parseInt(prevCO2) + parseInt(trip.CO2));
          // setCalendar(prevState=> ({...prevState, ...prevState[month].push(item),
        });
      });
    setTotalCO2year(sumTotalCO2Year);
  }, [calendar, currentYear]);

  // To accumulatively calculate the current calendar selections CO2 emission
  useEffect(() => {
    var selectedByMonth = [...calendar.slice(0, currentMonthIndex + 1)];
    var sumCO2 = 0;
    selectedByMonth.length > 0 &&
      selectedByMonth.forEach((monthObj, index) => {
        var monthlyTrips = Object.values(monthObj)[0];
        monthlyTrips.length > 0 &&
          monthlyTrips.forEach((trip) => {
            sumCO2 += parseInt(trip.CO2);
          });
      });

    setSelectedCO2sum(sumCO2);
  }, [calendar, currentMonthIndex]);

  useEffect(() => {
    var sumPlannedCO2 = 0;
    plannedCalendar
      .filter((monthObj) => Object.values(monthObj)[0].length > 0)
      .forEach((month) => {
        Object.values(month)[0].forEach((trip) => {
          sumPlannedCO2 += parseInt(trip.CO2);
        });
      });

    setPlannedCO2Sum(sumPlannedCO2);
  }, [plannedCalendar]);

  return (
    <Container gap={2} className="">
      <Row className="page-title">Overview</Row>
      <Row className="header-text-year">
        Displaying data from year
        <Col md={2}>
          <Select
            onChange={handleInputChangeYear}
            placeholder={currentYear ? currentYear : "Choose year"}
            options={optionsYear}
            styles={""}
          />
        </Col>
        in
        <Col md={2}>
          <Select
            onChange={handleInputChangeMonth}
            placeholder={
              currentMonthIndex
                ? optionsMonth[currentMonthIndex].value
                : "Choose month"
            }
            options={optionsMonth}
            styles={""}
          />
        </Col>
      </Row>
      {calendar.length > 0 && (
        <>
          <Row style={{ marginTop: "20px" }} />
          <Row>
            <DataCard>
              <div className="">
                Aggregated emissions by {months[currentMonthIndex]} :{" "}
                <span className="data-card-1">{selectedCO2sum}</span>/
                <span className="data-card-1">{budget}</span>
                <span className="symbol-text"> CO2e/kg</span>
              </div>
            </DataCard>
          </Row>
          <ProgressBarYearly
            calendarSection={calendar.slice(0, currentMonthIndex + 1)}
            plannedCalendar={plannedCalendar}
            selectedCO2sum={selectedCO2sum}
            totalyearCO2={totalCO2year}
            budget={budget}
          />
        </>
      )}
      {currentMonthIndex === 11 && (
        <DataCard>
          <div className="data-card">
            {`Total Emissions   ${currentYear}  `}{<br/>}
            <span className="data-card-1">{selectedCO2sum}</span>
            <span className="symbol-text"> CO2e/kg</span>
          </div>
        </DataCard>
      )}
     
      
      <Row>
        <Col>
          <div style={{ display: "flex" }}>
            <DataCardProgress
              key={"budget"}
              header={"CO2 Budget"}
              budget={budget}
              currentCO2={selectedCO2sum}
            />
            {selectedCO2sum > budget && (
              <DataCardProgress
                key={"overshoot"}
                header={"Overshoot"}
                isOvershoot={true}
                budget={budget}
                currentCO2={selectedCO2sum}
              />
            )}
          </div>
          {currentMonthIndex !== undefined && (
            <>
              <Col className="page-header2">
                {" "}
                Trips during {months[currentMonthIndex]}
              </Col>

              <TripListOverview
                tripsCurrentMonth={
                  calendar.slice(currentMonthIndex, currentMonthIndex + 1)[0][
                    months[currentMonthIndex]
                  ]
                }
              />
            </>
          )}
        </Col>
        <Col>
          <DataCardPlanned
            header={"Planned emissions"}
            budget={budget}
            currentCO2={plannedCO2Sum}
          />

          {currentMonthIndex !== undefined && (
            <>
              <Col className="page-header2">
                {" "}
                Future trips booked during {months[currentMonthIndex]}
              </Col>

              <TripListOverview plannedCalendar={plannedCalendar} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Overview;
