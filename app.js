import enquirer from "enquirer";

const { prompt } = enquirer;

async function main() {
  const questions = await prompt([
    {
      type: "input",
      name: "steps",
      message: "1日平均の歩数を教えてください",
      validate: (steps) => {
        const number = steps;
        if (isNaN(number)) {
          return "文字を削除し数字で答えてください";
        } else if (0 > number) {
          return "マイナスを削除し正の数で答えてください";
        } else {
          return true;
        }
      },
    },
    {
      type: "input",
      name: "activeDay",
      message: "1週間に何日間運動をしていますか？",
      validate: (activieDay) => {
        const number = activieDay;
        if (isNaN(number)) {
          return "文字を削除し数字で答えてください";
        } else if (number < 0 || number > 7) {
          return "正しい数字で答えてください";
        } else {
          return true;
        }
      },
    },
    {
      type: "select",
      name: "intensityOfActivity",
      message: "あなたが行なっている負荷の運動目安を選んでください",
      choices: ["軽度な運動", "中程度な運動", "強度な運動"],
    },
  ]);
  let intensity = [];
  if (questions.intensityOfActivity === "軽度な運動") {
    intensity = [
      { name: "徒歩やピラティス程度", value: 3 },
      { name: "やや早めの徒歩程度", value: 4 },
    ];
  } else if (questions.intensityOfActivity === "中程度な運動") {
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

  const exampleIntensity = await prompt([
    {
      type: "select",
      name: "activityIntensity",
      message: "以下で当てはまる負荷を選択してください",
      choices: intensity,
      result() {
        return this.focused.value;
      },
    },
    {
      type: "input",
      name: "activityAmount",
      message: "その運動は1日合計で何分ほどですか？",
    },
  ]);

  const weeklySteps = questions.steps * 7;
  const stepsMets = Math.trunc((weeklySteps / 8000) * 3);
  const activityMets = questions.activeDay * exampleIntensity.activityIntensity;
  const weeklyActivityMets =
    (exampleIntensity.activityAmount / 60) * activityMets;
  const totalMets = Math.trunc(stepsMets + weeklyActivityMets);
  const metsShortage = 23 - totalMets;
  const suggestedWalking = Math.trunc((metsShortage / 0.4) * 6);
  const suggestedRunning = Math.trunc((metsShortage / 0.9) * 6);

  yourResult(totalMets, metsShortage, suggestedWalking, suggestedRunning);
}

function yourResult(
  totalMets,
  metsShortage,
  suggestedWalking,
  suggestedRunning
) {
  if (totalMets >= 23) {
    console.log("素晴らしいですね！あなたの身体活動量は理想を上回っています！");
  } else if (totalMets === 21 || totalMets === 22) {
    console.log("あなたの身体活動量は健康維持に適しています");
  } else if (totalMets <= 20) {
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

main();
