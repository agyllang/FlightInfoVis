import { createContext, useState } from "react";

export const FlightsContext = createContext();

const FlightsContextProvider = ({ ...props }) => {
  const [flights, setFlights] = useState([]);


 const addNewFlight = (flight) => {
    setFlights((prevState) => [...prevState, flight]);
  }

  return (
    // <FlightsContext.Provider value={{flights}}>
    <FlightsContext.Provider
      value={{ flights , addNewFlight}}
    >
      {props.children}
    </FlightsContext.Provider>
  );
};

export default FlightsContextProvider;
