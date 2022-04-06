import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange',"1","2","3"],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3, 4,6,7,8],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
     
      ],
      borderWidth: 1,
    },
  ],
};

function randomHsl(current,total) {
  return "hsla(" + current/total * 360 + ",75%, 75%, 1)";
  // return "hsla(" + Math.random() * 360 + ",75%, 75%, 1)";
}
const backgroundColorFunction=(number)=>{
  var backgroundColorArray = []
  for (let i = 0; i < number; i++) {
    backgroundColorArray.push(randomHsl(i,number))
  }
  return backgroundColorArray
}

// const colorFunction=()=>{

// }


const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = ({...props}) => {
  const {values,labels} = props

  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       label: 'Some label',
  //       data: values,
  //       backgroundColor: backgroundColorFunction(values.length),
  //       // borderColor: [
  //       //   'rgba(255, 99, 132, 1)',
  //       //   'rgba(54, 162, 235, 1)',
  //       //   'rgba(255, 206, 86, 1)',
  //       //   'rgba(75, 192, 192, 1)',
  //       //   'rgba(153, 102, 255, 1)',
  //       //   'rgba(255, 159, 64, 1)',
  //       // ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

return(
  <>
    <Bar data={data} options={options} />
  </>
  )
}

;

export default VerticalBar;