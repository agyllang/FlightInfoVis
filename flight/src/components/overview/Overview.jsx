import React, { useEffect, useState } from "react";
import FlightMap from "../map/FlightMap";
import ProgressBarYearly from "../progress/progressbar";
// import VerticalBar from "./VerticalBar";

function isEmptyObj(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

const Overview = ({ ...props }) => {
  const { data } = props;
  console.log("Overview @data:", data);
  // const [activeMonth, setActiveMonth] = useState()
  // console.log("activeMonth",activeMonth)
  const [calendar, setCalendar] = useState({});
  console.log("YYYYYYYYYYYYY Overview Calendar: ", calendar);
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

  return (
    <div className="page">
      <div className="page-title"> Overview</div>
      {!isEmptyObj(calendar) && <ProgressBarYearly calendar={calendar} />}
    </div>
  );
};

export default Overview;
