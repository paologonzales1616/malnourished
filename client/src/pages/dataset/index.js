import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Content from "../../components/content/Content";
import { AppContext, BrgyContext, DateContext } from "../../core/utils/Store";
import { config } from "../../core/config";
import { Card, Row, Col, Button, Table, Modal } from "react-bootstrap";
import { BARANGAY_PROPERITES } from "../../core/utils/Constants";
const Index = () => {
  const { app, setApp } = useContext(AppContext);
  const { brgy, setBrgy } = useContext(BrgyContext);
  const { date, setDate } = useContext(DateContext);
  const [dataset, setDataset] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(0); // Selected index for delete

  useEffect(() => {
    document.title = config.title + " | Dataset";
    setApp({ ...app, page: "dataset" });
    localStorage.page = "dataset";
  }, []);

  useLayoutEffect(() => {
    getDataset();
  }, [date, brgy]);

  async function getDataset() {
    const options = {
      header: config.headers
    };

    try {
      if (localStorage.getItem("accountType") == "user") {
        const res = await fetch(
          `${config.host}/dataset/${BARANGAY_PROPERITES.findIndex(
            e => e.brgy == localStorage.getItem("brgy")
          )}/${date}`,
          options
        );
        const body = await res.json();
        if (body.message) {
          setDataset([]);
          return;
        }
        setDataset(body);
        console.log(body);
      } else {
        const res = await fetch(
          `${config.host}/dataset/${brgy}/${date}`,
          options
        );
        const body = await res.json();
        if (body.message) {
          setDataset([]);
          return;
        }
        setDataset(body);
        console.log(body);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleShowDelete = index => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleShowUpdate = user => {
    setShowUpdate(true);
  };

  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };

  const handleShowNew = () => {
    setShowNew(true);
  };

  const handleCloseNew = () => {
    setShowNew(false);
  };

  return (
    <Content>
      <Row>
        <Col sm={12} md={12}>
          <Card className="p-2 mb-3">
            <h5 className="p-0 m-0">
              You can download a sample dataset here.{" "}
              <a
                href="http://localhost:5000/sample"
                class="btn btn-sm btn-outline-success"
                target="_blank"
              >
                Download
              </a>
            </h5>
          </Card>
        </Col>
        <Col sm={12} md={12}>
          {dataset.length < 1 ? (
            <Card className="text-center p-2 mb-3">
              <h3 className="p-0 m-0">No Available Data</h3>
            </Card>
          ) : (
            <></>
          )}
        </Col>
        <Col className="text-center" sm={12} md={12}>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name of Child</th>
                <th>Indigenous Preschool Child?</th>
                <th>Sex</th>
                <th>Date of Birth</th>
                <th>Actual Date of Weighing</th>
                <th>Weight</th>
                <th>Height</th>
                <th>Age in Months</th>
                <th>Weight for Age Status</th>
                <th>Height for Age Status</th>
                <th>Height for Length/Height Status</th>
                <th width="15%">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataset.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data["Full Name of Child"]}</td>
                  <td>{data["Indigenous Preschool Child?"]}</td>
                  <td>{data["Sex"]}</td>
                  <td>{data["Date of Birth"]}</td>
                  <td>{data["Actual Date of Weighing"]}</td>
                  <td>{data["Weight"]}</td>
                  <td>{data["Height"]}</td>
                  <td>{data["Age in Months"]}</td>
                  <td>{data["Weight for Age Status"]}</td>
                  <td>{data["Height for Age Status"]}</td>
                  <td>{data["Height for Length/Height Status"]}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleShowDelete()}
                    >
                      Delete
                    </Button>{" "}
                    <Button size="sm" variant="secondary">
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {}}>
            Yes
          </Button>
          <Button variant="outline-secondary" onClick={handleCloseDelete}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </Content>
  );
};

export default Index;
