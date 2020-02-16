/* eslint-disable eqeqeq */
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { AppContext } from "../../core/utils/Store";
import { Link, withRouter } from "react-router-dom";
import { routes } from "../../core/config/routes";
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
        {routes.map((value, index) => {
          if (
            value.account_type.includes(localStorage.getItem("accountType"))
          ) {
            return (
              <Nav.Item
                key={index}
                className={classNames({ active: value.page == app.page })}
              >
                <Link className="nav-link" to={`/${value.page}`}>
                  <FontAwesomeIcon icon={value.icon} className="mr-2" />
                  {value.name}
                </Link>
              </Nav.Item>
            );
          }
        })}
      </Nav>
    </div>
  );
};

export default withRouter(SideBar);
