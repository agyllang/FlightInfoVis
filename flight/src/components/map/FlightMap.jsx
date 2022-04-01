import React, { useState, useEffect } from "react";
import airports from "./airports2";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Line,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ ...props }) => {
  const { trips, mapProps } = props;

  console.log("MapChart trips", trips);

  const [tripState, setTripState] = useState([]);

  const airportDetails = (iata_code) => {
    // console.log("iata_code",iata_code)
    //parameter iata_code is a string like "ARN" that represents a certain airport
    //return airport details and sets long lat property used to display on the map
    var details = airports.filter((airport) => {
      return airport.iata_code === iata_code;
    });
    // console.log("details",details)

    details[0].lat = details[0].coordinates.split(",")[0];
    details[0].long = details[0].coordinates.split(", ")[1];

    return details[0];
  };

  // let tripstest = [
  //   ["ARN", "OSL"],
  //   ["ARN", "GLA"],
  // ];
  // var setAirports = tripstest.map((trip) => {
  //   return trip.map((airport) => airportDetails(airport));
  // });
  // console.log("setAirports", setAirports);

  useEffect(() => {
    var getAirportDetails = [];
    if (trips.length > 0) {
      getAirportDetails = trips.map((trip) => {
        return trip.map((airport) => airportDetails(airport));
      });
    }

    getAirportDetails.length > 0 && setTripState([...getAirportDetails]);
  }, [trips]);

  return (
    <ComposableMap
      projection="geoEqualEarth"
      projectionConfig={{
        // scale: 620,
        // center: [-40, 70],
      }}
    >
      <ZoomableGroup zoom={1}>
        <Graticule stroke="#DDD" />
        <Geographies
          geography={geoUrl}
          fill="#D6D6DA"
          stroke="#FFFFFF"
          strokeWidth={0.7}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {/* <Line
          coordinates={[
            [-74.006, 40.7128],
            [-33.006, 3.7128],
            [2.3522, 48.8566],
          ]}
          stroke="#FF5590"
          strokeWidth={4}
          strokeLinecap="round"
        /> */}
        {/* ARLANDA to MALMÖ */}
        {tripState.length > 0 &&
          tripState.map((trip) => {
            return (
              <Line
                from={[trip[0].long, trip[0].lat]}
                to={[trip[1].long, trip[1].lat]}
                //   coordinates={[
                //     [12.916663, 55.583331],
                //     [17.917829662,59.651164062],
                //   ]}
                //   [longitude,latitude]

                stroke="#FF5540"
                strokeWidth={1}
                strokeLinecap="round"
              />
            );
          })}
        {/* {tripState.length > 0 &&
          tripState.map((trip) => {
            return trip.map((airport) => {
              return (
                <Marker
                key={airport.name}
                coordinates={[airport.long, airport.lat]}
                >
                <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
                >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </g>
                <text
                textAnchor="middle"
                y={15}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                >
                {airport.name}
                </text>
                </Marker>
                );
            });
          })} */}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
