import { ModeEclairage,Dow } from "../consts.ts"

export interface entreePlanning {
  joursemaine: Dow,
  heure : string,
  modeeclairage : ModeEclairage
}

export interface lights {
  mode : string,
  set : string
}

export interface aqualightData {
  day: string,
  night : string,
  temp? : string
}
