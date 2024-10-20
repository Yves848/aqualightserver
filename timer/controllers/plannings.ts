import type { entreePlanning } from "../interfaces/planning.ts";
import Planning from '../models/planning.ts';

const getPlanning = async (day : number)  => {
  try {
    const planning = await Planning.find({joursemaine : day});
    return planning;
  } catch (error: unknown) {
    const { message } = error as Error;
    return message;
  }
}

const newPlanning = async (planning : entreePlanning) => {
  const result = await Planning.create(planning);
  return result;
}

export {getPlanning, newPlanning};