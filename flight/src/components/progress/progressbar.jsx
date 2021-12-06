import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import ProgressBarMonth from "./progressbarmonth";

function randomHsl(current, total) {
  return "hsla(" + (current / total) * 360 + ",60%, 60%, 1)";
  // return "hsla(" + Math.random() * 360 + ",75%, 75%, 1)";
}
const backgroundColorFunction = (number) => {
  var backgroundColorArray = [];
  for (let i = 0; i < number; i++) {
    backgroundColorArray.push(randomHsl(i, number));
  }
  return backgroundColorArray;
};

const ProgressBarYearly = ({ ...props }) => {
  const { calendar, calendarSection, selectedCO2sum, totalyearCO2 } = props;
  // console.log("___ProgressBarYearly___ @calendar", calendar);
  // console.log("___ProgressBarYearly___ @calendarSection", calendarSection);
  console.log("___ProgressBarYearly___ props@totalyearCO2", totalyearCO2);

  // const [stateProgress, setStateProgress] = useState({});
  // console.log("stateProgress",stateProgress)
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
  // const [totalCO2Year, setTotalCO2Year] = useState(0);
  // const [currentCO2, setCurrentCO2] = useState(0);
  const [CO2balance, setCO2balance] = useState(0);

  // To display colors for the monthly bars
  var backgroundArr;
  backgroundArr = backgroundColorFunction(12);

  //To calculate whats left
  useEffect(() => {
    setCO2balance(parseInt(totalyearCO2 - selectedCO2sum));
  }, [selectedCO2sum, totalyearCO2]);

  // To calculate CO2 from current month
  // useEffect(() => {
  //   var sumTotalCO2Current = 0;
  //   calendarSection.length > 0 &&
  //     calendarSection.forEach((monthObj, index) => {
  //       var monthlyTrips = Object.values(monthObj)[0];
  //       monthlyTrips.length > 0 &&
  //         monthlyTrips.forEach((trip) => {
  //           sumTotalCO2Current += parseInt(trip.CO2);
  //         });
  //     });

  //   setCurrentCO2(sumTotalCO2Current);
  //   // console.log("sumTOtal", sumTotal);
  // }, [calendarSection]);

  //To calculate the total CO2 of the entire year year
  // useEffect(() => {
  //   var sumTotalCO2Year = 0;
  //   calendar.length > 0 &&
  //     months.forEach((month, index) => {
  //       // console.log("calendar[month]",month + ' :' + calendar[month])
  //       // console.log("calendar[month]", calendar[month])
  //       calendar[index][month].forEach((trip) => {
  //         // console.log("trip",trip.CO2)
  //         sumTotalCO2Year += parseInt(trip.CO2);
  //         // setTotalCO2Year(prevCO2=> parseInt(prevCO2) + parseInt(trip.CO2));
  //         // setCalendar(prevState=> ({...prevState, ...prevState[month].push(item),
  //       });
  //     });
  //   setTotalCO2Year(sumTotalCO2Year);
  //   // console.log("sumTOtal", sumTotal);

  //   // return () => {
  //   //  setTotalCO2(0);
  //   // };
  // }, [calendar]);

  // useEffect(() => {

  //   var yearByMonthCO2 = 0;
  //   months.forEach((month) => {
  //     // console.log("calendar[month]",month + ' :' + calendar[month])
  //     // console.log("calendar[month]", calendar[month])
  //     calendar[month].forEach((trip) => {
  //       // console.log("trip",trip.CO2)
  //       sumTotalCO2 += parseInt(trip.CO2);
  //       // setTotalCO2(prevCO2=> parseInt(prevCO2) + parseInt(trip.CO2));
  //       // setCalendar(prevState=> ({...prevState, ...prevState[month].push(item),
  //     });
  //   });
  //   setTotalCO2(sumTotalCO2);
  // console.log("sumTOtal", sumTotal);

  // return () => {
  //  setTotalCO2(0);
  // };
  // }, [calendar]);

  // useEffect(() => {
  //   months.forEach((month) => {
  //     // console.log("calendar[month]",month + ' :' + calendar[month])
  //     // console.log("calendar[month]", calendar[month])
  //     calendar[month].forEach((trip)=>{
  //       console.log("trip",trip.CO2)
  //       setTotalCO2(prevCO2=> prevCO2 + parseInt(trip.CO2));
  //       // setCalendar(prevState=> ({...prevState, ...prevState[month].push(item),

  //       setStateProgress(prevState=> ({...prevState, month:prevState.month+=trip.CO2} ));
  //     })
  //   });
  // console.log("sumTOtal", sumTotal);

  //   return () => {
  //     setTotalCO2(0);
  //   };
  // }, [calendar]);
  // console.log("________________ProgressBarYearly @totalCO2:", totalCO2);

  return (
    <Row>
      <ProgressBar style={{ padding: 0 }}>
        {calendarSection.length > 0 &&
          calendarSection.map((monthObj, index) => {
            return (
              <ProgressBarMonth
                key={index}
                min={0}
                data={Object.values(monthObj)[0]}
                month={Object.keys(monthObj)[0]}
                color={backgroundArr[index]}
                total={totalyearCO2}

              />
              // <ProgressBar
              //   key={id}
              //   min={0}
              //   max={totalCO2}
              //   now={stateProgress[month]}
              //   // label={`${each.month}  ${Math.round(each.CO2/totalCO2*100)}%`}
              //   //   variant={'success'}
              //   style={{ backgroundColor:  ` ${backgroundArr[id]}`}}
              // />
            );
          })}
        {/* TODO: whats left of the years budget */}
        <ProgressBar striped variant
          now={totalyearCO2 && CO2balance}
          style={{ backgroundColor: "rgb(155,155,155)" }}
          label={`${CO2balance} (${Math.round(
            (CO2balance / totalyearCO2) * 100
          )}%) left`}
        />
      </ProgressBar>
    </Row>
    // <ProgressBar max={500}>
    //   <ProgressBar
    //     style={{ backgroundColor: "rgb(255,0,0)" }}
    //     max={200}
    //     striped
    //     variant="success"
    //     now={100}
    //     label={"may"}
    //     key={1}
    //   />
    //   <ProgressBar
    //     style={{ backgroundColor: "rgb(255,0,0)" }}
    //     max={200}
    //     variant="warning"
    //     now={50}
    //     key={3}
    //     label={`${20}%`}
    //   />
    //   <ProgressBar
    //     max={200}
    //     style={{ backgroundColor: "rgb(255,0,0)" }}
    //     striped
    //     variant="danger"
    //     now={32}
    //     key={3}
    //   />
    //   <ProgressBar
    //     max={200}
    //     animated
    //     striped
    //     style={{ backgroundColor: "rgb(255,0,0)" }}
    //     label={"overdue"}
    //     now={50}
    //     key={100}
    //   />
    // </ProgressBar>
  );
};

export default ProgressBarYearly;
