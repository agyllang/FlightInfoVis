import React from "react";
import MapChart from "../map/FlightMap";

const Flight = ({ ...props }) => {
  const { flightData } = props;
  return (
    <>
      {/* <div className="flight-container align-items-flex-start row"> */}
      <div className="align-items-flex-start column">
        <div>
          {flightData["Flygplatskodföravreseort"]} -{" "}
          {flightData["Flygplatskodfördestination"]} :
          <div>{flightData["Slutdatum/-tidförresan"]}</div>
        </div>
        <div className="row">
          <div className="column ticket-info">
            <div>Date: {flightData["Slutdatum/-tidförresan"]}</div>
            <div>Emission: {Math.round(flightData["CO2"])} kg CO2</div>
            <div>Distance: {Math.round(flightData["Dist"])} km</div>
          </div>
          <div className="column align-items-flex-start ticket-info">
            <div>
              Price: {Math.round(flightData["Faktiskbiljettbelopp(kr)"])} kr
            </div>
            <div>Airline: {flightData["Utfärdadbiljettflygbolag"]}</div>
            <div>Travel class: {flightData["Utfärdadbiljettkabintyp"]}</div>
          </div>
        </div>
      </div>
      <MapChart
        trips={[
          [
            flightData["Flygplatskodföravreseort"],
            flightData["Flygplatskodfördestination"],
          ],
        ]}
      />
      {/* </div> */}
    </>
  );
};

export default Flight;
