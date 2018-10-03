/* Data Structures */
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

var img=document.getElementsByClassName("thirdLine1");

function mOver(obj) {
  obj.innerHTML = img
}

function mOut(obj) {
  obj.innerHTML = "blank"
}

function clear_value (oInput)
{
    if (!('value' in oInput))
        oInput.placeholder = oInput.value;
    if (oInput.value != oInput.placeholder)
        oInput.value = '';
}

/* Afficher Popup */
var e = document.getElementById("parent");

e.onmouseover = function() {
  document.getElementById('popup').style.display = 'block';
}

e.onmouseout = function() {
  document.getElementById('popup').style.display = 'none';
}

/* Fonction pour que les popup soient toujours au premier plan */

function focusFunction() {
    if (navigator.userAgent.indexOf('MSIE') > -1) {
        self.focus();
    } else {
        self.close();
    }
}

/* Changer l'image */

let img2 = document.getElementById('imgClickAndChange');
img2.addEventListener('click', changeImage());

function changeImage()  {
   if(img2.classList.contains('checked')){
     document.getElementById("imgClickAndChange").src = "tick-check.png";
   }
   else{
     document.getElementById("imgClickAndChange").src = "check.png";
   }
   img2.classList.toggle('checked')
}


fetch('https://raw.githubusercontent.com/AnthonyAbboud/UI_TD1/master/calendrier.json')
.then(function(response){
    return response.json();
})
.then(function(myJson){
    var prefixDates = 'date';
    var prefixVotes = 'vote';
    var prefixParticipNom = 'participNom';
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

    for (var i = 1; i < myJson.Participants.length; i++) {
        document.getElementById(prefixParticipNom + (i)).innerHTML = myJson.Participants[i].Nom;
        for(var j = 1; j <= myJson.Participants[i].Disponibilites.length; j++){
            if(myJson.Participants[i].Disponibilites[j-1] == 0){
                document.getElementById(prefixVotes + (i) + (j)).style.backgroundColor = "#FCECE8";
            }
            else{
                var imageTick = document.createElement("img");
                imageTick.src = "Images/tick1.png";
                document.getElementById(prefixVotes + (i) + (j)).appendChild(imageTick);
            }
        }
    }


})