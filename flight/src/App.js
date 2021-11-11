import React, { useState, useEffect } from "react";

import data from "./data";
import Employees from "./components/employees/Employees";
// console.log("data",data)

function App() {
  const [stateData, setStateData] = useState([]);

  const sortFlightsByPerson = (array) => {
    var newArray = [];
    var checkArray = [];

    array.forEach((trip) => {
      if (!checkArray.includes(trip.Kod)) {
        //

        // var addNewObject= {}

        // addNewObject.personId = trip.kod
        // addNewObject.travels = [trip]

        // newArray.push(addNewObject)
        newArray.push({
          personId: trip.Kod,
          hrData: {
            position: trip.Befattning,
            KTHschool: trip.Skola,
            KTHorg:trip.Org,
            KTHorgUnit: trip.Orgenhetnamn,
            bornYear: trip.Födelseår,
            gender: trip.Kön,
            salary: trip.Kön,
          },
          trips: [trip],
        });
        checkArray.push(trip.Kod);
      } else {
        var findPerson = newArray.find(
          (person) => person.personId === trip.Kod
        );
        findPerson.trips.push(trip);
      }
    });
    return newArray;
  };
  useEffect(() => {
    setStateData(sortFlightsByPerson(data));
  }, []);
  console.log("stateData", stateData);

  return (
    <div className="App">
      <Employees data={stateData} />
    </div>
  );
}

export default App;
