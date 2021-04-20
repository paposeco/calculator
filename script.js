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
const deleteButton = document.getElementById("delete");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let total = "";
let subtotal = "";
let dot = false;
let currentTextContent;

para.textContent = "0";

//mouse

digitsAll.forEach((element) =>
  element.addEventListener("click", function (event) {
    if (event.target.name === "dot") {
      if (dot) {
        return;
      } else {
        dot = true;
      }
    }

    if (operator === "") {
      if (firstNumber === "" && event.target.name === "dot") {
        firstNumber = "0" + event.target.value;
      } else {
        firstNumber += event.target.value;
      }
      subtotal = "";
      para.textContent = "";
      para.textContent += firstNumber;
    } else {
      if (subtotal != "") {
        firstNumber = subtotal;
      }
      if (secondNumber === "" && event.target.name === "dot") {
        secondNumber = "0" + event.target.value;
      } else {
        secondNumber += event.target.value;
      }

      para.textContent = currentTextContent + secondNumber;
    }
  })
);

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

  firstNumber = Number(firstNumber);

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
  dot = false;
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
  dot = false;
});

deleteButton.addEventListener("click", function () {
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
});

// keyboard

window.addEventListener("keydown", function (event) {
  //backspace
  if (event.keyCode === 8) {
    console.log(event.key);
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
  //equals
  if (event.keyCode === 13) {
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
  }
  //clear on del
  if (event.keyCode === 46) {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    total = "";
    subtotal = "";
    para.textContent = "0";
    dot = false;
  }
  // operators
  let operatorKeyCodes = [107, 109, 106, 111];
  if (operatorKeyCodes.includes(event.keyCode)) {
    if (operator != "" && secondNumber === "") {
      return;
    }
    if (operator != "") {
      let a = Number(firstNumber);
      let b = Number(secondNumber);
      subtotal = operate(operator, a, b);
      operator = event.code;
      secondNumber = "";
    } else {
      if (total != "") {
        para.textContent = subtotal;
        total = "";
      }
      operator = event.code;
    }

    firstNumber = Number(firstNumber);
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
    currentTextContent = para.textContent;
    dot = false;
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
      if (firstNumber === "" && event.code === "NumpadDecimal") {
        firstNumber = "0.";
      } else {
        if (event.code === "NumpadDecimal") {
          firstNumber += ".";
        } else {
          firstNumber += event.code.slice(6);
        }
      }
      subtotal = "";
      para.textContent = "";
      para.textContent += firstNumber;
    } else {
      if (subtotal != "") {
        firstNumber = subtotal;
      }
      if (secondNumber === "" && event.code === "NumpadDecimal") {
        secondNumber = "0.";
      } else {
        if (event.code === "NumpadDecimal") {
          secondNumber += ".";
        } else {
          secondNumber += event.code.slice(6);
        }
      }

      para.textContent = currentTextContent + secondNumber;
    }
  }
});

//limitar numero de digitos
