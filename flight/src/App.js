import React, { useState } from "react";
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
  const [generateFlights, setGenerateFlights] = useState(false);
  const [budgetApproved, setBudgetApproved] = useState(false);

  return (
    <div className="App">
      <div className="sidebar-v">
        <NavLink
          className={(navData) =>
            navData.isActive ? "navlink-active" : "navlink"
          }
          // activeClassName="navlink-active"
          // className="navlink"
          to="/division"
          key={"division"}
          // end={true}
        >
          EMPLOYEES
        </NavLink>
        <NavLink
          className={(navData) =>
            navData.isActive ? "navlink-active" : "navlink"
          }
          // activeClassName="navlink-active"
          // className="navlink"
          to="/budget"
          key={"budget"}
          // end={true}
        >
          PLAN BUDGET
        </NavLink>
        <NavLink
          className={(navData) =>
            navData.isActive ? "navlink-active" : "navlink"
          }
          // activeClassName="navlink-active"
          // className="navlink"
          to="/budgetoverview"
          key={"budgetoverview"}
        >
          BUDGET OVERVIEW
        </NavLink>
        {/* <Button
          onClick={() => {
            setFakeData(!fakeData);
          }}
        >
          Simulate data{" "}
        </Button>{" "} */}

        <Button
          onClick={() => {
            setGenerateFlights(!generateFlights);
          }}
        >
          Generate flights{" "}
        </Button>
      </div>
      <EmployeesContextProvider fakeData={fakeData}>
        <FlightsContextProvider
          fakeData={fakeData}
          generateFlights={generateFlights}
        >
          <Routes>
            <Route path="/division" element={<Division />} />

            <Route
              path="/budget"
              element={
                <PlanBudget
                  setBudgetApproved={() => setBudgetApproved(true)}
                  budgetApproved={budgetApproved}
                />
              }
            />

            <Route
              path="/budgetoverview"
              element={<BudgetOverview budgetApproved={budgetApproved} />}
            />
          </Routes>
        </FlightsContextProvider>
      </EmployeesContextProvider>
    </div>
  );
}

export default App;
