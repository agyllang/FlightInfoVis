import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { Row, Container } from "react-bootstrap";

import "./App.css";

import VerticalBar from "./components/VerticalBar";
import { data18 } from "./JML_data2018";
import { data19 } from "./JML_data2019";
// import Employees from "./components/employees/Employees";
import Overview from "./components/overview/Overview";
import Employee from "./components/employees/Employee";
import "bootstrap/dist/css/bootstrap.min.css";
import Comparisons from "./components/comparisons/comparisons";

// console.log("data",data)

function App() {
  const [stateData, setStateData] = useState([]);
  //@stateData, array - the entire data set for a certain year
  const [yearToPresent, setYear] = useState(2018);
  console.log(
    "____________________________________________yearToPresent",
    yearToPresent
  );
  //@yearToPresent, int - helps with selecting which dataset to use (local files imported - data18, data19)
  const [stateDataByDate, setStateDataByDate] = useState([]);
  //@stateDataByDate, array - dataset sorted by date, Jan 01->Dec 29
  const [toggle, setToggle] = useState(false);
  //@toggle, boolean - used for navbar

  const selectDataSet = (year) => {
    //@year, int
    //function to decide what data set to use
    switch (year) {
      case 2018:
        return data18;
      case 2019:
        return data19;
      default:
        return data18;
    }
  };
  const sortFlightsByDate = (array, datetype) => {
    //@array,
    //@datetype, is an object property, where each flight is an object
    return array.sort(
      (a, b) =>
        new Date(a[datetype]).getTime() - new Date(b[datetype]).getTime()
    );
  };
  // console.log("sortFlightsByDate")
  const sortFlightsByPerson = (array) => {
    //@array, the dataset with all flights
    //return: a new array with person objects, every person object has some HR-data,
    // and trips - an array with all the trips for that person
    //example:
    //  var array=[person:{
    //              someData..,
    //              trips:[trip1,trip2..]}]

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
    setStateData(sortFlightsByPerson(selectDataSet(18)));
    setStateDataByDate(
      sortFlightsByDate(selectDataSet(18), "Transaktionsdatum/-tid")
    );
  }, []);

  useEffect(() => {
    setStateData(sortFlightsByPerson(selectDataSet(yearToPresent)));
    setStateDataByDate(
      sortFlightsByDate(selectDataSet(yearToPresent), "Transaktionsdatum/-tid")
    );
  }, [yearToPresent]);
  // console.log("stateData", stateData);
  // console.log("sortFlightsByDate", stateDataByDate);
  // console.log("yearToPresent", yearToPresent);

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
        <NavLink
          activeClassName="navlink-active"
          className="navlink"
          to="/comparisons"
          key={"comparisons"}
        >
          Comparisons
        </NavLink>
        <div className={`navlink-item ${toggle ? "scroll" : "no-scroll"}`}>
          <div
            onClick={() => {
              setToggle((prev) => !prev);
            }}
            className="navlink"
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

      <Routes>
        <Route path="/" element={Dummy("Home")} />
        <Route
          path="/overview"
          element={
            <Overview
              currentYear={yearToPresent}
              changeCurrentYear={(year) => {
                setYear(year);
              }}
              dataCurrentYear={stateDataByDate}
              allData={[data18, data19]}
            />
          }
        />
        <Route
          path="/comparisons"
          element={
            <Comparisons
              currentYear={yearToPresent}
              changeCurrentYear={(year) => {
                setYear(year);
              }}
              dataCurrentYear={stateDataByDate}
              allData={[data18, data19]}
            />
          }
        />
        <Route
          path={`/employees/:personId`}
          element={<Employee data={stateData} />}
        />
      </Routes>
    </div>
  );
}
const Dummy = (title) => {
  return (
    <Container>
      <Row className="page-title"> {title} </Row>
      <VerticalBar
        values={[1, 2, 3, 4, 5, 6, 7]}
        labels={[1, 2, 3, 4, 5, 6, 7]}
      />
    </Container>
  );
};
export default App;
