var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

window.onload = function() {
	fetch('https://raw.githubusercontent.com/AnthonyAbboud/UI_TD1/master/calendrier.json')
	.then(function(response){
		return response.json();
	})
	.then(function(myJson){
		var prefixDates = 'dates';
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

		for(var i = 1; i < 10; i++){
			//document.getElementById(prefixDates + i).innerHTML = myJson.Calendrier[i-1][0];
		}

		document.getElementById("participNumber").innerHTML = myJson.Participants.length + " particpants";

		var prefixNoms = 'Nom';
		for(var i = 1; i < 7; i++){
			document.getElementById(prefixNoms + i).innerHTML += myJson.Participants[i-1].Nom;
		}
	})
};
