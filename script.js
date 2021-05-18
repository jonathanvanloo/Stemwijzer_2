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

// de score en de important elementen worden toe gevoegd in de data.js
for (let i = 0; i < parties.length; i++) {
	parties[i].score = 0
	parties[i].important = false
}

// hieronder word de eerste pagina aangeroepen
home()

// hieronder word de home pagina klaargezet
function home() {
	setdisplay("inline","none","none","none")
	document.getElementById('start').onclick = questions;
}
  
// hieronder word de pagina met de vragen klaargezet
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

// hieronder word de pagina met de belangerijke vragen en gekoofenpartijen met de bij behoordende filters klaargezet
function important() {
	console.table(parties)
	setdisplay("none","none","inline","none")
	currentQuestion = 0;
	buttonBackQuestions.onclick = questions;
	buttonNextResults.onclick = result;
	setquestions();
	setParties();
	buttonGrote.onclick = setGroteVragenFilter;
	buttonSeculiere.onclick = setSeculiereVragenFilter;
	filledIn = true;
}

// hieronder word de pagina met de resultaten klaargezet
function result() {
	setdisplay("none","none","none","inline")
	document.getElementById('home').onclick = home;
	document.getElementById('review').onclick = questions;
	topDriepartijen()
	console.table(parties)
}

// vragen pagina

// hieronder worden de eens, oneens en de geenvanbijden knoppen klaargezet
function selectButtons() {
	buttonPro.style.backgroundColor = "black";
	buttonNone.style.backgroundColor = "black";
	buttonContra.style.backgroundColor = "black";
	if (answers[currentQuestion] != null) {
		document.getElementById(answers[currentQuestion]).style.backgroundColor = "deepskyblue";
	}
}

// hieronder word de backbutton klaargezet
function back() {
	if (currentQuestion > 0) {
		currentQuestion--;
		questions();
	} else {
		home();
	}
}

// hieronder word de nextbutton klaargezet
function next() {
	if (currentQuestion < subjects.length-1) {
		currentQuestion++;
		questions();
	} else {
		calculateScore();
		important();
	}
}

// hieronder worden de antwoorden opgeslagen
function setAnswer(answer) {
	answers[currentQuestion] = answer;
	next();
}

// belangerijkevragen pagina

// hieronder word de filter voor de grote partijen klaargezet
function setGroteVragenFilter() {
		resetParties()
		if (buttonGrote.checked == true) {
		for (let i = 0; i < parties.length; i++) {
			if (parties[i].size < 10) {
				updatePartie(i)
			}
		}
	} else {
		resetParties()
	}
	console.table(parties)
	parties.sort(compare);
}

// hieronder word de filter voor de seculaire partijen klaargezet
function setSeculiereVragenFilter() {
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

// hieronder worden de partijen klaargezet
function setParties() {
	if (filledIn == false) {
		for (let i = 0; i < 10; i++) {
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

// hieronder worden de vragen klaargezet
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

// hieronder krijgen de belangerijke partijen de juiste waarde klaargezet
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

// hieronder krijgen de belangerijke vragen de juiste waarde klaargezet
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

// hieronder worden de partijen gerest klaargezet
function resetParties() {
	for (let i = 0; i < parties.length; i++) {
		var partieTop = document.getElementById("partieInp" + i);
		var liPartieTop = document.getElementById("partieLi" + i);
		liPartieTop.style.display = "block"
		partieTop.innerHTML = parties[i].name;
		document.getElementById("partie").appendChild(liPartieTop);
	}
}

// hieronder word een partij weg gedaan klaargezet
function updatePartie(i) {
		var liPartieTop = document.getElementById("partieLi" + i);
		liPartieTop.style.display = "none";
}

// result page

// hieronder worden de top 3 partijen klaargezet
function topDriepartijen() {
	for (let i = 1; i <= 3; i++) {
		var percentige = Math.round(parties[i].score/subjects.length*100);
		if (percentige > 100) {
			percentige = 100
		} else {
		document.getElementById('percentage' + i).innerHTML = "U bent het voor " + Math.round(parties[i].score/subjects.length*100) + "% eens met " + parties[i].name;
		}
	}
}

// other

// hieronder word de score berekend
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

// hieronder word het uiste display geselecteerd
function setdisplay(home, questions, important, result) {
	document.getElementById("homePage").style.display = home; 
	document.getElementById("questionsPage").style.display = questions; 
	document.getElementById("importantPage").style.display = important; 
	document.getElementById("resultPage").style.display = result; 
}

// hieronder staat de functie de gebruikt word om de partijen te sorteeren
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
