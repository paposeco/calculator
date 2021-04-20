// calculator
function add(a, b) {
  return Math.round((a + b) * 100000) / 100000;
}

function subtract(a, b) {
  return Math.round((a - b) * 100000) / 100000;
}

function multiply(a, b) {
  return Math.round(a * b * 100000) / 100000;
}

function divide(a, b) {
  if (b > 0) {
    return Math.round((a / b) * 100000) / 100000;
  } else return "ERROR";
}

function operate(operator, a, b) {
  if (
    typeof a === "number" &&
    typeof b === "number" &&
    !isNaN(a) &&
    !isNaN(b)
  ) {
    switch (operator) {
      case "add":
        return add(a, b);
        break;
      case "subtract":
        return subtract(a, b);
        break;
      case "multiply":
        return multiply(a, b);
        break;
      case "divide":
        return divide(a, b);
        break;
    }
  } else return "ERROR";
}

// dom

const digits = document.getElementById("digits");
const digitsAll = document.querySelectorAll("#digits button");
const buttonOne = document.getElementById("one");
const display = document.getElementById("displayInput");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const operators = document.getElementById("operators");
const para = document.querySelector("#happenings > p");
const body = document.querySelector("body");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let total = "";
let subtotal = "";
let currentTextContent;

para.textContent = "0";

// body.addEventListener("click", () =>
//   showEquation(firstNumber, secondNumber, operator)
// );

digits.addEventListener("click", function (event) {
  if (operator === "") {
    firstNumber += event.target.value;
    subtotal = "";
    para.textContent = "";
    para.textContent += firstNumber;
  } else {
    if (subtotal != "") {
      firstNumber = subtotal;
    }
    secondNumber += event.target.value;
    para.textContent = currentTextContent + secondNumber;
  }
});

// function showEquation(firstNumber, secondNumber, operator) {
//   if (firstNumber === "" && secondNumber === "" && operator === "") {
//     para.textContent = "0";
//   } else if (secondNumber === "" && operator === "") {
//     para.textContent = firstNumber;
//   } else if (secondNumber === "") {
//     para.textContent = firstNumber + operator;
//   } else if (subtotal === "") {
//     para.textContent = firstNumber + operator + secondNumber;
//   } else {
//     para.textContent += operator + secondNumber;
//   }
// }

operators.addEventListener("click", function (event) {
  if (operator != "" && secondNumber === "") {
    return;
  }
  if (operator != "") {
    let a = Number(firstNumber);
    let b = Number(secondNumber);
    subtotal = operate(operator, a, b);
    operator = event.target.name;
    secondNumber = "";
  } else {
    if (total != "") {
      para.textContent = subtotal;
      total = "";
    }
    operator = event.target.name;
  }
  switch (operator) {
    case "add":
      para.textContent += " + ";
      break;
    case "subtract":
      para.textContent += " - ";
      break;
    case "multiply":
      para.textContent += " x ";
      break;
    case "divide":
      para.textContent += " / ";
      break;
  }
  currentTextContent = para.textContent;
});

equals.addEventListener("click", function () {
  if (firstNumber === "" || secondNumber === "") {
    return;
  } else {
    let a = Number(firstNumber);
    let b = Number(secondNumber);
    total = operate(operator, a, b);
    para.textContent += " = " + total;
    subtotal = total;
    operator = "";
    firstNumber = "";
    secondNumber = "";
  }
});

clear.addEventListener("click", function () {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  total = "";
  subtotal = "";
  para.textContent = "0";
});
