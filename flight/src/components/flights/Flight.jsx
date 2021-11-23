import React from "react";
import MapChart from "../map/FlightMap";

const Flight = ({ ...props }) => {
  const { flightData } = props;
  return (
    <>
      {/* <div className="flight-container align-items-flex-start row"> */}
      <div className="flight-details column">
        <div>
          <b>
            {flightData["Flygplatskodföravreseort"]} -{" "}
            {flightData["Flygplatskodfördestination"]} :
            <div>{flightData["Slutdatum/-tidförresan"]}</div>
          </b>
        </div>
        <div className="column ticket-info">
          <div>Date: {flightData["Slutdatum/-tidförresan"]}</div>
          <div>Emission: {Math.round(flightData["CO2"])} kg CO2</div>
          <div>Distance: {Math.round(flightData["Dist"])} km</div>

          <div>
            Price: {Math.round(flightData["Faktiskbiljettbelopp(kr)"])} kr
          </div>
          <div>Airline: {flightData["Utfärdadbiljettflygbolag"]}</div>
          <div>Travel class: {flightData["Utfärdadbiljettkabintyp"]}</div>
        </div>
      </div>
      <div className={"map-chart-container"}>
        <MapChart
          trips={[
            [
              flightData["Flygplatskodföravreseort"],
              flightData["Flygplatskodfördestination"],
            ],
          ]}
        />
      </div>
      {/* </div> */}
    </>
  );
};

export default Flight;
