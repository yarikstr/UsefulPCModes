let btn = document.querySelector(".btn");
let color = document.querySelector(".color");

btn.addEventListener("click", function () {
  let newColor = randomColor();
  document.body.style.background = newColor;
  color.style.color = newColor;
  color.innerHTML = newColor;
});

function randomColor() {
  const allDigits = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
  ];
  let newColor = "#";
  for (let i = 0; i < 6; i++) {
    let randomDigit = allDigits[Math.floor(Math.random() * allDigits.length)];
    newColor += randomDigit;
  }
  return newColor;
}
