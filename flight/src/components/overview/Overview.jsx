import React, { useEffect, useState } from "react";
// import FlightMap from "../map/FlightMap";
import ProgressBarYearly from "../progress/progressbar";
import Select from "react-select";
import { Row, Col, Container,  } from "react-bootstrap";

// import VerticalBar from "./VerticalBar";

function isEmptyObj(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

const Overview = ({ ...props }) => {
  const { data, changeCurrentYear, currentYear } = props;
  // console.log("Overview @data:", data);
  // const [activeMonth, setActiveMonth] = useState()
  // console.log("activeMonth",activeMonth)
  const [calendar, setCalendar] = useState({});
  // console.log("YYYYYYYYYYYYY Overview Calendar: ", calendar);
  // console.log("YYYYYYYYYYYYY Overview Calendar true or false: ", isEmptyObj(calendar));
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
  // const addToCalendar = (month, item) => {
  //   console.log("XXXXXXXXXXXXX Overview addToCalendar");

  //   // setCalendar(prevState=> ({...prevState, ...prevState[month].push(item),
  //   //  } ))
  //   // setCalendar({...calendar[month]: [...calendar[month]: item]})
  //   // return arr
  // };
  useEffect(() => {
    //categorized all flights over the m
    var structureCalendar = {
      Jan: [],
      Feb: [],
      Mar: [],
      Apr: [],
      May: [],
      Jun: [],
      Jul: [],
      Aug: [],
      Sep: [],
      Okt: [],
      Nov: [],
      Dec: [],
    };
    data &&
      data.forEach((each) => {
        var date = new Date(each["Avresedatum/-tid"]);
        var m = date.getMonth();
        var month = returnMonth(m);
        // setCalendar((oldCalendar) => {...oldCalendar, ...oldCalendar[month].push(each)});
        structureCalendar[month].push(each);
        // addToCalendar(month, each)
      });
    setCalendar(structureCalendar);
    return () => {
      setCalendar({
        Jan: [],
        Feb: [],
        Mar: [],
        Apr: [],
        May: [],
        Jun: [],
        Jul: [],
        Aug: [],
        Sep: [],
        Okt: [],
        Nov: [],
        Dec: [],
      });
    };
  }, [data]);

  const optionsYear = [
    { value: 2018, label: 2018 },
    { value: 2019, label: 2019 },
  ];
  const optionsMonth = [
    { value: "Jan", label: "Jan" },
    { value: "Feb", label: "Feb" },
    { value: "Mar", label: "Mar" },
    { value: "Apr", label: "Apr" },
    { value: "May", label: "May" },
    { value: "Jun", label: "Jun" },
    { value: "Jul", label: "Jul" },
    { value: "Aug", label: "Aug" },
    { value: "Sep", label: "Sep" },
    { value: "Okt", label: "Okt" },
    { value: "Nov", label: "Nov" },
    { value: "Dec", label: "Dec" },
  ];
  const handleInputChange = (event) => {
    console.log("event:", event);
    changeCurrentYear(event.value);
  };
  // changeCurrentYear();

  return (
    <Container className="">
      <Row className="page-title">
        Overview
      </Row>
      <Col md={2}>
          <Select
            onChange={handleInputChange}
            placeholder={currentYear ? currentYear : "Choose year"}
            options={optionsYear}
            styles={""}
          />
        </Col>
      <div>Displaying data from year {currentYear} </div>

      {!isEmptyObj(calendar) && <ProgressBarYearly calendar={calendar} />}
    </Container>
  );
};

export default Overview;
