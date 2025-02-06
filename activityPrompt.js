import enquirer from "enquirer";
import MetsCalculation from "./metsCalculation.js";
import IntensitySelector from "./intensitySelector.js";

const { prompt } = enquirer;
const metsCalculation = new MetsCalculation();

export default class ActivityPrompt {
  async gatherActivityInput() {
    const steps = await this.#inputDailyAverageSteps();
    const activeDay = await this.#inputActiveDays();
    const weeklyActivityMetsValue =
      activeDay === "0" ? 0 : await this.#gatherActivityDetails(activeDay);
    return { steps, activeDay, weeklyActivityMetsValue };
  }

  #validateProperNumber(input) {
    const number = input;
    if (isNaN(number)) {
      return "文字を削除し数字で答えてください";
    } else if (number === "") {
      return "数字を入力してください";
    } else {
      return true;
    }
  }

  async #inputDailyAverageSteps() {
    const response = await prompt([
      {
        type: "input",
        name: "steps",
        message: "1週間の歩数を1日平均で教えてください",
        validate: this.#validateProperNumber,
      },
    ]);
    return response.steps;
  }

  async #inputActiveDays() {
    const response = await prompt([
      {
        type: "input",
        name: "activeDay",
        message: "1週間に何日間運動をしていますか？",
        validate: this.#validateProperNumber,
      },
    ]);
    return response.activeDay;
  }

  async #inputDailyActivityMinutes() {
    const response = await prompt([
      {
        type: "input",
        name: "activityAmount",
        message: "その運動は1日合計で何分ほどですか？",
        validate: this.#validateProperNumber,
      },
    ]);
    return response.activityAmount;
  }

  async #gatherActivityDetails(activeDay) {
    const intensitySelector = new IntensitySelector();
    const intensity = await intensitySelector.selectIntensityOfActivity();
    const activityIntensity =
      await intensitySelector.selectSpecificActivity(intensity);
    const activityAmount = await this.#inputDailyActivityMinutes();
    return metsCalculation.weeklyActivityMets(
      activeDay,
      activityIntensity,
      activityAmount
    );
  }
}
