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
const para = document.getElementById("equation");
const para2 = document.getElementById("currentInput");
const body = document.querySelector("body");
const backspace = document.getElementById("backspace");

// starting values
let firstNumber = "";
let secondNumber = "";
let operator = "";
let total = "";
let subtotal = "";
let dot = false;
let currentTextContent;

//para.textContent = "0";
para2.textContent = "0";

// event handlers
function getOperator(event, typeofInput) {
  if (operator != "" && secondNumber === "") {
    return;
  }
  if (operator != "") {
    let a = Number(firstNumber);
    let b = Number(secondNumber);
    subtotal = operate(operator, a, b);
    if (typeofInput === "mouse") {
      operator = event.target.name;
    } else {
      operator = event.code;
    }
    secondNumber = "";
  } else {
    if (total != "") {
      para.textContent = subtotal;
      total = "";
    }
    if (typeofInput === "mouse") {
      operator = event.target.name;
    } else {
      operator = event.code;
    }
  }

  firstNumber = Number(firstNumber);
  if (typeofInput === "mouse") {
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
  } else {
    switch (operator) {
      case "NumpadAdd":
        operator = "add";
        para.textContent += " + ";
        break;
      case "NumpadSubtract":
        para.textContent += " - ";
        operator = "subtract";
        break;
      case "NumpadMultiply":
        para.textContent += " x ";
        operator = "multiply";
        break;
      case "NumpadDivide":
        para.textContent += " / ";
        operator = "divide";
        break;
    }
  }
  currentTextContent = para.textContent;
  dot = false;
}

function getEquals(event) {
  if (firstNumber === "" && secondNumber === "") {
    return;
  } else if (secondNumber === "") {
    total = firstNumber;
    para.textContent += "=";
    para2.textContent = total;
    subtotal = total;
    operator = "";
    firstNumber = "";
  } else {
    let a = Number(firstNumber);
    let b = Number(secondNumber);
    total = operate(operator, a, b);
    para.textContent += " = " + total;
    para2.textContent = total;
    subtotal = total;
    operator = "";
    firstNumber = "";
    secondNumber = "";
  }
}

function backspaceCalc(event) {
  if (total != "") {
    return;
  }
  if (typeof firstNumber === "string") {
    let newFirstNumber = firstNumber.slice(0, firstNumber.length - 1);
    firstNumber = newFirstNumber;
    para.textContent = firstNumber;
  } else if (typeof secondNumber === "string") {
    let textContentBeforeDeletion = para.textContent;
    let newSecondNumber = secondNumber.slice(0, secondNumber.length - 1);
    secondNumber = newSecondNumber;
    para.textContent = textContentBeforeDeletion.slice(
      0,
      textContentBeforeDeletion.length - 1
    );
  } else return;
}

function clearCalc(event) {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  total = "";
  subtotal = "";
  para.textContent = "\u00a0";
  para2.textContent = "0";
  dot = false;
}

function limitInput(number) {
  if (number.length > 20) {
    return true;
  }
}
// event listeners

//mouse
digitsAll.forEach((element) =>
  element.addEventListener("click", function () {
    if (event.target.name === "dot") {
      if (dot) {
        return;
      } else {
        dot = true;
      }
    }

    if (operator === "") {
      if (firstNumber === "0" && event.target.name === "zero") {
        return;
      } else if (firstNumber === "" && event.target.name === "dot") {
        firstNumber = "0.";
      } else {
        firstNumber += event.target.value;
        if (limitInput(firstNumber)) return;
      }
      subtotal = "";
      para.textContent = "";
      para.textContent += firstNumber;
      para2.textContent = para.textContent;
    } else {
      if (subtotal != "") {
        firstNumber = subtotal;
      }
      if (secondNumber === "0" && event.target.name === "zero") {
        return;
      } else if (secondNumber === "" && event.target.name === "dot") {
        secondNumber = "0.";
      } else {
        secondNumber += event.target.value;
        if (limitInput(secondNumber)) return;
      }

      para.textContent = currentTextContent + secondNumber;
      para2.textContent = secondNumber;
    }
  })
);
//sera que posso juntar os returns todos?

equals.addEventListener("click", getEquals);
clear.addEventListener("click", clearCalc);
backspace.addEventListener("click", backspaceCalc);
operators.addEventListener("click", function () {
  getOperator(event, "mouse");
});

// keyboard
window.addEventListener("keydown", function (event) {
  //backspace
  if (event.keyCode === 8) {
    backspaceCalc(event);
  }
  //clear on del
  if (event.keyCode === 46) {
    clearCalc(event);
  }
  //equals
  if (event.keyCode === 13) {
    getEquals(event);
  }
  // operators
  let operatorKeyCodes = [107, 109, 106, 111];
  if (operatorKeyCodes.includes(event.keyCode)) {
    getOperator(event, "keyboard");
  }
  //digits
  if (event.code === "NumpadDecimal") {
    if (dot) {
      return;
    } else {
      dot = true;
    }
  }
  let digitKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110];
  if (digitKeyCodes.includes(event.keyCode)) {
    if (operator === "") {
      if (firstNumber === "0" && event.code === "Numpad0") {
        return;
      } else if (firstNumber === "" && event.code === "NumpadDecimal") {
        firstNumber = "0.";
      } else {
        if (event.code === "NumpadDecimal") {
          firstNumber += ".";
        } else {
          firstNumber += event.code.slice(6);
          if (limitInput(firstNumber)) return;
        }
      }
      subtotal = "";
      para.textContent = "";
      para.textContent += firstNumber;
      para2.textContent = para.textContent;
    } else {
      if (subtotal != "") {
        firstNumber = subtotal;
      }
      if (secondNumber === "0" && event.code === "Numpad0") {
        return;
      } else if (secondNumber === "" && event.code === "NumpadDecimal") {
        secondNumber = "0.";
      } else {
        if (event.code === "NumpadDecimal") {
          secondNumber += ".";
        } else {
          secondNumber += event.code.slice(6);
          if (limitInput(secondNumber)) return;
        }
      }

      para.textContent = currentTextContent + secondNumber;
      para2.textContent = secondNumber;
    }
  }

  return;
});

// focus no keyboard on enter fucks it up
