const buttonBack = document.getElementById("back");
const buttonNext = document.getElementById("next");
const buttonTitle = document.getElementById("title"); 
const buttonStatement = document.getElementById("statement"); 
const buttonPro = document.getElementById("pro"); 
const buttonNone = document.getElementById("none"); 
const buttonContra = document.getElementById("contra"); 
var currentQuestion = 0;
var answers = [];
vraag()

function vraag() {
	buttonBack.onclick = back;
	buttonNext.onclick = next;
	title.innerHTML = subjects[currentQuestion].title;
	statement.innerHTML = subjects[currentQuestion].statement;
	buttonPro.onclick = pro;
	buttonNone.onclick = none;
	buttonContra.onclick = contra;
	calculateScore()
}

function calculateScore() {
	console.log(subjects[0].parties[0].position)
	for (var i = 0; i <= 5; i++) {
		for (var a = 0; a <= 30; a++) {
		subjects[i].parties[a].position
		// if (answers[i] == )
		}
	}
}









function back() {
	if (currentQuestion > 0) {
		currentQuestion--;
		vraag();
	} else {
		home();
	}
}

function next() {
	if (currentQuestion < 5) {
		currentQuestion++;
		vraag();
	} else {
		belangerijkeVraagenEnPartijen();
	}
}

function pro() {
	answers[currentQuestion] = {answer: 'pro'};
	next();
}

function none() {
	answers[currentQuestion] = {answer: 'none'};
	next();
}

function contra() {
	answers[currentQuestion] = {answer: 'contra'};
	next();
}

function home() {
  	window.location.assign("home.html");
}

function belangerijkeVraagenEnPartijen() {
  	// sessionStorage.setItem("answers", answers);
  	window.location.assign("important.html");
}
