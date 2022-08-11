let modes = document.querySelectorAll(".modes__item");
let modeContent = document.querySelectorAll(".modes__content");

let btnBg = document.querySelector(".btn-bg");
let color = document.querySelector(".color");

let btnCalculation = document.querySelectorAll(".counter__btn");
let counterNumHolder = document.querySelector(".counter__num"); //the html holder of the variable
let counterNum = 0; //the variable

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

btnBg.addEventListener("click", () => {
  // the whole bg randomizer itself
  let newColor = randomColor();
  document.body.style.background = newColor;
  color.style.color = newColor;
  color.innerHTML = newColor;
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
  for (let btn of btnCalculation) {
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
    return "#fff";
  }
  return "lime";
}

modeSelector();
changeNum();
