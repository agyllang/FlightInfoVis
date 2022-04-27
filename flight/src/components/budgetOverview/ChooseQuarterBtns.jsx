import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ChooseQuarterBtns = ({ ...props }) => {
  const { setQuarter } = props;
  const [q, setQ] = useState(0);

  const handleChange = (event, val) => {
    console.log("handleChange", val);
    if (val !== null) {
      setQ(val);
      setQuarter(val);
    }
  };

  return (
    <ToggleButtonGroup
      value={q}
      exclusive
      onChange={handleChange}
      aria-label="quarter"
    >
      <ToggleButton
        value={0}
        color={q === 0 ? "primary" : "standard"}
        aria-label="centered"
      >
        Start
      </ToggleButton>
      <ToggleButton
        value={1}
        color={q === 1 ? "primary" : "standard"}
        aria-label="centered"
      >
        Q1
      </ToggleButton>
      <ToggleButton
        value={2}
        color={q === 2 ? "primary" : "standard"}
        aria-label="centered"
      >
        Q2
      </ToggleButton>
      <ToggleButton
        value={3}
        color={q === 3 ? "primary" : "standard"}
        aria-label="centered"
      >
        Q3
      </ToggleButton>
      <ToggleButton
        value={4}
        color={q === 4 ? "primary" : "standard"}
        aria-label="centered"
      >
        Q4
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
export default ChooseQuarterBtns;
