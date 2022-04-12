import { createContext, useEffect, useState } from "react";
import { colorArray } from "../utility/functions";

export const EmployeesContext = createContext();

const EmployeesContextProvider = ({ ...props }) => {
  const [employees, setEmployee] = useState([
    {
      ID: "p1",
      name: "Rachel Smith",
      projects: ["PROJECT1", "PROJECT2"],
    },
    {
      ID: "p2",
      name: "Roland Andersson",
      projects: ["PROJECT2"],
    },
    {
      ID: "p3",
      name: "Anna Johnsson",
      projects: ["PROJECT3"],
    },
  ]);
  // console.log("EmployeesContextProvider employees:", employees);

  const [employeesID, setEmployeesID] = useState([]);
  //array with string values of all employee IDs, ["p1","p2","p3"...]

  // console.log("EmployeesContextProvider employeesID:", employeesID);

  const [allResearchProjects, setResearchProject] = useState([]);
  //array with string values of all research Projects, ["PROJECT1","PROJECT2"..]
  const [allResearchProjectsArray, setResearchProjectArray] = useState([]);
  //array with all research projects as objects,
  //example
  //{"project": "PROJECT1",
  // "employeesInProj": [
  //     {"ID": "p1",
  //      "name": "Rachel Smith",
  //      "projects": [
  //          "PROJECT1",
  //          "PROJECT2"]}],}

  // console.log("EmployeesContextProvider allResearchProjectsArray", allResearchProjectsArray);

  useEffect(() => {
    //updates state array with string values of employee IDs
    if (employees.length > 0) {
      employees.map((employee) => {
        !employeesID.includes(employee.ID) &&
          setEmployeesID((prevState) => [...prevState, employee.ID]);
      });
    }
  }, [employees]);

  const addNewEmployee = (newEmployee) => {
    setEmployee((prevState) => [...prevState, newEmployee]);
  };

  useEffect(() => {
    //updates state array with string values of all research projects
    var allProjects = [];
    employees.length > 0 &&
      employees.map((emp) => {
        emp.projects.length > 0 &&
          emp.projects.map((project) => {
            allProjects.indexOf(project) === -1 && allProjects.push(project);
          });
      });

    setResearchProject([...allProjects]);
  }, [employees]);

  useEffect(() => {
    //updates state array of research projects, maps each employee to his/hers associated research projects.

    var arrObj = [];

    allResearchProjects.map((each,index) => {
      const obj = {};
      obj.project = each;
      obj.employeesInProj = [];
      obj.projectColor= colorArray(index)
      arrObj.push(obj);
    });

    employees.length > 0 &&
      employees.map((emp) => {
        //console.log("1. employee:", emp);
        emp.projects.length > 0 &&
          emp.projects.map((empProj) => {
            //console.log("  2. employee projects:", empProj);
            arrObj.map((x) => {
              if (x.project === empProj) {
                x.employeesInProj.push(emp);
              }
            });
          });
      });
    setResearchProjectArray(arrObj);
  }, [allResearchProjects]);
  return (
    <EmployeesContext.Provider
      value={{
        employees,
        employeesID,
        addNewEmployee,
        allResearchProjects,
        allResearchProjectsArray,
      }}
    >
      {props.children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesContextProvider;
