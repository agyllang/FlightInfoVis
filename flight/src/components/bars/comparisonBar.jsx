import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
//example reference
//https://codesandbox.io/s/github/reactchartjs/react-chartjs-2/tree/master/sandboxes/bar/stacked?from-embed=&file=/App.tsx:1124-1168


const backgroundColorFunction = (number) => {
    function randomHsl(current, total) {
        return "hsla(" + (current / total) * 360 + ",60%, 60%, 1)";
        // return "hsla(" + Math.random() * 360 + ",75%, 75%, 1)";
      }
    var backgroundColorArray = [];
    for (let i = 0; i < number; i++) {
      backgroundColorArray.push(randomHsl(i, number));
    }
    return backgroundColorArray;
  };


const  options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
const returnMonth = (index) => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];
  return months[index];
};


const sumCO2eYearly = (months) => {

  var monthArray = Object.values(months)[0];

  var sumCO2 = 0;
  monthArray.length > 0 &&
    monthArray.forEach((tripObj, index) => {
          sumCO2 += parseInt(tripObj.CO2);
        });
    

  return sumCO2;
};


const structureTripsByMonth = (array) => {
  var structureCalendar = [
    { Jan: [] },
    { Feb: [] },
    { Mar: [] },
    { Apr: [] },
    { May: [] },
    { Jun: [] },
    { Jul: [] },
    { Aug: [] },
    { Sep: [] },
    { Okt: [] },
    { Nov: [] },
    { Dec: [] },
  ];
  array.forEach((each) => {
    var date = new Date(each["Avresedatum/-tid"]);
    var m = date.getMonth();
    var month = returnMonth(m);

    structureCalendar[m][month].push(each);
  });
  return structureCalendar;
};
const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
const ComparisonBar = ({ ...props }) => {
  const { allData, yearForData } = props;
  const [formattedDataSets, setFormattedDataSets] = useState([]);


  useEffect(() => {
    var newlyFormatted = [];
    allData &&
      allData.forEach((dataSet) => {
        newlyFormatted.push(structureTripsByMonth(dataSet));
      });
    setFormattedDataSets(newlyFormatted);
    //  console.log()
  }, [allData]);

  const dataForGraph = () => {
    return {
      labels,
      datasets: 
        formattedDataSets.map((eachSet,index) => {
          return {
            label: yearForData[index],
            data: eachSet.map((month) => {
              return sumCO2eYearly(month);
            }),
            backgroundColor: backgroundColorFunction(2)[index],
            stack: `Stack ${index}`

          };
        }),
      
    };

  };
//   console.log("dataforgraph", dataForGraph());

  return <Bar options={options} data={ dataForGraph()} />;
};
export default ComparisonBar;
