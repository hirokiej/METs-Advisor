import enquirer from "enquirer";
import MetsCalculation from "./metsCalculation.js";

const { prompt } = enquirer;
const metsCalculation = new MetsCalculation();

export default class Prompt {
  async allQuestions() {
    const steps = await this.#averageSteps();
    const activeDay = await this.#askActiveDay();
    const weeklyActivityMetsValue =
      activeDay === "0" ? 0 : await this.#askYourActivity(activeDay);
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

  async #averageSteps() {
    const response = await prompt([
      {
        type: "input",
        name: "steps",
        message: "1日平均の歩数を教えてください",
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

  async #askYourActivity(activeDay) {
    const intensity = await this.#askIntensityOfActivity();
    const activityIntensity = await this.#exampleIntensity(intensity);
    const activityAmount = await this.#askActivityAmount();
    return metsCalculation.weeklyActivityMets(
      activeDay,
      activityIntensity,
      activityAmount
    );
  }

  async #askIntensityOfActivity() {
    const response = await prompt([
      {
        type: "select",
        name: "intensityOfActivity",
        message: "あなたが行なっている負荷の運動目安を選んでください",
        choices: ["軽度な運動", "中程度な運動", "強度な運動"],
      },
    ]);

    let intensity = [];
    if (response.intensityOfActivity === "軽度な運動") {
      intensity = [
        { name: "徒歩やピラティス程度", value: 3 },
        { name: "やや早めの徒歩程度", value: 4 },
      ];
    } else if (response.intensityOfActivity === "中程度な運動") {
      intensity = [
        { name: "かなり早い徒歩程度", value: 5 },
        { name: "ゆっくりなジョギング程度", value: 6 },
        { name: "ジョギング程度", value: 7 },
      ];
    } else {
      intensity = [
        { name: "サイクリング程度", value: 8 },
        { name: "8分1kmペースのランニング程度", value: 9 },
        { name: "6分1kmペースのランニング程度", value: 10 },
        { name: "かなり激しい運動", value: 15 },
      ];
    }
    return intensity;
  }

  async #exampleIntensity(intensity) {
    const response = await prompt([
      {
        type: "select",
        name: "activityIntensity",
        message: "以下で当てはまる負荷を選択してください",
        choices: intensity,
        result() {
          return this.focused.value;
        },
      },
    ]);
    return response.activityIntensity;
  }

  async #askActivityAmount() {
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
