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
    
    const {calendar, activeMonth, setActiveMonth} = props
    // console.log("___ProgressBarYearly___ @calendar",calendar)
  
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
  const [totalCO2, setTotalCO2] = useState(0);

  var backgroundArr;

  backgroundArr = backgroundColorFunction(12);
//   console.log(backgroundArr);
//   console.log("state", state);
//   console.log("totalCO2", totalCO2);
  

useEffect(() => {
    var sumTotalCO2= 0
    months.forEach((month) => {
      // console.log("calendar[month]",month + ' :' + calendar[month])
      // console.log("calendar[month]", calendar[month])
      calendar[month].forEach((trip)=>{
        // console.log("trip",trip.CO2)
        sumTotalCO2 += trip.CO2
        // setTotalCO2(prevCO2=> parseInt(prevCO2) + parseInt(trip.CO2));
        // setCalendar(prevState=> ({...prevState, ...prevState[month].push(item),

        
      })
    });
    setTotalCO2(sumTotalCO2)
    // console.log("sumTOtal", sumTotal);

    // return () => {
    //  setTotalCO2(0);
    // };
  }, [calendar]);

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
  console.log("________________ProgressBarYearly @totalCO2:",totalCO2)
 
  return (
    <Row>
      <ProgressBar style={{padding:0}}>
      {/* <ProgressBar > */}
        {months.map((month, id) => {
          return (
            <ProgressBarMonth
            key={id}
            min={0}
            data={calendar[month]}
            month={month}
            color={backgroundArr[id]}
            // setActiveMonth={setActiveMonth}
            // activeMonth={activeMonth}

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
