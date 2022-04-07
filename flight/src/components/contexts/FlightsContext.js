import { createContext, useEffect, useState } from "react";
import fakeFlights from "../../fakeData";
export const FlightsContext = createContext();

const FlightsContextProvider = ({ ...props }) => {
  const [flights, setFlights] = useState(fakeFlights);
  const [CO2eTotal, setCO2e] = useState(0);
  useEffect(() => {
    var sumCO2e = 0;
    flights.length > 0 &&
      flights.forEach((flight) => {
        sumCO2e += parseInt(flight.totalco2e);
      });
    setCO2e(sumCO2e);
  }, [flights]);

  const addNewFlight = (flight) => {
    setFlights((prevState) => [...prevState, flight]);
  };

  return (
    // <FlightsContext.Provider value={{flights}}>
    <FlightsContext.Provider value={{ flights, addNewFlight, CO2eTotal }}>
      {props.children}
    </FlightsContext.Provider>
  );
};

export default FlightsContextProvider;
