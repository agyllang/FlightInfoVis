const returnMonthYear = (echo) => {
    //echo 1643670000000
    var m = new Date(echo).getMonth()
    var y = new Date(echo).getFullYear()
  const optionsMonth = [
    "Jan" ,
    "Feb" ,
    "Mar" ,
    "Apr" ,
    "May" ,
    "Jun" ,
    "Jul" ,
    "Aug" ,
    "Sep" ,
    "Okt" ,
     "Nov",
     "Dec",
  ];
  return `${optionsMonth[m]}/${y}`
  }

  const sortBy = (field, reverse, primer) => {
    const key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };
  
    reverse = !reverse ? 1 : -1;
  
    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };

  const colorArray = (index) => {
    const color2 = [
      "#0058ff",
      "#6085fb",
      "#89b2f5",
      "#b2dded",
      "#ffffe0",
      "#ffbcb0",
      "#f27888",
      "#ca396e",
      "#871164",
    ];
  
    const colArr =["#FF2727","#FFB43E","#3467A5","#39D039","#1EC47D","#4C3FB7","#CA9E00","#1E1092","#FDD340"]

    return colArr[index]
  }
  export {sortBy,returnMonthYear, colorArray}
