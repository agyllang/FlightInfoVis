import { createContext, useEffect, useState, useContext } from "react";
import fakeFlights from "../../fakeData";
import { EmployeesContext } from "./EmployeesContext";
export const FlightsContext = createContext();

const FlightsContextProvider = ({ ...props }) => {
  const {allResearchProjects} = useContext(EmployeesContext);
  const [flights, setFlights] = useState(fakeFlights);
  const [CO2eTotal, setCO2e] = useState(0);
  const [projectFlights, setProjectFlights] = useState([]);
  console.log("FlightsContextProvider flights", flights);
  console.log("FlightsContextProvider projectFlights", projectFlights);
  useEffect(() => {
    var sumCO2e = 0;
    flights.length > 0 &&
      flights.forEach((flight) => {
        sumCO2e += parseInt(flight.totalco2e);
      });
    setCO2e(sumCO2e);
  }, [flights]);

  useEffect(() => {
    //mapping flights to research projects
    var allRP = [];
    allResearchProjects.map((each) => {
      const obj = {};
      obj.project = each;
      obj.projFlights = [];
      obj.projectCO2e=0
      allRP.push(obj);
    });
    // console.log("allRP", allRP);

    flights.length > 0 &&
      flights.map((f) => {
        //console.log("1. employee:", emp);

        //console.log("  2. employee projects:", empProj);
        allRP.map((rp) => {
          if (rp.project === f.project) {
            rp.projFlights.push(f);
            rp.projectCO2e+=f.totalco2e
          }
        });
      });
    setProjectFlights(allRP);
  }, [flights, allResearchProjects]);

  const addNewFlight = (flight) => {
    setFlights((prevState) => [...prevState, flight]);
  };
  const getProjectFlights = (projectName)=>{
    var returnProject
    projectFlights.length>0 &&
    projectFlights.forEach(project => {
      if(project.project===projectName){
        returnProject = {...project}
      }
    })
    return returnProject
  }

  return (
    // <FlightsContext.Provider value={{flights}}>
    <FlightsContext.Provider
      value={{ flights, addNewFlight, CO2eTotal, projectFlights, getProjectFlights }}
    >
      {props.children}
    </FlightsContext.Provider>
  );
};

export default FlightsContextProvider;
