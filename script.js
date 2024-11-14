const cardArray = [
  {
    owned: false,
    image: "Cards/HogRider.png",
    name: "Hog Rider",
    atk: 4,
    hp: 7,
  },
  {
    owned: false,
    image: "Cards/Kon.png",
    name: "Kon",
    atk: 1,
    hp: 1,
  },
  {
    owned: false,
    image: "Cards/Mordred.png",
    name: "Mordred",
    atk: 5,
    hp: 5,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "4",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "5",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "6",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "7",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "8",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "9",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "10",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "11",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "12",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "13",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "14",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "15",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "16",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "17",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "18",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "19",
    atk: 10,
    hp: 10,
  },
  {
    owned: false,
    image: "https://picsum.photos/250",
    name: "20",
    atk: 10,
    hp: 10,
  },
];
const enemyArray = [
  {
    id: 1,
    sprite: "orc/PNG/Orc3/orc3_idle/orc3_idle.png",
    name: "Orc",
    atk: 5,
    hp: 10,
    defeated: false,
  },
  {
    id: 2,
    sprite: "monsters/Monsters_Creatures_Fantasy/Skeleton/Idle.png",
    name: "Skeleton",
    atk: 10,
    hp: 20,
    defeated: false,
  },
  {
    id: 3,
    sprite: "",
    name: "Demon",
    atk: 15,
    hp: 30,
    defeated: false,
  },
];

if (localStorage.getItem("cards") === null) {
  localStorage.setItem("cards", JSON.stringify(cardArray));
}
if (localStorage.getItem("packs") === null) {
  localStorage.setItem("packs", 1);
}
if (localStorage.getItem("enemies") === null) {
  localStorage.setItem("enemies", JSON.stringify(enemyArray));
}

const packNumber = document.getElementById("packNumber");
const packOpenBtn = document.getElementById("packOpenBtn");
const pack = document.getElementById("pack");
const closePack = document.getElementById("closePack");
const packOpen = document.getElementById("packOpen");
const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");
const cardBook = document.getElementById("cardBook");
const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");
const packOpening = document.getElementById("packOpening");
const closeIcon = document.getElementById("closeIcon");
const floatBook = document.getElementById("floatBook");
const floatPack = document.getElementById("floatPack");
const deck = document.getElementById("deck");
const enemyAtk = document.getElementById("eAtk");
const enemyHp = document.getElementById("eHp");
const fightBtn = document.getElementById("fight");
const cardSelect = document.getElementById("cardSelect");
const playerAtk = document.getElementById("pAtk");
const playerHp = document.getElementById("pHp");
const okBtn = document.getElementById("ok");
const cancelBtn = document.getElementById("cancel");
const die = document.getElementById("dice");
const gameOver = document.getElementById("gameOver");

arrowLeft.style.display = "none";

function updatePackCounter(number) {
  packNumber.innerHTML = "Csomagok szama: " + number;
  localStorage.setItem("packs", number);
  if (number <= 0) {
    packOpenBtn.style.pointerEvents = "none";
    packOpenBtn.style.opacity = 0.5;
    packOpenBtn.style.color = "gray";
  } else {
    packOpenBtn.style.pointerEvents = "auto";
    packOpenBtn.style.opacity = 1;
    packOpenBtn.style.color = "black";
  }
}

function packVisible(value) {
  packOpenBtn.style.visibility = value;
  closePack.style.visibility = value;
  packNumber.style.visibility = value;
}

packOpenBtn.addEventListener("click", () => {
  updatePackCounter(localStorage.getItem("packs") - 1);
  const cards = Array.from(document.getElementsByClassName("card"));
  cards.forEach((card) => {
    if (card.parentElement.id === "packOpen") {
      packOpen.removeChild(card);
    }
  });

  pack.style.display = "inline";
  packOpen.style.display = "inline";
  pack.src = "Final_images/openpack.gif";
  packVisible("hidden");
  setTimeout(() => {
    cardOpening().forEach((card) => {
      createCard(true, card.image, card.name, card.atk, card.hp, "packOpen");
    });
    hoverTilt();
    pack.style.display = "none";
    packOpen.style.display = "grid";
    packOpen.style.gridTemplateColumns = "repeat(3, 1fr)";
    packOpen.style.gap = "20px";
    packOpen.style.margin = "40px";
    pack.src = "Final_images/PixelPackBig.png";
    packVisible("visible");
  }, 3500);
});

