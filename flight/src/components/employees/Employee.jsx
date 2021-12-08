import React, { useState, useEffect } from "react";
// import Bar from "react-chartjs-2";
import Flight from "../flights/Flight";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
const Employee = ({ ...props }) => {
  const { data } = props;
  // const [tripsData, setTripsData] = useState([]);
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
  }, [data,params.personId]);

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
    // const newTimeFormat = (date) =>{
    //   var unixTimeStamp = new Date(date);
    // }
  return (
    <Container key={params.personId}>
      <Row className="page-title">Employee: {person && person.personId} </Row>
      <Row>
        <Col className="flight-list">
          <Row className="container-title">
            <div>
              Flights ({person && person.trips.length}) - total of{" "}
              {tripsCO2total} kg CO2
            </div>
          </Row>
          {person &&
            person.trips.map((trip) => {
              return (
                <Row
                  className="flight-list-item"
                  onClick={() => setFlight(trip)}
                >
                  <Col>
                    {trip["Flygplatskodföravreseort"]} -{" "}
                    {trip["Flygplatskodfördestination"]}{" "}
                  </Col>
                  <Col>
                    {Math.round(trip["CO2"])} kg 
                    
                  </Col>
                  <Col>
                    {trip["Avresedatum/-tid"]}
                   
                  </Col>
                </Row>
              );
            })}
        </Col>
        <Col className="column">
          {person &&
            Object.entries(person.hrData).map(([key, value]) => {
              return (
                <span>
                  {" "}
                  {key}: {value}{" "}
                </span>
              );
            })}
        </Col>
      </Row>
      <Row>
        {flight && <Flight flightData={flight} />}
      </Row>
    </Container>
  );
};

export default Employee;
