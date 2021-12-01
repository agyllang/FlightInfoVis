import React, { useState } from "react";
import EmployeeTest from "./EmployeeFirstDraft";
import VerticalBar from "../VerticalBar";

const Employees = ({ ...props }) => {
  const { data } = props;
  //   console.log("Employees props", props);
  const [currentEmployee, setCurrentEmployee] = useState();
  return (
    <div className="page">
      <div className="page-title"> Employees</div>
      <div className="row">
        <div className="employees-list">
          {data.length > 0 &&
            data.map((person, id) => {
              return (
                <div
                  key={id}
                  className={
                    currentEmployee?.personId === person.personId
                      ? "currentListItem"
                      : "passive"
                  }
                  onClick={() => {
                    setCurrentEmployee(person);
                  }}
                >
                  {person.personId}
                </div>
              );
            })}
        </div>
        {currentEmployee && <EmployeeTest person={currentEmployee} />}
      </div>
      {/* <VerticalBar values={[1,2,3,4,5,6,7]} labels={[1,2,3,4,5,6,7]}/> */}
    </div>
  );
};

export default Employees;
