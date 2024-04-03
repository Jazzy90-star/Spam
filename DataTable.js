import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

function DataTable(props) {
  console.log("dataTable", props);
  const [loadingData, setLoadingData] = useState(true);
  // const [data, setData] = useState([]);
  const click = (id) => {
    const rowData = props.data.find((row) => row.id === id);
    props.updateData(id, rowData);
  };

  //this is getting the data from my api to use
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          "https://66031c0b2393662c31ce92dc.mockapi.io/spam"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        props.setData(jsonData);
        setLoadingData(false);
      } catch (error) {
        console.error(error);
        setLoadingData(false);
      }
    }

    if (loadingData) {
      getData();
    }
  }, [loadingData]);

  //Updating the data from the table. this pushes the data from the table to the form and updates it and sends it back to the table with the updated information

  const update = async (id, newValue) => {
    console.log("updating api");
    try {
      const response = await fetch(
        `https://66031c0b2393662c31ce92dc.mockapi.io/spam/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyName: newValue }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      setLoadingData(true);

      //get request
      async function getData() {
        try {
          const response = await fetch(
            "https://66031c0b2393662c31ce92dc.mockapi.io/spam"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();
          props.setData(jsonData);
          setLoadingData(false);
        } catch (error) {
          console.error(error);
          setLoadingData(false);
        }
      }
      if (loadingData) {
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  //this deletes the data in the table
  const deleteRow = async (id) => {
    console.log("deleteRow id", parseInt(id));
    try {
      const response = await fetch(
        `https://66031c0b2393662c31ce92dc.mockapi.io/spam/${parseInt(id)}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete data");
      }
      props.setData((prevData) => prevData.filter((row) => row.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    //this is my table organized. I have my headers and my information in my table is connected with my api. i also have included an update and delete button
    <div className="App">
      {loadingData ? (
        <p>Loading Please wait...</p>
      ) : (
        <Table responsive="xl">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Suggestions</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((row, index) => (
              <tr key={index} onClick={() => click(row.id)}>
                <td>{row.FirstName}</td>
                <td>{row.LastName}</td>
                <td>{row.PhoneNumber}</td>
                <td>{row.Email}</td>
                <td>{row.Suggestions}</td>
                <td>
                  <button onClick={() => update(row.id, "updated")}>
                    Update
                  </button>{" "}
                  <br></br>
                  <button onClick={() => deleteRow(row.id, "delete")}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default DataTable;
