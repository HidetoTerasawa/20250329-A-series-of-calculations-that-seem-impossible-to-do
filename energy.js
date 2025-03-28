// 家電製品の電気代計算と評価
function calculateElectricityCost() {
  const power = parseFloat(document.getElementById("power").value); // 消費電力 (W)
  const hours = parseFloat(document.getElementById("hours").value) || 0; // 使用時間 (時間), 未入力なら0
  const minutes = parseFloat(document.getElementById("minutes").value) || 0; // 使用時間 (分), 未入力なら0
  const rate = parseFloat(document.getElementById("rate").value); // 電気料金単価 (円/kWh)

  // 分を時間に変換して合計
  const totalHours = hours + minutes / 60;

  // 入力値の検証
  if (
    !isNaN(power) &&
    power > 0 &&
    (hours > 0 || minutes > 0) &&
    !isNaN(rate) &&
    rate > 0
  ) {
    // 総電気代を計算
    const totalCost = ((power / 1000) * totalHours * rate).toFixed(2);
    document.getElementById("electricityCostResult").textContent =
      totalCost + " 円";

    // 1時間あたりの電気代を計算
    const costPerHour = ((power / 1000) * rate).toFixed(2);
    document.getElementById("electricityCostPerHour").textContent =
      costPerHour + " 円";

    // 電気代の評価を5段階で表示
    let rating;
    if (costPerHour <= 5) {
      rating = "非常に安い (★★★★★)";
    } else if (costPerHour <= 10) {
      rating = "安い (★★★★☆)";
    } else if (costPerHour <= 20) {
      rating = "普通 (★★★☆☆)";
    } else if (costPerHour <= 50) {
      rating = "高い (★★☆☆☆)";
    } else {
      rating = "非常に高い (★☆☆☆☆)";
    }
    document.getElementById("electricityCostRating").textContent = rating;
  } else {
    document.getElementById("electricityCostResult").textContent =
      "入力が正しくありません";
    document.getElementById("electricityCostPerHour").textContent = "-";
    document.getElementById("electricityCostRating").textContent = "-";
  }
}

// 燃費計算と評価
function calculateFuelEfficiency() {
  const distance = parseFloat(document.getElementById("distance").value); // 走行距離 (km)
  const fuel = parseFloat(document.getElementById("fuel").value); // 使用燃料量 (L)

  if (!isNaN(distance) && distance > 0 && !isNaN(fuel) && fuel > 0) {
    const efficiency = (distance / fuel).toFixed(2); // 燃費計算
    document.getElementById("fuelEfficiencyResult").textContent =
      efficiency + " km/L";

    // 燃費の評価を5段階で表示
    let rating;
    if (efficiency >= 20) {
      rating = "非常に良い (★★★★★)";
    } else if (efficiency >= 15) {
      rating = "良い (★★★★☆)";
    } else if (efficiency >= 10) {
      rating = "普通 (★★★☆☆)";
    } else if (efficiency >= 5) {
      rating = "悪い (★★☆☆☆)";
    } else {
      rating = "非常に悪い (★☆☆☆☆)";
    }
    document.getElementById("fuelEfficiencyRating").textContent = rating;
  } else {
    document.getElementById("fuelEfficiencyResult").textContent =
      "入力が正しくありません";
    document.getElementById("fuelEfficiencyRating").textContent = "-";
  }
}
