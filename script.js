const buttonBack = document.getElementById('Back');
const buttonNext = document.getElementById('Next');
const Title = document.getElementById('Title');
const Statement = document.getElementById('Statement');
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
  
function vraag() {
	selectButtons()
	buttonBack.onclick = back;
	buttonNext.onclick = next;
	Title.innerHTML = subjects[currentQuestion].title;
	Statement.innerHTML = subjects[currentQuestion].statement;
	buttonPro.onclick = pro;
	buttonNone.onclick = none;
	buttonContra.onclick = contra;
	console.log(allParties)
}

// score in de data.js toeveogen bij de parties
// data.js online
// bijna alle html over zetten naar js

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
	if (currentQuestion < subjects.length-1) {
		currentQuestion++;
		vraag();
	} else {
		calculateScore()
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
	important()
}

function important() {
	
	const buttonBack = document.getElementById('back');
	const buttonNext = document.getElementById('next');
	
	buttonBack.onclick = back;
	buttonNext.onclick = next;
	
	for (let i = 0; i < subjects.length; i++) {
		var li = document.createElement("li");
		var question = document.createTextNode(subjects[i].title);
		li.appendChild(question);
		document.getElementById("questions").appendChild(li);
	}
	
	for (let i = 0; i < 10; i++) {
		var li = document.createElement("li");
		var question = document.createTextNode(allParties[i].name);
		li.appendChild(question);
		document.getElementById("partijen").appendChild(li);
	}
	
	function back() {
		window.history.back();
	}
	
	function next() {
		window.location.assign('result.html')
	}
	
}