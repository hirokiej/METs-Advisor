import enquirer from "enquirer";
import IntensitySelector from "./intensitySelector.js";
import { ONE_WEEK } from "./constants.js";
const { prompt } = enquirer;

export default class Activity {
  constructor() {
    this.steps = 0;
    this.activeDay = 0;
    this.activityIntensity = 0;
    this.activityAmount = 0;
  }

  async prompt() {
    this.steps = await this.#inputDailyAverageSteps();
    this.activeDay = await this.#inputActiveDays();
    await this.#gatherActivityDetails();
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
        validate: this.#validateActiveDay,
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

  async #gatherActivityDetails() {
    const intensitySelector = new IntensitySelector();
    const intensity = await intensitySelector.selectActivityIntensity();
    this.activityIntensity =
      await intensitySelector.selectActivityLevels(intensity);
    this.activityAmount = await this.#inputDailyActivityMinutes();
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

  #validateActiveDay(input) {
    const number = input;
    if (isNaN(number)) {
      return "文字を削除し数字で答えてください";
    } else if (number === "") {
      return "数字を入力してください";
    } else if (number > ONE_WEEK) {
      return "0−7の数字で答えてください";
    } else {
      return true;
    }
  }

  getSteps() {
    return this.steps;
  }

  getActiveDay() {
    return this.activeDay;
  }

  getActivityIntensity() {
    return this.activityIntensity;
  }

  getActivityAmount() {
    return this.activityAmount;
  }
}
