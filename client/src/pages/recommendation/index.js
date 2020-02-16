import React, { useEffect, useContext } from "react";
import Content from "../../components/content/Content";
import { AppContext } from "../../core/utils/Store";
import { config } from "../../core/config";
import { Row, Col, Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const Index = () => {
  const { app, setApp } = useContext(AppContext);

  useEffect(() => {
    document.title = config.title + " | Recommendation";
    setApp({ ...app, page: "recommendation" });
    localStorage.page = "recommendation";
  }, []);

  return (
    <Content>
      <Row>
        <Col className="pb-3" sm={12} md={{ span: 8, offset: 2 }}>
          <Card className="shadow-sm p-2 text-center h-100">
            <p>TOP 3 BRGY. WEIGHT FOR AGE SUMMARY RECOMMENDATION</p>
            <Bar
              options={{
                responsive: true,
                legend: {
                  position: "top"
                },
                plugins: {
                  labels: {
                    render: "value",
                    // precision: 2,
                    fontColor: ["black", "black", "black"],
                    fontSize: 16
                  }
                }
              }}
              data={{
                datasets: [
                  {
                    data: [78, 74, 37],
                    backgroundColor: ["#ff6384", "#36a2eb", "#ff9f40"],
                    label: "Brgys."
                  }
                ],
                labels: ["San Antonio", "Batong Malake", "Baybayin"]
              }}
            />
          </Card>
        </Col>
        <Col className="pb-3" sm={12} md={{ span: 8, offset: 2 }}>
          <Card className="shadow-sm p-2 text-center h-100">
            <p>TOP 3 BRGY. HEIGHT FOR AGE SUMMARY RECOMMENDATION</p>
            <Bar
              options={{
                responsive: true,
                legend: {
                  position: "top"
                },
                plugins: {
                  labels: {
                    render: "value",
                    // precision: 2,
                    fontColor: ["black", "black", "black"],
                    fontSize: 16
                  }
                }
              }}
              data={{
                datasets: [
                  {
                    data: [7, 0, 0],
                    backgroundColor: ["#ff6384", "#36a2eb", "#ff9f40"],
                    label: "Brgys."
                  }
                ],
                labels: ["Anos", "Batong Malake", "San Antonio"]
              }}
            />
          </Card>
        </Col>
        <Col className="pb-3" sm={12} md={{ span: 8, offset: 2 }}>
          <Card className="shadow-sm p-2 text-center h-100">
            <p>TOP 3 BRGY. WEIGHT FOR HEIGHT/LENGTH SUMMARY RECOMMENDATION</p>
            <Bar
              options={{
                responsive: true,
                legend: {
                  position: "top"
                },
                plugins: {
                  labels: {
                    render: "value",
                    // precision: 2,
                    fontColor: ["black", "black", "black"],
                    fontSize: 16
                  }
                }
              }}
              data={{
                datasets: [
                  {
                    data: [93, 63, 46],
                    backgroundColor: ["#ff6384", "#36a2eb", "#ff9f40"],
                    label: "Brgys."
                  }
                ],
                labels: ["Batong Malake", "Baybayin", "San Antonio"]
              }}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Index;
