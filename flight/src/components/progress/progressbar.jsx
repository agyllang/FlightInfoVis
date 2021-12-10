import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import ProgressBarMonth from "./progressbarmonth";

function randomHsl(current, total, fade = "100%") {
  return "hsla(" + (current / total) * 360 + `,80%, 50% ,${fade})`;
  // return "hsla(" + Math.random() * 360 + ",75%, 75%, 1)";
}
const backgroundColorFunction = (number, fade) => {
  var backgroundColorArray = [];
  for (let i = 0; i < number; i++) {
    backgroundColorArray.push(randomHsl(i, number, fade));
  }
  return backgroundColorArray;
};

const ProgressBarYearly = ({ ...props }) => {
  const {
    plannedCalendar,
    calendarSection,
    selectedCO2sum,
    totalyearCO2,
    currentYear,
    budget,
  } = props;

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

  const [CO2balance, setCO2balance] = useState(0);
  const [CO2planned, setCO2planned] = useState(0);
  useEffect(() => {
    //  To calculate the planned flights emissions
    var sumPlannedCO2 = 0;

    plannedCalendar &&
      plannedCalendar.forEach((eachMonth) => {
        var monthKey = Object.keys(eachMonth)[0];
        if (eachMonth[monthKey].length > 0) {
          eachMonth[monthKey].forEach((trip) => {
            sumPlannedCO2 += parseInt(trip.CO2);
          });
        }
      });
    console.log("sumPlannedCO2", sumPlannedCO2);
    setCO2planned(sumPlannedCO2);
  }, [plannedCalendar]);

  // To display colors for the monthly bars
  var backgroundArr;
  backgroundArr = backgroundColorFunction(12, "100%");
  // To display colors for the monthly bars
  var backgroundArrPlanned;
  backgroundArrPlanned = backgroundColorFunction(12, "30%");

  //To calculate whats left from budget
  useEffect(() => {
    setCO2balance(parseInt(budget - selectedCO2sum));
    // setCO2balance(parseInt(totalyearCO2 - selectedCO2sum));
  }, [selectedCO2sum, totalyearCO2, currentYear, budget]);

  return (
    <Row>
      <ProgressBar style={{ padding: 0, height: "50px" }}>
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
        {plannedCalendar.length > 0 &&
          plannedCalendar.map((monthObj, index) => {
            return (
              <ProgressBarMonth
                // style={{borderTop:"2px dashed black",borderBottom:"2px dashed black",}}
                animated
                key={index}
                min={0}
                data={Object.values(monthObj)[0]}
                month={Object.keys(monthObj)[0]}
                color={backgroundArrPlanned[index]}
                total={totalyearCO2}
              />
            );
          })}

        {/* To display what's left of the budget */}
        {CO2balance > 0 ? (
          <ProgressBar
            now={totalyearCO2 && CO2balance}
            style={{ backgroundColor: "rgb(155,155,155)" }}
            label={`${CO2balance} (${Math.round(
              (CO2balance / budget) * 100
            )}%) left`}
          />
        ) : (
          // OVERSHOOT
          <ProgressBar
            // striped
            now={-CO2balance}
            style={{ backgroundColor: "rgb(0,0,0)" }}
            label={`overshoot ${CO2balance} (${Math.abs(
              Math.round((CO2balance / budget) * 100)
            )}%) `}
          />
        )}

        {/* {CO2balance < 0 && (
          <ProgressBar
            striped
            now={-CO2balance}
            style={{ backgroundColor: "rgb(0,0,0)" }}
          />
        )} */}
      </ProgressBar>
    </Row>
  );
};

export default ProgressBarYearly;
