let numArea = document.querySelector(".numArea");
let outputZone = document.querySelector("h2");
let histMath = document.querySelector("textarea");
outputZone.textContent = "0";
let buttonBody = '';
let decUsed = false;
let mathReady = false;
let numbOfOpenP = 0;
let arrayOfNumbs = [];
let total = 0;
let startIndex = 0;
let numBackToString = "";
let mathString = "";

buttonBody += `<button class="zero button clicker" id="numbButt0" type="button" name="zero">0</button>`
buttonBody += `<button class="decimal button clicker" id="decimalButton" type="button" name="decimal">.</button>`
buttonBody += `<button class="equals button clicker" id="equalsButton" type="button" name="equals">=</button>`
for (var i = 1; i < 10; i++) {
  buttonBody += `<button class="numButton button clicker" id="numbButt${i}" type="button" name="num${[i]}">${[i]}</button>`
}

numArea.innerHTML = buttonBody;

for (let i = 0; i < 10; i++) {
  const button = document.getElementById(`numbButt${i}`);
  button.addEventListener('click', addNumbers);
}

// Add numbers to output area
function addNumbers() {
  if (outputZone.textContent === "0") {
    outputZone.textContent = this.textContent;
  } else {
    outputZone.textContent += this.textContent;
  }
  mathReady = true;
}

// decimalButton
let decimalButt = document.getElementById('decimalButton');
decimalButt.addEventListener('click', decAdded);

function decAdded() {
  if (outputZone.textContent === "0" && decUsed === false) {
    outputZone.textContent = "0.";
  } else if (decUsed === false) {
    outputZone.textContent += ".";
    mathReady = true;
  }
  decUsed = true;
}

// Clear the screen
let clearButt = document.getElementById('clearButton');
clearButt.addEventListener('click', clearScreen);

function clearScreen() {
  decUsed = false;
  mathReady = false;
  outputZone.textContent = "0";
}

// parenthesis stuff
function openPStuff() {
  if (outputZone.textContent === "0") {
    outputZone.textContent = this.textContent + " ";
  } else if (outputZone.textContent.charAt(outputZone.length - 1) === " ") {
    if (outputZone.textContent.charAt(outputZone.length - 2) === ")") {
      outputZone.textContent = " * ";
    }
    outputZone.textContent = this.textContent + " ";
  } else if (mathReady === true) {
    outputZone.textContent += " * " + this.textContent + " ";
  } else {
    outputZone.textContent += this.textContent + " ";
  }
  numbOfOpenP += 1;
  mathReady = false;
  decUsed = false;
}

function closePStuff() {
  if (numbOfOpenP > 0) {
    if (outputZone.textContent === "0") {
      outputZone.textContent = this.textContent + " ";
    } else if (outputZone.textContent.charAt(outputZone.textContent.length - 1) === " ") {
      if (mathReady === false) {
        return;
      }
      outputZone.textContent += this.textContent + " ";
    } else {
      outputZone.textContent += " " + this.textContent + " ";
    }
    numbOfOpenP -= 1;
    mathReady = true;
    decUsed = false;
  }
}


// Math functions
function mathStuff() {
  if (mathReady === true) {
    outputZone.textContent += " " + this.textContent + " ";
    mathReady = false;
    decUsed = false;
  }
}
//math function buttons
let addButt = document.getElementById('addButton');
addButt.addEventListener('click', mathStuff);
let subButt = document.getElementById('subButton');
subButt.addEventListener('click', mathStuff);
let multiplyButt = document.getElementById('multiplyButton');
multiplyButt.addEventListener('click', mathStuff);
let divideButt = document.getElementById('divideButton');
divideButt.addEventListener('click', mathStuff);
let equalsButt = document.getElementById('equalsButton');
equalsButt.addEventListener('click', setMathSting);
equalsButt.addEventListener('click', equalsFun);
equalsButt.addEventListener('click', outPutTotal);


