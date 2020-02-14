import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import Content from "../../components/content/Content";
import { AppContext, DateContext, BrgyContext } from "../../core/utils/Store";
import { config } from "../../core/config";
import { Row, Col, Card } from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import {
  HEADERS,
  DATA_VISUALIZATION_MODEL,
  BARANGAY_PROPERITES
} from "../../core/utils/Constants";
import "chartjs-plugin-labels";
const Index = () => {
  const { app, setApp } = useContext(AppContext);
  const { date, setDate } = useContext(DateContext);
  const { brgy, setBrgy } = useContext(BrgyContext);
  const [brgyData, setBrgyData] = useState(DATA_VISUALIZATION_MODEL);

  useEffect(() => {
    document.title = config.title + " | Data Visualization";
    setApp({ ...app, page: "visualization" });
    localStorage.page = "visualization";
  }, []);

  useLayoutEffect(() => {
    fetchData();
  }, [date, brgy]);

  const fetchData = async () => {
    const optionsLegend = {
      headers: HEADERS
    };
    try {
      if (localStorage.getItem("accountType") == "user") {
        const res = await fetch(
          `${config.host}/data/${BARANGAY_PROPERITES.findIndex(
            e => e.brgy == localStorage.getItem("brgy")
          )}/${date}`,
          optionsLegend
        );
        const data = await res.json();
        console.log(data);
        if (data.message) {
          setBrgyData(DATA_VISUALIZATION_MODEL);
          return;
        }
        setBrgyData(data);
      } else {
        const res = await fetch(
          `${config.host}/data/${brgy}/${date}`,
          optionsLegend
        );
        const data = await res.json();
        console.log(data);
        if (data.message) {
          setBrgyData(DATA_VISUALIZATION_MODEL);
          return;
        }
        setBrgyData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Content>
      <Row className="pb-3">
        <Col sm={12} md={12}>
          {brgyData.sex.female == 0 || brgyData.sex.male == 0 ? (
            <Card className="text-center p-2 mb-3">
              <h3 className="p-0 m-0">No Available Data</h3>
            </Card>
          ) : (
            <></>
          )}
        </Col>
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
                    fontColor: [
                      "black",
                      "black",
                      "black",
                      "black",
                      "black",
                      "black",
                      "black"
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
                      "#f48024",
                      "#989bd0"
                    ],
                    label: "AGE SUMMARY"
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
            <p>WEIGHT FOR AGE SUMMARY (0-71 MONTHS)</p>
            <Bar
              options={{
                responsive: true,
                plugins: {
                  labels: {
                    render: "value",
                    fontColor: ["black", "black", "black", "black"]
                  }
                }
              }}
              data={{
                datasets: [
                  {
                    data: [
                      brgyData.getWeightForAge071.normal,
                      brgyData.getWeightForAge071.overweight,
                      brgyData.getWeightForAge071.underweight,
                      brgyData.getWeightForAge071.severely_underweight
                    ],
                    backgroundColor: [
                      "#ff6384",
                      "#36a2eb",
                      "#ff9f40",
                      "#ffcd56"
                    ],
                    label: "WEIGHT FOR AGE SUMMARY (0-71 MONTHS)"
                  }
                ],
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
            <Bar
              options={{
                responsive: true,
                plugins: {
                  labels: {
                    render: "value",
                    fontColor: ["black", "black", "black", "black"]
                  }
                }
              }}
              data={{
                datasets: [
                  {
                    data: [
                      brgyData.getHeightForAge071.normal,
                      brgyData.getHeightForAge071.tall,
                      brgyData.getHeightForAge071.stunted,
                      brgyData.getHeightForAge071.severely_stunted
                    ],
                    backgroundColor: [
                      "#ff6384",
                      "#36a2eb",
                      "#ff9f40",
                      "#ffcd56"
                    ],
                    label: "HEIGHT FOR AGE SUMMARY (0-71 MONTHS)"
                  }
                ],
                labels: ["Normal", "Tall", "Stunted", "Severely Stunted"]
              }}
            />
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center">
            <p>WEIGHT FOR HEIGHT/LENGTH SUMMARY (0-71 MONTHS)</p>
            <Bar
              options={{
                responsive: true,
                plugins: {
                  labels: {
                    render: "value",
                    fontColor: ["black", "black", "black", "black", "black"]
                  }
                }
              }}
              data={{
                datasets: [
                  {
                    data: [
                      brgyData.getWeightForHeightLength071.normal,
                      brgyData.getWeightForHeightLength071.overweight,
                      brgyData.getWeightForHeightLength071.obese,
                      brgyData.getWeightForHeightLength071.wasted,
                      brgyData.getWeightForHeightLength071.severely_wasted
                    ],
                    backgroundColor: [
                      "#ff6384",
                      "#36a2eb",
                      "#ff9f40",
                      "#ffcd56",
                      "#bc98f5"
                    ],
                    label: "WEIGHT FOR HEIGHT/LENGTH SUMMARY (0-71 MONTHS)"
                  }
                ],
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
