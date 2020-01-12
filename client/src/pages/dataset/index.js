import React, { useContext, useEffect } from "react";
import Content from "../../components/content/Content";
import { AppContext } from "../../core/utils/Store";
import { config } from "../../core/config";

const Index = () => {
  const { app, setApp } = useContext(AppContext);

  useEffect(() => {
    document.title = config.title + " | Dataset";
    setApp({ ...app, page: "dataset" });
    localStorage.page = "dataset";
  }, []);
  return <Content>Dataset</Content>;
};

export default Index;
