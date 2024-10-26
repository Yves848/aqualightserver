import express from "npm:express";
import { Request, Response, Router } from 'npm:express';
import { Scheduler } from "../main.ts";

export default function mainRouter(scheduler: Scheduler, mode : boolean): Router {
  const router = express.Router();
  router.post("/", (_req: Request, res: Response) => {
    try {
      scheduler.manual = mode;
      res.json({"mode": mode});
    } catch (error: unknown) {
      const { message } = error as Error;
      res.json({ "message": message });
    }
  }
  );
  return router;
}


