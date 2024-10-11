import Logs from '../models/logs.ts';
import {Request,Response} from 'npm:express';

const createLog= async (req : Request ,res: Response) => {
  
  const log = new Logs({
    date: req.body.date,
    time: req.body.time,
    status: req.body.status,
  });
try {
  const savedLog = await log.save();
  res.status(201).json(savedLog);
} catch (_error) {
  res.status(400).json({message: _error.message});
}
};

export { createLog }