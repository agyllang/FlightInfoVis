import React, { useState, useEffect } from "react";
import Bar from "react-chartjs-2";
import Flight from "../flights/Flight";
import { useParams } from "react-router-dom";
const EmployeeTest = ({ ...props }) => {
  const { data } = props;
  const [tripsData, setTripsData] = useState([]);
  const [person, setPerson] = useState();

  const [flight, setFlight] = useState();

  const params = useParams();

  useEffect(() => {
    var newPerson;
    newPerson = data.filter((person) => person.personId === params.personId)[0];
    console.log(newPerson);
    // console.log("params.personId", params.personId);
    newPerson && setPerson(newPerson);
    // Fetch single product here
  }, [params.personId]);

  useEffect(() => {
    return () => {
      //cleanup
      setFlight();
    };
  }, [params.personId]);

  var tripsCO2total = 0;
  // console.log("Employee overview: ", person);

  person &&
    person.trips.forEach((trip) => {
      // tripsData.push(parseInt(trip.CO2));
      // console.log("trip", trip);
      // if(trip.CO2===undefined)console.log("*________________________trip undefined")
      // console.log("trip.CO2", trip.CO2)
      tripsCO2total += parseInt(trip.CO2);
    });

  return (
    <div className="column flex-grow employee-card">
      <div className="employee-title">
        Employee: {person && person.personId}{" "}
      </div>
      <div className="row">
        <div className="align-items-flex-start column">
          <div className="employee-header-2">
            <div>Flights ({person&&person.trips.length}) </div>
            <div>CO2 total: {tripsCO2total} kg</div>
          </div>
          {person &&
            person.trips.map((trip) => {
              return (
                <div className="row ">
                  <div onClick={() => setFlight(trip)}>
                    {trip["Flygplatskodföravreseort"]} -{" "}
                    {trip["Flygplatskodfördestination"]}{" "}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="column">
          {person &&
            Object.entries(person.hrData).map(([key, value]) => {
              return (
                <span>
                  {" "}
                  {key}: {value}{" "}
                </span>
              );
            })}
        </div>
      </div>
      <div className="row flex-grow">
        {flight && <Flight flightData={flight} />}
      </div>
    </div>
  );
};

export default EmployeeTest;
