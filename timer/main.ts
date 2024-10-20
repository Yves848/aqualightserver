import { Dow } from "./consts.ts";
import "./config/db.ts";
import { getPlanning } from "./controllers/plannings.ts";
import {getAquaLightData, setAqualightData} from "./utils/utils.ts";
import type { lights } from "./interfaces/planning.ts";


class Scheduler {
  private currentDay: number;
  private start: boolean = true;
  private dayTime? : Date;
  private nightTime? : Date;

  constructor() {
    const today = new Date();
    this.currentDay = today.getDay();
  }

  async setAqualightData() {
    const aqualightData = await getAquaLightData();
    console.log('aqualightData', aqualightData);
    const now = new Date();
    let data : lights;
    if (now >= this.dayTime && now < this.nightTime) {
      data = {
        mode: "day",
        set: "on"
      }
      await setAqualightData(data);
      data = {
        mode: "night",
        set: "off"
      }
      await setAqualightData(data);
    } else {
      data = {
        mode: "night",
        set: "on"
      }
      await setAqualightData(data);
      data = {
        mode: "day",
        set: "off"
      }
      await setAqualightData(data);
    }
    
  }

  async startScheduler(): Promise<void> {
    console.log('Start Scheduler');
    console.log(`Current day: ${Dow[this.currentDay]}`);
    await this.dayChangeHandler(this.currentDay);
  }

  async dayChangeHandler(day: number): Promise<number> {
    if (!this.start) {
      console.log(`Day changed! ${Dow[day]} Reloading tasks...`);
      this.currentDay = day;
    }
    const data = await getPlanning(this.currentDay);
    // console.log(data);
    if (data) {
      let temp = data[0].heure.split(':');
      let heure : number = parseInt(temp[0]);
      let minutes : number = parseInt(temp[1]);
      let secondes : number = parseInt(temp[2]);
      this.dayTime = new Date();
      this.dayTime.setHours(heure, minutes, secondes);
      this.nightTime = new Date();
      temp = data[1].heure.split(':');
      heure = parseInt(temp[0]);
      minutes =parseInt(temp[1]);
      secondes =parseInt(temp[2]);
      this.nightTime.setHours(heure, minutes, secondes);
      console.log(`${Dow[day]} tasks loaded.`);
      console.log(`${Dow[day]} time: ${this.dayTime?.toLocaleString()} - ${this.nightTime?.toLocaleString()}`);
      await this.setAqualightData();
    }
    this.start = false;
    return 0;
  }
  watchDayChange() {
    setInterval(async () => {
      const today = new Date();
      console.log('Check if day changed');
      if (today.getDay() !== this.currentDay) {
        await this.dayChangeHandler(today.getDay())        // await this.loadTasksFromFile(filePath);
      }
    }, 30 * 1000); // Check every 1 minute
  }


}

const scheduler = new Scheduler();
scheduler.startScheduler();
scheduler.watchDayChange();