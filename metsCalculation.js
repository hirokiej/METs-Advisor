import {
  ONE_WEEK,
  DAILY_IDEAL_STEPS,
  STEP_METS,
  HOURLY_MIN,
} from "./constants.js";

export default class MetsCalculation {
  constructor() {}

  stepMets(steps) {
    const weeklySteps = steps * ONE_WEEK;
    const stepsMets = Math.trunc((weeklySteps / DAILY_IDEAL_STEPS) * STEP_METS);
    return stepsMets;
  }

  weeklyActivityMets(activeDay, activityIntensity, activityAmount) {
    const activityMets = (activityAmount / HOURLY_MIN) * activityIntensity;
    return activeDay * activityMets;
  }

  calcTotalMets(stepMetsValue, weeklyActivityMetsValue) {
    return Math.trunc(stepMetsValue + weeklyActivityMetsValue);
  }
}
