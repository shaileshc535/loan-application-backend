import express from "express";
import cors from "cors";
import methodOverride from "method-override";
import { config } from "dotenv";
import getConnection from "./config/connection";
import Router from "./routes/index";
// import logger from "./logger";
import path from "path";
import morgan from "morgan";
import fs from "fs";

config();

const app = express();
// log only 4xx and 5xx responses to console
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// log all requests to access.log
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "../logs/access.log"), {
      flags: "a",
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride("X-HTTP-Method-Override"));

//DATABASE CONNECTION
app.use(getConnection);
app.use("/public", express.static("./public"));
//View Engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//ROUTES

app.use("/", Router);

app.get("/", (req, res) => {
  res.send("Hello From Loan Application!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  return console.info(`Server is listening at http://localhost:${PORT}`);
});
