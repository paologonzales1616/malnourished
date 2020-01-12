import React, { useEffect, useContext, useState } from "react";
import Content from "../../components/content/Content";
import { Row, Col, Table, Card } from "react-bootstrap";
import ReactMapboxGl, { GeoJSONLayer, Layer, Feature } from "react-mapbox-gl";
import { config } from "../../core/config";
import { AppContext } from "../../core/utils/Store";
import GEOJSON from "../../core/utils/GeoJSON";
import { BARANGAY_PROPERITES, TEXT_PROPS } from "../../core/utils/Constants";
import classNames from "classnames";

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

  useEffect(() => {
    document.title = config.title + " | Home";
    setApp({ ...app, page: "home" });
    localStorage.page = "home";
  }, []);

  return (
    <Content>
      <Row className="pb-3">
        <Col sm={12} md={12}>
          <Card className="shadow-sm">
            <Map
              className="rounded"
              style="mapbox://styles/mapbox/streets-v11"
              containerStyle={{
                height: "calc(100vh * .50)",
                width: "100%"
              }}
              onClick={(map, evt) =>
                console.log(`[${evt.lngLat.lng}, ${evt.lngLat.lat}],`)
              }
              maxBounds={bounds}
              center={[121.23122539672806, 14.156834207799932]}
              zoom={[12]}
            >
              <GeoJSONLayer
                data={GEOJSON}
                linePaint={{
                  "line-color": "black",
                  "line-width": 2
                }}
              />
              <Layer  type="fill" paint={{ "fill-color": "rgba(184, 218, 255, 0.80)" }}>
                <Feature coordinates={BARANGAY_PROPERITES[selectedBrgy].boundary} />
              </Layer>

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
        <Col sm={12} md={12}>
          <Card
            style={{ maxHeight: "calc(100vh * .30)", overflow: "auto" }}
            className="p-3 rounded-5 h-100"
          >
            <Table borderless hover size="sm">
              <thead className="border border-top-0 border-right-0 border-left-0">
                <tr>
                  <th>Barangays</th>
                  <th>Population</th>
                </tr>
              </thead>
              <tbody>
                {BARANGAY_PROPERITES.map((v, index) => (
                  <tr
                    style={{ cursor: "pointer" }}
                    className={classNames({
                      "table-primary": index == selectedBrgy
                    })}
                    key={index}
                    onClick={() => setselectedBrgy(index)}
                  >
                    <td>{v.name}</td>
                    <td>{v.population}</td>
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
