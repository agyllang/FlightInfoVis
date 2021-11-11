import React, { useState, useEffect } from "react";
import Bar from "react-chartjs-2";

const Employee = ({ ...props }) => {
  const { person } = props;
  const [tripsData, setTripsData] = useState([])
  var tripsCO2total = 0;
//   var tripsData = [];
 console.log("Employee overview: ", person)

  person.trips.forEach((trip) => {
    // tripsData.push(parseInt(trip.CO2));
    // console.log("trip", trip);
    // if(trip.CO2===undefined)console.log("*________________________trip undefined")
    // console.log("trip.CO2", trip.CO2)
    tripsCO2total += parseInt(trip.CO2);
  });

//   console.log("trips", person.trips);
  // console.log("Employee props", props)
  return (
    <div>
      <span>Employee: </span>
      <span>{person.personId}</span>
      <span>Emissions total: {tripsCO2total}</span>
  
    </div>
  );
};

export default Employee;
