
window.onload = function() {
	fetch('http://www.groupes.polymtl.ca/log2420/Lab/Doodle/cal-data.json')
	.then(function(response){
		return response.json(); 
	}).then(function(myJson){
		document.getElementById("dates").innerHTML = myJson.Calendrier[1][1];
	})};