import React, { useContext, useEffect, useState } from "react";
import Content from "../../components/content/Content";
import { AppContext } from "../../core/utils/Store";
import { config } from "../../core/config";
import { DATA_VISUALIZATION_MODEL } from "../../core/utils/Constants";
import { Row, Col, Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const Index = () => {
  const { app, setApp } = useContext(AppContext);
  const [brgyData, setBrgyData] = useState(DATA_VISUALIZATION_MODEL);

  useEffect(() => {
    document.title = config.title + " | Prediction";
    setApp({ ...app, page: "prediction" });
    localStorage.page = "prediction";
  }, []);
  return (
    <Content>
      <Row className="pb-3">
        <Col sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>WEIGHT FOR AGE SUMMARY</p>
   
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>HEIGHT FOR AGE SUMMARY</p>
         
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>WEIGHT FOR HEIGHT/LENGTH SUMMARY</p>
  
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Index;
