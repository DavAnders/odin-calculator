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

let displayValue = 0;

const updateDisplay = () => {
  document.getElementById("display-text").value = displayValue;
};

const numberButtons = document.querySelectorAll(".nums");

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const num = e.target.getAttribute("data-num");
    if (displayValue === 0) {
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
    // If the input is invalid, revert to the last valid value and update the input field to reflect this
    e.target.value = displayValue;
  }
});

updateDisplay();

const clearButton = document.querySelector(".c");

clearButton.addEventListener("click", (e) => {
  displayValue = 0;
  updateDisplay();
});
