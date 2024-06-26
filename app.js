let gameSeq = [];
let userSeq = [];

let btns = ["green", "red", "yellow", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");

    started = true;

    levelUp();
  }
});

if (localStorage.getItem("score") === null) {
  localStorage.setItem("score", 0);
}

document.getElementById("best_score").innerHTML =
  "Highest Score is " + localStorage.getItem("score");

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 150);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  // console.log(randIdx, randColor, randBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);
  btnFlash(randBtn);
  updateHighscore(level);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start again.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log(userSeq);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function updateHighscore(newScore) {
  const oldHighscore = parseFloat(localStorage.getItem("score"));

  if (oldHighscore == null || oldHighscore < newScore) {
    localStorage.setItem("score", newScore);
    document.getElementById("best_score").innerHTML =
      "Highest Score is " + localStorage.getItem("score");
  } else {
    document.getElementById("best_score").innerHTML =
      "Highest Score is " + localStorage.getItem("score");
  }
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
