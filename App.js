import React from "react";
import Grid from "./Grid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ContainerInfo() {
  return (
    <Container>
      <Row>
        <Col>
          <Grid />
        </Col>
      </Row>
    </Container>
  );
}

export default ContainerInfo;
