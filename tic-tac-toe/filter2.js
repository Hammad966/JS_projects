let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");
let resetBtn = document.getElementById("reset-btn");
let newGameBtn = document.getElementById("new-btn");
let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    })
});

const checkWinner = () => {
    for(patten of winPatterns) {
        let pos1Val = boxes[patten[0]].innerText;
        let pos2Val = boxes[patten[1]].innerText;
        let pos3Val = boxes[patten[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val)
            }
        }
    }
}

const showWinner = (winner) => {
    msgContainer.classList.remove("hide");
    msg.innerText = `Congratulations! Winner is ${winner}`;
    disabledBoxes();
}

const disabledBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);