function cardOpening() {
  const local = JSON.parse(localStorage.getItem("cards"));
  var array = [];

  for (let i = 0; i < 3; i++) {
    var n = Math.floor(Math.random() * local.length);
    array.push(local[n]);
    local[n].owned = true;
    localStorage.setItem("cards", JSON.stringify(local));
  }

  return array;
}

function turnPage(isRight) {
  if (isRight) {
    right += 8;
    left += 8;
  } else {
    right -= 8;
    left -= 8;
  }
  if (left >= 4) {
    arrowLeft.style.display = "block";
  } else {
    arrowLeft.style.display = "none";
  }
  if (left + 8 < JSON.parse(localStorage.getItem("cards")).length) {
    arrowRight.style.display = "block";
  } else {
    arrowRight.style.display = "none";
  }

  leftPage.innerHTML = null;
  rightPage.innerHTML = null;
  cardBook.style.backgroundImage = "url('Final_images/Book.gif')";
  setTimeout(() => {
    cardBook.style.backgroundImage = "url('Final_images/Page.png')";

    loadCards();
  }, 700);
}

arrowRight.addEventListener("click", () => {
  turnPage(true);
});

arrowLeft.addEventListener("click", () => {
  turnPage(false);
});

floatBook.addEventListener("mouseenter", () => {
  floatBook.src = "Final_images/BookHover.png";
});

floatBook.addEventListener("mouseleave", () => {
  floatBook.src = "Final_images/Book.png";
});

//kartyak szama oldalankent
var left = 0;
var right = left + 4;
floatBook.addEventListener("click", () => {
  loadCards();
  cardBook.showModal();
});

function loadCards() {
  const local = JSON.parse(localStorage.getItem("cards"));
  leftPage.innerHTML = null;
  rightPage.innerHTML = null;
  for (let i = left; i < left + 4; i++) {
    if (local[i] != undefined) {
      createCard(
        local[i].owned,
        local[i].image,
        local[i].name,
        local[i].atk,
        local[i].hp,
        "leftPage"
      );
    } else {
      const c = createCard(
        false,
        "https://picsum.photos/200",
        "Placeholder",
        0,
        0,
        "leftPage"
      );
      c.style.visibility = "hidden";
    }
  }
  for (let i = right; i < right + 4; i++) {
    if (local[i] != undefined) {
      createCard(
        local[i].owned,
        local[i].image,
        local[i].name,
        local[i].atk,
        local[i].hp,
        "rightPage"
      );
    } else {
      const c = createCard(
        false,
        "https://picsum.photos/200",
        "Placeholder",
        0,
        0,
        "rightPage"
      );
      c.style.visibility = "hidden";
    }
  }
  hoverTilt();
}

floatPack.addEventListener("mouseenter", () => {
  floatPack.src = "Final_images/PackHover.gif";
});

floatPack.addEventListener("mouseleave", () => {
  floatPack.src = "Final_images/PixelPackSmall.png";
});

closePack.addEventListener("click", () => {
  const cards = Array.from(document.getElementsByClassName("card"));
  cards.forEach((card) => {
    if (card.parentElement.id === "packOpen") {
      packOpen.removeChild(card);
    }
  });
  packOpen.style.display = "inline";
  pack.style.display = "inline";
  packOpening.close();
});

floatPack.addEventListener("click", () => {
  updatePackCounter(localStorage.getItem("packs"));
  packOpening.showModal();
});

closeIcon.addEventListener("click", () => {
  left = 0;
  right = left + 4;
  arrowLeft.style.display = "none";
  arrowRight.style.display = "block";
  cardBook.close();
  isCardSelect = false;
});

