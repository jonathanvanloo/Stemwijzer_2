const buttonBack = document.getElementById('Back');
const buttonNext = document.getElementById('Next');
const buttonBackQuestions = document.getElementById('BackQuestions');
const buttonNextResults = document.getElementById('NextResults');
const Title = document.getElementById('Title');
const Statement = document.getElementById('Statement');
const buttonPro = document.getElementById('Pro');
const buttonNone = document.getElementById('None');
const buttonContra = document.getElementById('Contra');
var currentQuestion = 0;
var answers = [];
var filledIn = false
var allParties = [
	{name: "VVD", score: 0},
	{name: "CDA", score: 0},
	{name: "PVV", score: 0},
	{name: "D66", score: 0},
	{name: "GroenLinks", score: 0},
	{name: "SP", score: 0},
	{name: "PvdA", score: 0},
	{name: "ChristenUnie", score: 0},
	{name: "Partij voor de Dieren", score: 0},
	{name: "SGP", score: 0},
	{name: "DENK", score: 0},
	{name: "Forum voor Democratie", score: 0},
	{name: "Lokaal in de Kamer", score: 0},
	{name: "OndernemersPartij", score: 0},
	{name: "VNL", score: 0},
	{name: "Nieuwe Wegen", score: 0},
	{name: "De Burger Beweging", score: 0},
	{name: "Piratenpartij", score: 0},
	{name: "Artikel 1", score: 0},
	{name: "Libertarische Partij", score: 0},
	{name: "50Plus", score: 0},
	{name: "Vrijzinnige Partij", score: 0},
	{name: "Niet Stemmers", score: 0}
];
 
home()

function home() {
	setdisplay("inline","none","none","none")
	document.getElementById('start').onclick = questions;
}
  
function questions() {
	setdisplay("none","inline","none","none")
	selectButtons()
	buttonBack.onclick = back;
	buttonNext.onclick = next;
	Title.innerHTML = subjects[currentQuestion].title;
	Statement.innerHTML = subjects[currentQuestion].statement;
	buttonPro.onclick = pro;
	buttonNone.onclick = none;
	buttonContra.onclick = contra;
}

function important() {
	setdisplay("none","none","inline","none")
	currentQuestion = 0;
	buttonBackQuestions.onclick = questions;
	buttonNextResults.onclick = result;
	setquestions()
	setparties()
	filledIn = true
}

function result() {
	setdisplay("none","none","none","inline")
	document.getElementById('home').onclick = home;
	document.getElementById('review').onclick = questions;
}

// score in de data.js toeveogen bij de parties

// questions page

function selectButtons() {
	buttonPro.style.backgroundColor = "black";
	buttonNone.style.backgroundColor = "black";
	buttonContra.style.backgroundColor = "black";
	if (answers[currentQuestion] != null) {
		document.getElementById(answers[currentQuestion]).style.backgroundColor = "deepskyblue";
	}
}

function back() {
	if (currentQuestion > 0) {
		currentQuestion--;
		questions();
	} else {
		home();
	}
}

function next() {
	if (currentQuestion < subjects.length-1) {
		currentQuestion++;
		questions();
	} else {
		// calculateScore()
		important();
	}
}

function pro() {
	answers[currentQuestion] = 'Pro';
	next();
}

function none() {
	answers[currentQuestion] = 'None';
	next();
}

function contra() {
	answers[currentQuestion] = 'Contra';
	next();
}

// result page

function setquestions() {
	if (filledIn == false) {	
		for (let i = 0; i < subjects.length; i++) {
			var li = document.createElement("li");
			var question = document.createTextNode(subjects[i].title);
			li.appendChild(question);
			document.getElementById("questions").appendChild(li);
		}
	}
}

function setparties() {	
	for (let i = 0; i < 10; i++) {
		var li = document.createElement("li");
		var question = document.createTextNode(allParties[i].name);
		li.appendChild(question);
		document.getElementById("partijen").appendChild(li);
	}
}

// other

// set display function
function setdisplay(home,questions,important,result) {
	document.getElementById("homePage").style.display = home; 
	document.getElementById("questionsPage").style.display = questions; 
	document.getElementById("importantPage").style.display = important; 
	document.getElementById("resultPage").style.display = result; 
}

// sort function
function compare(a, b) {
	var a = a.score;
	var b = b.score;
  
	let comparison = 0;
	if (a > b) {
	  comparison = -1;
	} else if (a < b) {
	  comparison = 1;
	}
	return comparison;
}

// check where answer is equal to position of partie
function calculateScore() {
	for (let i = 0; i < subjects.length; i++) {
		for (let a = 0; a < subjects[i].parties.length; a++) {
			if (subjects[i].parties[a].position == answers[i].toLowerCase()) {
				console.log(subjects[i].parties[a].name);
				console.log(subjects[i].parties[a].position);
			}
		}
	}
	console.log(allParties);
	console.log("dfsfdfsdfsdfsdfsdfsdf");
}

// check where answer is equal to position of partie OLD
function prosessAnswers() {
	var subj = subjects.length;
	var party = parties.length;
	for (var i = 0; i < subj; i++) {;
		for (var a = 0; a < party; a++) {
			if (subjects[i].parties[a].position == answers[currentQuestion-1].toLowerCase()) {
				return scoreCalculation(subjects[i].parties[a].name);
			}
		}
	}
}

// add score to partie with the same position 
function scoreCalculation(name) {
	for (var i = 0; i < allParties.length; i++) {
		if (allParties[i].name == name) {
			allParties[i].score++;
			allParties.sort(compare);
		} else if (backboolean == true) {
			allParties[i].score--;
		}
	}
}