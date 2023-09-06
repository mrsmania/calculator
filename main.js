let firstOperand = "";
let secondOperand = "";
let operator = "";
let operatorSet = 0;
let roundedResult = "";

const numberButtons = document.querySelectorAll('[data-num]');
const operatorButtons = document.querySelectorAll('[data-opr]');
const btnAc = document.getElementById('ac');
const btnDel = document.getElementById('del');
const btnDot = document.getElementById('dot');
const btnEquals = document.getElementById('equals');
const displayCurrent = document.getElementById('current');
const displayHistory = document.getElementById('history');

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        inputToDisplay(button.textContent);
        button.blur();
    });
})
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        operatorToDisplay(button.textContent)
        button.blur();
    });
})

btnDot.addEventListener('click', () => {
    addDot();
    btnDot.blur();
});

btnEquals.addEventListener('click', () => {
    operate(firstOperand, secondOperand, operator);
    btnEquals.blur();
});
btnAc.addEventListener('click', () => {
    clearDisplay();
    btnAc.blur();
});
btnDel.addEventListener('click', () => {
    deleteLastDigit(firstOperand, secondOperand);
    btnDel.blur();
});
window.addEventListener('keydown', (e) => {
    if (e.key === "Space") e.preventDefault();
    if (e.key === "0" || e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4" || e.key === "5" || e.key === "6" || e.key === "7" || e.key === "8" || e.key === "9") inputToDisplay(e.key);
    if (e.key === ".") addDot();
    if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*" || e.key === "Dead")transformOperator(e.key);
    if (e.key === "Enter" || e.key === "=") operate(firstOperand, secondOperand, operator);
    if (e.key === "Backspace") deleteLastDigit(firstOperand, secondOperand);
    if (e.key === "Escape") clearDisplay();
});

function transformOperator(input) {
    switch (input) {
        case "+":
            input = "+";
            break;
        case "-":
            input = "−";
            break;
        case "*":
            input = "×";
            break;
        case "/":
            input = "÷";
            break;
        case "Dead":
            input = "^";
            break;
        default:
            "Unknown error";
            break;
    }
    operatorToDisplay(input);
}

function operate(a, b, op) {
    if (!b) return;
    a = Number(a);
    b = Number(b);
    switch (op) {
        case "+":
            return add(a, b);
        case "−":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
        case "^":
            return power(a, b);
        default:
            "Unknown error";
    }
};

function add(a, b) { resultToDisplay(a + b); }
function subtract(a, b) { resultToDisplay(a - b); }
function multiply(a, b) { resultToDisplay(a * b); }
function divide(a, b) { resultToDisplay(a / b); }
function power(a, b) { resultToDisplay(a ** b); }

function inputToDisplay(numberInput) {
    if (operatorSet === 0) {
        getFirstOperand(numberInput);
    } else if (operatorSet === 1) {
        getSecondOperand(numberInput)
    }
};

function getFirstOperand(numberInput) {
    firstOperand += numberInput;
    displayCurrent.innerHTML += numberInput;
    //consoleLogAfterClick("firstOperand");
};

function getSecondOperand(numberInput) {
    secondOperand += numberInput;
    displayCurrent.innerHTML += numberInput;
    //consoleLogAfterClick("secondOperand");
};

function operatorToDisplay(operatorInput) {
    if (!firstOperand) return;
    if (operatorSet === 0) {
        operator = operatorInput;
        displayCurrent.innerHTML += operatorInput;
        operatorSet = 1;
    }
    //consoleLogAfterClick("Operator");
};

function resultToDisplay(resultInput) {
    roundedResult = Math.round(resultInput * 1000) / 1000;
    displayHistory.innerHTML = firstOperand + " " + operator + " " + secondOperand + " = ";
    displayCurrent.innerHTML = roundedResult;
    firstOperand = roundedResult;
    secondOperand = "";
    operator = "";
    operatorSet = 0;
    //consoleLogAfterClick("Result");
};

function clearDisplay() {
    displayCurrent.innerHTML = "";
    displayHistory.innerHTML = "";
    firstOperand = "";
    secondOperand = "";
    operator = "";
    operatorSet = 0;
    roundedResult = "";
    //consoleLogAfterClick("Clear");
};

function deleteLastDigit(firstOp, secondOp) {
    if (operatorSet === 0) {
        firstOperand = firstOp.toString().slice(0, -1);
        displayCurrent.innerHTML = firstOperand;
    } else if (operatorSet === 1) {
        secondOperand = secondOp.toString().slice(0, -1);
        displayCurrent.innerHTML = firstOperand + " " + operator + " " + secondOperand;
    }
    //consoleLogAfterClick("Delete")
};

function addDot() {
    if (operatorSet === 0 && firstOperand.toString().includes('.')) { return; }
    else if (operatorSet === 1 && secondOperand.toString().includes('.')) { return; };
    inputToDisplay(".");
};

// function consoleLogAfterClick(clicked) {
//     console.log("---------------------------------");
//     console.log("Clicked on: " + clicked);
//     console.log("Result: " + roundedResult);
//     console.log("firstOperand: " + firstOperand);
//     console.log("Operator: " + operator);
//     console.log("secondOperand: " + secondOperand);
//     console.log("isOperator set: " + operatorSet);
// };