import {
  WEEKLY_IDEAL_METS,
  SUFFICIENT_METS,
  INSUFFICIENT_METS,
  WALKING_METS,
  RUNNING_METS,
  HOURLY_MIN,
  ONE_WEEK,
} from "./constants.js";

export default class Result {
  yourResult(totalMets) {
    const { metsShortage, suggestedWalking, suggestedRunning } =
      this.suggestedExercise(totalMets);
    if (totalMets >= WEEKLY_DEAL_METS) {
      console.log(
        "素晴らしいですね！あなたの身体活動量は理想を上回っています！"
      );
    } else if (
      totalMets === SUFFICIENT_METS ||
      totalMets === SUFFICIENT_METS + 1
    ) {
      console.log("あなたの身体活動量は健康維持に適しています");
    } else if (totalMets <= INSUFFICIENT_METS) {
      console.log(`あなたの身体活動量は${metsShortage}Mets不足しています。`);
      console.log("以下の運動量を1週間の内に追加すると理想値を上回ります");
      console.log(
        `ウォーキング: ${suggestedWalking}分以上→1日あたり${Math.trunc(suggestedWalking / 7)}分`
      );
      console.log(
        `軽いランニング: ${suggestedRunning}分以上→1日あたり${Math.trunc(suggestedRunning / 7)}分`
      );
    }
  }

  suggestedExercise(totalMets) {
    const metsShortage = WEEKLY_DEAL_METS - totalMets;
    const suggestedWalking = Math.trunc((metsShortage / 0.4) * 6);
    const suggestedRunning = Math.trunc((metsShortage / 0.9) * 6);
    return { metsShortage, suggestedWalking, suggestedRunning };
  }
}
