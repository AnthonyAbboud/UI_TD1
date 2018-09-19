/* Data Structures */
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

/* Build Div Elements for the Dates */
function buildDivDates(divDates){
	divDates = document.createElement('div');
	divDates.className = 'dates-grid-container';

	for(var i = 0; i < 10; i++){
		var divDate = document.createElement('div');
		divDate.className = 'date-item';
		divDate.id = 'date' + (i);

		divDates.appendChild(divDate);
	}

	return divDates;
}

function buildDivParticip(divParticip){
	divParticip = document.createElement('div');
	divParticip.className = 'particip-grid-container';

	for(var i = 0; i < 10; i++){
		var divPart = document.createElement('div');
		divPart.className = 'particip-item';

		divParticip.appendChild(divPart);
	}

	return divParticip;
}

function buildDivNewName(divNewName){
	divNewName = document.createElement('div');
	divNewName.className = 'new-name-grid-container';

	for(var i = 0; i < 10; i++){
		var blueName = document.createElement('div');

		if(i == 0){
			blueName.className = 'new-name-item';
		}
		else{
			blueName.className = 'new-vote-item';
		}

		divNewName.appendChild(blueName);
	}

	return divNewName;
}

function buildDivNames(divNames){
	divNames = document.createElement('div');
	divNames.className = 'names-grid-container';

	for(var i = 0; i < 5; i++){
		var divName = document.createElement('div');
		divName.className = 'name-item';

		divNames.appendChild(divName);
	}

	return divNames;
}

function buildDivVotes(divVotes){
	divVotes = document.createElement('div');
	divVotes.className = 'votes-grid-container';

	for(var i = 0; i < 5; i++){
		var divOnePersonVotes = document.createElement('div');
		divOnePersonVotes.className = 'person-votes-container';

		for(var j = 0; j < 9; j++){
			var oneVote = document.createElement('div');
			oneVote.className = 'vote-item';

			divOnePersonVotes.appendChild(oneVote);
		}

		divVotes.appendChild(divOnePersonVotes);
	}

	return divVotes;
}

/* Fetch Data from JSON File */
function fetchData(){
	fetch('https://raw.githubusercontent.com/AnthonyAbboud/UI_TD1/master/cal-data.json')
	.then(function(response){
		return response.json();
	})
	.then(function(myJson){
		var prefixDates = 'date';
		var arrayDates = new Array();
		for(var i = 1; i <= myJson.Calendrier.length; i++){
			arrayDates.push(new Date(myJson.Calendrier[i-1][0]));
			document.getElementById(prefixDates + i).innerHTML = 
				months[arrayDates[i-1].getMonth()] + "\n" + 
				arrayDates[i-1].getDate() + "\n" + 
				days[arrayDates[i-1].getDay()] + "\n\n" +
				arrayDates[i-1].getHours() + ":" +
				arrayDates[i-1].getMinutes() + "0\n" +
				(arrayDates[i-1].getHours() + (myJson.Calendrier[i-1][1]/60)) + ":00";
		}
	})
}

/* Main Function */
$(document).ready(function(){
	/* HTML Structure Generation */
	var mainDiv = document.querySelector('.main-grid-container');
	var divDates = buildDivDates(divDates);
	var divParticip = buildDivParticip(divParticip);
	var divNewName = buildDivNewName(divNewName);
	var divNames = buildDivNames(divNames);
	var divVotes = buildDivVotes(divVotes);

	/* Append Generated HTML Structure to Main */
	mainDiv.appendChild(divDates);
	mainDiv.appendChild(divParticip);
	mainDiv.appendChild(divNewName);
	mainDiv.appendChild(divNames);
	mainDiv.appendChild(divVotes);

	/* Fetch Data from JSON File */
	fetchData();
})