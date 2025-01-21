// 塔羅牌數據（78 張）
const tarotDeck = Array.from({ length: 78 }, (_, i) => `Card ${i + 1}`);
let remainingDeck = [...tarotDeck]; // 剩餘牌堆，避免重複抽牌

// 隨機洗牌函數
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// DOM 元素
const cardContainer = document.getElementById("cardContainer");
const shuffleBtn = document.getElementById("shuffleBtn");
const decreaseBtn = document.getElementById("decreaseBtn");
const increaseBtn = document.getElementById("increaseBtn");
const cardCountSpan = document.getElementById("cardCount");

// 抽牌數量控制
let cardCount = 1;

// 更新抽牌數量
function updateCardCount() {
  cardCountSpan.textContent = cardCount;
}

// 點擊減少按鈕
decreaseBtn.addEventListener("click", () => {
  if (cardCount > 1) {
    cardCount--;
    updateCardCount();
  }
});

increaseBtn.addEventListener("click", () => {
  if (cardCount < 3) {
    cardCount++;
    updateCardCount();
  }
});

// 顯示塔羅牌
function displayCards(cards) {
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";

    // 添加內部結構（正面與背面）
    cardElement.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="cards/${card.replace('Card ', '')}.jpeg" alt="${card}">
        </div>
        <div class="card-back"></div>
      </div>
    `;

    // 點擊翻轉效果
    cardElement.addEventListener("click", () => {
      cardElement.classList.toggle("flipped");
    });

    // 將牌加入容器
    cardContainer.appendChild(cardElement);
  });
}

// 點擊抽牌按鈕
shuffleBtn.addEventListener("click", () => {
  if (remainingDeck.length < cardCount) {
    alert("牌堆中沒有足夠的牌了！");
    return;
  }

  shuffleDeck(remainingDeck);
  const selectedCards = remainingDeck.splice(0, cardCount); // 從剩餘牌堆中抽取指定數量的牌
  displayCards(selectedCards);
});