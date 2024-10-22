import type { entreePlanning } from "../interfaces/planning.ts";
import Planning from '../models/planning.ts';

const getPlanning = async (day : number) : Promise<entreePlanning[]> => {
  try {
    const planning = await Planning.find({joursemaine : day}).sort({heure: 1});
    return planning;
  } catch (error: unknown) {
    const { message } = error as Error;
    throw new Error(`Error fetching planning: ${message}`);
  }
}

const newPlanning = async (planning : entreePlanning) => {
  const result = await Planning.create(planning);
  return result;
}

export {getPlanning, newPlanning};