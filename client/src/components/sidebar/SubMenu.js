import React, { useState, useContext } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { AppContext } from "../../core/utils/Store";
import { Link } from "react-router-dom";

const SubMenu = ({ icon, title, items, links }) => {
  const [collapse, setCollapse] = useState(false);
  const { app, setApp } = useContext(AppContext);

  return (
    <Nav.Item
      className={classNames({ open: collapse, active: "account" == app.page })}
    >
      <Accordion>
        <Accordion.Toggle
          as={Nav.Link}
          variant="link"
          eventKey="0"
          onClick={() => setCollapse(!collapse)}
        >
          <FontAwesomeIcon icon={icon} className="mr-2" />
          {title}
          <FontAwesomeIcon
            icon={collapse ? faCaretDown : faCaretUp}
            className="float-right"
          />
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="0">
          <Nav className="nav flex-column">
            {items.map((item, index) => (
              <Nav.Item
                style={{ backgroundColor: "#f1f1f1", color: "#adb5bd" }}
                key={index}
                className={``}
              >
                <Link className="nav-link" to={`/account/${links[index]}`}>
                  {item}
                </Link>
              </Nav.Item>
            ))}
          </Nav>
        </Accordion.Collapse>
      </Accordion>
    </Nav.Item>
  );
};

export default SubMenu;
