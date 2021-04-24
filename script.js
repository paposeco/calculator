// calculator functions
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
  if (b != 0) {
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

const inputNumber = document.getElementById("inputNumber");
const digitsAll = document.querySelectorAll(".digits");
const operatorsAll = document.querySelectorAll("#operators button");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const buttonsAll = document.querySelectorAll("button");

// initial calculator settings
let operator = "";
let firstNumber;
let secondNumber;
let total;
let subtotal;
let started = false; // for reseting input from 0 to ""
let hasOperator = false; // for updating operator if user makes a mistake

// **mouse** listeners
operatorsAll.forEach((element) =>
  element.addEventListener("click", function () {
    getOperator(event, event.target);
  })
);
equalsButton.addEventListener("click", getEquals);
clearButton.addEventListener("click", clearCalc);
backspaceButton.addEventListener("click", deleteInput);
digitsAll.forEach((element) =>
  element.addEventListener("click", function (event) {
    getDigits(event, event.target);
  })
);

// **keyboard**
window.addEventListener("keydown", function (event) {
  buttonsAll.forEach((element) => element.blur()); //when user switches to keyboard, removes focus from buttons
  //backspace
  if (event.code === "Backspace") {
    deleteInput(event);
  }
  //clear on del
  if (event.code === "Delete") {
    clearCalc(event);
  }
  // equals
  if (event.code === "NumpadEnter" || event.code === "Enter") {
    getEquals(event);
  }
  // operators
  let operatorKeyCodes = [
    "NumpadAdd",
    "NumpadSubtract",
    "NumpadMultiply",
    "NumpadDivide",
  ];
  if (operatorKeyCodes.includes(event.code)) {
    let target;
    switch (event.code) {
      case "NumpadAdd":
        target = operatorsAll.item(0);
        break;
      case "NumpadSubtract":
        target = operatorsAll.item(1);
        break;
      case "NumpadMultiply":
        target = operatorsAll.item(2);
        break;
      case "NumpadDivide":
        target = operatorsAll.item(3);
        break;
    }
    getOperator(event, target);
  }
  // digits
  let digitKeyCodes = [
    "Numpad1",
    "Numpad2",
    "Numpad3",
    "Numpad4",
    "Numpad5",
    "Numpad6",
    "Numpad7",
    "Numpad8",
    "Numpad9",
    "Numpad0",
    "NumpadDecimal",
    "Digit0",
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Period",
  ];
  if (digitKeyCodes.includes(event.code)) {
    let target;
    let valueCode;
    if (event.code === "NumpadDecimal" || event.code === "Period") {
      target = digitsAll.item(10);
    } else {
      if (event.code[0] === "D") {
        valueCode = event.code.slice(5);
      } else {
        valueCode = event.code.slice(6);
      }
      let index;
      let digitsArray = Array.from(digitsAll);
      for (i = 0; i < digitsArray.length; i++) {
        if (digitsArray[i].value === valueCode) {
          index = i;
          break;
        }
      }
      target = digitsAll.item(index);
    }
    getDigits(event, target);
  }
  /* }  else*/ return;
});

// event handlers

function getDigits(event, target) {
  //if operator has been used, removes styling of operator button
  hasOperator = false;
  operatorsAll.forEach((element) => element.classList.remove("activeoperator"));
  // resets input value if calculator has been used before
  if (!started && total !== undefined) {
    clearCalc();
  }
  // removes 0 from initial input value
  if (!started) {
    resetInput();
  }
  // limits number of zeros to 1 at start of number | limits number of digits to 15
  if (
    (target.name === "zero" && inputNumber.value === "0") ||
    inputNumber.value.length > 15
  ) {
    return;
  }
  // adds 0 to decimal number if user starts decimal with . | handles negative numbers and gets number from input
  //negate only works on click
  if (inputNumber.value === "" && target.name === "dot") {
    inputNumber.value = "0.";
  } else if (target.name === "negate") {
    if (inputNumber.value === 0 || inputNumber.value === "") {
      inputNumber.value = 0;
      started = false;
      return;
    } else {
      if (inputNumber.value !== 0) {
        let currentInput = Number(inputNumber.value);
        inputNumber.value = -1 * currentInput;
      }
    }
  } else {
    inputNumber.value += target.value;
  }
}

function getOperator(event, target) {
  // checks if operator existed before user clicked on another operator and updates if necessary.
  if (hasOperator) {
    operatorsAll.forEach((element) =>
      element.classList.remove("activeoperator")
    );
    operator = target.name;
    target.classList.add("activeoperator");
    return;
  }
  // adds class to operator button for a visual reminder of which operator is in use
  target.classList.add("activeoperator");

  //first use of calculator
  if (
    firstNumber === undefined &&
    secondNumber === undefined &&
    subtotal === undefined
  ) {
    firstNumber = inputNumber.value;
    operator = target.name;
    started = false;
    hasOperator = true;
  } // if total was calculated in getEquals function, saves selected operator and resets total
  else if (total !== undefined) {
    operator = target.name;
    started = false;
    firstNumber = total; // updates number in case backspace was used
    total = undefined;
    hasOperator = true;
  } // calculator with subtotal
  else {
    if (subtotal !== undefined) {
      firstNumber = subtotal;
    }
    secondNumber = inputNumber.value;
    let firstNumberNumber = Number(firstNumber);
    let secondNumberNumber = Number(secondNumber);
    subtotal = operate(operator, firstNumberNumber, secondNumberNumber); // uses previous operator
    firstNumber = subtotal;
    inputNumber.value = subtotal;
    operator = target.name; //new operator for next calculation
    started = false;
    hasOperator = true;
  }
}

function resetInput() {
  started = true;
  inputNumber.value = "";
}

function getEquals(event) {
  // prevents user from getting a result if an operator has not been selected
  if (operator === "") {
    return;
  }
  // calculates total and updates display
  let firstNumberNumber = Number(firstNumber);
  secondNumber = inputNumber.value;
  let secondNumberNumber = Number(secondNumber);
  total = operate(operator, firstNumberNumber, secondNumberNumber);
  subtotal = total;
  firstNumber = total;
  inputNumber.value = total;
  secondNumber = undefined;
  operator = "";
  hasOperator = false;
  started = false;
}

function clearCalc(event) {
  firstNumber = undefined;
  secondNumber = undefined;
  inputNumber.value = 0;
  subtotal = undefined;
  started = false;
  total = undefined;
  hasOperator = false;
}

// lets user make changes to current number before calculation
function deleteInput(event) {
  let currentInput = inputNumber.value;
  let deleteCharac = currentInput.slice(0, currentInput.length - 1);
  inputNumber.value = deleteCharac;
  if (total !== undefined) {
    total = deleteCharac;
    subtotal = deleteCharac;
  }
  if (total === undefined && subtotal !== undefined) {
    subtotal = deleteCharac;
  }
}

// // o menos deve funcionar depois de qualquer operador
// // focus no keyboard on enter fucks it up
