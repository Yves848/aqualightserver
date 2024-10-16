import {Dow} from "./consts.ts";

class Scheduler {
  private currentDay : number;

  constructor() {
    this.currentDay = -1;
  }


  watchDayChange() {
    setInterval(async () => {
      const today = new Date();
      console.log('Check if day changed');
      if (today.getDay() !== this.currentDay) {
        console.log(`Day changed! ${Dow[today.getDay()]} Reloading tasks...`);
        this.currentDay = today.getDay();
        // await this.loadTasksFromFile(filePath);
      }
    }, 30 * 1000); // Check every 1 minute
  }


}

const scheduler = new Scheduler();
scheduler.watchDayChange();