import React from "react";
import FlightMap from "../map/FlightMap";
// import VerticalBar from "./VerticalBar";

const Overview = ({ ...props }) => {
  const { data } = props;
  //   console.log("Employees props", props);

  return (
    <div className="page">
      <div className="page-title"> Overview</div>
      <div>Progress bar?</div>
      <div className="row">
        <div>
          This month?
          <div
            style={{
              margin: "20px",

              height: "100px",
              width: "100px",
              backgroundColor: "#3d73df",
            }}
          ></div>
        </div>
        <div>
          Next month?
          <div
            style={{
              margin: "20px",

              height: "100px",
              width: "100px",
              backgroundColor: "#3d13df",
            }}
          ></div>
        </div>
        <div>
          This year?
          <div
            style={{
              margin: "20px",

              height: "100px",
              width: "100px",
              backgroundColor: "#37f3df",
            }}
          ></div>
        </div>
        
        <FlightMap
          trips={[
            ["ARN", "OSL"],
            ["ARN", "GLA"],
          ]}
        />
      </div>
      {/* <VerticalBar values={[1,2,3,4,5,6,7]} labels={[1,2,3,4,5,6,7]}/> */}
    </div>
  );
};

export default Overview;
