import React, { useContext, useEffect } from "react";
import Content from "../../components/content/Content";
import { AppContext } from "../../core/utils/Store";
import { config } from "../../core/config";

const Index = () => {
  const { app, setApp } = useContext(AppContext);

  useEffect(() => {
    document.title = config.title + " | Prediction";
    setApp({ ...app, page: "prediction" });
    localStorage.page = "prediction";
  }, []);
  return <Content>Prediction</Content>;
};

export default Index;
