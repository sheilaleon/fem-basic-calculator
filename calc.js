const display = document.querySelector('.display');
const calc = document.querySelector('.calculator-body');

let currentCalculation = '0';
let sum = 0;
let lastOperation; // save last operation used by user to apply calculations

// refresh the screen when user has clicked a button
function refresh() {
  display.innerText = currentCalculation;
}

// apply operator selected by user to be save
function applyOperation(currentCalculationInt) {
  if (lastOperation === '÷') {
    sum /= currentCalculationInt;
  } else if (lastOperation === '×') {
    sum *= currentCalculationInt;
  } else if (lastOperation === '-') {
    sum -= currentCalculationInt;
  } else {
    sum += currentCalculationInt;
  }
}

function calculate(value) {
  if (currentCalculation === '0') {
    return; // nothing to do
  }

  const currentCalculationInt = parseInt(currentCalculation); // create and convert existing user input into integers to do calculations
  if (sum !== 0) {
    applyOperation(currentCalculationInt);
  } else {
    sum = currentCalculationInt;
  }

  lastOperation = value;
  currentCalculation = '0';
}

function number(value) {
  if (currentCalculation !== '0') {
    currentCalculation += value;
  } else {
    currentCalculation = value;
  }
}

// handle the maths by what operation the user has selected
function operation(value) {
  switch (value) {
    case '÷':
    case '×':
    case '-':
    case '+':
      calculate(value);
      break;
    case 'C':
      currentCalculation = '0';
      sum = 0;
      break;
    case '=':
      if (lastOperation === null) {
        return; // nothing to calculate
      }
      applyOperation(parseInt(currentCalculation));
      lastOperation = null;
      currentCalculation = +sum;
      sum = 0;
      break;
    case '←':
      if (currentCalculation.length === 1) {
        currentCalculation = '0';
      } else {
        currentCalculation = currentCalculation.substring(0, currentCalculation.length - 1);
      }
      break;
    default:
      break;
  }
}

// capture button event values
function click(value) {
  if (!Number.isNaN(parseInt(value))) {
    number(value);
  } else {
    operation(value);
  }
  refresh();
}

// attach event listener on all buttons
calc.addEventListener('click', function(e) {
  click(e.target.innerText);
});
