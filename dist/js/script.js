let modes = document.querySelectorAll(".modes__item");
let modeContent = document.querySelectorAll(".modes__content");

let bgBtn = document.querySelector(".bg__btn");
let color1 = document.querySelector(".bg__color1");
let color2 = document.querySelector(".bg__color2");

let counterBtns = document.querySelectorAll(".counter__btn");
let counterNumHolder = document.querySelector(".counter__num"); //the html holder of the variable
let counterNum = 0; //the variable

let calcBtns = document.querySelectorAll(".calc__btn");
let calcInput = document.querySelector(".input_text");

function modeSelector() {
  for (let i = 0; i < modes.length; i++) {
    modes[i].addEventListener("click", () => {
      let modeAttr = modes[i].getAttribute("mode");
      for (let j = 0; j < modes.length; j++) {
        // it runs THE EXACT AMOUNT OF TIMES WE PUT IN THERE regardless the successful result of the operation
        let modeContentAttr = modeContent[j].getAttribute("mode-content");
        if (modeAttr === modeContentAttr) {
          // it doesn't just stop HERE, so it goes each time until it's cleared every pair
          modes[j].classList.add("active");
          modeContent[j].classList.add("active");
        } else {
          modes[j].classList.remove("active");
          modeContent[j].classList.remove("active");
        }
      }
    });
  }
}

bgBtn.addEventListener("click", () => {
  // the whole bg randomizer itself
  let newColor1 = randomColor();
  let newColor2 = randomColor();
  document.body.style.background = `linear-gradient(to right, ${newColor1}, ${newColor2})`;
  color1.style.color = newColor1;
  color1.innerHTML = newColor1;
  color2.style.color = newColor2;
  color2.innerHTML = newColor2;
});

