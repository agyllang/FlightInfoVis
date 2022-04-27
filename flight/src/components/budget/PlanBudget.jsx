import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Container, Stack } from "react-bootstrap";
import { FlightsContext } from "../contexts/FlightsContext";
import Sort from "../budgetOverview/Sort";
// import FindFlight from "./FindFlight/FindFlight";
import FlightList from "./FlightList";
import BudgetProgressBar from "../progress/BudgetProgressBar";
import StepByStep from "./FindFlight/StepByStep";
import ColorScale from "../progress/ColorScale";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button } from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { fontStyle } from "@mui/system";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AddBuffer from "./AddBuffer";

const DataCard = ({ ...props }) => {
  const { title, value, unit } = props;
  return (
    // <Col xs lg="5" className="component-container">
    <Container className="component-container">
      <div style={{ color: "rgb(180,180,180)" }}>{title}</div>

      <div className="component-title" style={{ fontWeight: "700" }}>
        {value}
      </div>
      {unit && <div style={{ color: "rgb(180,180,180)" }}>{unit}</div>}
    </Container>
  );
};

const PlanBudget = ({ ...props }) => {
  // console.log("props", props);

  const { setBudgetApproved, budgetApproved } = props;

  const { flights, CO2eTotal, bufferProcent } = useContext(FlightsContext);

  const [bufferState, setProcent] = useState(0);
  const [sortValue, setSortValue] = useState("totalco2e");
  const [reverseSorting, setReverseSorting] = useState(false);
  const [max, setMax] = useState(0);
 useEffect(()=>{
  setProcent(bufferProcent)
 },[bufferProcent])
 
 
  useEffect(() => {
    if (flights.length > 0) {
      var maxCo2e = Math.max.apply(
        Math,
        flights.map(function (o) {
          return o.totalco2e;
        })
      );
      setMax(maxCo2e);
    }
  }, [flights]);
  async function sendToFakeServer(values) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return values;
  }

  const SendBudget = ({ ...props }) => {
    // const {budgetApproved} = props
    const [open, setOpen] = useState(false);

    useEffect(() => {
      let timer1 = setTimeout(() => {
        setOpen(false);
        open && setBudgetApproved();
      }, 4 * 1000);

      //  open && setBudgetApproved()
      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };

      // useEffect will run only one time with empty []
      // if you pass a value to array,
      // like this - [data]
      // than clearTimeout will run every time
      // this value changes (useEffect re-run)
    }, [open]);

    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(true);
    };

    return (
      <div>
        {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
        {!budgetApproved ? (
          <Button
            variant={"contained"}
            onClick={handleToggle}
            sx={{ mt: 1, mr: 1 }}
            disabled={flights.length > 0 ? false : true}
          >
            Send budget proposal
          </Button>
        ) : (
          <Alert sx={{ width: "100%" }} severity={"success"}>
            {" "}
            <AlertTitle sx={{ fontWeight: "bolder" }}>
              Budget has been sent
            </AlertTitle>
            Follow up budget on "Budget Overview"
          </Alert>
        )}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          // onClick={handleClose}
        >
          <>
            <div
              style={{
                padding: "1rem",
                color: "#0058ff",
                backgroundColor: "rgba(250,250,250,0.5)",
                borderRadius: "5px",
              }}
            >
              Budget proposal is being forwarded.. <br />
              {/* Checkout "Budget Overview"-tab to follow up on your budget. */}
              <CircularProgress size={100} color={"primary"} />
            </div>
          </>
        </Backdrop>
      </div>
    );
  };

  return (
    <Container fluid>
      <Row className="page-title" style={{ justifyContent: "space-between" }}>
        <Col md={"auto"}> Plan Carbon Budget Proposal </Col>
        <Col md={"auto"}>
          <SendBudget />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <StepByStep />
        </Col>
        <Col>
          <Container style={{}} className="component-container">
            {/* <Col lg={6} style={{ paddingTop: 0 }} className="component-container"> */}
            <Row
              style={{
                borderBottom: "2px solid #c6c6c6",
                marginBottom: "1rem",
                justifyContent: "space-between",
              }}
            >
              <Col md={"auto"}>
                <h5 className="component-title">Carbon Budget Proposal </h5>
              </Col>
              <Col md={"auto"}>
                Add buffer for unplanned trips{" "}
                <AddBuffer setProcent={(p) => setProcent(p)} /> of planned
                budget
              </Col>
            </Row>
            <Row>
              <Col>
                <Alert
                  style={{
                    cursor: "pointer",
                    boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px",
                  }}
                  severity="info"
                >
                  {" "}
                  <AlertTitle sx={{ fontWeight: "bolder" }}>
                    Carbon Budget Proposal
                  </AlertTitle>
                  <>
                    Your Carbon Budget Proposal consists of ({flights.length})
                    planned flights
                    <br /> Accumulatively calculated to <b>{CO2eTotal}</b> CO2e
                    (kg), with a buffer of <b>{bufferState}</b>% = <b>
                    {Math.floor((CO2eTotal * bufferState) / 100)} </b> CO2e (kg)
                    <br />
                    Total Carbon Budget Proposal = <b>{CO2eTotal}</b> +{" "}
                    <b>{Math.floor((CO2eTotal * bufferState) / 100)}</b> ={" "}
                    <b>
                      {CO2eTotal +
                        Math.floor((CO2eTotal * bufferState) / 100)}
                    </b>{" "}
                    CO2e (kg)
                  </>
                </Alert>
              </Col>
            </Row>
            {/* <BudgetProgressBar
            max={max}
            sortValue={sortValue}
            reverseSorting={reverseSorting}
          />

          <Row style={{ justifyContent: "space-between" }}>
            <Col md={"auto"}>
              <ColorScale max={max} steps={10} />
            </Col>
            <Col
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Sort
                placeholder={"Sorting on"}
                array={[
                  { value: "ID", label: "Employee" },
                  { value: "totalco2e", label: "CO2e" },
                  { value: "co2ePerDay", label: "CO2e/day" },
                  { value: "priority", label: "Priority" },
                  { value: "echoTimeDate", label: "Date" },
                ]}
                callback={(sort) => {
                  setSortValue(sort);
                }}
              />

              {reverseSorting ? (
                <ArrowDownwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              ) : (
                <ArrowUpwardIcon
                  style={{ color: "rgb(25, 118, 210)", cursor: "pointer" }}
                  onClick={() => setReverseSorting((prev) => !prev)}
                />
              )}
            </Col>
          </Row> */}

            <FlightList
              sortValue={sortValue}
              reverseSorting={reverseSorting}
              setSortValue={(value) => setSortValue(value)}
              setReverseSorting={() => setReverseSorting((prev) => !prev)}
            />
          </Container>
        </Col>
        <Col md={"auto"}>
          <Stack gap={2}>
            <Col>
              <DataCard
                title="Budget Total"
                value={
                  CO2eTotal + Math.floor((CO2eTotal * bufferState) / 100)
                }
                unit={"CO2e kg"}
              />
            </Col>
            <Col>
              <DataCard title="Largest trip" value={max} unit={"CO2e kg"} />
            </Col>
            <Col>
              <DataCard title="Number of flights" value={flights.length} />
            </Col>
          </Stack>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <FlightList />
        </Col>
      </Row> */}
    </Container>
  );
};

export default PlanBudget;
