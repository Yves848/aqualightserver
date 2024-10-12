import express from "npm:express";
import getSurise from "../Utils/getTimes.ts";
import { Request, Response } from 'npm:express';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const sunrise = await getSurise();
    res.json(sunrise);
  } catch (error : unknown) {
    const { message } = error as Error;
    res.json({ "message": message });
  }
}
);

export default router;