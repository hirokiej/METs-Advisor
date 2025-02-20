#!/usr/bin/env node

import Activity from "./activity.js";
import Mets from "./mets.js";
import Result from "./result.js";

async function app() {
  const activity = new Activity();
  await activity.prompt();

  const mets = new Mets(
    activity.getSteps(),
    activity.getActiveDay(),
    activity.getActivityIntensity(),
    activity.getActivityAmount()
  );
  const result = new Result(mets.getTotalMets());
  result.display();
}

app();
