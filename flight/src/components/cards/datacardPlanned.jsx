import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

import { Row, Col, Button, Collapse, Container } from "react-bootstrap";

const DataCardPlanned = ({ ...props }) => {
  const { currentCO2, budget, currentMonth, header } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className="card-card-progress-container">
      <Row>
        <Col className="data-card-header">{header}</Col>
      </Row>
      <Row>
        <Col>
          {currentCO2 > 0 ? (
            <>{currentCO2} CO2e/kg from future trips</>
          ) : (
            "No trips planned"
          )}
        </Col>
        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
          {currentCO2 > 0 ? (
            <>{Math.round((currentCO2 / budget) * 100)}% of budget</>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </div>
  );
};
export default DataCardPlanned;
