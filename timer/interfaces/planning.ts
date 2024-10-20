import { ModeEclairage,Dow } from "../consts.ts"

export interface entreePlanning {
  joursemaine: Dow,
  heure : string,
  modeeclairage : ModeEclairage
}

export interface lights {
  day : string,
  night : string
}
