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
    },
    age: {
      age_0_5: 0,
      age_6_11: 0,
      age_12_23: 0,
      age_24_35: 0,
      age_36_47: 0,
      age_48_59: 0,
      age_60_71: 0
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
                    render: "value",
                    // precision: 2,
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
        <Col sm={12} md={6}>
          <Card className="shadow-sm p-2 text-center">
            <p>AGE SUMMARY</p>
            <Pie
              options={{
                responsive: true,
                plugins: {
                  labels: {
                    render: "value",
                    // precision: 2,
                    fontColor: [
                      "white",
                      "white",
                      "white",
                      "white",
                      "white",
                      "white",
                      "white"
                    ],
                    fontSize: 16
                  }
                }
              }}
              data={{
                datasets: [
                  {
                    data: [
                      brgyData.age.age_0_5,
                      brgyData.age.age_6_11,
                      brgyData.age.age_12_23,
                      brgyData.age.age_24_35,
                      brgyData.age.age_36_47,
                      brgyData.age.age_48_59,
                      brgyData.age.age_60_71
                    ],
                    backgroundColor: [
                      "#ff6384",
                      "#36a2eb",
                      "#ff9f40",
                      "#ffcd56",
                      "#4bc0c0",
                      "#f48024",`
                      "#989bd0"`
                    ]
                  }
                ],
                labels: [
                  "0-5 Months",
                  "6-11 Months",
                  "12-23 Months",
                  "24-35 Months",
                  "36-47 Months",
                  "48-59 Months",
                  "60-71 Months"
                ]
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>WEIGHT FOR AGE SUMMARY (0-59 MONTHS)</p>
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
                datasets: [],
                labels: [
                  "Normal",
                  "Overweight",
                  "Underweight",
                  "Severely Underweight"
                ]
              }}
            />
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>HEIGHT FOR AGE SUMMARY (0-59 MONTHS)</p>
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
                datasets: [],
                labels: ["Normal", "Tall", "Stunted", "Severely Stunted"]
              }}
            />
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>WEIGHT FOR HEIGHT/LENGTH SUMMARY (0-59 MONTHS)</p>
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
                datasets: [],
                labels: [
                  "Normal",
                  "Overweight",
                  "Obese",
                  "Wasted",
                  "Severely Wasted"
                ]
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>WEIGHT FOR AGE SUMMARY (0-71 MONTHS)</p>
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
                datasets: [],
                labels: [
                  "Normal",
                  "Overweight",
                  "Underweight",
                  "Severely Underweight"
                ]
              }}
            />
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>HEIGHT FOR AGE SUMMARY (0-71 MONTHS)</p>
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
                datasets: [],
                labels: ["Normal", "Tall", "Stunted", "Severely Stunted"]
              }}
            />
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>WEIGHT FOR HEIGHT/LENGTH SUMMARY (0-71 MONTHS)</p>
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
                datasets: [],
                labels: [
                  "Normal",
                  "Overweight",
                  "Obese",
                  "Wasted",
                  "Severely Wasted"
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