//Hard mode!
let modButt = document.getElementById('modButton');
modButt.addEventListener('click', mathStuff);
let expButt = document.getElementById('expButton');
expButt.addEventListener('click', mathStuff);
let openPButt = document.getElementById('openPButton');
openPButt.addEventListener('click', openPStuff);
let closePButt = document.getElementById('closePButton');
closePButt.addEventListener('click', closePStuff);
let rootButt = document.getElementById('rootButton');
rootButt.addEventListener('click', mathStuff);

function setMathSting() {
  mathString = outputZone.textContent.split(" ");
  histMath.textContent += outputZone.textContent;
  if (numbOfOpenP > 0) {
    for (var i = 0; i !== numbOfOpenP; ) {
      mathString.push(")")
      histMath.textContent += " )"
              numbOfOpenP--;
    }
  }
}

function equalsFun() {
  arrayOfNumbs = mathString;

  for (let i = 0; i < arrayOfNumbs.length; i++) {
    if (arrayOfNumbs[i] === "" || arrayOfNumbs[i] === " ") {
      arrayOfNumbs.splice(i, 1);
    }
  }
  let endIndex = arrayOfNumbs.length;
  // ( and ) here
  function parCheck() {
    for (let i = 0; i < arrayOfNumbs.length; i++) {
      if (arrayOfNumbs[i] === "(") {
        openP = i;
      } else if (arrayOfNumbs[i] === ")") {
        closeP = i;
        arrayOfNumbs.splice(closeP, 1);
        arrayOfNumbs.splice(openP, 1);
        startIndex = openP;
        endIndex = closeP - 2;
      } else {
        startIndex = 0;
        endIndex = arrayOfNumbs.length;
      }
    }
  }
  parCheck();
  // slice and dice
  function sliceAndDice() {
    arrayOfNumbs.splice(i - 1, 3);
    arrayOfNumbs.splice(i - 1, 0, total);
    i -= 2;
    endIndex -= 2;
  }
  //  ^ and √ math here
  for (i = startIndex; i < endIndex; i++) {
    if (arrayOfNumbs[i] === "^") {
      total = Math.pow(parseFloat(arrayOfNumbs[i - 1]), parseFloat(arrayOfNumbs[i + 1]));
      sliceAndDice();
    } else if (arrayOfNumbs[i] === "√") {
      total = Math.pow(parseFloat(arrayOfNumbs[i + 1]), 1 / parseFloat(arrayOfNumbs[i - 1]))
      sliceAndDice();
    }
  }
  // * / and % math here
  for (i = startIndex; i < endIndex; i++) {
    if (arrayOfNumbs[i] === "*") {
      total = parseFloat(arrayOfNumbs[i - 1]) * parseFloat(arrayOfNumbs[i + 1]);
      sliceAndDice();
    } else if (arrayOfNumbs[i] === "/") {
      total = parseFloat(arrayOfNumbs[i - 1]) / parseFloat(arrayOfNumbs[i + 1]);
      sliceAndDice();
    } else if (arrayOfNumbs[i] === "%") {
      total = parseFloat(arrayOfNumbs[i - 1]) % parseFloat(arrayOfNumbs[i + 1]);
      sliceAndDice();
    }
  }
  // + and - math here
  for (i = startIndex; i < endIndex; i++) {
    if (arrayOfNumbs[i] === "+") {
      total = parseFloat(arrayOfNumbs[i - 1]) + parseFloat(arrayOfNumbs[i + 1]);
      sliceAndDice();
    } else if (arrayOfNumbs[i] === "-") {
      total = parseFloat(arrayOfNumbs[i - 1]) - parseFloat(arrayOfNumbs[i + 1]);
      sliceAndDice();
    }
  }
  if (arrayOfNumbs.length > 2) {
    numBackToString = arrayOfNumbs.toString();
    numBackToString = numBackToString.replace(/,/g, " ");
    outputZone.textContent = numBackToString;
    startIndex = 0;
    endIndex = arrayOfNumbs.length;
    equalsFun();
  }
}

function outPutTotal() {
  total = +total.toPrecision(8);
  histMath.textContent += " = " + total + "\n";
  outputZone.textContent = total;
  decUsed = false;
}
