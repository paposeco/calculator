// calculator
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b > 0) {
    return a / b;
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
      case add:
        return add(a, b);
        break;
      case subtract:
        return subtract(a, b);
        break;
      case multiply:
        return multiply(a, b);
        break;
      case divide:
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
const inputNumber = document.getElementById("display");

console.log(digitsAll);

let firstNumber = "";
digits.addEventListener("click", function (event) {
  firstNumber += event.target.value;
  inputNumber.value = firstNumber;
});

operators.addEventListener("click", function (event) {
  console.log(event.target.name);
});
