import React, { useContext, useEffect } from "react";
import Content from "../../components/content/Content";
import { AppContext } from "../../core/utils/Store";
import { config } from "../../core/config";

const Index = () => {
  const { app, setApp } = useContext(AppContext);

  useEffect(() => {
    document.title = config.title + " | Account";
    setApp({ ...app, page: "account" });
    localStorage.page = "account";
  }, []);
  return <Content>Account</Content>;
};

export default Index;
