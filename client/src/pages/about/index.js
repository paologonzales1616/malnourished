import React, { useContext, useEffect } from "react";
import Content from "../../components/content/Content";
import { AppContext } from "../../core/utils/Store";
import { config } from "../../core/config";
import { Card, Container } from "react-bootstrap";

const Index = () => {
  const { app, setApp } = useContext(AppContext);

  useEffect(() => {
    document.title = config.title + " | About";
    setApp({ ...app, page: "about" });
    localStorage.page = "about";
  }, []);
  return (
    <Content>
      <Container>
        <Card className="text-center p-3 mb-3">
          <h2 className="p-0 m-0">About</h2>
        </Card>
        <Card className="p-3">
          Nutritional status is the condition of the body in those respects
          influenced by the diet; the levels of nutrients in the body and the
          ability of those levels to maintain normal metabolic integrity. It has
          three parameters to identify the nutritional status of the children
          which are the weight for age, height for age and weight for
          height/length. The Web-based Geographical Information for Spatial
          Nutritional Status Analysis and Visualization have these
          functionalities: It can save nutritional status of the children and
          can give geographical mapping through data collected. It can provide
          analytics through data visualization for the nutritional status of the
          children. It can identify the pattern of malnutrition through
          collected historical data. It prescribes target participants for
          conducting nutrition program. This project can be used by to the
          Municipal Nutrition Action Officer and Rural Health Unit of barangay
          to easily for them to check the nutritional status of the children in
          their barangay.
        </Card>
      </Container>
    </Content>
  );
};

export default Index;
