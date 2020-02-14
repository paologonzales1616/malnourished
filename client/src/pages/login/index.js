import React, { useEffect, useContext, useState } from "react";
import { config } from "../../core/config/";
import * as Yup from "yup";
import { Formik, Form as FormikForm } from "formik";
import { Card, Form, Button, InputGroup } from "react-bootstrap";
import styles from "./index.module.css";
import { withRouter } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { UserContext, BrgyContext } from "../../core/utils/Store";
import { BARANGAY_PROPERITES } from "../../core/utils/Constants";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const Index = ({ history }) => {
  const { brgy, setBrgy } = useContext(BrgyContext);
  const { setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = async values => {
    console.log(values);
    const options = {
      headers: config.headers,
      method: "POST",
      body: JSON.stringify({
        ...values
      })
    };
    const res = await fetch(`${config.host}/auth`, options);
    const content = await res.json();
    console.log(content);

    if (content.status == "fail") {
      notifyA();
      return;
    }
    setUser({
      loggedIn: true,
      accountType: content.account_type
    });

    localStorage.setItem("accountType", content.account_type);
    if (content.account_type == "admin") {
      await history.push("/admin");
    }
    localStorage.setItem("brgy", values.brgy);
    setBrgy(
      BARANGAY_PROPERITES.findIndex(e => e.brgy == localStorage.getItem("brgy"))
    );
    await history.push("/home");
  };

  useEffect(() => {
    document.title = config.title + " | Login";
  }, []);

  const SigninSchema = Yup.object().shape({
    username: Yup.string().required("Username is required."),
    password: Yup.string().required("Password is required"),
    brgy: Yup.string().required("Brgy is required")
  });

  const notifyA = () =>
    toast.error(`Error Invalid Username or Password`, { containerId: "A" });

  return (
    <div>
      <ToastContainer
        enableMultiContainer
        containerId={"A"}
        position={toast.POSITION.TOP_RIGHT}
      />
      <div className={styles.left + " shadow"}>
        <Card className={styles.form_login + " shadow"}>
          <h3 style={{ paddingBottom: "10px" }}>Login</h3>
          <Formik
            initialValues={{
              username: "",
              password: "",
              brgy: "anos"
            }}
            validationSchema={SigninSchema}
            onSubmit={values => onLogin(values)}
          >
            {({ errors, touched, handleChange, values }) => (
              <FormikForm>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
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
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && errors.password}
                      placeholder="Enter Password"
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
                <Button
                  className="shadow"
                  block
                  variant="secondary"
                  size="sm"
                  type="submit"
                >
                  Login
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Card>
      </div>
      <div className={styles.right}>
        <img src={logo} alt="Map Logo" className={styles.map} />
      </div>
    </div>
  );
};

export default withRouter(Index);
