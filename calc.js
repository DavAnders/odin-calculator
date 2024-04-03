// Basic math operators
function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

// Three parts of calculator operation
let firstNumber = 0;
let operator = "";
let secondNumber = 0;

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "Invalid operator";
  }
}

let displayValue = "0";
let justCalculated = false;

const updateDisplay = () => {
  document.getElementById("display-text").value = displayValue;
};

const numberButtons = document.querySelectorAll(".nums");

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const num = e.target.getAttribute("data-num");
    if (justCalculated || displayValue === "0") {
      displayValue = num;
    } else {
      displayValue += num;
    }
    updateDisplay();
  });
});

document.getElementById("display-text").addEventListener("input", (e) => {
  console.log("Input event fired", e.target.value);
  const validInput = /^[0-9+\-*/.]*$/;
  const currentValue = e.target.value;

  if (validInput.test(currentValue)) {
    displayValue = currentValue;
  } else {
    // If the input is invalid, revert to the last valid value and update the input field to show this
    e.target.value = displayValue;
  }
});

updateDisplay();

const clearButton = document.querySelector(".c");

clearButton.addEventListener("click", (e) => {
  console.log("Clear button clicked");
  displayValue = "0";
  firstNumber = null;
  operator = null;
  justCalculated = false;
  updateDisplay();
  console.log("Calculator reset");
});

const operatorButtons = document.querySelectorAll(".operators");

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (justCalculated) {
      justCalculated = false; // reset flag
    }
    const selectedOperator = e.target.getAttribute("data-op");

    if (
      firstNumber !== null &&
      operator &&
      displayValue !== "0" &&
      !justCalculated
    ) {
      displayValue = String(
        operate(
          operator,
          Number(firstNumber),
          Number(displayValue.split(` ${operator} `)[1])
        )
      );
      firstNumber = displayValue; // Use result as the first number for next operation
      operator = selectedOperator; // Update the operator
      displayValue += ` ${operator} `;
      updateDisplay();
    } else if (!displayValue.includes(" ")) {
      firstNumber = displayValue;
      operator = selectedOperator;
      displayValue += ` ${operator} `;
      updateDisplay();
    }
  });
});

document.querySelector(".equals").addEventListener("click", () => {
  console.log("Equals button clicked");
  if (firstNumber !== null && operator && displayValue.includes(operator)) {
    let secondNumber = displayValue.split(` ${operator} `)[1];
    if (secondNumber) {
      displayValue = String(
        operate(operator, Number(firstNumber), Number(secondNumber))
      );
      updateDisplay();
      firstNumber = null;
      operator = null;
      justCalculated = true; // set flag
    }
  }
});

document.addEventListener("keydown", (e) => {
  handleKeyPress(e.key);
});

function handleKeyPress(key) {
  if ((key >= "0" && key <= "9") || key === ".") {
    if (displayValue === "0" || justCalculated) {
      displayValue = key;
      justCalculated = false;
    } else {
      displayValue += key;
    }
  } else if (["+", "-", "*", "/"].includes(key)) {
    if (
      !justCalculated &&
      firstNumber !== null &&
      operator &&
      displayValue !== "0"
    ) {
      let result = operate(operator, Number(firstNumber), Number(displayValue));
      displayValue = String(result);
      firstNumber = result;
    } else if (!displayValue.includes(" ")) {
      firstNumber = displayValue;
    }
    operator = key;
    displayValue += ` ${operator} `;
    justCalculated = false;
  } else if (key === "Enter" || key === "=") {
    if (firstNumber !== null && operator && displayValue.includes(operator)) {
      let secondPart = displayValue.split(` ${operator} `)[1];
      if (secondPart) {
        displayValue = String(
          operate(operator, Number(firstNumber), Number(secondPart))
        );
        firstNumber = null;
        operator = null;
        justCalculated = true;
      }
    }
  } else if (key === "Backspace") {
    displayValue = "0";
    firstNumber = null;
    operator = null;
    justCalculated = false;
    updateDisplay();
  }
  updateDisplay();
}
