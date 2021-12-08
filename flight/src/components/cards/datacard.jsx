import React, { useEffect, useState } from "react";

import { Row, Col, Button, Collapse, Container } from "react-bootstrap";

const DataCard = ({ ...props }) => {
  const { header, dataToPresent, dataUnitSymbol, description, text1, text2 } =
    props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Row>
        <Col>
        {props.children}
          {/* {text1 ? text1 : <div className="data-card-header">{text1}</div>}
          <span className="data-card-1">
            {dataToPresent ? dataToPresent : "No input yet"}
          </span>{" "}
          <span className="data-card-2">
            {dataUnitSymbol ? dataUnitSymbol : ""}
          </span>
          {text2 ? text2 : <div className="data-card-header">{text2}</div>} */}
          {/* {description && (
          <>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls={`${header}-text`}
              aria-expanded={open}
              //   style={{borderRadius:"100%"}}
            >
              {" "}
              More info
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
        )} */}
        </Col>
      </Row>
    </>
  );
};
export default DataCard;
