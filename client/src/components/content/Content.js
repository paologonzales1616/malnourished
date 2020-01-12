import React, { useContext } from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "./Navigationbar";
import SideBar from "../sidebar/SideBar";
import { AppContext } from "../../core/utils/Store";

const Content = ({ children }) => {
  const { app, setApp } = useContext(AppContext);

  return (
    <div className="App wrapper">
      <SideBar />
      <Container
        fluid
        className={classNames("content", { "is-open": app.isOpen })}
      >
        <NavBar
          toggle={() =>
            setApp({
              ...app,
              IsOpen: !app.isOpen
            })
          }
        />
        {children}
      </Container>
    </div>
  );
};

export default Content;
