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
  // 入力フォームからの情報を取得
  const arrivalTime = document.getElementById("arrivalTime").value;
  const isTomorrow = document.querySelector(
    'input[name="isTomorrow"]:checked'
  ).value;
  const arrivalDateInput = document.getElementById("arrivalDate").value;
  const travelTime = parseInt(document.getElementById("travelTime").value, 10);
  const prepTime = parseInt(document.getElementById("prepTime").value, 10);
  const alarmCount = parseInt(document.getElementById("alarmCount").value, 10);
  const alarmInterval = parseInt(
    document.getElementById("alarmInterval").value,
    10
  );

  if (
    !arrivalTime ||
    isNaN(travelTime) ||
    isNaN(prepTime) ||
    isNaN(alarmCount) ||
    isNaN(alarmInterval)
  ) {
    alert("正しい値を入力してください。");
    return;
  }

  // 到着時刻を設定
  const [arrivalHour, arrivalMinute] = arrivalTime.split(":").map(Number);
  const arrivalDate = new Date();

  if (isTomorrow === "yes") {
    arrivalDate.setDate(arrivalDate.getDate() + 1);
  } else if (arrivalDateInput) {
    const [year, month, day] = arrivalDateInput.split("-").map(Number);
    arrivalDate.setFullYear(year, month - 1, day);
  }

  arrivalDate.setHours(arrivalHour, arrivalMinute, 0);

  // 起床時刻を計算
  const wakeUpDate = new Date(
    arrivalDate.getTime() - (travelTime + prepTime) * 60 * 1000
  );
  const wakeUpHour = wakeUpDate.getHours().toString().padStart(2, "0");
  const wakeUpMinute = wakeUpDate.getMinutes().toString().padStart(2, "0");

  // 外出準備時間を計算
  const extraPrepTime =
    parseInt(document.getElementById("extraPrepTime").value, 10) || 0;
  const totalPrepTime = prepTime + extraPrepTime;

  // 出発時刻を計算
  const departureDate = new Date(
    wakeUpDate.getTime() + totalPrepTime * 60 * 1000
  );
  const departureHour = departureDate.getHours().toString().padStart(2, "0");
  const departureMinute = departureDate
    .getMinutes()
    .toString()
    .padStart(2, "0");

  // アラーム時刻を計算
  const alarmTimes = [];
  for (let i = 0; i < alarmCount; i++) {
    const alarmDate = new Date(
      wakeUpDate.getTime() - i * alarmInterval * 60 * 1000
    );
    const alarmHour = alarmDate.getHours().toString().padStart(2, "0");
    const alarmMinute = alarmDate.getMinutes().toString().padStart(2, "0");
    alarmTimes.push(`${alarmHour}:${alarmMinute}`);
  }

  // 日付を取得
  const alarmDateString = wakeUpDate.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // 到着時刻を表示
  const formattedArrivalHour = arrivalHour.toString().padStart(2, "0");
  const formattedArrivalMinute = arrivalMinute.toString().padStart(2, "0");
  document.getElementById(
    "arrivalTimeResult"
  ).textContent = `到着時刻: ${formattedArrivalHour}:${formattedArrivalMinute}`;

  // 計算結果を表示
  document.getElementById(
    "wakeUpTimeResult"
  ).textContent = `起床時刻: ${wakeUpHour}:${wakeUpMinute}`;
  document.getElementById(
    "prepTimeResult"
  ).textContent = `外出準備時間（起床～出発）: ${totalPrepTime} 分`;
  document.getElementById(
    "departureTimeResult"
  ).textContent = `出発時刻: ${departureHour}:${departureMinute}`;
  document.getElementById(
    "travelTimeResult"
  ).textContent = `移動時間（出発地点～目的地）: ${travelTime} 分`;
  document.getElementById("alarmDate").textContent = `日付: ${alarmDateString}`;

  const alarmTimesList = document.getElementById("alarmTimes");
  alarmTimesList.innerHTML = "";
  alarmTimes.forEach((time) => {
    const li = document.createElement("li");
    li.textContent = time;
    alarmTimesList.appendChild(li);
  });
}

