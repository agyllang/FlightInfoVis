import React, { useEffect, useState } from "react";

import { Row, Col, Button, Collapse, Container } from "react-bootstrap";

const DataCard = ({ ...props }) => {
  const { header, dataToPresent, dataUnitSymbol, description } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Col md={2} className="data-card">
        <div className="data-card-header">
          {header ? header : "Header goes here"}
        </div>
        <Row className="" >
          <Col md={"auto"}className="data-card-1">
            {dataToPresent ? dataToPresent : "No input yet"}
          </Col>
          <Col md={"auto"} className="data-card-2">
            {dataUnitSymbol ? dataUnitSymbol : ""}
          </Col>
        </Row>

        {description && (
          <>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls={`${header}-text`}
              aria-expanded={open}
            //   style={{borderRadius:"100%"}}

            > More info
              
            </Button>
            <Collapse in={open}>
              <div id={`${header}-text`}>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </Collapse>
          </>
        )}
      </Col>
    </>
  );
};
export default DataCard;
