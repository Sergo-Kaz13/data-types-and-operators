'use strict'

function validationByNumber(userParameter) {
  userParameter = +userParameter.value;
  return (!isNaN(parseFloat(userParameter)) && isFinite(userParameter) && userParameter > 0);
}

function enterHint(resultUserDate, outputWindow, userDate) {
  if (!resultUserDate && userDate.value.trim().length !== 0) {
    alert('Введи дані вірно!');
    outputWindow = typeof outputWindow !== 'undefined' ? outputWindow.hidden = true : 0;
    userDate.value = '';
  } else if (userDate.value.trim().length === 0) {
    outputWindow = typeof outputWindow !== 'undefined' ? outputWindow.hidden = true : 0;
    userDate.value = '';
  }
}

// todo Мінімум
// ? 3. Користувач вказує обсяг флешки в Гб. Програма повинна порахувати скільки файлів розміром в 820 Мб поміщається на флешку.

const fileSize = 820;
let inputFlash = document.querySelector('.flash');
let labelFlash = inputFlash.nextElementSibling;
labelFlash.hidden = true;

inputFlash.onchange = () => {
  enterHint(validationByNumber(inputFlash), labelFlash, inputFlash)
}

let inputFile = document.querySelector('.file-size');

inputFile.onchange = () => {
  enterHint(validationByNumber(inputFile), undefined, inputFile)
}

let buttonFlash = document.querySelector('.flash-btn');
buttonFlash.onclick = () => {
  if (inputFlash.value.length !== 0 && inputFile.value.length !== 0) {
    let userNum = Math.floor(+inputFlash.value * 1000 / +inputFile.value);
    labelFlash.hidden = false;
    labelFlash.textContent = 'Кількість файлів ' + userNum;
  } else if (inputFile.value.length === 0 && inputFlash.value.length !== 0) {
    labelFlash.hidden = false;
    let inputFlashValueNum = Math.floor(+inputFlash.value * 1000 / fileSize);
    labelFlash.textContent = 'Кількість файлів ' + inputFlashValueNum;
  } else {
    labelFlash.hidden = true;
  }
}

let buttonFlashClean = document.querySelector('.flash-btn-clean');
buttonFlashClean.onclick = () => {
  inputFlash.value = '';
  inputFile.value = '';
  labelFlash.hidden = true;
}

// todo Норма
// ? Користувач вводить суму грошей в гаманці і ціну однієї шоколадки. Програма виводить скільки шоколадок може купити користувач і скільки здачі у нього залишиться.

let inputMoney = document.querySelector('.money');
let labelChocolate = inputMoney.nextElementSibling;
labelChocolate.hidden = true;

inputMoney.onchange = () => {
  enterHint(validationByNumber(inputMoney), labelChocolate, inputMoney)
}

let inputPrice = document.querySelector('.price');

inputPrice.onchange = () => {
  enterHint(validationByNumber(inputPrice), labelChocolate, inputPrice)
}

let buttonChocolate = document.querySelector('.chocolate');

buttonChocolate.onclick = () => {
  if (inputMoney.value.length !== 0 && inputPrice.value.length !== 0 && +inputMoney.value >= +inputPrice.value) {

    let numberChocolate = Math.floor(+inputMoney.value / +inputPrice.value);
    let remainderMoney = (+inputMoney.value - +inputPrice.value * numberChocolate).toFixed(2);
    labelChocolate.hidden = false;
    labelChocolate.textContent = 'шоколадок ' + numberChocolate + ' здача ' + remainderMoney;
    labelChocolate.classList.remove('monkey');
  } else {
    labelChocolate.textContent = 'Ніщеброд';
    labelChocolate.hidden = false;
    labelChocolate.classList.add('monkey');
  }
}

let buttonChocolateClean = document.querySelector('.chocolate-btn-clean');

buttonChocolateClean.onclick = () => {
  inputMoney.value = '';
  inputPrice.value = '';
  labelChocolate.hidden = true;
  labelChocolate.classList.remove('monkey');
}

// ? Запитай у користувача тризначне число і виведи його задом наперед. Для вирішення завдання тобі знадобиться оператор% (залишок від ділення).

let inputThreeDigitNumber = document.querySelector('.three-digit-number');
let labelThreeDigitNumber = inputThreeDigitNumber.nextElementSibling;
labelThreeDigitNumber.hidden = true;

inputThreeDigitNumber.onchange = () => {
  enterHint(validationByNumber(inputThreeDigitNumber), labelThreeDigitNumber, inputThreeDigitNumber)

  if (inputThreeDigitNumber.value.length !== 3 && inputThreeDigitNumber.value.trim().length !== 0) {
    alert('Тільки тризначне число');
  } else if (inputThreeDigitNumber.value.trim().length === 0) {
    inputThreeDigitNumber.value = '';
    labelThreeDigitNumber.hidden = true;
  } else {
    let num = +inputThreeDigitNumber.value;
    let newNum = '';

    for (let i = 0; i < 3; i++) {
      newNum += num % 10;
      num = Math.trunc(num / 10);
    }

    labelThreeDigitNumber.textContent = newNum;
    labelThreeDigitNumber.hidden = false;
  }
}

// ? Користувач вводить суму вкладу в банк на 2 місяці, з процентною ставкою депозиту 5% річних. Вивести суму нарахованих відсотків.

let inputDeposit = document.querySelector('.deposit');
let labelDeposit = inputDeposit.nextElementSibling;
labelDeposit.hidden = true;

inputDeposit.onchange = () => {
  enterHint(validationByNumber(inputDeposit), labelDeposit, inputDeposit)
}

let inputInterest = document.querySelector('.deposit-interest');

inputInterest.onchange = () => {
  enterHint(validationByNumber(inputInterest), labelDeposit, inputInterest);
}

let inputMonths = document.querySelector('.deposit-months');

inputMonths.onchange = () => {
  enterHint(validationByNumber(inputMonths), labelDeposit, inputMonths)
}

let buttonDepositClean = document.querySelector('.deposit-btn-clean');

buttonDepositClean.onclick = () => {
  inputDeposit.value = '';
  inputInterest.value = '';
  inputMonths.value = '';
  labelDeposit.hidden = true;
}

let buttonDeposit = document.querySelector('.deposit-btn');

buttonDeposit.onclick = () => {
  if (inputDeposit.value.length === 0 ||
      inputInterest.value.length === 0 ||
      inputMonths.value.length === 0
    ) {
    labelDeposit.hidden = true;
  } else {
    let sum = +(+inputDeposit.value * Math.pow((1 + (+inputInterest.value / 12) / 100), +inputMonths.value)).toFixed(2);
  
    console.log(sum);
    console.log(inputDeposit.value);

    labelDeposit.textContent = `${sum} в тому числі % ${sum - +inputDeposit.value}`;
    labelDeposit.hidden = false;

    console.log(sum - +inputDeposit.value);
  }
}
