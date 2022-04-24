import React from "react";
// import ProgressBar from "react-bootstrap/ProgressBar";
import { Row, Col, Container } from "react-bootstrap";
// import { FlightsContext } from "../contexts/FlightsContext";
import chroma from "chroma-js";

const ColorScale = ({ ...props }) => {
  const { max, steps, } = props;
  // const { max, steps } = props;
  var colsteps = steps ? steps : 10;
  var chromaScale = chroma
    .scale("OrRd")
    .domain([0, max])
    .classes(colsteps)
    .padding([0.2, 0]);
  //   console.log("chroma", chromaScale.colors(5));

  return (
    <Container>
      <Row
        style={{
          //  marginTop: "1rem",
          fontSize: "14px",
        }}
      >
        (CO2e kg)
      </Row>
      <Row>
        {chromaScale.colors(colsteps).map((color, index) => {
          return (
            <Col
              key={`color-scale-${index}`}
              style={{
                display: "inline",
                fontSize: "7px",
                width: "30px",
                minWidth: "20px",
                height: "10px",
                backgroundColor: `${color}`,
                padding: 0,
                borderRight: "1px solid black",
              }}
            >
              <span
                style={{
                  position: "relative",
                  top: 10,
                  fontSize: "10px",
                }}
              >
                {Math.floor((max / colsteps) * (index + 1))}
              </span>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ColorScale;
