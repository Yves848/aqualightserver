// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "npm:express@4.18.2";

const app = express();
const port = Number(Deno.env.get("PORT")) || 3000;

const reqLogger = function (req : Request, _res : Response, next : NextFunction) {
  console.info(`${req.method} request to "${req.url}" by ${req.hostname}`);
  next();
};

app.use(reqLogger);
app.use(express.json());

app.get("/", (_req : Request, res : Response) => {
  res.status(200).send("Hello from Deno and Express!");
});

app.post("/log/add",(_req : Request,res : Response) => {
  // console.log(_req.params.log);
  console.log(_req.body);
  res.status(200).send("Log written");
});


app.listen(port, () => {
  console.log(`Listening on ${port} ...`);
});