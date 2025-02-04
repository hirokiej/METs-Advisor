import ActivityPrompt from "./activityPrompt.js";
import MetsCalculation from "./metsCalculation.js";
import Result from "./result.js";

async function app() {
  const activityPrompt = new ActivityPrompt();
  const metsCalculation = new MetsCalculation();

  const { steps, weeklyActivityMetsValue } =
    await activityPrompt.allQuestions();
  const stepMetsValue = metsCalculation.stepMets(steps);
  const totalMets = metsCalculation.calcTotalMets(
    stepMetsValue,
    weeklyActivityMetsValue
  );
  const result = new Result(totalMets);
  result.yourResult(totalMets);
}

app();
