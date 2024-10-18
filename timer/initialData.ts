import { Dow, ModeEclairage } from "./consts.ts";
import { entreePlanning } from "./interfaces/planning.ts";
import mongoose from "npm:mongoose";


const planningSchema = new mongoose.Schema({
  joursemaine: { type: Number, required: true },
  heure: { type: String, required: true },
  modeeclairage: { type: Number, required: true }
});

const planning : entreePlanning[] =[];
for (const day in Dow) {
  if (typeof (Dow[day]) !== "string") {
    planning.push({
      joursemaine: Dow[day],
      heure: "08:00:00",
      modeeclairage: ModeEclairage.Jour
    });
    planning.push({
      joursemaine: Dow[day],
      heure: "17:00:00",
      modeeclairage: ModeEclairage.Nuit
    });
  }
}

console.log(planning);