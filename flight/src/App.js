import React, { useState, useMemo, useContext } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import EmployeesContextProvider from "./components/contexts/EmployeesContext";

// import { Row, Container } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PlanBudget from "./components/budget/PlanBudget";
import BudgetOverview from "./components/budgetOverview/BudgetOverview";
import FlightsContextProvider from "./components/contexts/FlightsContext";
import Division from "./components/budgetDivision/Division";
import { Button } from "@mui/material";

function App() {
  const [fakeData, setFakeData] = useState(false);
  return (
    <div className="App">
      <div className="sidebar-v">
        <NavLink
          activeClassName="navlink-active"
          className="navlink"
          to="/division"
          key={"division"}
          // end={true}
        >
          Division
        </NavLink>
        <NavLink
          activeClassName="navlink-active"
          className="navlink"
          to="/budget"
          key={"budget"}
          // end={true}
        >
          Plan budget
        </NavLink>
        <NavLink
          activeClassName="navlink-active"
          className="navlink"
          to="/budgetoverview"
          key={"budgetoverview"}
        >
          Budget Overview
        </NavLink>

        <Button
          onClick={() => {
            setFakeData(!fakeData);
          }}
        >
          Fake data{" "}
        </Button>
      </div>
      <EmployeesContextProvider fakeData={fakeData}>
        <FlightsContextProvider fakeData={fakeData}>
          <Routes>
            <Route path="/division" element={<Division />} />
            <Route path="/budget" element={<PlanBudget />} />
            <Route path="/budgetoverview" element={<BudgetOverview />} />
          </Routes>
        </FlightsContextProvider>
      </EmployeesContextProvider>
    </div>
  );
}

export default App;
// const sortFlightsByDate = (array, datetype) => {
//   //@array,
//   //@datetype, is an object property, where each flight is an object
//   return array.sort(
//     (a, b) =>
//       new Date(a[datetype]).getTime() - new Date(b[datetype]).getTime()
//   );
// };
// console.log("sortFlightsByDate")
// const sortFlightsByPerson = (array) => {
//   //@array, the dataset with all flights
//   //return: a new array with person objects, every person object has some HR-data,
//   // and trips - an array with all the trips for that person
//   //example:
//   //  var array=[person:{
//   //              someData..,
//   //              trips:[trip1,trip2..]}]

//   var newArray = [];
//   var checkArray = [];

//   array.forEach((trip) => {
//     if (!checkArray.includes(trip.Kod)) {
//       //

//       // var addNewObject= {}

//       // addNewObject.personId = trip.kod
//       // addNewObject.travels = [trip]

//       // newArray.push(addNewObject)
//       newArray.push({
//         personId: trip.Kod,
//         hrData: {
//           position: trip.Befattning,
//           KTHschool: trip.Skola,
//           KTHorg: trip.Org,
//           KTHorgUnit: trip.Orgenhetnamn,
//           bornYear: trip.Födelseår,
//           gender: trip.Kön,
//           salary: trip.Månadslön,
//         },
//         trips: [trip],
//       });
//       checkArray.push(trip.Kod);
//     } else {
//       var findPerson = newArray.find(
//         (person) => person.personId === trip.Kod
//       );
//       findPerson.trips.push(trip);
//     }
//   });
//   return newArray;
// };
