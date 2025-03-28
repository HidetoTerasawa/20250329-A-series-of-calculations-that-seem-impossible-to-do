// 割引計算を行う関数
function calculateDiscount() {
  // 入力値を取得
  const originalPrice = parseFloat(document.getElementById("originalPrice").value);
  const discountRate = parseFloat(document.getElementById("discountRate").value);

  // 入力値の検証
  if (isNaN(originalPrice) || isNaN(discountRate) || originalPrice < 0 || discountRate < 0) {
    alert("有効な価格と割引率を入力してください。");
    return;
  }

  // 割引額と割引後の価格を計算
  const discountAmount = (originalPrice * discountRate) / 100;
  const discountedPrice = originalPrice - discountAmount;

  // 結果を表示
  document.getElementById("discountedPrice").textContent = `${discountedPrice}円`;
  document.getElementById("discountAmount").textContent = `${discountAmount}円`;
}


function calculatePricePerGram(gramsId, priceId, resultId) {
  // 各商品のグラム数と価格を取得
  const grams = parseFloat(document.getElementById(gramsId).value);
  const price = parseFloat(document.getElementById(priceId).value);

  // 計算結果を格納する変数
  let result;

  // 入力値が正しい場合に計算を実行
  if (!isNaN(grams) && grams > 0 && !isNaN(price) && price > 0) {
    result = (price / grams).toFixed(2); // gあたりの価格を計算
  } else {
    result = "入力が正しくありません"; // 入力値が不正な場合のエラーメッセージ
  }

  // 計算結果を指定された結果表示要素に反映
  document.getElementById(resultId).textContent =
    result + (result !== "入力が正しくありません" ? " 円/g" : "");
}

// 税込価格から税抜価格と税金分を計算
function calculateExclusivePrice() {
  const taxRate = parseFloat(document.getElementById("taxRate").value) / 100;
  const inclusivePrice = parseFloat(
    document.getElementById("inclusivePrice").value
  );

  if (
    !isNaN(taxRate) &&
    taxRate > 0 &&
    !isNaN(inclusivePrice) &&
    inclusivePrice > 0
  ) {
    const exclusivePrice = (inclusivePrice / (1 + taxRate)).toFixed(0);
    const tax = (inclusivePrice - exclusivePrice).toFixed(0);

    document.getElementById("calculatedExclusivePrice").textContent =
      exclusivePrice + " 円";
    document.getElementById("calculatedTaxFromInclusive").textContent =
      tax + " 円";
  } else {
    document.getElementById("calculatedExclusivePrice").textContent =
      "入力が正しくありません";
    document.getElementById("calculatedTaxFromInclusive").textContent =
      "入力が正しくありません";
  }
}

// 税抜価格から税込価格と税金分を計算
function calculateInclusivePrice() {
  const taxRate = parseFloat(document.getElementById("taxRate").value) / 100;
  const exclusivePrice = parseFloat(
    document.getElementById("exclusivePrice").value
  );

  if (
    !isNaN(taxRate) &&
    taxRate > 0 &&
    !isNaN(exclusivePrice) &&
    exclusivePrice > 0
  ) {
    const inclusivePrice = (exclusivePrice * (1 + taxRate)).toFixed(0);
    const tax = (inclusivePrice - exclusivePrice).toFixed(0);

    document.getElementById("calculatedInclusivePrice").textContent =
      inclusivePrice + " 円";
    document.getElementById("calculatedTaxFromExclusive").textContent =
      tax + " 円";
  } else {
    document.getElementById("calculatedInclusivePrice").textContent =
      "入力が正しくありません";
    document.getElementById("calculatedTaxFromExclusive").textContent =
      "入力が正しくありません";
  }
}


