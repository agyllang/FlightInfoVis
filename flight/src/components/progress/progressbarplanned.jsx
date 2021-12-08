import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import ProgressBarMonth from "./progressbarmonth";
import DataCard from "../cards/datacard";

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

const ProgressBarPlanned = ({ ...props }) => {
  const {
    calendar,
    calendarSection,
    selectedCO2sum,
    totalyearCO2,
    currentYear,
    budget,
    currentMonth,
  } = props;

  var backgroundArr;
  backgroundArr = backgroundColorFunction(12);
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

  // To display colors for the monthly bars

  useEffect(() => {
    //  To calculate the planned flights emissions
    var sumPlannedCO2 = 0;

    calendarSection &&
      calendarSection.forEach((eachMonth) => {
        var monthKey = Object.keys(eachMonth)[0];
        if (eachMonth[monthKey].length > 0) {
          eachMonth[monthKey].forEach((trip) => {
            sumPlannedCO2 += parseInt(trip.CO2);
          });
        }
      });
    console.log("sumPlannedCO2", sumPlannedCO2);
    setCO2planned(sumPlannedCO2);
    // data.forEach((trip) => {
    //   // console.log("trip", trip.CO2);
    //   // console.log("trip CO2", parseInt(trip.CO2));
    //   setAccumulatedCO2(
    //     (prevState) => parseInt(prevState) + parseInt(trip.CO2)
    //   );
    // });
    // return () => {
    //   setAccumulatedCO2(0)
    // }
  }, [calendarSection]);

  //To calculate whats left from budget
  useEffect(() => {
    setCO2balance(parseInt(budget - selectedCO2sum));
    // setCO2balance(parseInt(totalyearCO2 - selectedCO2sum));
  }, [selectedCO2sum, totalyearCO2, currentYear, budget]);

  return (
    <>
    <Row>
      <ProgressBar style={{ padding: 0, height: "50px" }}>
        {/* To fill up the bar with already consumed CO2 */}
        <ProgressBar
          now={totalyearCO2 && selectedCO2sum}
          style={{ backgroundColor: "rgb(155,155,155)" }}
          // label={`${selectedCO2sum} selectedCO2sum`}
        />

        {calendarSection.length > 0 &&
          calendarSection.map((monthObj, index) => {
            return (
              <ProgressBarMonth
                animated
                key={index}
                min={0}
                data={Object.values(monthObj)[0]}
                month={Object.keys(monthObj)[0]}
                color={backgroundArr[index]}
                total={totalyearCO2}
              />
            );
          })}

        {/* To display what's left of the budget */}
        {CO2balance > 0 ? (
          <ProgressBar
            now={totalyearCO2 && CO2balance - CO2planned}
            style={{ backgroundColor: "rgb(155,155,155)" }}
            label={"Planned trips"}
            // {`${CO2balance} (${Math.round(
            //   (CO2balance / budget) * 100
            // )}%) left`}
          />
        ) : (
          // OVERSHOOT
          <ProgressBar
            animated
            now={-(CO2balance - CO2planned)}
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
    <DataCard
            // header={`Aggregated emissions by ${currentMonthIndex? returnMonth(currentMonthIndex) : "-"}  `}
            header={`${
              currentMonth !== undefined
                ? `Emissions from ${currentMonth} and upcoming `
                : ""
            }  `}
            dataToPresent={CO2planned}
            dataUnitSymbol={"CO2e/kg"}
            // description={`CO2 emitted so far}, ${currentYear}`}
          />
    </>
  );
};

export default ProgressBarPlanned;
