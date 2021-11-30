import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";

import VerticalBar from "./components/VerticalBar";
import { data18 } from "./JML_data2018";
import { data19 } from "./JML_data2019";
import Employees from "./components/employees/Employees";
import Overview from "./components/overview/Overview";
import Employee from "./components/employees/Employee";
import EmployeeTest from "./components/employees/EmployeeTEST";
import "bootstrap/dist/css/bootstrap.min.css";

// console.log("data",data)

function App() {
  const [stateData, setStateData] = useState([]);
  const [stateDataByDate, setStateDataByDate] = useState([]);
  const [toggle, setToggle] = useState([false]);

  const sortFlightsByDate = (array, datetype) => {
    //input "@datetype" is flight objects [property]
    return array.sort(
      (a, b) =>
        new Date(a[datetype]).getTime() - new Date(b[datetype]).getTime()
    );
  };
  // console.log("sortFlightsByDate")
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
    setStateData(sortFlightsByPerson(data19));
    setStateDataByDate(sortFlightsByDate(data18, "Transaktionsdatum/-tid"));
  }, []);
  console.log("stateData", stateData);
  console.log("sortFlightsByDate", stateDataByDate);

  return (
    <div className="App">
      <div className="sidebar">
        <NavLink
          activeClassName="navlink-active"
          className="navlink"
          to="/"
          key={"home"}
          end={true}
        >
          Home
        </NavLink>
        <NavLink
          activeClassName="navlink-active"
          className="navlink"
          to="/overview"
          key={"overview"}
        >
          Overview
        </NavLink>
        <div
          className="navlink-item"
          className={`navlink-item ${toggle ? "scroll" : "no-scroll"}`}
        >
          <div
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          >
            Employees
            <div
              className={`arrow ${toggle ? "up" : "down"}`}
              // style={{className: toggle? 'up':'down'}}
            />
          </div>

          <div className="column" style={{ display: toggle ? "flex" : "none" }}>
            {stateData &&
              stateData.map((employee) => {
                return (
                  <NavLink
                    to={`/employees/${employee.personId}`}
                    activeClassName="navlink-active"
                    className="navlink indent"
                    key={employee.personId}
                  >
                    {" "}
                    {employee.personId}
                  </NavLink>
                );
              })}
          </div>
        </div>
      </div>
      <div className="page-viewer">
        <Routes>
          <Route path="/" element={Dummy("Home")} />
          <Route
            path="/overview"
            element={<Overview data={stateDataByDate} />}
          />
          {/* <Route path="/employees" element={<Employees data={stateData} />}/> */}
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
      <VerticalBar
        values={[1, 2, 3, 4, 5, 6, 7]}
        labels={[1, 2, 3, 4, 5, 6, 7]}
      />
    </div>
  );
};
export default App;
