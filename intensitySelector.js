import enquirer from "enquirer";

const { prompt } = enquirer;

export default class IntensitySelector {
  async selectActivityIntensity() {
    const response = await prompt([
      {
        type: "select",
        name: "selectActivityIntensity",
        message: "あなたが行なっている負荷の運動目安を選んでください",
        choices: ["軽度な運動", "中程度な運動", "強度な運動"],
      },
    ]);

    let intensityLevels = [];
    if (response.selectActivityIntensity === "軽度な運動") {
      // valueはnameの運動に対する運動強度の単位METsを示す数値
      intensityLevels = [
        { name: "徒歩やピラティス程度", value: 3 },
        { name: "やや早めの徒歩程度", value: 4 },
      ];
    } else if (response.selectActivityIntensity === "中程度な運動") {
      intensityLevels = [
        { name: "かなり早い徒歩程度", value: 5 },
        { name: "ゆっくりなジョギング程度", value: 6 },
        { name: "ジョギング程度", value: 7 },
      ];
    } else {
      intensityLevels = [
        { name: "サイクリング程度", value: 8 },
        { name: "8分1kmペースのランニング程度", value: 9 },
        { name: "6分1kmペースのランニング程度", value: 10 },
        { name: "かなり激しい運動", value: 15 },
      ];
    }
    return intensityLevels;
  }

  async selectActivityLevels(intensityLevels) {
    const response = await prompt([
      {
        type: "select",
        name: "activityIntensity",
        message: "以下で当てはまる負荷を選択してください",
        choices: intensityLevels,
        result() {
          return this.focused.value;
        },
      },
    ]);
    return response.activityIntensity;
  }
}
