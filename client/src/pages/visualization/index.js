import React, { useContext, useEffect } from "react";
import Content from "../../components/content/Content";
import { AppContext } from "../../core/utils/Store";
import { config } from "../../core/config";

const Index = () => {
  const { app, setApp } = useContext(AppContext);

  useEffect(() => {
    document.title = config.title + " | Data Visualization";
    setApp({ ...app, page: "visualization" });
    localStorage.page = "visualization";
  }, []);
  return <Content>Data Visualization</Content>;
};

export default Index;
