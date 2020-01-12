import React, { useContext, useEffect } from "react";
import Content from "../../components/content/Content";
import { AppContext } from "../../core/utils/Store";
import { config } from "../../core/config";

const Index = () => {
  const { app, setApp } = useContext(AppContext);

  useEffect(() => {
    document.title = config.title + " | About";
    setApp({ ...app, page: "about" });
    localStorage.page = "about";
  }, []);
  return <Content>About</Content>;
};

export default Index;
