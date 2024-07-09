import dotenv from "dotenv";
dotenv.config();

var DOMAIN = "";
switch (process.env.NODE_ENV) {
  default:
    DOMAIN = "http://localhost:3000";
    break;
  case "development":
    DOMAIN = "http://localhost:3000";
    break;
  case "production":
    DOMAIN = "https://dev.admin.demen.com.vn";
}

export default DOMAIN;
