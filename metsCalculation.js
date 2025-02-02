const ONE_WEEK = 7;
const DAILY_IDEAL_STEPS = 8000;
const STEP_METS = 3;
const HOURLY_MIN = 60;

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
