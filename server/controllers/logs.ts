import Logs from '../models/logs.ts';
import { Request, Response } from 'npm:express';

const createLog = async (req: Request, res: Response) => {
  console.log(req.body);
  const log = new Logs({
    date: req.body.date,
    time: req.body.time,
    status: req.body.status,
  });
  try {
    const savedLog = await log.save();
    res.status(201).json(savedLog);
  } catch (_error : unknown) {
    const { message } = _error as Error;
    res.status(400).json({ "message": message });
  }
};

export { createLog }