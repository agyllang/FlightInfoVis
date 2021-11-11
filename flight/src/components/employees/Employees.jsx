import React from "react";
import Employee from "./Employee";
import VerticalBar from "./VerticalBar";

const Employees = ({ ...props }) => {
  const { data } = props;
//   console.log("Employees props", props);
 
  return (
    <div>
      <span> Employees</span>
      {data.length > 0 &&
        data.map((person) => {
          return <Employee person={person} />;
        })}
        {/* <VerticalBar values={[1,2,3,4,5,6,7]} labels={[1,2,3,4,5,6,7]}/> */}
    </div>
  );
};

export default Employees;
