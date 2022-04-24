import React , {useState} from "react"
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleButtons({...props}) {
    const {setQuarter}=props
  const [alignment, setAlignment] = useState(0);

  const handleAlignment = (event, newAlignment) => {
      console.log("newAlignment",newAlignment)
    setAlignment(newAlignment);
    setQuarter(newAlignment)
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value={0} aria-label="centered">
        Start
      </ToggleButton>
      <ToggleButton value={1} aria-label="centered">
        Q1
      </ToggleButton>
      <ToggleButton value={2} aria-label="centered">
        Q2
      </ToggleButton>
      <ToggleButton value={3} aria-label="centered">
        Q3
      </ToggleButton>
      <ToggleButton value={4} aria-label="centered">
        Q4
      </ToggleButton>
      <ToggleButton value={5} aria-label="centered">
        All
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
