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

  }
}
