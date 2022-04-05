import React, { useState } from "react";
import { Form } from "react-bootstrap";

const RadioButtonGroup= ({ ...props }) => {
  const { setNumberOfTrips, setMultiCity,multiCity } = props;
  // const [radioVal, setRadioVal] = useState(1);

  const handleCheckBox = (event) => {
    // console.log("event", event);
    // setMulti(multi);
    setMultiCity(event.target.checked);
  };
  // const handleRountrip = (event) => {
  //   console.log("event", event);
  //   // setMulti(multi);
  //   setNumberOfTrips(2);
  // };
  const handleRadioValue = (event) => {
    // console.log("event", event);
    console.log("event.target.value", event.target.value);
    // setRadioVal(event.target.value)
    // setMulti(multi);
    setNumberOfTrips(parseInt(event.target.value));
  };
  // useEffect(() => {
  //   setMultiCity(multi);

  // }, [multi]);

  return (
    <div>
    Travel type
    <Form>
      {
        <div key="option-boxes" className="mb-3">
          <Form.Check
            inline
            label="One way"
            name="group1"
            type="radio"
            id={`inline-radio-1`}
            value={1}
            onChange={handleRadioValue}
            disabled={multiCity}

            // checked={radioVal===1}
          />
          <Form.Check
            inline
            label="Round trip"
            name="group1"
            type="radio"
            id={`inline-radio-2`}
            value={2}
            onChange={handleRadioValue}
            disabled={multiCity}
            // checked={radioVal===2}
          />
             {/* <Form.Check
            inline
            label="Multi city"
            name="group1"
            type="radio"
            id={`inline-radio-2`}
            value={3}
            onChange={handleRadioValue}
            // checked={radioVal===2}
          /> */}
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Multi city"
            onChange={handleCheckBox}
            // onChange={() => {
            //   setMulti(!multi);
            // }}
          />
        </div>
      }
    </Form>
    </div>
  );
};

export default RadioButtonGroup;