function decidePurchase() {
  // 各ラジオボタンの値を取得
  const budget = parseInt(
    document.querySelector('input[name="budget"]:checked').value
  );
  const itemPrice = parseInt(
    document.querySelector('input[name="itemPrice"]:checked').value
  );
  const priceDropPotential = parseInt(
    document.querySelector('input[name="priceDropPotential"]:checked').value
  );
  const decisionTime = parseInt(
    document.querySelector('input[name="decisionTime"]:checked').value
  );
  const wantLevel = parseInt(
    document.querySelector('input[name="wantLevel"]:checked').value
  );
  const necessityLevel = parseInt(
    document.querySelector('input[name="necessityLevel"]:checked').value
  );
  const growthPotential = parseInt(
    document.querySelector('input[name="growthPotential"]:checked').value
  );

  // スコア計算
  const totalScore =
    budget +
    itemPrice +
    priceDropPotential +
    decisionTime +
    wantLevel +
    necessityLevel +
    growthPotential;

  // 判断結果を決定 (5段階評価)
  let decisionMessage;
  if (totalScore >= 35) {
    decisionMessage = "★★★★★★★: 今すぐ購入するべきです！";
  } else if (totalScore >= 30) {
    decisionMessage = "★★★★★★☆: 購入する価値が非常に高いです。";
  } else if (totalScore >= 25) {
    decisionMessage = "★★★★★☆☆: 購入を強く検討してください。";
  } else if (totalScore >= 20) {
    decisionMessage = "★★★★☆☆☆: 条件次第で購入を検討してください。";
  } else if (totalScore >= 15) {
    decisionMessage = "★★★☆☆☆☆: 購入を慎重に検討してください。";
  } else if (totalScore >= 10) {
    decisionMessage = "★★☆☆☆☆☆: 購入は控えたほうが良いかもしれません。";
  } else if (totalScore >= 5) {
    decisionMessage = "★☆☆☆☆☆☆: 購入はおすすめできません。";
  } else {
    decisionMessage = "☆☆☆☆☆☆☆: 購入する必要はありません。";
  }

  // 結果をHTMLに反映
  document.getElementById("purchaseDecisionResult").textContent =
    decisionMessage;
}



/*🔴8段階くらいにして

以下のように、購入判断の評価を8段階に変更します。スコア範囲を細かく分けて、それ
ぞれに対応するメッセージを設定します。

---

### 修正後のコード例
```javascript
if (totalScore >= 35) {
  decisionMessage = "★★★★★★★☆: 今すぐ購入するべきです！";
} else if (totalScore >= 30) {
  decisionMessage = "★★★★★★☆☆: 購入する価値が非常に高いです。";
} else if (totalScore >= 25) {
  decisionMessage = "★★★★★☆☆☆: 購入を強く検討してください。";
} else if (totalScore >= 20) {
  decisionMessage = "★★★★☆☆☆☆: 条件次第で購入を検討してください。";
} else if (totalScore >= 15) {
  decisionMessage = "★★★☆☆☆☆☆: 購入を慎重に検討してください。";
} else if (totalScore >= 10) {
  decisionMessage = "★★☆☆☆☆☆☆: 購入は控えたほうが良いかもしれません。";
} else if (totalScore >= 5) {
  decisionMessage = "★☆☆☆☆☆☆☆: 購入はおすすめできません。";
} else {
  decisionMessage = "☆☆☆☆☆☆☆☆: 購入する必要はありません。";
}
```

---

### 修正内容
1. **評価段階を8段階に変更**:
   - スコア範囲を細かく分け、8段階の評価を設定しました。
   - 各スコア範囲に対応するメッセージを追加。
2. **スコア範囲の例**:
   - `35以上`: ★★★★★★★☆
   - `30以上`: ★★★★★★☆☆
   - `25以上`: ★★★★★☆☆☆
   - 以下同様に段階を設定。

---

### 動作説明
- **スコア計算**:
  - 入力された値を基に`totalScore`を計算。
- **評価メッセージ**:
  - `totalScore`に応じて8段階の評価メッセージを決定。
- **結果表示**:
  - `decisionMessage`をHTMLに反映して表示。

---

### 結果例
- **スコア: 36** → `★★★★★★★☆: 今すぐ購入するべきです！`
- **スコア: 28** → `★★★★★★☆☆: 購入する価値が非常に高いです。`
- **スコア: 12** → `★★☆☆☆☆☆☆: 購入は控えたほうが良いかもしれません。`*/
