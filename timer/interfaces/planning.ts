import { ModeEclairage,Dow } from "../consts.ts"

export interface entreePlanning {
  joursemaine: Dow,
  heure : string,
  modeeclairage : ModeEclairage
}