function randomColor() {
  // the HEX randomizer @ the bg mode
  const hex = ["A", "B", "C", "D", "E", "F", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let newColor = "#";
  for (let i = 0; i < 6; i++) {
    let randomDigit = hex[Math.floor(Math.random() * hex.length)];
    newColor += randomDigit;
  }
  return newColor;
}

function changeNum() {
  //runs when one of THREE math buttons are triggered @ counter mode
  for (let btn of counterBtns) {
    btn.addEventListener("click", () => {
      if (+btn.getAttribute("data-btn") === 0) {
        counterNum = 0;
      } else {
        counterNum += +btn.getAttribute("data-btn");
      }
      let color = getColor(counterNum);
      counterNumHolder.innerHTML = `${counterNum}`;
      counterNumHolder.style.color = color;
    });
  }
}

function getColor(num) {
  // picks the color depending on the negativeness of the number @ counter mode
  num = num + "";
  if (num.includes("-")) {
    return "red";
  }
  if (+num === 0) {
    return "#111";
  }
  return "lime";
}

function calculator() {
  // symbolList.reverse().join("").includes(inputText[0])
  let inputText = "";
  let previousOperator = "";
  let symbolList = ["/", "+", "-", "*", "."];
  for (let mathDigit of calcBtns) {
    mathDigit.addEventListener("click", () => {
      let mathValue = mathDigit.getAttribute("btn-value");
      if (
        symbolList.includes(mathValue) &&
        inputText == "" &&
        mathValue != "-"
      ) {
        //console.log(mathValue);
        // if input starts with any symbol, nothing is showed
        calcInput.innerHTML = "0";
      } else {
        if (mathValue === "c") {
          inputText = ""; // clears the whole input
          numAnsw = 0;
          calcInput.innerHTML = "0";
        }

        if (mathValue === "del") {
          //deletes 1 digit
          inputText = inputText.slice(0, -1);
          calcInput.innerHTML = inputText;
        }

        if (
          // adds to input ONLY numbers
          mathValue != "del" &&
          mathValue != "c" &&
          mathValue != "answ" &&
          !symbolList.includes(mathValue)
        ) {
          inputText += mathValue;
          calcInput.innerHTML = inputText;
        }
        if (
          // adds to input ONLY symbols
          symbolList.includes(mathValue) &&
          !symbolList.includes(inputText.split("").reverse().join("")[0]) &&
          mathValue !== "."
        ) {
          inputText += mathValue;
          previousOperator = mathValue;
          calcInput.innerHTML = inputText;
        }
        if (mathValue === "." && previousOperator !== ".") {
          inputText += mathValue;
          previousOperator = mathValue;
          calcInput.innerHTML = inputText;
        }
        if (mathValue == "answ") {
          let answer = calculatorAnswer(inputText);
          if (answer == "0") {
            calcInput.innerHTML = `${answer}`;
            inputText = "";
          } else {
            inputText = answer;
            calcInput.innerHTML = `${inputText}`;
          }
          if (answer == "NaN" || answer == "Infinity") {
            calcInput.innerHTML = `Error!`;
            inputText = "";
          }
        }
      }
    });
  }
}

function calculatorAnswer(strProblem) {
  let symbols = ["+", "-", "/", "*"];
  let halfSymbols = ["/", "*"];
  let answer = 0;
  let problem = strProblem.split("");
  if (symbols.includes(strProblem.at(-1))) {
    problem.pop();
  }
  for (let i = 0; i < 10; i++) {
    for (let value of symbols) {
      if (strProblem.includes(`${value}0${i}`)) {
        return "Error!";
      }
    }
  }
  problem.push("$");

  if (hasSymbols(problem, halfSymbols)) {
    problem.unshift("$");
    problem = multDivisFilter(problem);
    problem.shift();
    if (!hasSymbols(problem, symbols)) {
      problem.pop();
      answer = problem.join("");
      return answer;
    }
  }
  let num1 = "";
  for (let i = 0; i < problem.length; i++) {
    if (symbols.includes(problem[i])) {
      answer += +num1;
      for (let ch = 0; ch < i; ch++) {
        problem.shift();
      }
      break;
    } else {
      num1 += problem[i];
    }
  }
  //console.log(answer);
  //console.log(`problem list after filling the first ANSWER: ${problem}`);
  let symbol = "";
  let num2 = "";
  for (let i = 0; i < problem.length; i++) {
    //console.log(problem.join(""));
    if (symbols.includes(problem[i]) || problem[i] === "$") {
      if (num2 != "") {
        if (symbol === "+") {
          answer += +num2;
        }
        if (symbol === "-") {
          answer -= +num2;
        }
        symbol = problem[i];
        num2 = "";
      } else {
        symbol = problem[i];
      }
      //console.log(`num2: ${num2}`);
      //console.log(answer);
    } else {
      num2 += problem[i];
    }
  }
  return answer + "";
}

function multDivisFilter(problem) {
  problem = problem.join("");
  let symbols = ["/", "*"];
  let allSymbols = ["+", "-", "/", "*"];
  let symbolIndeces = [];
  for (let i = 0; i < problem.length; i++) {
    if (symbols.includes(problem[i])) {
      symbolIndeces.push(i);
    }
  }
  let num1 = "";
  let num2 = "";
  for (let i = 0; i < symbolIndeces.length + 1; i++) {
    let index = 0;
    console.log(problem);
    if (hasSymbols(problem, symbols)) {
      index = getNextSymbol(problem); // 8*7
      // console.log("has symbols RIGHT");
      // console.log(`INDECES${symbolIndeces[i]}`);
      // console.log(`INDEXXX ${index}`);
    } else {
      // console.log(`FINAAAALLLLL ANSWER::: ${problem}`);
      problem = problem.split("");
      return problem;
    }
    num1 = numbersUntilSymbol(problem, allSymbols, index, true)
      .split("")
      .reverse()
      .join("");
    num2 = numbersUntilSymbol(problem, allSymbols, index);
    // console.log(num1);
    // console.log(num2);
    // console.log(problem[index]);
    let tempAnswer = 0;
    if (problem[index] == "/") {
      tempAnswer = num1 / num2 + "";
      problem = problem.replace(`${num1}/${num2}`, `${tempAnswer}`);
      // console.log(problem);
    }
    if (problem[index] == "*") {
      tempAnswer = num1 * num2 + "";
      problem = problem.replace(`${num1}*${num2}`, `${tempAnswer}`);
      // console.log(problem);
    }
  }
}

function numbersUntilSymbol(
  problem,
  symbols,
  startIndex = 0,
  isReverse = false
) {
  let num = "";

  if (!isReverse) {
    if (symbols.includes(problem[startIndex])) {
      startIndex += 1;
    }
    for (let i = startIndex; i < problem.length; i++) {
      if (symbols.includes(problem[i]) || problem[i] === "$") {
        return num;
      } else {
        num += problem[i];
      }
    }
  } else {
    if (symbols.includes(problem[startIndex])) {
      startIndex -= 1;
    }
    for (let i = startIndex; i < problem.length; i--) {
      if (symbols.includes(problem[i]) || problem[i] === "$") {
        return num;
      } else {
        num += problem[i];
      }
    }
  }
}

function hasSymbols(problem, symbols) {
  let answer = false;
  for (let symbol of symbols) {
    if (problem.includes(symbol)) {
      answer = true;
      break;
    }
  }
  return answer;
}

function getNextSymbol(problem) {
  let indexDivis = problem.indexOf("/");
  let indexMult = problem.indexOf("*");
  if (indexDivis == "-1") {
    return indexMult;
  }
  if (indexMult == "-1") {
    return indexDivis;
  }
  if (indexDivis < indexMult) {
    return indexDivis;
  }
  if (indexDivis > indexMult) {
    return indexMult;
  }
}
// console.log(`THE ANSWER: ${calculatorAnswer("10*10/2+1")}`);
// multDivisFilter("$1+2*3+4*5/4*100/2$");
modeSelector();
changeNum();
calculator();
