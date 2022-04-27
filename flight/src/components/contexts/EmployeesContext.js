import { createContext, useEffect, useState } from "react";
import { colorArray } from "../utility/functions";

export const EmployeesContext = createContext();
const fakeEmployees = [
  {
    ID: "p1",
    name: "Jane Johnsson",
    projects: ["AI"],
  },
  {
    ID: "p2",
    name: "Robert Smith",
    projects: ["AI"],
  },
  {
    ID: "p3",
    name: "Michael Strovic",
    projects: ["AI", "ROBOTICS"],
  },
  {
    ID: "p4",
    name: "Gina Lopez",
    projects: ["ROBOTICS"],
  },
  {
    ID: "p5",
    name: "Leif Göransson",
    projects: ["ROBOTICS"],
  },
  {
    ID: "p6",
    name: "Peter Parker",
    projects: ["HCI"],
  },
  {
    ID: "p7",
    name: "Moa Falk",
    projects: ["HCI"],
  },
  {
    ID: "p8",
    name: "Lucas Lee",
    projects: ["HCI"],
  },
];
const EmployeesContextProvider = ({ ...props }) => {
  const { fakeData } = props;

  // const [employees, setEmployee] = useState([
  //   {
  //     ID: "p1",
  //     name: "Rachel Smith",
  //     projects: ["PROJECT1", "PROJECT2"],
  //   },
  //   {
  //     ID: "p2",
  //     name: "Roland Andersson",
  //     projects: ["PROJECT2"],
  //   },
  //   {
  //     ID: "p3",
  //     name: "Anna Johnsson",
  //     projects: ["PROJECT3"],
  //   },
  // ]);
  const [employees, setEmployee] = useState([]);
  // console.log("EmployeesContextProvider employees:", employees);

  useEffect(() => {
    if (fakeData) {
      setEmployee(fakeEmployees);
    }
  }, [fakeData]);

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
  // console.log("employees", employees);

  useEffect(() => {
    //updates state array with string values of all research projects

    var allProjects = [];
    employees.length > 0 &&
      employees.map((emp) => {
        emp.projects.length > 0 &&
          emp.projects.map((project) => {
            allProjects.indexOf(project.toUpperCase()) === -1 &&
              allProjects.push(project.toUpperCase());
          });
      });
    // console.log("1useEffect researchProjects ", allProjects)
    setResearchProject([...allProjects]);
  }, [employees]);

  useEffect(() => {
    //updates state array of research projects, maps each employee to his/hers associated research projects.

    var arrObj = [];
    allResearchProjects.forEach((each, index) => {
      const obj = {};
      obj.project = each;
      obj.employeesInProj = [];
      obj.projectColor = colorArray(index);
      arrObj.push(obj);
    });

    employees.length > 0 &&
      employees.map((emp) => {
        //console.log("1. employee:", emp);
        emp.projects.length > 0 &&
          emp.projects.map((empProj) => {
            //console.log("  2. employee projects:", empProj);
            arrObj.map((x) => {
              if (x.project.toUpperCase() === empProj.toUpperCase()) {
                x.employeesInProj.push(emp);
              }
            });
          });
      });
    // console.log("2useeffect allResearchProjectsArray",arrObj)

    setResearchProjectArray(arrObj);
  }, [allResearchProjects, employees]);
  // console.log("allResearchProjectsArray state",allResearchProjectsArray)

  const getNameFromID = (id) => {
    var empObj = employees.filter((e) => e.ID == id);
    // console.log("empObj", empObj);
    var name = empObj.length > 0 ? empObj[0].name : "-";
    // console.log("name", name);

    return name;
  };
  const addNewEmployee = (newEmployee) => {
    setEmployee((prevState) => [...prevState, newEmployee]);
  };

  const getProjectFromProjectName = (name) => {
    var getProject;

    allResearchProjectsArray.forEach((p) => {
      // console.log("context iteratior",p)
      if (p.project === name) {
        getProject = p;
      }
    });
    return getProject;
  };

  // console.log("getProjectFromProjectName", getProjectFromProjectName("AI"));
  return (
    <EmployeesContext.Provider
      value={{
        employees,
        employeesID,
        getProjectFromProjectName,
        addNewEmployee,
        getNameFromID,
        allResearchProjects,
        allResearchProjectsArray,
      }}
    >
      {props.children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesContextProvider;
