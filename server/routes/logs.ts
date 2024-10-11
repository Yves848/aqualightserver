import express from "npm:express";
import { Request, Response } from 'npm:express';
import { createLog } from "../controllers/logs.ts";
const router = express.Router();

router.post("/", createLog);

export default router;