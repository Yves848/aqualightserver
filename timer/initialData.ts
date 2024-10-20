import { Dow, ModeEclairage } from "./consts.ts";
import { entreePlanning } from "./interfaces/planning.ts";
import "./config/db.ts";
import { newPlanning } from "./controllers/plannings.ts";





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

const createPlanning = async (pl : entreePlanning) => {
  // console.log(req.body);
  const date = new Date();
  // const dateStr = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  try {
    const savedLog = await newPlanning(pl);
    // res.status(201).json(savedLog);
    console.log(savedLog);
  } catch (_error : unknown) {
    const { message } = _error as Error;
    // res.status(400).json({ "message": message });
    console.error(message);
  }
};

planning.forEach(async pl => {
  await createPlanning(pl);
})