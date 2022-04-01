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

const AddEmployeeForm = ({ ...props }) => {
  const { addNew } = props;
  const [addEmployee, setAddEmployee] = useState(false);
  const defaultValues = React.useMemo(
    () => ({
      name: "",
      ID: "",
      projects: [""],
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
        console.log("defaultValues", defaultValues)
        console.log("instance", instance)
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      await sendToFakeServer(values);
      addNew(values);
      console.log("employee added!", values);
      instance.reset()
    },
    debugForm: false,
  });

  return (
    <Form
      style={{
        // border: "2px solid blue",
        padding: "1rem",
      }}
    >
      {addEmployee && (
        <div>
          <div>
            <InputField
              placeholder="Name"
              field="name"
              validate={fakeCheckValidName}
            />
          </div>
          <div>
            <InputField placeholder="ID" field="ID" validate={validateID} />
          </div>
          <div
            style={{
              border: "1px solid black",
              padding: "1rem",
            }}
          >
            Projects
            <div>
              {values.projects.map((p, i) => (
                <div key={i}>
                  <label>
                    Project: <InputField field={`projects.${i}`} />{" "}
                    <button
                      type="button"
                      onClick={() => removeFieldValue("projects", i)}
                    >
                      X
                    </button>
                  </label>
                </div>
              ))}
              <button
                type="button"
                onClick={() => pushFieldValue("projects", "")}
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <button
          type="submit"
          style={{backgroundColor: canSubmit ? "#357BF3" : "#8D9198" }}
          disabled={!canSubmit}
          onClick={() => setAddEmployee(!addEmployee)}
        >
          + Add employee
        </button>
      </div>

      <div>
        <em>{isSubmitting ? "Submitting..." : null}</em>
      </div>
    </Form>
  );
};

export default AddEmployeeForm;
