var buttonBack = document.getElementById("back");
var buttonNext = document.getElementById("next");

buttonBack.onclick = back;
buttonNext.onclick = next;

function back() {
  	window.location.assign("questions.html")
}

function next() {
  	window.location.assign("result.html")
}

var answers = sessionStorage.getItem("answers");
console.log(answers)