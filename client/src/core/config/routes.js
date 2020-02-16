import {
  faChartArea,
  faChartLine,
  faHome,
  faChartBar,
  faUser,
  faInfoCircle,
  faDatabase
} from "@fortawesome/free-solid-svg-icons";

export const routes = [
  {
    name: "Home",
    page: "home",
    icon: faHome,
    account_type: ["user", "admin"]
  },
  {
    name: "Prediction",
    page: "prediction",
    icon: faChartLine,
    account_type: ["user", "admin"]
  },
  {
    name: "Recommendation",
    page: "recommendation",
    icon: faChartArea,
    account_type: ["user", "admin"]
  },
  {
    name: "Data Visualization",
    page: "visualization",
    icon: faChartBar,
    account_type: ["user", "admin"]
  },
  {
    name: "Dataset",
    page: "dataset",
    icon: faDatabase,
    account_type: ["admin", "user"]
  },
  {
    name: "Account",
    page: "account",
    icon: faUser,
    account_type: ["admin"]
  },
  {
    name: "About",
    page: "about",
    icon: faInfoCircle,
    account_type: ["user", "admin"]
  }
];
