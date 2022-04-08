import { createContext, useEffect, useState } from "react";

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
  console.log("EmployeesContextProvider employees:", employees);

  const [employeesID, setEmployeesID] = useState([]);
  console.log("EmployeesContextProvider employeesID:", employeesID);

  const [allResearchProjects, setResearchProject] = useState([]);
  //   console.log("allResearchProjects", allResearchProjects);

  useEffect(() => {
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
    var allProjects = [];

    employees.length > 0 &&
      employees.map((emp) => {
        emp.projects.length > 0 &&
          emp.projects.map((project) => {
            allProjects.indexOf(project) === -1 && allProjects.push(project);
          });
        // console.log("employee", emp);
      });

    setResearchProject([...allProjects]);
    // console.log("allProjects", allProjects);
  }, [employees]);

  return (
    <EmployeesContext.Provider
      value={{ employees, employeesID, addNewEmployee, allResearchProjects }}
    >
      {props.children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesContextProvider;
