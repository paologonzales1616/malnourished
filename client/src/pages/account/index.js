import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import Content from "../../components/content/Content";
import { AppContext } from "../../core/utils/Store";
import { config } from "../../core/config";
import {
  Container,
  Table,
  Card,
  Button,
  Row,
  Col,
  Modal,
  InputGroup,
  FormControl,
  Form
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCog,
  faPlus,
  faEyeSlash,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { Formik, Form as FormikForm } from "formik";
import { BARANGAY_PROPERITES } from "../../core/utils/Constants";
import { ToastContainer, toast } from "react-toastify";

const Index = () => {
  const { app, setApp } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ index: 0, brgy: "anos" }); // Selected user for update
  const [selectedUserIndex, setSelectedUserIndex] = useState(0); // Selected index for delete

  useEffect(() => {
    document.title = config.title + " | Account List";
    setApp({ ...app, page: "account" });
    localStorage.page = "account";
  }, []);

  useLayoutEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const options = {
      headers: config.headers
    };
    const res = await fetch(`${config.host}/accounts`, options);
    const body = await res.json();
    setUsers(body);
  }

  async function deleteUser() {
    console.log(selectedUserIndex);
    const options = {
      headers: config.headers,
      method: "DELETE",
      body: JSON.stringify({
        userIndex: selectedUserIndex
      })
    };
    const res = await fetch(`${config.host}/accounts`, options);
    const body = await res.json();
    handleCloseDelete();
    getUsers();
    notifyDelete();
  }

  async function updateUser(password) {
    console.log(password);
    const options = {
      headers: config.headers,
      method: "PUT",
      body: JSON.stringify({
        index: selectedUser.index,
        ...password
      })
    };
    const res = await fetch(`${config.host}/accounts`, options);
    const body = await res.json();
    handleCloseUpdate();
    getUsers();
    setShowPassword(false);
    notifyUpdate();
  }

  async function newUser(user) {
    const options = {
      headers: config.headers,
      method: "POST",
      body: JSON.stringify({
        ...user
      })
    };
    const res = await fetch(`${config.host}/accounts`, options);
    const body = await res.json();
    handleCloseNew();
    getUsers();
    setShowPassword(false);
    notifyNew();
  }

  const handleShowDelete = index => {
    setSelectedUserIndex(index);
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleShowUpdate = user => {
    setSelectedUser(user);
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

  const NewUserSchema = Yup.object().shape({
    username: Yup.string().required("Username is required."),
    password: Yup.string().required("Password is required."),
    brgy: Yup.string().required("Brgy is required")
  });

  const UpdateUserSchema = Yup.object().shape({
    password: Yup.string().required("Password is required.")
  });

  const notifyNew = () =>
    toast.info(`New User Added!`, { containerId: "NEW" });
  const notifyDelete = () =>
    toast.info(`Delete Success!`, { containerId: "DELETE" });
  const notifyUpdate = () =>
    toast.info(`Update Success!`, { containerId: "UPDATE" });

  return (
    <Content>
      <ToastContainer
        enableMultiContainer
        containerId={"NEW"}
        position={toast.POSITION.TOP_RIGHT}
      />{" "}
      <ToastContainer
        enableMultiContainer
        containerId={"DELETE"}
        position={toast.POSITION.TOP_RIGHT}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"UPDATE"}
        position={toast.POSITION.TOP_RIGHT}
      />
      <Container>
        <Row className="mb-2">
          <Col sm={12} md={12}>
            <Button
              className="mr-1 float-right"
              size="sm"
              variant="outline-success"
              onClick={() => handleShowNew(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              New Account
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            <Card className="p-2 text-center">
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Brgy.</th>
                    <th width="35%">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.username}</td>
                      <td>
                        {
                          BARANGAY_PROPERITES[
                            BARANGAY_PROPERITES.findIndex(
                              i => i.brgy === data.brgy
                            )
                          ].name
                        }
                      </td>
                      <td>
                        <Button
                          className="mr-1"
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleShowDelete(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="mr-2" />
                          Delete
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() =>
                            handleShowUpdate({ index: index, brgy: data.brgy })
                          }
                        >
                          <FontAwesomeIcon icon={faCog} className="mr-2" />
                          Update Password
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteUser()}>
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
          validationSchema={UpdateUserSchema}
          onSubmit={values => updateUser(values)}
        >
          {({ errors, touched, handleChange, values }) => (
            <FormikForm>
              <Modal.Header closeButton>
                <Modal.Title>Update User Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <InputGroup size="sm">
                    <FormControl
                      name="password"
                      type={showPassword ? "text" : "password"}
                      isInvalid={touched.password && errors.password}
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                          style={{
                            cursor: "pointer"
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  <div className="text-danger">
                    {touched.password && errors.password ? (
                      <small>{errors.password}</small>
                    ) : (
                      <></>
                    )}
                  </div>
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
          initialValues={{
            username: "",
            password: "",
            brgy: "anos"
          }}
          validationSchema={NewUserSchema}
          onSubmit={values => newUser(values)}
        >
          {({ errors, touched, handleChange, values }) => (
            <FormikForm>
              <Modal.Header closeButton>
                <Modal.Title>New User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <FormControl
                    size="sm"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && errors.username}
                    placeholder="Enter Username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <InputGroup size="sm">
                    <FormControl
                      name="password"
                      type={showPassword ? "text" : "password"}
                      isInvalid={touched.password && errors.password}
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                          style={{
                            cursor: "pointer"
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  <div className="text-danger">
                    {touched.password && errors.password ? (
                      <small>{errors.password}</small>
                    ) : (
                      <></>
                    )}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Brgy.</Form.Label>
                  <Form.Control
                    size="sm"
                    name="brgy"
                    value={values.brgy}
                    onChange={handleChange}
                    isInvalid={touched.brgy && errors.brgy}
                    as="select"
                  >
                    {BARANGAY_PROPERITES.map((data, index) => (
                      <option key={index} value={data.brgy}>
                        {data.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.brgy}
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
