import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import Content from "../../components/content/Content";
import { AppContext, BrgyContext } from "../../core/utils/Store";
import { config } from "../../core/config";
import { DATA_VISUALIZATION_MODEL, HEADERS } from "../../core/utils/Constants";
import { Row, Col, Card } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";

const Index = () => {
  const { app, setApp } = useContext(AppContext);
  const { brgy, setBrgy } = useContext(BrgyContext);

  useEffect(() => {
    document.title = config.title + " | Prediction";
    setApp({ ...app, page: "prediction" });
    localStorage.page = "prediction";
  }, []);

  useLayoutEffect(() => {
    getPrediction();
  }, [brgy]);

  async function getPrediction() {
    const optionsLegend = {
      headers: HEADERS
    };
    try {
      const res = await fetch(
        `${config.host}/prediction/${brgy}`,
        optionsLegend
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Content>
      <Row>
        <Col className="pb-3" sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center h-100">
            <p>TOP 3 BRGY. WEIGHT FOR AGE SUMMARY RECOMMENDATION</p>
            <Bar />
          </Card>
        </Col>
        <Col className="pb-3" sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center h-100">
            <p>TOP 3 BRGY. HEIGHT FOR AGE SUMMARY RECOMMENDATION</p>
            <Bar />
          </Card>
        </Col>
        <Col className="pb-3" sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>TOP 3 BRGY. WEIGHT FOR HEIGHT/LENGTH SUMMARY RECOMMENDATION</p>
            <Bar />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="pb-3" sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>WEIGHT FOR AGE SUMMARY</p>
            <Line
              data={{
                datasets: [
                  {
                    label: `Normal`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(153, 255, 153, 1)",
                    borderColor: "rgba(0, 128, 0, 1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(153, 255, 153, 1)",
                    pointHoverBorderColor: "rgba(0, 128, 0, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  },
                  {
                    label: `Overweight`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 219, 153, 1)",
                    borderColor: "rgba(255, 165, 0,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 219, 153, 1)",
                    pointHoverBorderColor: "rgba(255, 165, 0,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  },
                  {
                    label: `Underweight`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 219, 153, 1)",
                    borderColor: "rgba(255, 165, 0,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 219, 153, 1)",
                    pointHoverBorderColor: "rgba(255, 165, 0,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  },
                  {
                    label: `Severely Underweight`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 219, 153, 1)",
                    borderColor: "rgba(255, 165, 0,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 219, 153, 1)",
                    pointHoverBorderColor: "rgba(255, 165, 0,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  }
                ]
              }}
            />
          </Card>
        </Col>
        <Col className="pb-3" sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>HEIGHT FOR AGE SUMMARY</p>
            <Line
              data={{
                datasets: [
                  {
                    label: `Normal`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(153, 255, 153, 1)",
                    borderColor: "rgba(0, 128, 0, 1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(153, 255, 153, 1)",
                    pointHoverBorderColor: "rgba(0, 128, 0, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  },
                  {
                    label: `Tall`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 219, 153, 1)",
                    borderColor: "rgba(255, 165, 0,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 219, 153, 1)",
                    pointHoverBorderColor: "rgba(255, 165, 0,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  },
                  {
                    label: `Stunted`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 219, 153, 1)",
                    borderColor: "rgba(255, 165, 0,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 219, 153, 1)",
                    pointHoverBorderColor: "rgba(255, 165, 0,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  },
                  {
                    label: `Severely Stunded`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 219, 153, 1)",
                    borderColor: "rgba(255, 165, 0,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 219, 153, 1)",
                    pointHoverBorderColor: "rgba(255, 165, 0,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  }
                ]
              }}
            />
          </Card>
        </Col>
        <Col className="pb-3" sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>WEIGHT FOR HEIGHT/LENGTH SUMMARY</p>
            <Line
              data={{
                datasets: [
                  {
                    label: `Actual`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(153, 255, 153, 1)",
                    borderColor: "rgba(0, 128, 0, 1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(153, 255, 153, 1)",
                    pointHoverBorderColor: "rgba(0, 128, 0, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  },
                  {
                    label: `Overweight`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 219, 153, 1)",
                    borderColor: "rgba(255, 165, 0,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 219, 153, 1)",
                    pointHoverBorderColor: "rgba(255, 165, 0,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  },
                  {
                    label: `Obese`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 219, 153, 1)",
                    borderColor: "rgba(255, 165, 0,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 219, 153, 1)",
                    pointHoverBorderColor: "rgba(255, 165, 0,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  },
                  {
                    label: `Wasted`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 219, 153, 1)",
                    borderColor: "rgba(255, 165, 0,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 219, 153, 1)",
                    pointHoverBorderColor: "rgba(255, 165, 0,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  },
                  {
                    label: `Severely Wasted`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 219, 153, 1)",
                    borderColor: "rgba(255, 165, 0,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 219, 153, 1)",
                    pointHoverBorderColor: "rgba(255, 165, 0,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: []
                  }
                ]
              }}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Index;