function createCard(owned, imgSrc, name, atk, hp, appendId) {
  const card = document.createElement("div");
  card.classList.add("card");
  const container = document.createElement("div");
  if (!owned) {
    container.classList.add("notOwned");
    card.style.backgroundImage = "url('Final_images/CardBack.png')";
  }
  const img = document.createElement("img");
  img.classList.add("card-image");
  img.src = imgSrc;
  img.alt = name;
  container.appendChild(img);
  const cardName = document.createElement("div");
  cardName.classList.add("card-name");
  const scroll = document.createElement("img");
  scroll.src = "Final_images/Scroll.png";
  cardName.appendChild(scroll);
  const cName = document.createElement("div");
  cName.classList.add("name");
  cName.innerHTML = name;
  cardName.appendChild(cName);
  container.appendChild(cardName);
  const cardStats = document.createElement("div");
  cardStats.classList.add("card-stats");
  const ATK = document.createElement("div");
  ATK.classList.add("stat");
  ATK.classList.add("ATK");
  const HP = document.createElement("div");
  HP.classList.add("stat");
  HP.classList.add("HP");
  const atkSpan = document.createElement("span");
  atkSpan.innerHTML = `ATK <br /> ${atk}`;
  ATK.appendChild(atkSpan);
  const hpSpan = document.createElement("span");
  hpSpan.innerHTML = `HP <br /> ${hp}`;
  HP.appendChild(hpSpan);
  cardStats.appendChild(ATK);
  cardStats.appendChild(HP);
  container.appendChild(cardStats);
  card.appendChild(container);
  card.dataset.id = name;
  card.addEventListener("click", (e) => {
    if (isCardSelect) {
      const local = JSON.parse(localStorage.getItem("cards"));
      const foundCard = local.find((x) => x.name == e.currentTarget.dataset.id);
      var contains = false;
      Array.from(deck.children).forEach((child) => {
        if (child.dataset.id == e.currentTarget.dataset.id) {
          contains = true;
        }
      });
      if (foundCard.owned && deck.childElementCount < 3 && !contains) {
        createCard(
          foundCard.owned,
          foundCard.image,
          foundCard.name,
          foundCard.atk,
          foundCard.hp,
          "deck"
        );
        playerAtk.innerHTML = parseInt(playerAtk.innerHTML) + foundCard.atk;
        playerHp.innerHTML = parseInt(playerHp.innerHTML) + foundCard.hp;
        hoverTilt();
        cardBook.close();
      }
    }
  });
  document.getElementById(appendId).appendChild(card);
  return card;
}

function hoverTilt() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const cardRect = card.getBoundingClientRect();
      const centerX = cardRect.left + cardRect.width / 2;
      const centerY = cardRect.top + cardRect.height / 2;

      // cursor tavolsaga a kozepetol
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // y forgatas megforditasa hogy jo iranyba doljon
      const rotateX = -(deltaY / 20); // hegativ hogy a cursor fele doljon
      const rotateY = deltaX / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
      card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    });
  });
}

const enemies = Array.from(document.getElementsByClassName("enemy"));
enemies.forEach((enemy) => {
  enemy.addEventListener("click", (e) => {
    selectEnemy(e.target.id);
  });
});

fightBtn.addEventListener("click", () => {
  floatBook.style.visibility = "hidden";
  floatPack.style.visibility = "hidden";
  cancelBtn.style.visibility = "hidden";
  fightBtn.style.visibility = "hidden";
  cardSelect.style.visibility = "hidden";
  document.getElementById("enemy" + selectedEnemy.id).style.pointerEvents =
    "none";
  fight({
    playerTurn: true,
    playerAtk: parseInt(playerAtk.innerHTML),
    playerHp: parseInt(playerHp.innerHTML),
    enemyAtk: selectedEnemy.atk,
    enemyHp: selectedEnemy.hp,
  });
});

