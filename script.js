var buttonBack = document.getElementById("back");
var buttonNext = document.getElementById("next");
var buttonTitle = document.getElementById("title"); 
var buttonStatement = document.getElementById("statement"); 
var buttonPro = document.getElementById("pro"); 
var buttonNone = document.getElementById("none"); 
var buttonContra = document.getElementById("contra"); 
var currentQuestion = 0;
var answers = [];
var finished = false
vraag()

function vraag() {
	buttonBack.onclick = back;
	buttonNext.onclick = next;
	title.innerHTML = subjects[currentQuestion].title;
	statement.innerHTML = subjects[currentQuestion].statement;
	buttonPro.onclick = pro;
	buttonNone.onclick = none;
	buttonContra.onclick = contra;
}


function back() {
	if (currentQuestion > 0) {
		currentQuestion--
		vraag()
	} else {
		home()
	}
}

function next() {
	if (currentQuestion < 5) {
		currentQuestion++
		vraag()
	} else {
		result()
	}
}

function pro() {
	answers[currentQuestion] = {answer: 'pro'};
	next()
}

function none() {
	answers[currentQuestion] = {answer: 'none'};
	next()
}

function contra() {
	answers[currentQuestion] = {answer: 'contra'};
	next()
}

function home() {
  	window.location.assign("home.html")
}

function result() {
  	window.location.assign("result.html")
	console.table(answers);
}
