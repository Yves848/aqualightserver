import { Dow } from "./consts.ts";
import "./config/db.ts";
import { getPlanning } from "./controllers/plannings.ts";
import { getAquaLightData, setAqualightData, setAqualightDay, setAqualightNight } from "./utils/utils.ts";
import type { lights } from "./interfaces/planning.ts";
import type { aqualightData } from "./interfaces/planning.ts";
import type { entreePlanning } from "./interfaces/planning.ts";



class Scheduler {
  private currentDay: number;
  private start: boolean = true;
  private dayTime: Date = new Date();
  private nightTime: Date = new Date();
  private timer: number = -1;
  private currentLightData: aqualightData = { day: "off", night: "off" };

  constructor() {
    const today = new Date();
    this.currentDay = today.getDay();
  }

  async getAqualightDataHandler() {
    // console.log("getAqualightData called");
    const currentLightData: aqualightData = { day: "off", night: "off" };
    try {
      this.currentLightData = await getAquaLightData();
    }
    catch {
      console.log("Fetch lightdata not ok");
      this.currentLightData = currentLightData;
      console.log(this.currentLightData);
    }
    
  }

  async setAqualightData() {
    await this.getAqualightDataHandler();

    // console.log('aqualightData', aqualightData);
    const now = new Date();
    if (now >= this.dayTime && now < this.nightTime) {
      if (this.currentLightData.day === "off") {
        await setAqualightDay();
        this.currentLightData.day = "on";
        this.currentLightData.night = "off";
        console.log('aqualightData', this.currentLightData);
        
      }
    } else {
      if (this.currentLightData.night === "off") {
        await setAqualightNight();
        this.currentLightData.night = "on";
        this.currentLightData.day = "off";
        console.log('aqualightData', this.currentLightData);
      }
    }

  }

  async startScheduler() {
    console.log('Start Scheduler');
    console.log(`Current day: ${Dow[this.currentDay]}`);
    await this.getAqualightDataHandler();
    await this.dayChangeHandler(this.currentDay);
  }

  async dayChangeHandler(day: number): Promise<number> {
    if (!this.start) {
      console.log(`Day changed! ${Dow[day]} Reloading tasks...`);
      this.currentDay = day;
    }
    const data : entreePlanning[] = await getPlanning(this.currentDay);
    // console.log(data);
    if (data) {
      let temp = data[0].heure.split(':');
      let heure: number = parseInt(temp[0]);
      let minutes: number = parseInt(temp[1]);
      let secondes: number = parseInt(temp[2]);
      this.dayTime = new Date();
      this.dayTime.setHours(heure, minutes, secondes);
      this.nightTime = new Date();
      temp = data[1].heure.split(':');
      heure = parseInt(temp[0]);
      minutes = parseInt(temp[1]);
      secondes = parseInt(temp[2]);
      this.nightTime.setHours(heure, minutes, secondes);
      console.log(`${Dow[day]} tasks loaded.`);
      console.log(`${Dow[day]} time: ${this.dayTime?.toLocaleString()} - ${this.nightTime?.toLocaleString()}`);
      if (this.timer > -1) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(async () => {
        await this.setAqualightData();
      }, 5 * 1000);
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
    }, 60 * 1000); // Check every 1 minute
  }


}

const scheduler = new Scheduler();
scheduler.startScheduler();
scheduler.watchDayChange();