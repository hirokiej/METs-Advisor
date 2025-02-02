import Prompt from "./prompt.js";
import MetsCalculation from "./metsCalculation.js";
import Result from "./result.js";

async function main() {
  const prompt = new Prompt();
  const metsCalculation = new MetsCalculation();
  const result = new Result();

  const { steps, weeklyActivityMetsValue } = await prompt.allQuestions();
  const stepMetsValue = metsCalculation.stepMets(steps);
  const totalMets = metsCalculation.calcTotalMets(
    stepMetsValue,
    weeklyActivityMetsValue
  );

  result.yourResult(totalMets);
}

main();