function fight(stats) {
  const roll = rollDice();
  setTimeout(() => {
    if (stats.playerTurn) {
      console.log(
        (stats.enemyHp - (roll + 1 + stats.playerAtk)) / stats.enemyHp
      );

      stats.enemyHp -= roll + 1 + stats.playerAtk;
      enemyHp.innerHTML = stats.enemyHp;
      stats.playerTurn = !stats.playerTurn;

      player.updateSprite("Final_images/Knight/KnightAttack.png", 6, 1, false);

      setTimeout(() => {
        player.updateSprite("Final_images/Knight/KnightIdle.png", 10, 1, true);
      }, 600);

      switch ("enemy" + selectedEnemy.id) {
        case "enemy1":
          orc.updateSprite("Final_images/Orc/OrcHurt.png", 6, 1, false);
          setTimeout(() => {
            orc.updateSprite("Final_images/Orc/OrcIdle.png", 4, 1, true);
          }, 600);
          break;

        case "enemy2":
          skeleton.updateSprite(
            "Final_images/Skeleton/SkeletonHurt.png",
            4,
            1,
            false
          );
          setTimeout(() => {
            skeleton.updateSprite(
              "Final_images/Skeleton/SkeletonIdle.png",
              4,
              1,
              true
            );
          }, 400);
          break;

        case "enemy3":
          demon.updateSprite("Final_images/Demon/DemonHurt.png", 5, 1, false);
          setTimeout(() => {
            demon.updateSprite("Final_images/Demon/DemonIdle.png", 6, 1, true);
          }, 500);
          break;
      }
    } else {
      stats.playerHp -= roll + 1 + stats.enemyAtk;
      playerHp.innerHTML = stats.playerHp;
      stats.playerTurn = !stats.playerTurn;

      player.updateSprite("Final_images/Knight/KnightHurt.png", 1, 1, false);

      setTimeout(() => {
        player.updateSprite("Final_images/Knight/KnightIdle.png", 10, 1, true);
      }, 200);

      switch ("enemy" + selectedEnemy.id) {
        case "enemy1":
          orc.updateSprite("Final_images/Orc/OrcAttack.png", 8, 1, false);
          setTimeout(() => {
            orc.updateSprite("Final_images/Orc/OrcIdle.png", 4, 1, true);
          }, 800);
          break;

        case "enemy2":
          skeleton.updateSprite(
            "Final_images/Skeleton/SkeletonAttack.png",
            8,
            1,
            false
          );
          setTimeout(() => {
            skeleton.updateSprite(
              "Final_images/Skeleton/SkeletonIdle.png",
              4,
              1,
              true
            );
          }, 800);
          break;

        case "enemy3":
          demon.updateSprite(
            "Final_images/Demon/DemonAttack.png",
            15,
            1,
            false
          );
          setTimeout(() => {
            demon.updateSprite("Final_images/Demon/DemonIdle.png", 6, 1, true);
          }, 1500);
          break;
      }
    }
    setTimeout(() => {
      if (stats.enemyHp <= 0) {
        switch ("enemy" + selectedEnemy.id) {
          case "enemy1":
            orc.updateSprite("Final_images/Orc/OrcDeath.png", 8, 1, false);
            break;
          case "enemy2":
            skeleton.updateSprite(
              "Final_images/Skeleton/SkeletonDeath.png",
              4,
              1,
              false
            );
            break;
          case "enemy3":
            demon.updateSprite(
              "Final_images/Demon/DemonDeath.png",
              22,
              1,
              false
            );
            break;
        }
        okBtn.style.visibility = "visible";
        gameOver.style.visibility = "visible";
        gameOver.style.color = "#D4AF37";
        gameOver.innerHTML = "Gyozelem";
        dice.updateSprite("Final_images/Dice/win.png", 1, 1, false);
        updatePackCounter(parseInt(localStorage.getItem("packs")) + 1);
        return;
      }
      if (stats.playerHp <= 0) {
        player.updateSprite(
          "Final_images/Knight/KnightDeath.png",
          10,
          1,
          false
        );
        okBtn.style.visibility = "visible";
        gameOver.style.visibility = "visible";
        gameOver.style.color = "#4a0001";
        gameOver.innerHTML = "Vereseg";
        dice.updateSprite("Final_images/Dice/skull.png", 1, 1, false);
        return;
      }
    }, 1000);

    if (stats.enemyHp > 0 && stats.playerHp > 0) {
      fight(stats);
    }
  }, 2000);
}

function showVictory() {
  okBtn.style.visibility = "visible";
  gameOver.style.visibility = "visible";
  gameOver.style.color = "#D4AF37";
  gameOver.innerHTML = "Gyozelem";
  dice.updateSprite("Final_images/Dice/win.png", 1, 1, false);
  updatePackCounter(parseInt(localStorage.getItem("packs")) + 1);
}

function showDefeat() {
  okBtn.style.visibility = "visible";
  gameOver.style.visibility = "visible";
  gameOver.style.color = "#4a0001";
  gameOver.innerHTML = "Vereseg";
  dice.updateSprite("Final_images/Dice/skull.png", 1, 1, false);
}

okBtn.addEventListener("click", () => {
  playerAtk.innerHTML = 2;
  playerHp.innerHTML = 10;
  playerAtk.style.visibility = "hidden";
  playerHp.style.visibility = "hidden";
  enemyAtk.style.visibility = "hidden";
  enemyHp.style.visibility = "hidden";
  floatBook.style.visibility = "visible";
  floatPack.style.visibility = "visible";
  deck.style.visibility = "hidden";
  deck.innerHTML = null;
  cardSelect.style.visibility = "hidden";
  die.style.visibility = "hidden";
  okBtn.style.visibility = "hidden";
  gameOver.style.visibility = "hidden";
  dice.updateSprite("Final_images/Dice/Blank.png", 1, 1, false);
  enemies.forEach((enemy) => {
    enemy.style.display = "inline";
    enemy.style.pointerEvents = "auto";
  });
  player.updateSprite("Final_images/Knight/KnightIdle.png", 10, 1, true);
  switch ("enemy" + selectedEnemy.id) {
    case "enemy1":
      orc.updateSprite("Final_images/Orc/OrcIdle.png", 4, 1, true);
      break;
    case "enemy2":
      skeleton.updateSprite(
        "Final_images/Skeleton/SkeletonIdle.png",
        4,
        1,
        true
      );
      break;
    case "enemy3":
      demon.updateSprite("Final_images/Demon/DemonIdle.png", 6, 1, true);
      break;
  }
});

