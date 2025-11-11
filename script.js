// DOM ELEMENTS
const hourElement = document.querySelector(".hour");
const minutesElement = document.querySelector(".minutes");
const outputElement = document.querySelector(".output");

const acElement = document.getElementById("ac");
const pmElement = document.getElementById("pm");
const percentageElement = document.getElementById("percentage");
const divisionElement = document.getElementById("division");
const multiplicationElement = document.getElementById("multiplication");
const substractionElement = document.getElementById("substraction");
const additionElement = document.getElementById("addition");
const equalElement = document.getElementById("equal");
const decimalElement = document.getElementById("decimal");
const backspaceElement = document.getElementById("backspace");

const elementsArray = [
  "number-7",
  "number-8",
  "number-9",
  "number-4",
  "number-5",
  "number-6",
  "number-1",
  "number-2",
  "number-3",
  "zero",
];

// --- VARIABLES ---
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

// --- Helper: add commas ---
function formatWithCommas(numberString) {
  if (isNaN(numberString)) return numberString;
  let parts = numberString.split(".");
  let integerPart = parts[0];
  let decimalPart = parts[1];
  let formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt;
}

// --- Number buttons ---
elementsArray.forEach((id) => {
  const element = document.getElementById(id);
  element.addEventListener("click", () => {
    let current = outputElement.textContent.replace(/,/g, "");
    const value = element.textContent;

    if (waitingForSecondNumber) {
      current = value;
      waitingForSecondNumber = false;
    } else {
      current = current === "0" ? value : current + value;
    }

    outputElement.textContent = formatWithCommas(current);
  });
});

// --- Decimal ---
decimalElement.addEventListener("click", () => {
  let current = outputElement.textContent;
  if (!current.includes(".")) {
    current += ".";
    outputElement.textContent = current;
  }
});

// --- Operator handling ---
function handleOperator(op) {
  let current = parseFloat(outputElement.textContent.replace(/,/g, ""));
  if (firstNumber === null) {
    firstNumber = current;
  } else if (operator) {
    firstNumber = calculate(firstNumber, current, operator);
    outputElement.textContent = formatWithCommas(firstNumber.toString());
  }
  operator = op;
  waitingForSecondNumber = true;
}

// --- Calculation logic ---
function calculate(num1, num2, op) {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 === 0 ? "Error" : num1 / num2;
    default:
      return num2;
  }
}

divisionElement.addEventListener("click", () => handleOperator("/"));
multiplicationElement.addEventListener("click", () => handleOperator("*"));
substractionElement.addEventListener("click", () => handleOperator("-"));
additionElement.addEventListener("click", () => handleOperator("+"));

// --- Equals ---
equalElement.addEventListener("click", () => {
  if (operator === null || firstNumber === null) return;
  const secondNumber = parseFloat(outputElement.textContent.replace(/,/g, ""));
  const result = calculate(firstNumber, secondNumber, operator);
  outputElement.textContent = formatWithCommas(result.toString());
  firstNumber = result;
  operator = null;
  waitingForSecondNumber = true;
});

// Backspace Button
backspaceElement.addEventListener("click", () => {
  let current = outputElement.textContent.replace(/,/g, "");

  if (current.length === 1) {
    outputElement.textContent = "0";
    return;
  }

  // Remove the last character
  current = current.slice(0, -1);

  // Display the updated number with commas again
  outputElement.textContent = formatWithCommas(current);
});

// --- AC ---
acElement.addEventListener("click", () => {
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = false;
  outputElement.textContent = "0";
});

// --- PM (plus/minus) ---
pmElement.addEventListener("click", () => {
  let current = outputElement.textContent.replace(/,/g, "");
  if (current !== "0") {
    if (current.startsWith("-")) {
      current = current.slice(1);
    } else {
      current = "-" + current;
    }
    outputElement.textContent = formatWithCommas(current);
  }
});

// --- Percentage ---
percentageElement.addEventListener("click", () => {
  let current = parseFloat(outputElement.textContent.replace(/,/g, ""));
  current = current / 100;
  outputElement.textContent = formatWithCommas(current.toString());
});

// --- Time ---
const updateTime = () => {
  const now = new Date();
  hourElement.textContent = String(now.getHours()).padStart(2, "0");
  minutesElement.textContent = String(now.getMinutes()).padStart(2, "0");
};
setInterval(updateTime, 1000);
updateTime();

// ---- DROPDOWN -----
const dropDown = document.getElementById("drop-down");
const menu = document.getElementById("dropdown-menu");
const dropImage = document.querySelector(".drp-img");

dropDown.addEventListener("click", () => {
  menu.classList.toggle("show");
  dropImage.classList.toggle("rotate");
});
