document.querySelectorAll('input[name="isTomorrow"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    const dateInputContainer = document.getElementById("dateInputContainer");
    if (event.target.value === "no") {
      dateInputContainer.style.display = "block";
    } else {
      dateInputContainer.style.display = "none";
    }
  });
});

document.querySelectorAll('input[name="preparationDone"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    const extraPrepTimeContainer = document.getElementById(
      "extraPrepTimeContainer"
    );
    if (event.target.value === "no") {
      extraPrepTimeContainer.style.display = "block";
    } else {
      extraPrepTimeContainer.style.display = "none";
    }
  });
});

function calculateAlarms() {
  const arrivalTime = document.getElementById("arrivalTime").value;
  const isTomorrow = document.querySelector(
    'input[name="isTomorrow"]:checked'
  ).value;
  const arrivalDateInput = document.getElementById("arrivalDate").value;
  const travelTime = parseInt(document.getElementById("travelTime").value, 10);
  const prepTime = parseInt(document.getElementById("prepTime").value, 10);
  const preparationDone = document.querySelector(
    'input[name="preparationDone"]:checked'
  ).value;
  let extraPrepTime = 0;

  if (preparationDone === "no") {
    extraPrepTime =
      parseInt(document.getElementById("extraPrepTime").value, 10) || 0;
  }

  if (
    !arrivalTime ||
    isNaN(travelTime) ||
    isNaN(prepTime) ||
    (preparationDone === "no" && isNaN(extraPrepTime))
  ) {
    alert("正しい値を入力してください。");
    return;
  }

  const [arrivalHour, arrivalMinute] = arrivalTime.split(":").map(Number);
  const arrivalDate = new Date();

  if (isTomorrow === "yes") {
    arrivalDate.setDate(arrivalDate.getDate() + 1);
  } else if (arrivalDateInput) {
    const [year, month, day] = arrivalDateInput.split("-").map(Number);
    arrivalDate.setFullYear(year, month - 1, day);
  }

  arrivalDate.setHours(arrivalHour, arrivalMinute, 0);

  const totalPrepTime = travelTime + prepTime + extraPrepTime;

  // 計算結果を表示
  document.getElementById(
    "arrivalTimeResult"
  ).textContent = `到着しておくべき時刻: ${arrivalTime}`;
  document.getElementById(
    "totalPrepTimeResult"
  ).textContent = `移動時間と準備時間の合計: ${totalPrepTime} 分`;

  const wakeUpDate = new Date(
    arrivalDate.getTime() - totalPrepTime * 60 * 1000
  );

  // 出発時刻を計算
  const departureDate = new Date(
    arrivalDate.getTime() - travelTime * 60 * 1000
  );
  const departureHour = departureDate.getHours().toString().padStart(2, "0");
  const departureMinute = departureDate
    .getMinutes()
    .toString()
    .padStart(2, "0");

  document.getElementById(
    "departureTimeResult"
  ).textContent = `出発時刻: ${departureHour}:${departureMinute}`;

  // アラーム設定
  const alarmCount = parseInt(document.getElementById("alarmCount").value, 10);
  const alarmInterval = parseInt(
    document.getElementById("alarmInterval").value,
    10
  );

  if (
    isNaN(alarmCount) ||
    alarmCount <= 0 ||
    isNaN(alarmInterval) ||
    alarmInterval <= 0
  ) {
    alert("アラームの回数と間隔を正しく入力してください。");
    return;
  }

  const alarmTimes = [];
  for (let i = 0; i < alarmCount; i++) {
    const alarmDate = new Date(
      wakeUpDate.getTime() - i * alarmInterval * 60 * 1000
    );
    const alarmHour = alarmDate.getHours().toString().padStart(2, "0");
    const alarmMinute = alarmDate.getMinutes().toString().padStart(2, "0");
    alarmTimes.push(`${alarmHour}:${alarmMinute}`);
  }

  const alarmTimesList = document.getElementById("alarmTimes");
  alarmTimesList.innerHTML = "";
  alarmTimes.forEach((time) => {
    const li = document.createElement("li");
    li.textContent = time;
    alarmTimesList.appendChild(li);
  });

  const alarmDateElement = document.getElementById("alarmDate");
  const wakeUpDateString = wakeUpDate.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  alarmDateElement.textContent = `目覚まし時計の日付: ${wakeUpDateString}`;
}
