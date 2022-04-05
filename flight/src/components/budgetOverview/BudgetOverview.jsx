import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import VBar from "./VBar";
const BudgetOverview = ({ ...props }) => {
  const {} = props;
  return (
    <Container>
      <Row className="page-title">Budget Overview</Row>
      {/* <VerticalBar /> */}
      <VBar />
    </Container>
  );
};

export default BudgetOverview;
