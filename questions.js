const buttonBack = document.getElementById('Back');
const buttonNext = document.getElementById('Next');
const buttonTitle = document.getElementById('Title');
const buttonStatement = document.getElementById('Statement');
const buttonPro = document.getElementById('Pro');
const buttonNone = document.getElementById('None');
const buttonContra = document.getElementById('Contra');
var currentQuestion = 0;
var answers = [];
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

vraag()

function vraag() {
	selectButtons()
	buttonBack.onclick = back;
	buttonNext.onclick = next;
	Title.innerHTML = subjects[currentQuestion].title;
	Statement.innerHTML = subjects[currentQuestion].statement;
	buttonPro.onclick = pro;
	buttonNone.onclick = none;
	buttonContra.onclick = contra;
	prosessAnswer()
}

function prosessAnswer() {
	var subj = subjects.length-1;
	var party = parties.length-2;
	for (var i = 0; i <= subj; i++) {;
		for (var a = 0; a <= party; a++) {
			if (subjects[i].parties[a].position == answers[currentQuestion-1]) {
				return findPosition(subjects[i].parties[a].name, allParties);
			}
		}
	}
}

function findPosition(key, array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].name == key) {
			array[i].score++;
		}
	}
}

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

function home() {
  	window.location.assign('home.html');
}

function belangerijkeVraagenEnPartijen() {
  	// sessionStorage.setItem("answers", answers);
  	window.location.assign('important.html');
}
