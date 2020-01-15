import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import Content from "../../components/content/Content";
import { AppContext } from "../../core/utils/Store";
import { config } from "../../core/config";
import { Row, Col, Card } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { HEADERS } from "../../core/utils/Constants";
import "chartjs-plugin-labels";
const Index = () => {
  const { app, setApp } = useContext(AppContext);
  const [brgyData, setBrgyData] = useState({
    sex: {
      female: 0,
      male: 0
    }
  });

  useEffect(() => {
    document.title = config.title + " | Data Visualization";
    setApp({ ...app, page: "visualization" });
    localStorage.page = "visualization";
  }, []);

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const optionsLegend = {
      headers: HEADERS
    };
    try {
      const res = await fetch(`/data/0/2019`, optionsLegend);
      const data = await res.json();
      console.log(data);
      setBrgyData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Content>
      <Row className="pb-3">
        <Col sm={12} md={6}>
          <Card className="shadow-sm p-2 text-center">
            <p>PERCENTAGE OF MALE AND FEMALE CHILDREN</p>
            <Pie
              options={{
                responsive: true,
                plugins: {
                  labels: {
                    render: "percentage",
                    precision: 2,
                    fontColor: ["white", "white"],
                    fontSize: 16
                  }
                }
              }}
              data={{
                datasets: [
                  {
                    data: [brgyData.sex.female, brgyData.sex.male],
                    backgroundColor: ["#ff6384", "#36a2eb"]
                  }
                ],
                labels: [`Female`, `Male`]
              }}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Index;
