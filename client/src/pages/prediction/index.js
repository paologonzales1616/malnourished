import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import Content from "../../components/content/Content";
import { AppContext, BrgyContext } from "../../core/utils/Store";
import { config } from "../../core/config";
import {
  DATA_VISUALIZATION_MODEL,
  HEADERS,
  BARANGAY_PROPERITES
} from "../../core/utils/Constants";
import { ToastContainer, toast } from "react-toastify";
import { Row, Col, Card } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
const Index = () => {
  const { app, setApp } = useContext(AppContext);
  const { brgy, setBrgy } = useContext(BrgyContext);
  const [prediction, setPrediction] = useState({
    getWeightForHeightLength: [],
    getHeightForAge: [],
    getWeightForAge: []
  });

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
      if (localStorage.getItem("accountType") == "user") {
        const res = await fetch(
          `${config.host}/prediction/${BARANGAY_PROPERITES.findIndex(
            e => e.brgy == localStorage.getItem("brgy")
          )}`,
          optionsLegend
        );
        const data = await res.json();
        if (data.message) {
          notifyA()
          return 
        }
        setPrediction(data);
        console.log(data);
      } else {
        const res = await fetch(
          `${config.host}/prediction/${brgy}`,
          optionsLegend
        );
        const data = await res.json();
        if (data.message) {
          notifyA()
          return 
        }
        setPrediction(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const notifyA = () =>
    toast.error(`No available prediction`, { containerId: "A" });
  return (
    <Content>
          <ToastContainer
        enableMultiContainer
        containerId={"A"}
        position={toast.POSITION.TOP_RIGHT}
      />
      <Row>
        <Col className="pb-3" sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center h-100">
            <p>TOP 3 BRGY. WEIGHT FOR AGE SUMMARY RECOMMENDATION</p>
            {prediction.getWeightForAge.length > 0 && (
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
                      data: [
                        prediction.getWeightForAge[0].overweight +
                          prediction.getWeightForAge[1].overweight +
                          prediction.getWeightForAge[0].underweight +
                          prediction.getWeightForAge[1].underweight +
                          prediction.getWeightForAge[0].severely_underweight +
                          prediction.getWeightForAge[1].severely_underweight,
                        0,
                        0
                      ],
                      backgroundColor: ["#ff6384", "#36a2eb", "#ff9f40"],
                      label: "Brgys."
                    }
                  ],
                  labels: ["Anos", "Mayondon", "Baybayin"]
                }}
              />
            )}
          </Card>
        </Col>
        <Col className="pb-3" sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center h-100">
            <p>TOP 3 BRGY. HEIGHT FOR AGE SUMMARY RECOMMENDATION</p>
            {prediction.getWeightForAge.length > 0 && (
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
                      data: [
                        prediction.getHeightForAge[0].tall +
                          prediction.getHeightForAge[1].tall +
                          prediction.getHeightForAge[0].stunted +
                          prediction.getHeightForAge[1].stunted +
                          prediction.getHeightForAge[0].severely_stunted +
                          prediction.getHeightForAge[1].severely_stunted,
                        0,
                        0
                      ],
                      backgroundColor: ["#ff6384", "#36a2eb", "#ff9f40"],
                      label: "Brgys."
                    }
                  ],
                  labels: ["Anos", "Mayondon", "Baybayin"]
                }}
              />
            )}
          </Card>
        </Col>
        <Col className="pb-3" sm={12} md={4}>
          <Card className="shadow-sm p-2 text-center h-100">
            <p>TOP 3 BRGY. WEIGHT FOR HEIGHT/LENGTH SUMMARY RECOMMENDATION</p>
            {prediction.getWeightForAge.length > 0 && (
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
                      data: [
                        prediction.getWeightForHeightLength[0].overweight +
                          prediction.getWeightForHeightLength[1].overweight +
                          prediction.getWeightForHeightLength[0].obese +
                          prediction.getWeightForHeightLength[1].obese +
                          prediction.getWeightForHeightLength[0].wasted +
                          prediction.getWeightForHeightLength[1].severely_wasted,
                        0,
                        0
                      ],
                      backgroundColor: ["#ff6384", "#36a2eb", "#ff9f40"],
                      label: "Brgys."
                    }
                  ],
                  labels: ["Anos", "Mayondon", "Baybayin"]
                }}
              />
            )}
          </Card>
        </Col>
      </Row>
      <Row>
        {localStorage.getItem("accountType") == "user" ? (
          <Col className="pb-3" sm={12} md={12}>
            <Card className="shadow-sm p-2 text-center h-100">
              <h4 className="p-0 m-0">
                Brgy.{" "}
                {
                  BARANGAY_PROPERITES.find(
                    e => e.brgy == localStorage.getItem("brgy")
                  ).name
                }{" "}
                Prediction
              </h4>
            </Card>
          </Col>
        ) : (
          <></>
        )}

        <Col className="pb-3" sm={12} md={12}>
          <Card className="shadow-sm p-2 text-center h-100">
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
                    data: prediction.getWeightForAge.map(data => data.normal)
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
                    data: prediction.getWeightForAge.map(
                      data => data.overweight
                    )
                  },
                  {
                    label: `Underweight`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 0, 0, 1)",
                    borderColor: "rgba(255, 77, 77, 1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
                    pointHoverBorderColor: "rgba(255, 77, 77, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: prediction.getWeightForAge.map(
                      data => data.underweight
                    )
                  },
                  {
                    label: `Severely Underweight`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(26, 140, 255, 1)",
                    borderColor: "rgba(102, 179, 255, 1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(26, 140, 255, 1)",
                    pointHoverBorderColor: "rgba(102, 179, 255, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: prediction.getWeightForAge.map(
                      data => data.severely_underweight
                    )
                  }
                ],
                labels: [
                  parseInt(new Date().getFullYear().toString()) - 2,
                  parseInt(new Date().getFullYear().toString()) - 1,
                  new Date().getFullYear().toString()
                ]
              }}
            />
          </Card>
        </Col>
        <Col className="pb-3" sm={12} md={12}>
          <Card className="shadow-sm p-2 text-center h-100">
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
                    data: prediction.getHeightForAge.map(data => data.normal)
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
                    data: prediction.getHeightForAge.map(data => data.tall)
                  },
                  {
                    label: `Stunted`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 0, 0, 1)",
                    borderColor: "rgba(255, 77, 77, 1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
                    pointHoverBorderColor: "rgba(255, 77, 77, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: prediction.getHeightForAge.map(data => data.stunted)
                  },
                  {
                    label: `Severely Stunded`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(26, 140, 255, 1)",
                    borderColor: "rgba(102, 179, 255, 1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(26, 140, 255, 1)",
                    pointHoverBorderColor: "rgba(102, 179, 255, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: prediction.getHeightForAge.map(
                      data => data.severely_stunted
                    )
                  }
                ],
                labels: [
                  parseInt(new Date().getFullYear().toString()) - 2,
                  parseInt(new Date().getFullYear().toString()) - 1,
                  new Date().getFullYear().toString()
                ]
              }}
            />
          </Card>
        </Col>
        <Col className="pb-3" sm={12} md={12}>
          <Card className="shadow-sm p-2 text-center h-100">
            <p>WEIGHT FOR HEIGHT/LENGTH SUMMARY</p>
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
                    data: prediction.getWeightForHeightLength.map(
                      data => data.normal
                    )
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
                    data: prediction.getWeightForHeightLength.map(
                      data => data.overweight
                    )
                  },
                  {
                    label: `Obese`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 0, 0, 1)",
                    borderColor: "rgba(255, 77, 77, 1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
                    pointHoverBorderColor: "rgba(255, 77, 77, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: prediction.getWeightForHeightLength.map(
                      data => data.obese
                    )
                  },
                  {
                    label: `Wasted`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(26, 140, 255, 1)",
                    borderColor: "rgba(102, 179, 255, 1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(26, 140, 255, 1)",
                    pointHoverBorderColor: "rgba(102, 179, 255, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: prediction.getWeightForHeightLength.map(
                      data => data.wasted
                    )
                  },
                  {
                    label: `Severely Wasted`,
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(255, 255, 0, 1)",
                    borderColor: "rgba(255, 255, 102, 1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0, 0, 0, 1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255, 255, 0, 1)",
                    pointHoverBorderColor: "rgba(255, 255, 102, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: prediction.getWeightForHeightLength.map(
                      data => data.severely_wasted
                    )
                  }
                ],
                labels: [
                  parseInt(new Date().getFullYear().toString()) - 2,
                  parseInt(new Date().getFullYear().toString()) - 1,
                  new Date().getFullYear().toString()
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
