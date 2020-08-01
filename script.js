// it's fine but still needs some work

function add(num1 = 0, num2 = 0) {
  return num1 + num2;
}

function substract(num1 = 0, num2 = 0) {
  return num1 - num2;
}

function multiply(num1 = 0, num2 = 1) {
  return num1 * num2;
}

function divide(num1 = 0, num2 = 1) {
  return num1 / num2;
}

function operate(func, num1, num2) {
  return func(num1, num2);
}

const operations = ['+', '-', 'x', '/', '+/-'];
const operationToFunction = {
  '+': add,
  '-': substract,
  x: multiply,
  '/': divide,
};

let operationDisplay = document.getElementById('operation');
let resultDisplay = document.getElementById('result');
operationDisplay.textContent = '';
resultDisplay.textContent = 0;

let currentNumber = '';
let previousNumber = '';
let currentOperation;
let previousOperation;

let buttons = document.querySelectorAll('.btn');

// looping through buttons and adding event listeners to them
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.textContent === 'AC') {
      //if AC, clear everything
      currentNumber = 0;
      previousNumber = 0;
      currentOperation = '';
      operationDisplay.textContent = '';
      resultDisplay.textContent = 0;
    } else if (btn.textContent === 'DEL') {
      // if DEL, take off last digit of current number
      currentNumber = currentNumber.slice(0, -1);
      operationDisplay.textContent = operationDisplay.textContent.slice(0, -1);
    } else {
      if (!operations.includes(btn.textContent) && btn.textContent !== '=') {
        // if number, append to current number
        currentNumber += btn.textContent;
      } else if (btn.textContent === '.' && !currentNumber.includes('.')) {
        // if . (dot), append if it doesn't exist in current number
        currentNumber += btn.textContent;
      } else if (operations.includes(btn.textContent)) {
        // if operation, set current operation
        if (btn.textContent === '+/-') {
          currentNumber *= -1;
          resultDisplay.textContent = resultDisplay.textContent * -1;
        } else {
          currentOperation = btn.textContent;
          previousNumber = currentNumber / 1;
          currentNumber = '';
          previousOperation = currentOperation + '';
        }
      }
      if (btn.textContent === '=') {
        //
        console.log('Operating.');
        let result = operate(
          operationToFunction[previousOperation],
          Number(previousNumber),
          Number(currentNumber)
        );

        console.log('previousNumber: ' + previousNumber);
        console.log('currentOperation: ' + currentOperation);
        console.log('currentNumber: ' + currentNumber);
        console.log('result ' + result);
        currentNumber = result; // for if user wants to chain operations

        // result
        resultDisplay.textContent = result;
      }
      operationDisplay.textContent =
        operationDisplay.textContent + btn.textContent;
    }
  });
});
