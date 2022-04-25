import React, { useState, useEffect } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const PlannedToggle = ({ ...props }) => {
  const { setPlannedFilter, setCompleted, quarter } = props;
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  useEffect(() => {
    if (!checked && !checked2) {
      setChecked(true);
    }
    if (checked && checked2) {
      setPlannedFilter("");
    }
    if (checked && !checked2) {
      setPlannedFilter("planned");
    }
    if (!checked && checked2) {
      setPlannedFilter("unplanned");
    }
    if (quarter === 4) {
      setChecked3(true);
      setCompleted(true);
    }
    if (quarter === 0) {
      setChecked(true);
      setPlannedFilter("planned");
      setCompleted(false)
      setChecked3(false)

    }
  }, [checked, checked2, quarter]);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
  };
  const handleChange3 = (event) => {
    setCompleted(event.target.checked);
    setChecked3(event.target.checked);
  };

  return (
    <>
      <FormControlLabel
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
        control={<Checkbox defaultChecked />}
        label="Planned"
      />

      <FormControlLabel
        checked={checked2}
        onChange={handleChange2}
        inputProps={{ "aria-label": "controlled" }}
        control={<Checkbox color="warning" />}
        label="Unplanned"
      />
      <FormControlLabel
        checked={checked3}
        disabled={quarter === 0}
        onChange={handleChange3}
        inputProps={{ "aria-label": "controlled" }}
        control={<Checkbox color="default" />}
        label="Show completed"
      />
    </>
  );
};

export default PlannedToggle;
