import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";

import VerticalBar from "./components/VerticalBar";
import data from "./data";
import Employees from "./components/employees/Employees";
import Overview from "./components/overview/Overview";
import Employee from "./components/employees/Employee";
import EmployeeTest from "./components/employees/EmployeeTEST";
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
            KTHorg: trip.Org,
            KTHorgUnit: trip.Orgenhetnamn,
            bornYear: trip.Födelseår,
            gender: trip.Kön,
            salary: trip.Månadslön,
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
      <div className="sidebar">
        <NavLink
          activeClassName="navlink-active"
          className="navlink"
          to="/"
          end={true}
        >
          Home
        </NavLink>
        <NavLink
          activeClassName="navlink-active"
          className="navlink"
          to="/overview"
        >
          Overview
        </NavLink>
        <NavLink
          activeClassName="navlink-active"
          className="navlink"
          to="/employees"
        >
          Employees
          <div className="column">
            {stateData &&
              stateData.map((employee) => {
                return (
                  <NavLink
                    to={`/employees/${employee.personId}`}
                    activeClassName="navlink-active"
                    className="navlink"
                  >
                    {" "}
                    {employee.personId}
                  </NavLink>
                );
              })}
          </div>
        </NavLink>
      </div>
      <div className="page-viewer">
        <Routes>
          <Route path="/" element={Dummy("Home")} />
          <Route path="/overview" element={<Overview />} />
          {/* <Route path="/employees" element={<Employees data={stateData} />}/> */}
          <Route path="/employees" element={<Employees data={stateData} />}>
            {/* {stateData &&
              stateData.map((employee) => {
                return (
                  <Route
                    path={`/employees/:${employee.personId}`}
                    element={
                      <Employee key={employee.personId} person={employee} />
                    }
                  />
                );
              })} */}
           
          </Route>
          <Route
              path={`/employees/:personId`}
              element={<EmployeeTest data={stateData} />}
            />
        </Routes>
      </div>
      {/* <Employees data={stateData} /> */}
    </div>
  );
}
const Dummy = (title) => {
  return (
    <div className="page">
      <div className="page-title"> {title} </div>
      <div className="row"></div>
      <VerticalBar
        values={[1, 2, 3, 4, 5, 6, 7]}
        labels={[1, 2, 3, 4, 5, 6, 7]}
      />
    </div>
  );
};
export default App;
