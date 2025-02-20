#!/usr/bin/env node

import ActivityPrompt from "./activityPrompt.js";
import Mets from "./mets.js";
import Result from "./result.js";

async function app() {
  const activityPrompt = new ActivityPrompt();

  const { steps, activeDay, activityIntensity, activityAmount } =
    await activityPrompt.gatherActivityInput();
  const mets = new Mets(steps, activeDay, activityIntensity, activityAmount);
  const result = new Result(mets.totalMets);
  result.display();
}

app();
