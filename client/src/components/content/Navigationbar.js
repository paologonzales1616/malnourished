import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Button,
  Nav,
  Form,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { AppContext, BrgyContext, DateContext } from "../../core/utils/Store";
import { withRouter } from "react-router-dom";
import { BARANGAY_PROPERITES } from "../../core/utils/Constants";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
const Navigationbar = ({ history }) => {
  const { app, setApp } = useContext(AppContext);
  const { brgy, setBrgy } = useContext(BrgyContext);
  const { date, setDate } = useContext(DateContext);
  return (
    <Navbar
      bg="light"
      className="navbar shadow-sm p-3 mb-3 bg-white rounded"
      expand
    >
      <Button
        variant="outline-danger"
        onClick={() => setApp({ ...app, isOpen: !app.isOpen })}
      >
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto pt-2" navbar>
          {app.page != "account" &&
          app.page != "about" &&
          app.page != "home" ? (
            <>
              {app.page != "prediction" ? (
                <Datetime
                  className="mr-1"
                  value={date}
                  dateFormat="YYYY"
                  timeFormat={false}
                  onChange={date => setDate(date._d.getFullYear().toString())}
                />
              ) : (
                <></>
              )}
              <Form.Control
                value={brgy}
                onChange={e => setBrgy(e.target.value)}
                as="select"
                className="mr-5"
              >
                {BARANGAY_PROPERITES.map((val, index) => (
                  <option value={index} key={index}>
                    {val.name}
                  </option>
                ))}
              </Form.Control>
            </>
          ) : (
            <></>
          )}
          <OverlayTrigger
            placement="auto"
            overlay={<Tooltip>Sign Out</Tooltip>}
          >
            <Nav.Link
              onClick={e => {
                e.preventDefault();
                history.push("/login");
                localStorage.removeItem("accountType");
                localStorage.removeItem("brgy")
              }}
              href="#"
            >
              <FontAwesomeIcon size="lg" icon={faPowerOff} />
            </Nav.Link>
          </OverlayTrigger>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigationbar);
