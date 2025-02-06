#!/usr/bin/env node

import ActivityPrompt from "./activityPrompt.js";
import MetsCalculation from "./metsCalculation.js";
import Result from "./result.js";

async function app() {
  const activityPrompt = new ActivityPrompt();
  const metsCalculation = new MetsCalculation();

  const { steps, weeklyActivityMetsValue } =
    await activityPrompt.gatherActivityInput();
  const stepMetsValue = metsCalculation.calcStepMets(steps);
  const totalMets = metsCalculation.calcTotalMets(
    stepMetsValue,
    weeklyActivityMetsValue
  );
  const result = new Result(totalMets);
  result.displayResult(totalMets);
}

app();
