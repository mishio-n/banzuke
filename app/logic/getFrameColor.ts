export const getFrameNumber = (gateNumber: number, maxGateNumber: number) => {
  const isOver8 = maxGateNumber > 8;
  const maxSoloFrameNumber = 16 - maxGateNumber;
  // 8頭立て以下の場合は馬番と同じ
  if (!isOver8) {
    return gateNumber;
  }
  // 単枠の場合は馬番と同じ
  if (gateNumber <= maxSoloFrameNumber) {
    return gateNumber;
  }
  // 17頭立ての場合は
  if (maxGateNumber === 17) {
    return gateNumber === 17 ? 8 : Math.ceil(gateNumber / 2);
  }
  // 18頭立ての場合
  if (maxGateNumber === 18) {
    if (gateNumber === 15) {
      return 7;
    }
    if (gateNumber >= 16) {
      return 8;
    }
    return Math.ceil(gateNumber / 2);
  }
  // 9 ~ 16頭立ての場合
  return 8 - Math.floor((maxGateNumber - gateNumber) / 2);
};

// 馬番に対応した枠色を返す
export const getFrameColor = (gateNumber: number, maxGateNumber: number) => {
  const frameNumber = getFrameNumber(gateNumber, maxGateNumber);
  switch (frameNumber) {
    case 1:
      return "rgb(255,255,255)";
    case 2:
      return "rgb(60,60,60)";
    case 3:
      return "rgb(237,73,80)";
    case 4:
      return "rgb(50,98,174)";
    case 5:
      return "rgb(231,189,60)";
    case 6:
      return "rgb(48,166,74)";
    case 7:
      return "rgb(241,139,62)";
    case 8:
      return "rgb(242,131,150)";
    default:
      return "";
  }
};
