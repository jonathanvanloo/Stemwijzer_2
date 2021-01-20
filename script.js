var buttonBack = document.getElementById("back");
var buttonNext = document.getElementById("next");
var buttonTitle = document.getElementById("title"); 
var buttonStatement = document.getElementById("statement"); 
var buttonPro = document.getElementById("pro"); 
var buttonNone = document.getElementById("none"); 
var buttonContra = document.getElementById("contra"); 
var currentQuestion = 0;
var answers = [];
vraag()

console.log(subjects[0].parties[*].position)

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
		result()
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
	if (currentQuestion < 5) {
		currentQuestion++
		vraag()
	} else {
		result()
	}
}

function none() {
	answers[currentQuestion] = {answer: 'none'};
	if (currentQuestion < 5) {
		currentQuestion++
		vraag()
	} else {
		result()
	}
}

function contra() {
	answers[currentQuestion] = {answer: 'contra'};
	if (currentQuestion < 5) {
		currentQuestion++
		vraag()
	} else {
		result()
	}
}

function result() {
	alert("einde vraagenlijst")
	console.table(answers);
}
