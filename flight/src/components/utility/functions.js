const returnMonthYear = (echo) => {
  //echo 1643670000000
  var m = new Date(echo).getMonth();
  var y = new Date(echo).getFullYear();
  const optionsMonth = [
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
  return `${optionsMonth[m]}/${y}`;
};

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

  const colArr = [
    "#FF2727",
    "#FFB43E",
    "#3467A5",
    "#39D039",
    "#fa8072",
    "#1EC47D",
    "#eee8aa",
    "#dda0dd",
    "#CA9E00",
    "#1E1092",
    "#FDD340",
  ];

  return colArr[index];
};

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getCorrectTextColor(hex) {
  /*
    From this W3C document: http://www.webmasterworld.com/r.cgi?f=88&d=9769&url=http://www.w3.org/TR/AERT#color-contrast
    
    Color brightness is determined by the following formula: 
    ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
    
    I know this could be more compact, but I think this is easier to read/explain.
    
    */

  var threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

  function hexToR(h) {
    return parseInt(cutHex(h).substring(0, 2), 16);
  }
  function hexToG(h) {
    return parseInt(cutHex(h).substring(2, 4), 16);
  }
  function hexToB(h) {
    return parseInt(cutHex(h).substring(4, 6), 16);
  }
  function cutHex(h) {
    return h.charAt(0) == "#" ? h.substring(1, 7) : h;
  }

  var hRed = hexToR(hex);
  var hGreen = hexToG(hex);
  var hBlue = hexToB(hex);

  var cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
  if (cBrightness > threshold) {
    return "#000000";
  } else {
    return "#ffffff";
  }
}

//test colortable

export { sortBy, returnMonthYear, colorArray, getRandom, getCorrectTextColor};
