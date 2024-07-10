import dotenv from "dotenv";
dotenv.config();

const development = {
  app: 3000,
  db: {
    host: "localhost",
    dbport: "5432",
    name: "photo-app",
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
  },
  domain: "http://localhost:3000",
};
const test = {
  app: 3002,
  db: {
    host: process.env.PSQL_LIVE_HOST,
    dbport: "5432",
    name: process.env.PSQL_LIVE_NAME,
    user: process.env.PSQL_LIVE_USER,
    password: process.env.PSQL_LIVE_PASSWORD,
  },
  domain: "",
};

const production = {
  app: 3001,
  db: {
    host: process.env.PSQL_LIVE_HOST,
    dbport: "5432",
    name: process.env.PSQL_LIVE_NAME,
    user: process.env.PSQL_LIVE_USER,
    password: process.env.PSQL_LIVE_PASSWORD,
  },
  domain: "",
};
console.log(process.env.NODE_ENV);
const config = { development, test, production };
const env = process.env.NODE_ENV || "production";
export default config["production"];
