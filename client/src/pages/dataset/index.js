import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Content from "../../components/content/Content";
import { AppContext, BrgyContext, DateContext } from "../../core/utils/Store";
import { config } from "../../core/config";
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
  FormControl
} from "react-bootstrap";
import { BARANGAY_PROPERITES } from "../../core/utils/Constants";
import * as Yup from "yup";
import { Formik, Form as FormikForm } from "formik";

const Index = () => {
  const { app, setApp } = useContext(AppContext);
  const { brgy, setBrgy } = useContext(BrgyContext);
  const { date, setDate } = useContext(DateContext);
  const [dataset, setDataset] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState({}); // Selected index for delete

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

  async function updateEntry(values) {
    const options = {
      headers: config.headers,
      method: "PUT",
      body: JSON.stringify({
        ...values
      })
    };

  }

  async function newUser(values) {
    const options = {
      headers: config.headers,
      method: "POST",
      body: JSON.stringify({
        ...values
      })
    };
  }

  const handleShowDelete = entry => {
    setSelectedEntry(entry);
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setSelectedEntry({});
    setShowDelete(false);
  };

  const handleShowUpdate = entry => {
    setSelectedEntry(entry);
    setShowUpdate(true);
  };

  const handleCloseUpdate = () => {
    setSelectedEntry({});
    setShowUpdate(false);
  };

  const handleShowNew = () => {
    setShowNew(true);
  };

  const handleCloseNew = () => {
    setShowNew(false);
  };

  const NewEntrySchema = Yup.object().shape({
    "Full Name of Child" : Yup.string().required("Full Name of Child is required."),
    Sex:  Yup.string().required(),
    "Date of Birth" :  Yup.string().required("Date of Birth is required."),
    "Actual Date of Weighing": Yup.string().required("Actual Date of Weighing is required."),
    Weight: Yup.string().required("Weight is required."),
    Height: Yup.string().required("Height is required."),
    "Age in Months": Yup.string().required("Age in Months is required"),
    "Weight for Age Status": Yup.string(),
    "Height for Age Status": Yup.string(),
    "Height for Length/Height Status": Yup.string()
  });

  const UpdateEntrySchema = Yup.object().shape({
    "Full Name of Child" : Yup.string().required("Full Name of Child is required."),
    Sex:  Yup.string().required(),
    "Date of Birth" :  Yup.string().required("Date of Birth is required."),
    "Actual Date of Weighing": Yup.string().required("Actual Date of Weighing is required."),
    Weight: Yup.string().required("Weight is required."),
    Height: Yup.string().required("Height is required."),
    "Age in Months": Yup.string().required("Age in Months is required"),
    "Weight for Age Status": Yup.string(),
    "Height for Age Status": Yup.string(),
    "Height for Length/Height Status": Yup.string()
  });

  return (
    <Content>
      <Row>
        <Col sm={12} md={12}>
          {dataset.length < 1 ? (
            <Card className="text-center p-2 mb-3">
              <h3 className="p-0 m-0">No Available Data</h3>
            </Card>
          ) : (
            <></>
          )}
        </Col>
        <Col sm={12} md={12}>
          <Button
            size="sm"
            variant="outline-success mb-3"
            className="float-right"
            onClick={() => handleShowNew()}
          >
            New Entry
          </Button>
        </Col>
        <Col className="text-center" sm={12} md={12}>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name of Child</th>
                {/* <th>Indigenous Preschool Child?</th> */}
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
                  {/* <td>{data["Indigenous Preschool Child?"]}</td> */}
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
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleShowUpdate()}
                    >
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
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Formik
          initialValues={{
            password: ""
          }}
          validationSchema={UpdateEntrySchema}
          onSubmit={values => updateEntry(values)}
        >
          {({ errors, touched, handleChange, values }) => (
            <FormikForm>
              <Modal.Header closeButton>
                <Modal.Title>Update Entry</Modal.Title>
              </Modal.Header>
 <Modal.Body>
                <Form.Group>
                  <Form.Label>Full Name of Child</Form.Label>
                  <FormControl
                    size="sm"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Full Name of Child"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Sex</Form.Label>
                  <Form.Control size="sm" as="select">
                    <option value="M">MALE</option>
                    <option value="F">FEMALE</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <FormControl
                    size="sm"
                    type="date"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Full Name of Child"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Actual Date of Weighing</Form.Label>
                  <FormControl
                    size="sm"
                    type="date"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Full Name of Child"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Weight</Form.Label>
                  <FormControl
                    size="sm"
                    type="number"
                    name="username"
                    step="0.01"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Weight"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Height</Form.Label>
                  <FormControl
                    size="sm"
                    type="number"
                    name="username"
                    step="0.01"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Height"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Age in Months</Form.Label>
                  <FormControl
                    size="sm"
                    type="date"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Full Name of Child"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Weight for Age Status</Form.Label>
                  <Form.Control size="sm" as="select">
                    <option value="N">NORMAL</option>
                    <option value="OW">OVWERWEIGHT</option>
                    <option value="UW">UNDERWEIGHT</option>
                    <option value="SUW">SEVERELY UNDERWEIGHT</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Height for Age Status</Form.Label>
                  <Form.Control size="sm" as="select">
                    <option value="N">NORMAL</option>
                    <option value="T">TALL</option>
                    <option value="St">STUNTED</option>
                    <option value="SSt">SEVERELY STUNTED</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Height for Length/Height Status</Form.Label>
                  <Form.Control size="sm" as="select">
                    <option value="N">NORMAL</option>
                    <option value="OW">OVERWEIGHT</option>
                    <option value="O">OBESE</option>
                    <option value="W">WASTED</option>
                    <option value="SW">SEVERELY WASTED</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="success" size="sm">
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={handleCloseUpdate}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
      <Modal show={showNew} onHide={handleCloseNew}>
        <Formik
          initialValues={{}}
          validationSchema={NewEntrySchema}
          onSubmit={values => newUser(values)}
        >
          {({ errors, touched, handleChange, values }) => (
            <FormikForm>
              <Modal.Header closeButton>
                <Modal.Title>New Entry</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Full Name of Child</Form.Label>
                  <FormControl
                    size="sm"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Full Name of Child"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Sex</Form.Label>
                  <Form.Control size="sm" as="select">
                    <option value="M">MALE</option>
                    <option value="F">FEMALE</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <FormControl
                    size="sm"
                    type="date"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Full Name of Child"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Actual Date of Weighing</Form.Label>
                  <FormControl
                    size="sm"
                    type="date"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Full Name of Child"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Weight</Form.Label>
                  <FormControl
                    size="sm"
                    type="number"
                    name="username"
                    step="0.01"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Weight"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Height</Form.Label>
                  <FormControl
                    size="sm"
                    type="number"
                    name="username"
                    step="0.01"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Height"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Age in Months</Form.Label>
                  <FormControl
                    size="sm"
                    type="date"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Full Name of Child"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Weight for Age Status</Form.Label>
                  <Form.Control size="sm" as="select">
                    <option value="N">NORMAL</option>
                    <option value="OW">OVWERWEIGHT</option>
                    <option value="UW">UNDERWEIGHT</option>
                    <option value="SUW">SEVERELY UNDERWEIGHT</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Height for Age Status</Form.Label>
                  <Form.Control size="sm" as="select">
                    <option value="N">NORMAL</option>
                    <option value="T">TALL</option>
                    <option value="St">STUNTED</option>
                    <option value="SSt">SEVERELY STUNTED</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Height for Length/Height Status</Form.Label>
                  <Form.Control size="sm" as="select">
                    <option value="N">NORMAL</option>
                    <option value="OW">OVERWEIGHT</option>
                    <option value="O">OBESE</option>
                    <option value="W">WASTED</option>
                    <option value="SW">SEVERELY WASTED</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  size="sm"
                  type="submit"
                  className="shadow"
                  variant="success"
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={handleCloseNew}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </Content>
  );
};

export default Index;
