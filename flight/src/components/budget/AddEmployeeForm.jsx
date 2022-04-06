import React, { useState, useContext } from "react";
import { EmployeesContext } from "../contexts/EmployeesContext";
import { Button } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";

import { useForm, useField, splitFormProps } from "react-form";

async function sendToFakeServer(values) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return values;
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
        <div>Validating...</div>
      ) : isTouched && error ? (
        <div>{error}</div>
      ) : null}
    </>
  );
});

const AddEmployeeForm = ({ ...props }) => {
  // const { addNew, addToEmployeesID, employeesID } = props;
  const {employeesID , addNewEmployee} = useContext(EmployeesContext)
  // console.log("props",props)
  const [addEmployee, setAddEmployee] = useState(false);
  const defaultValues = React.useMemo(
    () => ({
      ID: "",
      name: "",
      projects: [],
    }),
    []
  );
  function validateID(value) {
    if (!value) {
      return "ID is required";
    }
    if (employeesID.includes(value)) {
      return "ID is already in use";
    }
    return false;
  }

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
      addNewEmployee(values);
      // addToEmployeesID(values.ID)
      console.log("employee added!", values);
      instance.reset();
    },
    debugForm: false,
  });

  return (
    <Form
      style={{
        border: "2px solid grey",
        padding: "1rem",
        borderRadius: "4px",
        // backgroundColor: "rgba(152, 155, 242, 0.892)",
      }}
    >
      <h5>Add new employee</h5>
      {addEmployee && (
        <div>
          <div>
            <InputField
              className="addNewInput"
              placeholder="Name"
              field="name"
              validate={fakeCheckValidName}
            />
          </div>
          <div>
            <InputField
              className="addNewInput"
              placeholder="ID"
              field="ID"
              validate={validateID}
              style={{
                marginTop: "1rem",
              }}
            />
          </div>
          <div
            style={{
              // border: "1px solid black",
              marginTop: "1rem",
              marginBottom: "2rem",
              padding: "1rem",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              backgroundColor: "rgba(177, 195, 240, 0.32)",
            }}
          >
            <h5>Research Projects</h5>
            Research projects employee is working with
            <div>
              {values.projects.map((p, i) => (
                <div key={i}>
                  <label>
                    Project: <InputField field={`projects.${i}`} />{" "}
                    <CloseIcon
                      id="clearBtn"
                      onClick={() => removeFieldValue("projects", i)}
                    />
                  </label>
                </div>
              ))}
              <Button
                style={{
                  marginTop: "1rem ",
                }}
                variant="primary"
                onClick={() => pushFieldValue("projects", "")}
              >
                Add new project
              </Button>
            </div>
          </div>
        </div>
      )}
      <div>
        <Button
          type="submit"
          // style={{ backgroundColor: canSubmit ? "#357BF3" : "#8D9198" }}
          disabled={!canSubmit}
          // style={{
          //   marginTop: "1rem ",
          // }}
          variant="success"
          onClick={() => setAddEmployee(!addEmployee)}
        >
          Add employee{" "}
        </Button>
        {/* <button
          type="submit"
          style={{ backgroundColor: canSubmit ? "#357BF3" : "#8D9198" }}
          disabled={!canSubmit}
          onClick={() => setAddEmployee(!addEmployee)}
        >
          + Add employee
        </button> */}
      </div>

      <div>
        <em>{isSubmitting ? "Submitting..." : null}</em>
      </div>
    </Form>
  );
};

export default AddEmployeeForm;
