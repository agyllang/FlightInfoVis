import React, { useState } from "react";

import { Button } from "react-bootstrap";
//import "./styles.css";

import { useForm, useField, splitFormProps } from "react-form";

async function sendToFakeServer(values) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return values;
}

function validateID(value) {
  if (!value) {
    return "ID is required";
  }
  return false;
}

async function fakeCheckValidName(name, instance) {
  if (!name) {
    return "A name is required";
  }

  return instance.debounce(async () => {
    console.log("checking name");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // All names are valid, so return a false error
    return false;
  }, 500);
}

const InputField = React.forwardRef((props, ref) => {
  // Let's use splitFormProps to get form-specific props
  const [field, fieldOptions, rest] = splitFormProps(props);

  // Use the useField hook with a field and field options
  // to access field state
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField(field, fieldOptions);

  // Build the field
  return (
    <>
      <input {...getInputProps({ ref, ...rest })} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
});

const AddFlightForm = ({ ...props }) => {
  const { addNew } = props;
  const [openForm, setOpenForm] = useState(false);
  const defaultValues = React.useMemo(
    () => ({
      ID: "",
      flights: [],
    }),
    []
  );
  // Use the useForm hook to create a form instance
  const {
    Form,
    values,
    pushFieldValue,
    removeFieldValue,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    defaultValues,
    onSubmit: async (values, instance) => {
      console.log("defaultValues", defaultValues);
      console.log("instance", instance);
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      await sendToFakeServer(values);
      addNew(values);
      console.log("employee added!", values);
      instance.reset();
    },
    debugForm: true,
  });

  return (
    <Form
      style={{
        // border: "2px solid ",
        borderRadius: "5px",
        padding: "1rem",
        backgroundColor: "#D4C2DC",
      }}
    >
      {openForm && (
        <div>
     Plan flights
          <div
            style={{
              border: "1px solid black",
              padding: "0.5rem",
            }}
          >
            
            <div>
              {values.flights.map((p, i) => (
                <div key={i}>
                  <label>
                    From: <InputField field={`flights.${i}.from`} />{" "}
                    To: <InputField field={`flights.${i}.to`} />{" "}
                    <button
                      type="button"
                      onClick={() => removeFieldValue("flights", i)}
                    >
                      X
                    </button>
                  </label>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => pushFieldValue("flights", "")}
              >
                Add Flight
              </button>
            </div>
            <div>
            <InputField
               style={{
              border: "1px solid black",
              marginTop: "1rem",
            }}
              placeholder="Employee ID"
              field="ID"
              validate={validateID}
            />
          </div>
          </div>
        </div>
      )}
      <div>
        <button
          type="submit"
          style={{ backgroundColor: canSubmit ? "#357BF3" : "#8D9198" }}
          disabled={!canSubmit}
          onClick={() => setOpenForm(!openForm)}
        >
          + Add flight
        </button>
      </div>

      <div>
        <em>{isSubmitting ? "Submitting..." : null}</em>
      </div>
    </Form>
  );
};

export default AddFlightForm;
