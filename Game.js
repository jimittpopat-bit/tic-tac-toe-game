let btns = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newgameBtn = document.querySelector("#newgame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let msgDraw = document.querySelector(".Draw-msg");
let turn0 = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

btns.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      box.style.color = "blue";
      turn0 = false;
    } else {
      box.innerText = "X";
      box.style.color = "red";

      turn0 = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of btns) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of btns) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = ` Yeah! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const Draw = (draw) => {
  msgDraw.innerText = ` Its a DRAW!`;
  msgContainer.classList.remove("hide");
  msg.classList.add("hide_2");
  disableBoxes();
};

const checkWinner = () => {
  let winnerFound = false;
  for (let pattern of winPatterns) {
    let pos1Val = btns[pattern[0]].innerText;
    let pos2Val = btns[pattern[1]].innerText;
    let pos3Val = btns[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "")
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        winnerFound = true;
        break;
      }
  }

  if (!winnerFound) {
    let allFilled = [...btns].every((btn) => btn.innerText !== "");
    if (allFilled) {
      Draw();
    }
  }
};

newgameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
