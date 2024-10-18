import { Dow, ModeEclairage } from "./consts.ts";
import { entreePlanning } from "./interfaces/planning.ts";
import mongoose from "npm:mongoose";


const planningSchema = new mongoose.Schema({
  joursemaine: { type: Number, required: true },
  heure: { type: String, required: true },
  modeeclairage: { type: Number, required: true }
});

for (const day in Dow) {
  if (typeof (Dow[day]) !== "string") {
    console.log(Dow[day]);
  }
}