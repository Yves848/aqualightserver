// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "npm:express@^4.18.2";
import "./config/db.ts";
import user from "./routes/users.ts";
import sunrise from "./routes/surise.ts";
import logs from "./routes/logs.ts";

const app = express();
const port = Number(Deno.env.get("PORT")) || 3000;

const reqLogger = function (req : Request, _res : Response, next : NextFunction) {
  console.info(`${req.method} request to "${req.url}" by ${req.hostname}`);
  next();
};

app.use(reqLogger);
app.use(express.json());
app.use("/user", user);
app.use("/sunrise",sunrise);
app.use("/logs",logs);

app.listen(port, () => {
  console.log(`Listening on ${port} ...`);
});