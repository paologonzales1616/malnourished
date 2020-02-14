/* eslint-disable eqeqeq */
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTimes,
  faInfoCircle,
  faDatabase,
  faChartLine,
  faChartBar,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { AppContext } from "../../core/utils/Store";
import { Link, withRouter } from "react-router-dom";
const SideBar = () => {
  const { app, setApp } = useContext(AppContext);

  return (
    <div className={classNames("sidebar shadow", { "is-open": app.isOpen })}>
      <div className="sidebar-header pt-3 pb-3">
        <Button
          variant="link"
          onClick={() =>
            setApp({
              ...app,
              isOpen: !app.isOpen
            })
          }
          style={{ color: "#000" }}
          className="mt-4"
        >
          <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
        </Button>
      </div>

      <Nav className="flex-column pt-2">
        <Nav.Item className={classNames({ active: "home" == app.page })}>
          <Link className="nav-link" to="/home">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </Link>
        </Nav.Item>
        <Nav.Item className={classNames({ active: "prediction" == app.page })}>
          <Link className="nav-link" to="/prediction">
            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            Prediction
          </Link>
        </Nav.Item>
        <Nav.Item
          className={classNames({ active: "visualization" == app.page })}
        >
          <Link className="nav-link" to="/visualization">
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            Data Visualization
          </Link>
        </Nav.Item>
        <Nav.Item className={classNames({ active: "dataset" == app.page })}>
          <Link className="nav-link" to="/dataset">
            <FontAwesomeIcon icon={faDatabase} className="mr-2" />
            Dataset
          </Link>
        </Nav.Item>
        {localStorage.getItem("accountType") == "admin" ? (
          <Nav.Item className={classNames({ active: "account" == app.page })}>
            <Link className="nav-link" to="/account">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Account
            </Link>
          </Nav.Item>
        ) : (
          <></>
        )}

        <Nav.Item className={classNames({ active: "about" == app.page })}>
          <Link className="nav-link" to="/about">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            About
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default withRouter(SideBar);
