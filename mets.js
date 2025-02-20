import {
  ONE_WEEK,
  DAILY_IDEAL_STEPS,
  STEP_METS,
  HOURLY_MINUTES,
} from "./constants.js";

export default class Mets {
  constructor(steps, activeDay, activityIntensity, activityAmount) {
    this.stepMets = this.#calcStepMets(steps);
    this.weeklyMets = this.#calcWeeklyActivityMets(
      activeDay,
      activityIntensity,
      activityAmount
    );
    this.totalMets = Math.trunc(this.stepMets + this.weeklyMets);
  }

  #calcStepMets(steps) {
    const weeklySteps = steps * ONE_WEEK;
    const stepsMets = Math.trunc((weeklySteps / DAILY_IDEAL_STEPS) * STEP_METS);
    return stepsMets;
  }

  #calcWeeklyActivityMets(activeDay, activityIntensity, activityAmount) {
    const activityMets = (activityAmount / HOURLY_MINUTES) * activityIntensity;
    return activeDay * activityMets;
  }

  getStepMets() {
    return this.stepMets;
  }

  getWeeklyMets() {
    return this.weeklyMets;
  }

  getTotalMets() {
    return this.totalMets;
  }
}
