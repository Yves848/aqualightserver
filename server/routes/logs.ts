import express from "npm:express";
// import { Request, Response } from 'npm:express';
import { createLog, addLog } from "../controllers/logs.ts";
const router = express.Router();

router.post("/", createLog);
router.post("/add", addLog);

export default router;