const buttonBack = document.getElementById('back');
const buttonNext = document.getElementById('next');
const buttonTitle = document.getElementById('title'); 
const buttonStatement = document.getElementById('statement'); 
const buttonPro = document.getElementById('pro'); 
const buttonNone = document.getElementById('none'); 
const buttonContra = document.getElementById('contra'); 
var currentQuestion = 0;
var answers = [];
var allParties = [];
var outcome = [
{"VVD": 0},
{"CDA": 0},
{"PVV": 0},
{"D66": 0},
{"GroenLinks": 0},
{"SP": 0},
{"PvdA": 0},
{"ChristenUnie": 0},
{"Partij voor de Dieren": 0},
{"SGP": 0},
{"DENK": 0},
{"Forum voor Democratie": 0},
{"Lokaal in de Kamer": 0},
{"OndernemersPartij": 0},
{"VNL": 0},
{"Nieuwe Wegen": 0},
{"De Burger Beweging": 0},
{"Piratenpartij": 0},
{"Artikel 1": 0},
{"Libertarische Partij": 0},
{"50Plus": 0},
{"Vrijzinnige Partij": 0},
{"Niet Stemmers": 0}
];

vraag()
// renderParties()

function vraag() {
	buttonBack.onclick = back;
	buttonNext.onclick = next;
	title.innerHTML = subjects[currentQuestion].title;
	statement.innerHTML = subjects[currentQuestion].statement;
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
			console.log(subjects[i].parties[a].position);
			if (subjects[i].parties[a].position == answers[currentQuestion-1]) {
				console.log(subjects[i].parties[a].name);
				// outcome.find(subjects[i].parties[a].name);
			}
		}
	}
}

// function renderParties() {
// 	var party = parties.length-1;
// 	for (var a = 0; a <= party; a++) {
// 		console.log(parties[a].name);
// 		allParties += {name : parties[a].name};
// 		allParties += {score : 0};
// 	}
// 		console.log(allParties);
// }

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
	answers[currentQuestion] = 'pro';
	next();
}

function none() {
	answers[currentQuestion] = 'none';
	next();
}

function contra() {
	answers[currentQuestion] = 'contra';
	next();
}

function home() {
  	window.location.assign('home.html');
}

function belangerijkeVraagenEnPartijen() {
  	// sessionStorage.setItem("answers", answers);
  	window.location.assign('important.html');
}
