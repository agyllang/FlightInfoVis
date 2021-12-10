import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

import { Row, Col, Button, Collapse, Container } from "react-bootstrap";

const DataCardProgress = ({ ...props }) => {
  const { isOvershoot, currentCO2, budget, currentMonth, header } = props;
  const [procent, setProcent] = useState(0);

  useEffect(() => {
    // var calcProcent = 0

    setProcent(Math.round(((budget - currentCO2) / budget) * 100));
  }, [currentCO2, budget]);
  // const [open, setOpen] = useState(false);

  return (
    <div className="card-card-progress-container">
      <Row>
        <Col
          className={"data-card-header"}
          // className={
          //   !isOvershoot ? "data-card-header" : "data-card-header-overshoot"
          // }
        >
          {header}
        </Col>
      </Row>
      <Row>
        <Col>
          <span className={!isOvershoot ? "data-card-1" : "data-card-1-overshoot"  }>{!isOvershoot ? budget : currentCO2 - budget}</span>{" "}
          <span className="symbol-text">CO2e/kg</span>
        </Col>
        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* {currentCO2 <= budget ? ( */}
          {!isOvershoot && (
            <ProgressBar
              style={{
                padding: 0,
                width: "100%",
                height: "30px",
                // transform: "rotate(-90deg)",
              }}
              // label={`${Math.round(((budget - currentCO2) / budget) * 100)}%`}
            >
              <ProgressBar
                now={procent > 0 ? budget - currentCO2 : 5}
                // animated
                label={`${procent}%`}
                // label={`${Math.round(((budget - currentCO2) / budget) * 100)}%`}

                style={{
                  color: "rgb(0,0,0)",
                  padding: 0,
                  // backgroundColor: "rgb(150,150,150)",
                  backgroundColor: `${
                    procent > 25 ? "rgb(150,150,150)" : "rgb(255,50,50)"
                  }`,
                }}
              />
              <ProgressBar
                now={currentCO2}
                style={{
                  color: "rgb(255,50,50)",
                  padding: 0,
                  backgroundColor: "rgb(255,255,255)",
                }}
                label={currentCO2 > budget && `OVERSHOOT!`}
              />
            </ProgressBar>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default DataCardProgress;