function cancelVisibitlity(value) {
  cancelBtn.style.visibility = value;
  fightBtn.style.visibility = value;
  playerAtk.style.visibility = value;
  playerHp.style.visibility = value;
  die.style.visibility = value;
  deck.style.visibility = value;
  cardSelect.style.visibility = value;
}

cancelBtn.addEventListener("click", () => {
  cancelVisibitlity("hidden");
  enemyAtk.style.visibility = "hidden";
  enemyHp.style.visibility = "hidden";
  deck.innerHTML = null;
  playerAtk.innerHTML = 2;
  playerHp.innerHTML = 10;
  enemies.forEach((enemy) => {
    enemy.style.display = "inline";
  });
});

var selectedEnemy = null;
function selectEnemy(id) {
  enemies.forEach((enemy) => {
    if (enemy.id != id) {
      enemy.style.display = "none";
    } else {
      selectedEnemy = enemyArray.find((x) => "enemy" + x.id == id);
      enemyAtk.innerHTML = selectedEnemy.atk;
      enemyHp.innerHTML = selectedEnemy.hp;
      enemyAtk.style.visibility = "visible";
      enemyHp.style.visibility = "visible";
    }
  });
  cancelVisibitlity("visible");
}

function rollDice() {
  const r = Math.floor(Math.random() * 6);
  dice.updateSprite("Final_images/Dice/d6sprite.png", 6, 1, false);
  setTimeout(() => {
    dice.updateSprite(`Final_images/Dice/d6_${r + 1}.png`, 1, 1, false);
  }, 500);
  return r;
}

const dice = createSprite("dice", "Final_images/Dice/Blank.png", 1, 1, 4);

const player = createSprite(
  "player",
  "Final_images/Knight/KnightIdle.png",
  10,
  1,
  2.5
);
const orc = createSprite("enemy1", "Final_images/Orc/OrcIdle.png", 4, 1, 2);
const skeleton = createSprite(
  "enemy2",
  "Final_images/Skeleton/SkeletonIdle.png",
  4,
  1,
  2.5
);
const demon = createSprite(
  "enemy3",
  "Final_images/Demon/DemonIdle.png",
  6,
  1,
  2
);

function createSprite(canvasId, spriteLocation, col, row, scale) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext("2d");

  let sprite = new Image();
  sprite.src = spriteLocation;
  let numColumns = col;
  let numRows = row;

  let frameWidth, frameHeight;
  let currentFrame = 0;

  const updateFrameDimensions = () => {
    frameWidth = sprite.width / numColumns;
    frameHeight = sprite.height / numRows;
    canvas.width = frameWidth * scale;
    canvas.height = frameHeight * scale;
    context.webkitImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
  };

  sprite.onload = updateFrameDimensions;

  function updateSprite(newSpriteLocation, newCol, newRow, loop = true) {
    sprite.src = newSpriteLocation;
    numColumns = newCol;
    numRows = newRow;
    currentFrame = 0;
    sprite.onload = updateFrameDimensions;
    isLooping = loop;
  }

  let isLooping = true;

  setInterval(() => {
    currentFrame++;

    let maxFrame = numColumns * numRows - 1;
    if (currentFrame > maxFrame) {
      if (isLooping) {
        currentFrame = 0;
      } else {
        currentFrame = maxFrame;
      }
    }

    let column = currentFrame % numColumns;
    let row = Math.floor(currentFrame / numColumns);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      sprite,
      column * frameWidth,
      row * frameHeight,
      frameWidth,
      frameHeight,
      0,
      0,
      frameWidth * scale,
      frameHeight * scale
    );
  }, 100);

  return { updateSprite };
}

var isCardSelect = false;
cardSelect.addEventListener("click", () => {
  isCardSelect = true;
  loadCards();
  cardBook.showModal();
});
