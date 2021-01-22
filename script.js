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
var terugkijken = false
vraag()

function vraag() {
	buttonBack.onclick = back;
	buttonNext.onclick = next;
	if (window.location.href == "file:///E:/school/jaar%202+3/code_jaar_2/Stemwijzer_2/questions.html") {
		title.innerHTML = subjects[currentQuestion].title;
		statement.innerHTML = subjects[currentQuestion].statement;
		buttonPro.onclick = pro;
		buttonNone.onclick = none;
		buttonContra.onclick = contra;
	}
}


function back() {
	if (window.location.href == "file:///E:/school/jaar%202+3/code_jaar_2/Stemwijzer_2/important.html") {
		vragen()
	} else if (currentQuestion > 0) {
		currentQuestion--
		vraag()
	} else {
		home()
	}
}

function next() {
	if (window.location.href == "file:///E:/school/jaar%202+3/code_jaar_2/Stemwijzer_2/important.html") {
		result()
	} else if (currentQuestion < 5) {
		currentQuestion++
		vraag()
	} else {
		belangerijkeVraagenEnPartijen()
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

function vragen() {
  	window.location.assign("questions.html")
}

function belangerijkeVraagenEnPartijen() {
  	window.location.assign("important.html")
}

function displayQuestions() {
  var li = document.createElement("li");
  var vraag = document.createTextNode("vraag1");
  li.appendChild(vraag);
  document.getElementById("questions").appendChild(li);
}

function result() {
  	window.location.assign("result.html")
}
