import {
  WEEKLY_IDEAL_METS,
  SUFFICIENT_METS,
  INSUFFICIENT_METS,
  WALKING_METS,
  RUNNING_METS,
  HOURLY_MIN,
  ONE_WEEK,
} from "./constants.js";

import { readFile } from "fs/promises";
export default class Result {
  constructor(totalMets) {
    this.totalMets = totalMets;
    this.metsShortage = WEEKLY_IDEAL_METS - this.totalMets;
  }
  async yourResult() {
    const data = await this.#parseJsonFile();

    if (this.#isIdealMets()) {
      this.#displayMessages(data.ideal);
    } else if (this.#isSufficientMets()) {
      this.#displayMessages(data.sufficient);
      this.#suggestRequiredExercise();
    } else if (this.#isInsufficientMets()) {
      this.#displayMessages(data.insufficient);
      this.#suggestRequiredExercise();
    }
  }

  #isIdealMets() {
    return this.totalMets >= WEEKLY_IDEAL_METS;
  }

  #isSufficientMets() {
    return (
      this.totalMets === SUFFICIENT_METS ||
      this.totalMets === SUFFICIENT_METS + 1
    );
  }

  #isInsufficientMets() {
    return this.totalMets <= INSUFFICIENT_METS;
  }

  async #parseJsonFile() {
    const messageFile = await readFile("resultMessages.json", "utf-8");
    const message = messageFile
      .replaceAll("{totalMets}", this.totalMets)
      .replaceAll("{metsShortage}", this.metsShortage);
    return JSON.parse(message);
  }

  #displayMessages(messages) {
    messages.forEach((message) => console.log(message));
  }

  #calcSuggestExercise() {
    const suggestWalkingMin = this.#calcWalkingMin();
    const suggestRunningMin = this.#calcRunningMin();
    return { suggestWalkingMin, suggestRunningMin };
  }

  #calcWalkingMin() {
    return Math.trunc((this.metsShortage / WALKING_METS) * HOURLY_MIN);
  }

  #calcRunningMin() {
    return Math.trunc((this.metsShortage / RUNNING_METS) * HOURLY_MIN);
  }

  #suggestRequiredExercise() {
    const { suggestWalkingMin, suggestRunningMin } =
      this.#calcSuggestExercise();
    console.log(
      `🚶ウォーキング(4メッツ): ${suggestWalkingMin}分以上(1日あたり${Math.trunc(suggestWalkingMin / ONE_WEEK)}分)`
    );
    console.log(
      `🏃軽いランニング(9メッツ): ${suggestRunningMin}分以上(1日あたり${Math.trunc(suggestRunningMin / ONE_WEEK)}分)`
    );
  }
}
