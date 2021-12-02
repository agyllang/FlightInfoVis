import React, { useEffect, useState } from "react";
// import FlightMap from "../map/FlightMap";
import ProgressBarYearly from "../progress/progressbar";
import Select from "react-select";
import { Row, Col, Container, Stack } from "react-bootstrap";
import DataCard from "../cards/datacard";
import ComparisonBar from "../bars/comparisonBar";

// import VerticalBar from "./VerticalBar";

const isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
const returnMonth = (index) => {
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
  return months[index];
};
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

const Overview = ({ ...props }) => {
  const { data, changeCurrentYear, currentYear, allData } = props;

  const [calendar, setCalendar] = useState([]);
  // @calendar, array - stores a years' trips, categorized in objects for every month.

  const [calendarSelection, setCalendarSelection] = useState([]);
  // @calendarSelection, array - stores a certain selection of the entire year

  const [currentMonthIndex, setMonth] = useState();
  // @currentMonthIndex, integer - used as an index to decide what the current month is

  const [selectedCO2sum, setSelectedCO2sum] = useState(0);
  // @selectedCO2sum, integer - sums up the selected months CO2

  const [totalCO2year, setTotalCO2year] = useState(0);
  // @totalCO2year, integer - total CO2 emissions that given year

  // console.log("YYYYYYYYYYYYY Overview Calendar: ", calendar);
  // console.log("YYYYYYYYYYYYY Overview Calendar true or false: ", isEmptyObj(calendar));

  // const addToCalendar = (month, item) => {
  //   console.log("XXXXXXXXXXXXX Overview addToCalendar");

  //   // setCalendar(prevState=> ({...prevState, ...prevState[month].push(item),
  //   //  } ))
  //   // setCalendar({...calendar[month]: [...calendar[month]: item]})
  //   // return arr
  // };
  const sumMonthsPerYear = (array) =>{
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
      var m = date.getMonth();
      var month = returnMonth(m);
      // setCalendar((oldCalendar) => {...oldCalendar, ...oldCalendar[month].push(each)});
      structureCalendar[m][month].push(each);
      // structureCalendar[month].push(each);
      // addToCalendar(month, each)
    });
  return structureCalendar;
  }
  useEffect(() => {
    //categorize and map all flights to a certain month based on when it was taking place ("Avresedatum/-tid")
    
    data && setCalendar(sumMonthsPerYear(data))
    // return () => {
    //   setCalendar({
    //     Jan: [],
    //     Feb: [],
    //     Mar: [],
    //     Apr: [],
    //     May: [],
    //     Jun: [],
    //     Jul: [],
    //     Aug: [],
    //     Sep: [],
    //     Okt: [],
    //     Nov: [],
    //     Dec: [],
    //   });
    // };
  }, [data]);

  console.log("calendar", calendar);
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
  const handleInputChangeYear = (event) => {
    // console.log("event:", event);
    changeCurrentYear(event.value);
  };
  const handleInputChangeMonth = (event) => {
    // console.log("event:", event);
    setMonth(event.value);
  };

  //To calculate the total CO2 of the entire year year
  useEffect(() => {
    var sumTotalCO2Year = 0;
    calendar.length > 0 &&
      months.forEach((month, index) => {
        // console.log("calendar[month]",month + ' :' + calendar[month])
        // console.log("calendar[month]", calendar[month])
        calendar[index][month].forEach((trip) => {
          // console.log("trip",trip.CO2)
          sumTotalCO2Year += parseInt(trip.CO2);
          // setTotalCO2Year(prevCO2=> parseInt(prevCO2) + parseInt(trip.CO2));
          // setCalendar(prevState=> ({...prevState, ...prevState[month].push(item),
        });
      });
    setTotalCO2year(sumTotalCO2Year);
    // console.log("sumTOtal", sumTotal);

    // return () => {
    //  setTotalCO2(0);
    // };
  }, [calendar]);

  // calendar selection based on month
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
    // console.log("sumTOtal", sumTotal);
  }, [currentYear, currentMonthIndex]);

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
              currentMonthIndex ? optionsMonth[currentMonthIndex].value : "Choose month"
            }
            options={optionsMonth}
            styles={""}
          />
        </Col>
      </Row>

      {calendar.length > 0 && (
        <ProgressBarYearly
          calendarSection={calendar.slice(0, currentMonthIndex + 1)}
          calendar={calendar}
          selectedCO2sum={selectedCO2sum}
          totalyearCO2={totalCO2year}
        />
      )}
      <Row style={{ marginTop: "10px" }}>
        <DataCard
          header={`Emitted ${currentYear}`}
          dataToPresent={selectedCO2sum}
          dataUnitSymbol={"CO2e/kg"}
          description={`CO2 emitted so far}, ${currentYear}`}
        />
        <DataCard
          header={`Total ${currentYear}`}
          dataToPresent={totalCO2year}
          dataUnitSymbol={"CO2e/kg"}
        />
      </Row>
      <Row>
        <ComparisonBar yearForData={[2018,2019]} allData={allData}/>
      </Row>
    </Container>
  );
};

export default Overview;
