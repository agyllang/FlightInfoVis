import { createContext, useEffect, useState, useContext } from "react";
import { fakeFlights, fakeFlights2, unplannedFlights } from "../../fakeData";
import { EmployeesContext } from "./EmployeesContext";
export const FlightsContext = createContext();

const FlightsContextProvider = ({ ...props }) => {
  const { fakeData, generateFlights } = props;
  const { allResearchProjects, employees } = useContext(EmployeesContext);
  const [flights, setFlights] = useState([]);
  const [actualFlights, setActualFlights] = useState([]);
  const [actualCO2eTotal, setActualTotal] = useState(0);

  const [bufferProcent, setBufferProcent] = useState(0);
  // const [fakeData, setFakeData] = useState(false);
  useEffect(() => {
    //triggered by fake data button, to populate the app with some data.
    if (fakeData) {
      setFlights(fakeFlights);
      setActualFlights(fakeFlights2);
      setBufferProcent(25);
    }
  }, [fakeData]);

  const addUnplannedFlights = (current) => {
    //adding unplannedFlights
    var alreadyAdded = [...current];
    // console.log("alreadyAdded", alreadyAdded);
    var newArray = [];
    newArray = unplannedFlights.map((f, index) => {
      var newObj = { ...f };
      var employee = employees[index % employees.length];
      newObj.ID = employee.ID;
      newObj.project = employee.projects[0];
      newObj.status = "unplanned";
      return newObj;
    });

    newArray = [...alreadyAdded, ...newArray];
    setActualFlights(newArray);
  };
  // useEffect(()=>{

  //   addUnplannedFlights(flights)

  // },[flights])

  useEffect(() => {
    //this is used to generate flight data and assign it to the current employees
    if (generateFlights && employees.length > 0) {
      // console.log("generate");
      var alreadyAdded = [...flights];
      // console.log("alreadyAdded", alreadyAdded);
      var newArray = [];
      newArray = fakeFlights.map((f, index) => {
        var newObj = { ...f };
        var employee = employees[index % employees.length];
        newObj.ID = employee.ID;
        newObj.project = employee.projects[0];
        newObj.status = "planned";
        return newObj;
      });

      newArray = [...alreadyAdded, ...newArray];
      // console.log("newArray", newArray);
      setFlights(newArray);
      addUnplannedFlights(newArray);
    }
  }, [generateFlights]);

  // const [flights, setFlights] = useState(fakeFlights);
  const [CO2eTotal, setCO2e] = useState(0);
  const [projectFlights, setProjectFlights] = useState([]);
  const [projectsActualFlights, setProjectActualFlights] = useState([]);
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
    var sumCO2e = 0;
    actualFlights.length > 0 &&
      actualFlights.forEach((flight) => {
        sumCO2e += parseInt(flight.totalco2e);
      });
    setActualTotal(sumCO2e);
  }, [actualFlights]);

  useEffect(() => {
    //mapping flights to research projects
    var allRP = [];
    allResearchProjects.map((each) => {
      const obj = {};
      obj.project = each;
      obj.projFlights = [];
      obj.projectCO2e = 0;
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
            rp.projectCO2e += f.totalco2e;
          }
        });
      });
    setProjectFlights(allRP);
  }, [flights, allResearchProjects]);

  useEffect(() => {
    //mapping flights to research projects
    var allRP = [];
    allResearchProjects.map((each) => {
      const obj = {};
      obj.project = each;
      obj.projFlights = [];
      obj.projectCO2e = 0;
      allRP.push(obj);
    });
    // console.log("allRP", allRP);

    actualFlights.length > 0 &&
      actualFlights.map((f) => {
        //console.log("1. employee:", emp);

        //console.log("  2. employee projects:", empProj);
        allRP.map((rp) => {
          if (rp.project === f.project) {
            rp.projFlights.push(f);
            rp.projectCO2e += f.totalco2e;
          }
        });
      });
    setProjectActualFlights(allRP);
  }, [actualFlights, allResearchProjects]);

  const addNewFlight = (flight) => {
    flight.flightCreated = Date.now();
    setFlights((prevState) => [...prevState, flight]);
  };
  const getProjectFlights = (projectName) => {
    var returnProject;
    projectFlights.length > 0 &&
      projectFlights.forEach((project) => {
        if (project.project === projectName) {
          returnProject = { ...project };
        }
      });
    return returnProject;
  };
  const getProjectActualFlights = (projectName) => {
    var returnProject;
    projectsActualFlights.length > 0 &&
      projectsActualFlights.forEach((project) => {
        if (project.project === projectName) {
          returnProject = { ...project };
        }
      });
    return returnProject;
  };

  const getEmployeeFlights = (ID) => {
    var empFlights = [];

    flights.map((f) => {
      if (f.ID === ID) {
        empFlights.push(f);
      }
    });
    return empFlights;
  };
  const getEmployeeActualFlights = (ID) => {
    var empFlights = [];

    actualFlights.map((f) => {
      if (f.ID === ID) {
        empFlights.push(f);
      }
    });
    return empFlights;
  };

  const getEmployeeTotalCO2e = (ID) => {
    var CO2etotal = 0;
    flights.map((f) => {
      if (f.ID === ID) {
        CO2etotal += f.totalco2e;
      }
    });
    return CO2etotal;
  };
  const setBuffer = (val) => {
    setBufferProcent(val);
  };

  const removeFlight = (id) => {
    var newArr = [];
    newArr = flights.filter((flight) => {
      if (flight.flightID !== id) {
        return flight;
      }
    });

    var newActualArr = [];
    newActualArr = actualFlights.filter((flight) => {
      if (flight.flightID !== id) {
        return flight;
      }
    });
    setActualFlights(newActualArr);
    setFlights(newArr);
  };

  return (
    // <FlightsContext.Provider value={{flights}}>
    <FlightsContext.Provider
      value={{
        flights,
        actualFlights,
        addNewFlight,
        removeFlight,
        CO2eTotal,
        actualCO2eTotal,
        projectFlights,
        projectsActualFlights,
        getProjectFlights,
        getProjectActualFlights,
        getEmployeeFlights,
        getEmployeeActualFlights,
        getEmployeeTotalCO2e,
        setBuffer,
        bufferProcent,
      }}
    >
      {props.children}
    </FlightsContext.Provider>
  );
};

export default FlightsContextProvider;
