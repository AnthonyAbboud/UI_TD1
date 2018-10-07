/* Data Structures */
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

var img=document.getElementsByClassName("thirdLine1");

function mOver(obj) {
  obj.innerHTML = img;
}

function mOut(obj) {
  obj.innerHTML = "blank";
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
var object=document.getElementById("changeP1");

object.onmouseover=function(){
    document.getElementById("editButton").style="width:20px;height:20px;";
}
object.onmouseout=function(){
    document.getElementById("editButton").style="width:0px;height:0px;";
}

function imageChanging(checkBox){
    if(checkBox.classList.contains('checked')){
        checkBox.src = "check.png";    
    }
    else{
        checkBox.src = "tick-check.png";
    }
    checkBox.classList.toggle('checked');

}

/* Changer le texte */
let editText=document.getElementById("changeName");
editText.addEventListener("click",edit());


function edit(){
    
    if(editText.classList.contains('clicked')){
        document.getElementById("changeName").style.visibility="visible";
        document.getElementById("participant2").style.visibility="hidden";
        document.getElementById("participNom1").style.visibility="hidden";
        document.getElementById("cancel").style.visibility="visible";
        document.getElementById("editButton").style="visibility:hidden"; //NE MARCHE PAS ICI
      }
      editText.classList.toggle('clicked')
    
}
function updating () {
    document.getElementById("update").style.visibility="visible";
    document.getElementById("cancel").style.visibility="hidden";
}


let changing=document.getElementById("changeP1");
changing.addEventListener("click",cancel());

function cancel() {
    if(changing.classList.contains('P1')){
        document.getElementById("changeName").style.visibility="hidden";
        document.getElementById("participant2").style.visibility="visible";
        document.getElementById("participNom1").style.visibility="visible";
        document.getElementById("cancel").style.visibility="hidden";
        document.getElementById("editButton").style.visibility="visible";
    }
        
}
changing.addEventListener("click",update());
function update() {
    if(changing.classList.contains('P1')){
        document.getElementById("changeName").style.visibility="hidden";
        document.getElementById("participNom1").innerHTML= document.getElementById("name").value;
        document.getElementById("participant2").style.visibility="visible";
        document.getElementById("participNom1").style.visibility="visible";
        document.getElementById("update").style.visibility="hidden";
        document.getElementById("editButton").style.visibility="visible";
    }
        
}

document.getElementsByName("blueCheckbox").forEach(function(element){
    if(element.addEventListener){
        element.addEventListener("change", imageChanging, false);
    } else if(element.attachEvent){
        element.attachEvent("onchange", letter);
    }
});





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

    var participParJour = new Array(myJson.Calendrier.length);
    participParJour.fill(0);

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
                participParJour[j-1] += 1;
            }
        }
    }
    
    var prefixNbParticip = 'nbParticipants';

    for(var i = 1; i <= myJson.Calendrier.length; i++){
      var num = document.createElement("p");
      var numText = document.createTextNode(participParJour[i-1]);
      num.appendChild(numText);
      document.getElementById(prefixNbParticip + (i)).appendChild(num);
    }

    var nbParticip = 0;
    for (var i = 0; i < myJson.Participants.length; i++) {
      if(myJson.Participants[i].Statut == "Complete"){ nbParticip += 1; }
    }
    document.getElementById("nbTotalParticipants").innerHTML = nbParticip + " participants";

})

function generateCalendar() { 
    document.getElementById("grid-container").style.display = "block";
}

function generateTable() {
    document.getElementById("grid-container").style.display = "inline-grid";
}