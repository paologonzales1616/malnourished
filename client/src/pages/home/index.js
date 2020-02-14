import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import Content from "../../components/content/Content";
import { Row, Col, Table, Card, Form } from "react-bootstrap";
import ReactMapboxGl, { GeoJSONLayer, Layer, Feature } from "react-mapbox-gl";
import { config } from "../../core/config";
import { AppContext } from "../../core/utils/Store";
import GEOJSON from "../../core/utils/GeoJSON";
import {
  BARANGAY_PROPERITES,
  TEXT_PROPS,
  HEATMAP_OPTIONS
} from "../../core/utils/Constants";
import classNames from "classnames";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicGFkbzY5IiwiYSI6ImNqc2xiMHMxcjJqZmQ0M3M3bDhpM21tbW8ifQ.ucrihizFRCj9M70JR7hmDg"
});

const bounds = [
  [120.6768888294888, 14.081271873141716], // Southwest coordinates
  [121.85197381492884, 14.63991902621649] // Northeast coordinates
];

const Index = () => {
  const { app, setApp } = useContext(AppContext);
  const [selectedBrgy, setselectedBrgy] = useState(0);
  const [date, setDate] = useState(new Date().getFullYear().toString());
  const [heatmapOption, setheatmapOption] = useState(0);
  const [heatmapData, setHeatmapData] = useState([]);
  useEffect(() => {
    document.title = config.title + " | Home";
    setApp({ ...app, page: "home" });
    localStorage.page = "home";
  }, []);

  useLayoutEffect(() => {
    getHeatMap();
  }, [date, heatmapOption]);

  async function getHeatMap() {
    const options = {
      header: config.headers
    };
    const res = await fetch(
      `${config.host}/heatmap/${date}/${heatmapOption}`,
      options
    );
    const body = await res.json();
    setHeatmapData(body);
    console.log(body);

    
  }

  const layerPaint = {
    "heatmap-weight": {
      property: "heat",
      type: "exponential",
      stops: [
        [0, 0],
        [5, 2]
      ]
    },
    // Increase the heatmap color weight weight by zoom level
    // heatmap-ntensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": {
      stops: [
        [0, 0],
        [5, 1.2]
      ]
    },
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(33,102,172,0)",
      0.2,
      "rgb(103,169,207)",
      0.4,
      "rgb(209,229,240)",
      0.6,
      "rgb(253,219,199)",
      0.8,
      "rgb(239,138,98)",
      1,
      "rgb(178,24,43)"
    ],
    // Adjust the heatmap radius by zoom level
    "heatmap-radius": {
      stops: [
        [0, 1],
        [5, 50]
      ]
    }
  };

  return (
    <Content>
      <Row className="pb-3">
        <Col sm={12} md={12}>
          <Card className="shadow-sm">
            <Map
              className="rounded"
              style="mapbox://styles/mapbox/dark-v9"
              containerStyle={{
                height: "calc(100vh * .50)",
                width: "100%"
              }}
              onClick={(map, evt) =>
                console.log(`[${evt.lngLat.lng}, ${evt.lngLat.lat}],`)
              }
              maxBounds={bounds}
              center={BARANGAY_PROPERITES[selectedBrgy].marker_coords}
              zoom={[13]}
            >
              <GeoJSONLayer
                data={GEOJSON}
                linePaint={{
                  "line-color": "black",
                  "line-width": 2
                }}
              />
              <Layer type="heatmap" paint={layerPaint}>
                {heatmapData.map(data =>
                  data.coords.map((coords, index) => (
                    <Feature
                      key={index}
                      coordinates={coords}
                      properties={{ heat: .5 }}
                    />
                  ))
                )}
              </Layer>
              {/* <Layer
                type="fill"
                paint={{ "fill-color": "rgba(184, 218, 255, 0.80)" }}
              >
                <Feature
                  coordinates={BARANGAY_PROPERITES[selectedBrgy].boundary}
                />
              </Layer> */}

              {BARANGAY_PROPERITES.map((v, index) => (
                <Layer
                  key={index}
                  type="symbol"
                  layout={{
                    ...TEXT_PROPS,
                    "text-field": v.name
                  }}
                >
                  <Feature coordinates={v.marker_coords} />
                </Layer>
              ))}
            </Map>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="pb-3" sm={12} md={12}>
          <Form.Control
            style={{
              width: "30%"
            }}
            className="float-right"
            as="select"
            value={heatmapOption}
            onChange={e => setheatmapOption(e.target.value)}
          >
            {HEATMAP_OPTIONS.map((data, index) => (
              <option index={index} value={index}>
                {data.option}
              </option>
            ))}
          </Form.Control>
          <Datetime
            value={date}
            className="w-25 float-right mr-1"
            dateFormat="YYYY"
            timeFormat={false}
            onChange={date => setDate(date._d.getFullYear().toString())}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12}>
          <Card
            style={{ maxHeight: "calc(100vh * .30)", overflow: "auto" }}
            className="p-3 rounded-5 h-100"
          >
            <Table borderless hover size="sm">
              <thead className="border border-top-0 border-right-0 border-left-0">
                <tr>
                  <th>Barangays</th>
                  <th>{HEATMAP_OPTIONS[heatmapOption].option}</th>
                </tr>
              </thead>
              <tbody>
                {heatmapData.map((v, index) => (
                  <tr
                    style={{ cursor: "pointer" }}
                    className={classNames({
                      "table-primary": index == selectedBrgy
                    })}
                    key={index}
                    onClick={() => setselectedBrgy(index)}
                  >
                    <td>{BARANGAY_PROPERITES[index].name}</td>
                    <td>{v.length}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Index;
