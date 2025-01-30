import enquirer from "enquirer";

const { prompt } = enquirer;

async function averageSteps() {
  const response = await prompt([
    {
      type: "input",
      name: "steps",
      message: "1日平均の歩数を教えてください",
      validate: (steps) => {
        const number = Number(steps);
        if (isNaN(number)) {
          return "文字を削除し数字で答えてください";
        } else if (0 > number) {
          return "マイナスを削除し正の数で答えてください";
        } else if (number === "") {
          return "数字を入力してください";
        } else {
          return true;
        }
      },
    },
  ]);
  return response.steps;
}

async function askActiveDay() {
  const response = await prompt([
    {
      type: "input",
      name: "activeDay",
      message: "1週間に何日間運動をしていますか？",
      validate: (activeDay) => {
        const number = Number(activeDay);
        if (isNaN(number)) {
          return "文字を削除し数字で答えてください";
        } else if (number < 0 || number > 7) {
          return "正しい数字で答えてください";
        } else if (number === "") {
          return "数字を入力してください";
        } else {
          return true;
        }
      },
    },
  ]);
  return Number(response.activeDay);
}

async function askIntensityOfActivity() {
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

async function exampleIntensity(intensity) {
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
  return Number(response.activityIntensity);
}

async function askActivityAmount() {
  const response = await prompt([
    {
      type: "input",
      name: "activityAmount",
      message: "その運動は1日合計で何分ほどですか？",
      validate: (activityAmount) => {
        const number = Number(activityAmount);
        if (isNaN(number)) {
          return "文字を削除し数字で答えてください";
        } else if (0 > number) {
          return "マイナスを削除し正の数で答えてください";
        } else if (number === "") {
          return "数字を入力してください";
        } else {
          return true;
        }
      },
    },
  ]);
  return Number(response.activityAmount);
}

function stepMets(steps) {
  const weeklySteps = steps * 7;
  const stepsMets = Math.trunc((weeklySteps / 8000) * 3);
  return stepsMets;
}

function weeklyActivityMets(activeDay, activityIntensity, activityAmount) {
  const activityMets = activeDay * activityIntensity;
  const weeklyActivityMets = (activityAmount / 60) * activityMets;
  return weeklyActivityMets;
}

async function askYourActivity(activeDay) {
  const intensity = await askIntensityOfActivity();
  const activityIntensity = await exampleIntensity(intensity);
  const activityAmount = await askActivityAmount();
  return weeklyActivityMets(activeDay, activityIntensity, activityAmount);
}

function calcTotalMets(activeDay, stepMetsValue, weeklyActivityMetsValue) {
  if (activeDay === 0) {
    return Math.trunc(stepMetsValue);
  } else {
    return Math.trunc(stepMetsValue + weeklyActivityMetsValue);
  }
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

async function main() {
  const steps = await averageSteps();
  const stepMetsValue = stepMets(steps);
  const activeDay = await askActiveDay();
  const weeklyActivityMetsValue =
    activeDay === 0 ? 0 : await askYourActivity(activeDay);
  const totalMets = calcTotalMets(
    activeDay,
    stepMetsValue,
    weeklyActivityMetsValue
  );

  const metsShortage = 23 - totalMets;
  const suggestedWalking = Math.trunc((metsShortage / 0.4) * 6);
  const suggestedRunning = Math.trunc((metsShortage / 0.9) * 6);
  yourResult(totalMets, metsShortage, suggestedWalking, suggestedRunning);
}

main();
