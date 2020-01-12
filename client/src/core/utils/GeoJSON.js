import {
  ANOS_BOUNDARY,
  BAGONG_SILANG_BOUNDARY,
  BAMBANG_BOUNDARY,
  BATONG_MALAKE_BOUNDARY,
  BAYBAYIN_BOUNDARY,
  BAYOG_BOUNDARY,
  LALAKAY_BOUNDARY,
  MAAHAS_BOUNDARY,
  MALINTA_BOUNDARY,
  MAYONDON_BOUNDARY,
  TADLAC_BOUNDARY,
  TIMUGAN_BOUNDARY,
  SAN_ANTONIO_BOUNDARY,
  PUTHO_TUNTUNGIN_BOUNDARY
} from "./Constants";
const GEOJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: ANOS_BOUNDARY[0]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: BAGONG_SILANG_BOUNDARY[0]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: BAMBANG_BOUNDARY[0]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: BATONG_MALAKE_BOUNDARY[0]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: BAYBAYIN_BOUNDARY[0]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: BAYOG_BOUNDARY[0]
      }
    },

    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: LALAKAY_BOUNDARY[0]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: MAAHAS_BOUNDARY[0]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: MALINTA_BOUNDARY[0]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: MAYONDON_BOUNDARY[0]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: SAN_ANTONIO_BOUNDARY[0]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: TADLAC_BOUNDARY[0]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: TIMUGAN_BOUNDARY[0]
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: PUTHO_TUNTUNGIN_BOUNDARY[0]
      }
    }
  ]
};

export default GEOJSON;
