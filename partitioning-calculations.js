// 給料日まで1日いくら使えるか計算
function calculateDailyBudget() {
  const totalAmount = parseFloat(document.getElementById("totalAmount").value);
  const daysLeft = parseInt(document.getElementById("daysLeft").value);

  if (isNaN(totalAmount) || isNaN(daysLeft) || daysLeft <= 0) {
    alert("正しい値を入力してください。");
    return;
  }

  const dailyBudget = (totalAmount / daysLeft).toFixed(0);
  document.getElementById("dailyBudgetResult").textContent = `${dailyBudget}円`;

  // ギャグ混じりの評価を計算
  let rating = "";
  if (dailyBudget >= 10000) {
    rating = "★★★★★ - リッチ！毎日豪華ディナー！";
  } else if (dailyBudget >= 5000) {
    rating = "★★★★☆ - 余裕あり！ちょっと贅沢できる！";
  } else if (dailyBudget >= 2000) {
    rating = "★★★☆☆ - 普通。まあまあの生活。";
  } else if (dailyBudget >= 1000) {
    rating = "★★☆☆☆ - 節約モード突入！";
  } else if (dailyBudget > 10) {
    rating = "★☆☆☆☆ - サバイバル生活開始！";
  } else {
    rating = "☆☆☆☆☆ - 野野菜・野魚・昆虫食！";
  }

  document.getElementById("dailyBudgetRating").textContent = rating;
}

// 耐用年数あたりの年額を計算
function calculateAnnualCost() {
  const itemCost = parseFloat(document.getElementById("itemCost").value);
  const lifespan = parseInt(document.getElementById("lifespan").value, 10);

  if (!isNaN(itemCost) && itemCost > 0 && !isNaN(lifespan) && lifespan > 0) {
    const annualCost = (itemCost / lifespan).toFixed(0);
    document.getElementById("annualCostResult").textContent =
      annualCost + " 円";
  } else {
    document.getElementById("annualCostResult").textContent =
      "入力が正しくありません";
  }
}
