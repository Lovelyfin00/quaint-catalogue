const counter1 = document.querySelector("#counter1");
const counter2 = document.querySelector("#counter2");
const counter3 = document.querySelector("#counter3");
const counter4 = document.querySelector("#counter4");
let counts1 = setInterval(counter1Func, 100);
let upto1 = 0;
let upto2 = 100;
let upto3 = 100;
function counter1Func() {
  counter1.innerHTML = ++upto1;
  counter2.innerHTML = ++upto2;
  counter3.innerHTML = ++upto3;
  counter4.innerHTML = ++upto2;
  if (upto1 === 50) {
    clearInterval(counts1);
  }
  if (upto2 === 1500) {
    clearInterval(counts1);
  }
  if (upto3 === 200) {
    clearInterval(counts1);
  }
}
