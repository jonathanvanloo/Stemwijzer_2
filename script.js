const buttonBack = document.getElementById('Back');
const buttonNext = document.getElementById('Next');
const buttonBackQuestions = document.getElementById('BackQuestions');
const buttonNextResults = document.getElementById('NextResults');
const Title = document.getElementById('Title');
const Statement = document.getElementById('Statement');
const buttonPro = document.getElementById('Pro');
const buttonNone = document.getElementById('None');
const buttonContra = document.getElementById('Contra');
const buttonSeculiere = document.getElementById('seculiere');
const buttonGrote = document.getElementById('grote');
var currentQuestion = 0;
var answers = [];
var filledIn = false

for (let i = 0; i < parties.length; i++) {
	parties[i].score = 0
	parties[i].important = false
}
 
questions()

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
	buttonPro.onclick = function(){setAnswer('Pro')};
	buttonNone.onclick = function(){setAnswer('None')};
	buttonContra.onclick = function(){setAnswer('Contra')};
}

function important() {
	console.table(parties)
	setdisplay("none","none","inline","none")
	currentQuestion = 0;
	buttonBackQuestions.onclick = questions;
	buttonNextResults.onclick = result;
	setquestions();
	setParties();
	buttonGrote.onclick = setGroteVragenFilteren;
	buttonSeculiere.onclick = setSeculiereVragenFilteren;
	filledIn = true;
}

function result() {
	setdisplay("none","none","none","inline")
	document.getElementById('home').onclick = home;
	document.getElementById('review').onclick = questions;
	topDriepartijen()
	console.table(parties)
}

function topDriepartijen() {
	document.getElementById('percentage1').innerHTML = "U bent het voor " + parties[0].score/subjects.length*100 + "% eens met " + parties[0].name;
	document.getElementById('percentage2').innerHTML = "U bent het voor " + parties[1].score/subjects.length*100 + "% eens met " + parties[1].name;
	document.getElementById('percentage3').innerHTML = "U bent het voor " + parties[2].score/subjects.length*100 + "% eens met " + parties[2].name;
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
		calculateScore();
		important();
	}
}

function setAnswer(answer) {
	answers[currentQuestion] = answer;
	next();
}

// important page

function setGroteVragenFilteren() {
		resetParties()
		if (buttonGrote.checked == true) {
		for (let i = 0; i < parties.length; i++) {
			if (parties[i].size < 15) {
				updatePartie(i)
			}
		}
	} else {
		resetParties()
	}
	console.table(parties)
	parties.sort(compare);
}

function setSeculiereVragenFilteren() {
		resetParties()
		if (buttonSeculiere.checked == true) {
		for (let i = 0; i < parties.length; i++) {
			if (parties[i].secular != true) {
				updatePartie(i)
			}
		}
	} else {
		resetParties()
	}
	console.table(parties)
	parties.sort(compare);
}

function setParties() {
	if (filledIn == false) {
		for (let i = 0; i < parties.length; i++) {
			var inputPartieTop = document.createElement("input");
			var liPartieTop = document.createElement("li");
			var partie = document.createTextNode(parties[i].name);
			inputPartieTop.setAttribute("type", "checkbox");
			inputPartieTop.setAttribute("id", "partieInp" + i);
			inputPartieTop.setAttribute("onclick", "setImportantPartie(this.id)");
			liPartieTop.setAttribute("id", "partieLi" + i);
			liPartieTop.appendChild(inputPartieTop);
			liPartieTop.appendChild(partie);
			document.getElementById("partie").appendChild(liPartieTop);
		}
	}
}

function setquestions() {
	if (filledIn == false) {	
		for (let i = 0; i < subjects.length; i++) {
			var inputImpQuestion = document.createElement("input");
			var liImpQuestion = document.createElement("li");
			var question = document.createTextNode(subjects[i].title);
			inputImpQuestion.setAttribute("type", "checkbox");
			inputImpQuestion.setAttribute("id", "question" + i);
			inputImpQuestion.setAttribute("onclick", "setImportantQuestion(this.id)");
			liImpQuestion.appendChild(inputImpQuestion);
			liImpQuestion.appendChild(question);
			document.getElementById("questions").appendChild(liImpQuestion);
		}
	}
}

function setImportantPartie(a) {
	var i = a.replace("partieInp", "");
	subjects[i].parties.forEach(party => {
		if (document.getElementById("partieInp" + i).checked == true) {
			if (party.name == parties[i].name) {
				parties.find(parties => parties.name == party.name ).important = true;
			}
		} else {
			if (party.name == parties[i].name) {
				parties.find(parties => parties.name == party.name ).important = false;
			}
		}
		resetParties()
	})
	console.table(parties)
}

function setImportantQuestion(a) {
	var i = a.replace("question", "");
	subjects[i].parties.forEach(party => {
		if (document.getElementById("question" + i).checked == true) {
			if (party.position == answers[i].toLowerCase()) {
				parties.find(parties => parties.name == party.name ).score++;
			}
		} else {
			if (party.position == answers[i].toLowerCase()) {
				parties.find(parties => parties.name == party.name ).score--;
			}
		}
		resetParties()
	})
	console.table(parties)
}

function resetParties() {
	for (let i = 0; i < parties.length; i++) {
		var partieTop = document.getElementById("partieInp" + i);
		var liPartieTop = document.getElementById("partieLi" + i);
		liPartieTop.style.display = "block"
		partieTop.innerHTML = parties[i].name;
		document.getElementById("partie").appendChild(liPartieTop);
	}
}

function updatePartie(i) {
		var liPartieTop = document.getElementById("partieLi" + i);
		liPartieTop.style.display = "none";
}

// other

// check where answer is equal to position of partie and add 1 to the score of that partie
function calculateScore() {
	for (let i = 0; i < subjects.length; i++) {
		for (let a = 0; a < subjects[i].parties.length; a++) {
			if (subjects[i].parties[a].position == answers[i].toLowerCase()) {
				parties.find(checkName).score++;
			}
			function checkName(parties) { 
				return parties.name == subjects[i].parties[a].name;
			}
		}
	}
	parties.sort(compare);
}

// set display function
function setdisplay(home, questions, important, result) {
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
