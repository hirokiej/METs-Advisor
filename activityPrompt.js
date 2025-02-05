import enquirer from "enquirer";
import MetsCalculation from "./metsCalculation.js";
import IntensitySelector from "./intensitySelector.js";

const { prompt } = enquirer;
const metsCalculation = new MetsCalculation();

export default class ActivityPrompt {
  async allQuestions() {
    const steps = await this.#askAverageSteps();
    const activeDay = await this.#askActiveDay();
    const weeklyActivityMetsValue =
      activeDay === "0"
        ? 0
        : await this.#askAndSelectActivityDetails(activeDay);
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

  async #askAverageSteps() {
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

  async #askActiveDay() {
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

  async #askAndSelectActivityDetails(activeDay) {
    const intensitySelector = new IntensitySelector();
    const intensity = await intensitySelector.selectIntensityOfActivity();
    const activityIntensity =
      await intensitySelector.selectSpecificActivity(intensity);
    const activityAmount = await this.#askActivityMinutes();
    return metsCalculation.weeklyActivityMets(
      activeDay,
      activityIntensity,
      activityAmount
    );
  }

  async #askActivityMinutes() {
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
}
