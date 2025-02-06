import {
  ONE_WEEK,
  DAILY_IDEAL_STEPS,
  STEP_METS,
  HOURLY_MINUTES,
} from "./constants.js";

export default class MetsCalculation {
  calcStepMets(steps) {
    const weeklySteps = steps * ONE_WEEK;
    const stepsMets = Math.trunc((weeklySteps / DAILY_IDEAL_STEPS) * STEP_METS);
    return stepsMets;
  }

  calcWeeklyActivityMets(activeDay, activityIntensity, activityAmount) {
    const activityMets = (activityAmount / HOURLY_MINUTES) * activityIntensity;
    return activeDay * activityMets;
  }

  calcTotalMets(stepMetsValue, weeklyActivityMetsValue) {
    return Math.trunc(stepMetsValue + weeklyActivityMetsValue);
  }
}
