import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const ProgressBarMonth = ({ ...props }) => {
  const { month, data, color, total } = props;
  // console.log("ProgressBarMonth @data",data)
  // console.log("ProgressBarMonth @totalCO2Year",totalCO2Year)
  // console.log("progressBarMonth data:", data);
  const [accumulatedCO2, setAccumulatedCO2] = useState(0);
  useEffect(() => {
    data.length > 0 &&
    data.forEach((trip) => {
      // console.log("trip", trip.CO2);
      // console.log("trip CO2", parseInt(trip.CO2));
      setAccumulatedCO2(
        (prevState) => parseInt(prevState) + parseInt(trip.CO2)
      );
    });
    return () => {
      setAccumulatedCO2(0)
    }
  }, [data]);
 
  // console.log("accumulatedCO2", accumulatedCO2);
  // console.log("ProgressBarMonth month: ", month);
  return (
    <ProgressBar
      // onMouseOver={()=>{console.log("month hover",month)}}
      style={{ backgroundColor: color }}
      label={`${month} ${Math.round((accumulatedCO2/total)*100)}%`}
      {...props}
      now={accumulatedCO2}
    />
  );
};

export default ProgressBarMonth;
