import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import DataTable from "./DataTable";

function Grid() {
  const [selectedRow, setSelectedRow] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    Suggestions: "",
  });
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  const updateData = (id, rowData) => {
    setSelectedRow(rowData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", selectedRow);
    await putRequest(selectedRow);
  };

  const putRequest = async (updatedData) => {
    console.log("updating api", updatedData);

    const response = await fetch(
      `https://66031c0b2393662c31ce92dc.mockapi.io/spam`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    const jsonData = await response.json();
    const responseGET = await fetch(
      "https://66031c0b2393662c31ce92dc.mockapi.io/spam"
    );

    const newData = await responseGET.json();
    setData(newData);

    setLoadingData(false);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <h1>How Do You ❤ Your Spam?</h1>
          <p>
            Enter the Information of the person you want to SPAM and make a
            recommendation for the message we will send them
          </p>
        </Row>
        <Col>
          <Row>
            <Form.Label>First Name </Form.Label>
            <Form.Control
              placeholder="First name"
              value={selectedRow.FirstName}
              onChange={(e) =>
                setSelectedRow({ ...selectedRow, FirstName: e.target.value })
              }
            />
            <br />
            <Form.Label>Last Name </Form.Label>
            <Form.Control
              placeholder="Last name"
              value={selectedRow.LastName}
              onChange={(e) =>
                setSelectedRow({ ...selectedRow, LastName: e.target.value })
              }
            />
          </Row>
        </Col>
        <h3>How would you like to send your SPAM?</h3>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Phone Number </Form.Label>
            <Form.Control
              type="Phone Number"
              placeholder="Phone Number"
              value={selectedRow.PhoneNumber}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  PhoneNumber: e.target.value,
                })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="Email"
              placeholder="Email"
              value={selectedRow.Email}
              onChange={(e) =>
                setSelectedRow({ ...selectedRow, Email: e.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Suggestions </Form.Label>
            <Form.Control
              type="Suggestions"
              placeholder="Suggestions"
              value={selectedRow.Suggestions}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  Suggestions: e.target.value,
                })
              }
            />
          </Form.Group>
        </Row>
        <Button type="submit">Submit</Button>
      </Form>
      <DataTable
        updateData={updateData}
        loadingData={loadingData}
        setloadingData={setLoadingData}
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default Grid;
