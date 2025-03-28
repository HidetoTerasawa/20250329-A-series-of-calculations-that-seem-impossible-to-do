// 時給単価計算
function calculateHourlyWage() {
  const monthlyIncome = parseFloat(
    document.getElementById("monthlyIncome").value
  );
  const workingHours = parseFloat(
    document.getElementById("workingHours").value
  );

  if (
    !isNaN(monthlyIncome) &&
    monthlyIncome > 0 &&
    !isNaN(workingHours) &&
    workingHours > 0
  ) {
    const hourlyWage = (monthlyIncome / workingHours).toFixed(0);
    document.getElementById("hourlyWageResult").textContent =
      hourlyWage + " 円";
  } else {
    document.getElementById("hourlyWageResult").textContent =
      "入力が正しくありません";
  }
}
