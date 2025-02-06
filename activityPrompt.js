import enquirer from "enquirer";
import MetsCalculation from "./metsCalculation.js";
import IntensitySelector from "./intensitySelector.js";
import { ONE_WEEK } from "./constants.js";
const { prompt } = enquirer;
const metsCalculation = new MetsCalculation();

export default class ActivityPrompt {
  async gatherActivityInput() {
    const steps = await this.#inputDailyAverageSteps();
    const activeDay = await this.#inputActiveDays();
    const weeklyMetsValue =
      activeDay === "0" ? 0 : await this.#gatherActivityDetails(activeDay);
    return { steps, activeDay, weeklyMetsValue };
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

  async #gatherActivityDetails(activeDay) {
    const intensitySelector = new IntensitySelector();
    const intensity = await intensitySelector.selectActivityIntensity();
    const activityIntensity =
      await intensitySelector.selectActivityLevels(intensity);
    const activityAmount = await this.#inputDailyActivityMinutes();
    return metsCalculation.calcWeeklyActivityMets(
      activeDay,
      activityIntensity,
      activityAmount
    );
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
}
