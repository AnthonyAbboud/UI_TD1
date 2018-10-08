/* Data Structures */
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var maxDaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
var hours = ["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM",
            "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
            "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
            "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"];

/* Model */
function Model() {

    this.loadData = function() {
        return fetch('http://localhost:8080/cal-data.json')
        .then(function(response){
            return response.json();
        })
        .then(function(myJson){
            return myJson;
        });
    }

    this.jsonData = this.loadData();

    this.totalParticipants = function(participants) {
        var nbParticipants = 0;
        for(var i = 0; i < participants.length; i++){
            if(participants[i].Statut == "Complete") {
                nbParticipants += 1;
            }
        }

        if(nbParticipants <= 1) {
            return (nbParticipants + " participant");
        }
        else {
            return (nbParticipants + " participants");
        }
        
    }

    this.totalPerPeriod = function(participants, periodIndex) {
        var nbParticipants = 0;
        for(var i = 0; i < participants.length; i++) {
            nbParticipants += participants[i].Disponibilites[periodIndex];
        }
        return nbParticipants;
    }

    this.dateInfo = function(dateSection, arrayDates, index, periodDuration) {
        switch(dateSection){
            case "month":
                return months[arrayDates[index].getMonth()];
                break;
            case "date":
                return arrayDates[index].getDate();
                break;
            case "day":
                return days[arrayDates[index].getDay()];
                break;
            case "start-hours":
                if(arrayDates[index].getHours() > 12) {
                    return ((arrayDates[index].getHours() - 12) + ":00 PM");
                }
                else {
                    return (arrayDates[index].getHours() + ":00 AM");
                }
                break;
            case "end-hours":
                var endHour = (arrayDates[index].getHours() + (periodDuration/60));
                if(endHour > 12) {
                    return ((endHour - 12) + ":00 PM");
                }
                else {
                    return (endHour + ":00 AM");
                }        
                break;
            default:
                break;
        }
    }

    this.datesArray = function(calendar){
        var arrayOfDates = new Array();
        for(var i = 0; i < calendar.length; i++) {
            arrayOfDates.push(new Date(calendar[i]));
        }

        return arrayOfDates;
    }

    this.participantName = function(participants, index) {
        return participants[index].Nom;
    }

    this.participantVote = function(participants, participantIndex, periodIndex) {
        return participants[participantIndex].Disponibilites[periodIndex];
    }

    this.calendarHour = function(calendarIndex) {
        return hours[(calendarIndex-4)/2];
    }
}

/* Vues */
function TableView(controller) {
    this.controller = controller;

    this.tableViewButton = document.getElementById('tableViewButton');
    this.tableViewButton.addEventListener('click', controller);

    /* Retrieve parent div */
    this.table = document.getElementById('table');
    this.table.addEventListener('mouseover', controller);
    this.table.addEventListener('mouseout', controller);
    this.table.addEventListener('click', controller);
    
    /* Generate Table children */
    var data = controller.getModelInfo();
    data.then((result) => {
            var arrayDates = controller.getDatesArray(result.Calendrier);
            for(var i = 0; i < (result.Participants.length + 2); i++) {
                for(var j = 0; j < (result.Calendrier.length + 1); j++){
                    /* Create each grid-item */
                    var oneDiv = document.createElement('div');
                    /* Class name */
                    oneDiv.className = "oneDivTable";

                    /* IDs and children depending on its functionality */
                    /* Blank space */
                    if(i == 0 && j == 0) {
                        oneDiv.id = "blank-space";
                    }
                    /* Date grid items */
                    else if(i == 0) {
                        oneDiv.id = ("date" + (j));

                        /* Month */
                        var divDateMonth = document.createElement('div');
                        divDateMonth.id = ("date-month" + (j));
                        divDateMonth.innerHTML = controller.getDateInfo("month", arrayDates, j-1, result.Calendrier[j-1][1]);

                        /* Day Number */
                        var divDateNumber = document.createElement('div');
                        divDateNumber.id = ("date-number" + (j));
                        divDateNumber.innerHTML = controller.getDateInfo("date", arrayDates, j-1, result.Calendrier[j-1][1]);

                        /* Day Name */
                        var divDateWeek = document.createElement('div');
                        divDateWeek.id = ("date-week" + (j));
                        divDateWeek.innerHTML = controller.getDateInfo("day", arrayDates, j-1, result.Calendrier[j-1][1]);

                        /* Start Time Period */
                        var divStartPeriod = document.createElement('div');
                        divStartPeriod.id = ("date-start-period" + (j));
                        divStartPeriod.innerHTML = controller.getDateInfo("start-hours", arrayDates, j-1, result.Calendrier[j-1][1]);
                        
                        /* End Time Period */              
                        var divEndPeriod = document.createElement('div');
                        divEndPeriod.id = ("date-end-period" + (j));
                        divEndPeriod.innerHTML = controller.getDateInfo("end-hours", arrayDates, j-1, result.Calendrier[j-1][1]);

                        oneDiv.appendChild(divDateMonth);
                        oneDiv.appendChild(divDateNumber);
                        oneDiv.appendChild(divDateWeek);
                        oneDiv.appendChild(divStartPeriod);
                        oneDiv.appendChild(divEndPeriod);

                        if(j == 1){
                            controller.updateCalendarDates(divDateMonth.innerHTML, divDateNumber.innerHTML, divDateWeek.innerHTML);
                        }
                    }
                    /* Total participants grid item */
                    else if(i == 1 && j == 0) {
                        oneDiv.id = "totalParticipants";
                        oneDiv.innerHTML = controller.getTotalParticipants(result.Participants);
                    }
                    /* Total participants per period grid items */
                    else if(i == 1) {
                        oneDiv.id = ("totalPerPeriod" + (j));

                        var divBlueTick = document.createElement('img');
                        divBlueTick.id = "blue-tick";
                        divBlueTick.src = "Images/tick2.png";

                        var divText = document.createElement('p');
                        divText.id = "totalPerPeriodText";
                        var text = document.createTextNode(controller.getTotalForPeriod(result.Participants, j-1));
                        divText.appendChild(text);

                        oneDiv.appendChild(divBlueTick);
                        oneDiv.appendChild(divText);

                    }
                    /* New participant name grid item */
                    else if(i == 2 && j == 0) {
                        oneDiv.id = "newParticipantName";

                        var divIcon = document.createElement('img');
                        divIcon.id = "iconNewParticipant";
                        divIcon.src = "Images/particip1.png";

                        var divName = document.createElement('input');
                        divName.type = "text";
                        divName.value = "Enter your name";
                        divName.id = "fieldNewParticipant";

                        oneDiv.appendChild(divIcon);
                        oneDiv.appendChild(divName);
                    }
                    /* New participant votes grid items */
                    else if(i == 2) {
                        oneDiv.id = ("newParticipantVote" + (j));

                        var divCheckbox = document.createElement('img');
                        divCheckbox.id = ("blue-checkbox" + (j));
                        divCheckbox.className = "blue-checkbox";
                        divCheckbox.src = "Images/check.png";

                        oneDiv.appendChild(divCheckbox);
                    }
                    /* Registered participant name grid item */
                    else if(j == 0) {
                        oneDiv.className += " participantNameColumnItem";
                        oneDiv.id = ("participantNameColumnItem" + (i-2));

                        var divIcon = document.createElement('img');
                        divIcon.id = ("participantIcon" + (i-2));
                        divIcon.className = "participantIcon"
                        divIcon.src = "Images/particip2.png";

                        var divText = document.createElement('p');
                        divText.id = ("participantName" + (i-2));
                        divText.className = "participantName";
                        var text = document.createTextNode(controller.getParticipantName(result.Participants, i-2));
                        divText.appendChild(text);

                        var divChangeName = document.createElement('input');
                        divChangeName.type = "text";
                        divChangeName.value = controller.getParticipantName(result.Participants, i-2);
                        divChangeName.className = "nameField";
                        divChangeName.id = ("nameField" + (i-2));
                        divChangeName.style.visibility = "hidden";

                        var divEditPen = document.createElement('img');
                        divEditPen.id = ("pencil-edit" + (i-2));
                        divEditPen.className = "pencil-edit";
                        divEditPen.src = "Images/pen.png";

                        oneDiv.appendChild(divIcon);
                        oneDiv.appendChild(divText);
                        oneDiv.appendChild(divChangeName);
                        oneDiv.appendChild(divEditPen);
                    }
                    /* Registered participant votes grid items */
                    else {
                        oneDiv.id = ("participantVote" + (j));
                        oneDiv.className += (" participantRow" + (i-2));

                        if(controller.getVote(result.Participants, i-2, j-1)) {
                            var divVoteImg = document.createElement('img');
                            divVoteImg.id = ("vote" + (i-2) + (j));
                            divVoteImg.className = "vote";
                            divVoteImg.src = "Images/tick1.png";

                            var divPopUp = document.createElement('div');
                            divPopUp.className = "popup";
                            divPopUp.id = ("popup" + (i-2) + (j));
                            divPopUp.style.visibility = "hidden";

                            var divPopUpTopLeft = document.createElement('div');
                            divPopUpTopLeft.id = "popup-top-left"
                            var divPopUpMonth = document.createElement('div');
                            divPopUpMonth.innerHTML = controller.getDateInfo("month", arrayDates, j-1, result.Calendrier[j-1][1]);
                            var divPopUpDay = document.createElement('div');
                            divPopUpDay.innerHTML = controller.getDateInfo("date", arrayDates, j-1, result.Calendrier[j-1][1]);
                            var divPopUpWeek = document.createElement('div');
                            divPopUpWeek.innerHTML = controller.getDateInfo("day", arrayDates, j-1, result.Calendrier[j-1][1]);

                            var divPopUpTopRight = document.createElement('div');
                            divPopUpTopRight.id = "popup-top-right";
                            var divPopUpStartPeriod = document.createElement('div');
                            divPopUpStartPeriod.innerHTML = controller.getDateInfo("start-hours", arrayDates, j-1, result.Calendrier[j-1][1]);
                            var divPopUpEndPeriod = document.createElement('div');
                            divPopUpEndPeriod.innerHTML = controller.getDateInfo("end-hours", arrayDates, j-1, result.Calendrier[j-1][1]);

                            var divPopUpBottom = document.createElement('div');
                            var divName = document.createElement('div');
                            divName.innerHTML = controller.getParticipantName(result.Participants, i-2);
                            var votedYes = document.createElement('div');
                            votedYes.innerHTML = "Voted \"Yes\"";

                            divPopUpTopLeft.appendChild(divPopUpMonth);
                            divPopUpTopLeft.appendChild(divPopUpDay);
                            divPopUpTopLeft.appendChild(divPopUpWeek);

                            divPopUpTopRight.appendChild(divPopUpStartPeriod);
                            divPopUpTopRight.appendChild(divPopUpEndPeriod);

                            divPopUpBottom.appendChild(divName);
                            divPopUpBottom.appendChild(votedYes);

                            divPopUp.appendChild(divPopUpTopLeft);
                            divPopUp.appendChild(divPopUpTopRight);
                            divPopUp.appendChild(divPopUpBottom);

                            oneDiv.appendChild(divVoteImg);
                            oneDiv.appendChild(divPopUp);
                        }  
                    }

                    /* Add grid-item to grid container */
                    this.table.appendChild(oneDiv); 
                }
            } 
        }
    );
}

function CalendarView(controller) {
    this.controller = controller;
    
    this.calendarViewButton = document.getElementById('calendarViewButton');
    this.calendarViewButton.addEventListener('click', controller);

    /* Retrieve parent div */
    this.calendar = document.getElementById('calendar');
    
    /* Generate Table children */
    var data = controller.getModelInfo();
    data.then((result) => {
            var arrayDates = controller.getDatesArray(result.Calendrier);
            for(var i = 0; i < 52; i++) {
                /* Create each grid item */
                var oneDiv = document.createElement('div');
                oneDiv.className = "oneDivCalendar";
                oneDiv.id = ("oneDivCalendar" + (i));

                /* Different content according to grid item location */
                if(i == 0) {
                    oneDiv.id = "newParticipantName";

                    var divIcon = document.createElement('img');
                    divIcon.id = "calendarIconNewParticipant";
                    divIcon.src = "Images/particip2.png";

                    var divName = document.createElement('input');
                    divName.type = "text";
                    divName.value = "Enter your name";
                    divName.id = "calendarFieldNewParticipant";

                    oneDiv.appendChild(divIcon);
                    oneDiv.appendChild(divName);
                }
                else if(i == 1) {
                    
                }
                else if(i == 2) {

                }
                else if(i == 3) {
                    var divAllDay = document.createElement('p');
                    divAllDay.id = "label-all-day";
                    var textNode = document.createTextNode("All-day");
                    divAllDay.appendChild(textNode);
                    oneDiv.appendChild(divAllDay);
                }
                else if(i%2 == 0 && i != 51) {
                    var divFirstHalf = document.createElement('p');
                    divFirstHalf.id = "label-hour";
                    var textNode = document.createTextNode(controller.getCalendarHour(i));

                    divFirstHalf.appendChild(textNode);
                    oneDiv.appendChild(divFirstHalf);
                }

                this.calendar.appendChild(oneDiv); 
            } 
        }
    );
}

/* Controller */
function Controller(model) {
    var self = this;
    this.model = model;

    /* Event listener interface */
    this.handleEvent = function(e) {
        e.stopPropagation();
        var eventID = e.target.id;
        var eventClass = e.target.className;
        var eventType = e.type;
        if(eventID == "tableViewButton" && eventType == "click") {
            self.switchViewHandler(document.getElementById('table'));
        }
        if(eventID == "calendarViewButton" && eventType == "click") {
            self.switchViewHandler(document.getElementById('calendar'));
        }
        if((eventClass == "pencil-edit" || eventClass == "participantIcon" || eventClass == "participantName" || e.target.classList.contains("participantNameColumnItem")) && (eventType == "mouseover" || eventType == "mouseout")) {
            var penID = eventID.replace(/\D/g, "");
            self.pencilEditHoverHandler("pencil-edit" + penID);
        }
        if(e.target.classList.contains("blue-checkbox") && eventType == "click") {
            self.blueCheckboxHandler(eventID);
        }
        if((eventClass == "vote") && (eventType == "mouseover" || eventType == "mouseout")) {
            var popupID = eventID.replace(/\D/g, "");
            self.popupHandler("popup" + popupID);
        }
        if(eventClass == "pencil-edit" && eventType == "click") {
            var fieldID = eventID.replace(/\D/g, "");
            self.nameFieldHandler("nameField" + fieldID, "participantName" + fieldID);
        }
    }

    this.getModelInfo = function() {
        return self.model.jsonData;
    }

    this.getTotalParticipants = function(participants) {
        return self.model.totalParticipants(participants);
    }

    this.getDatesArray = function(calendar) {
        return model.datesArray(calendar);
    }

    this.getDateInfo = function(dateSection, arrayDates, index, periodDuration) {
        return model.dateInfo(dateSection, arrayDates, index, periodDuration);
    }

    this.getTotalForPeriod = function(participants, periodIndex) {
        return model.totalPerPeriod(participants, periodIndex);
    }

    this.getParticipantName = function(participants, index) {
        return model.participantName(participants, index);
    }

    this.getVote = function(participants, participantIndex, periodIndex) {
        return model.participantVote(participants, participantIndex, periodIndex);
    }

    this.getCalendarHour = function(calendarIndex) {
        return model.calendarHour(calendarIndex);
    }

    this.updateCalendarDates = function(month, dayNumber, dayName) {

    }

    /* Handlers */
    this.switchViewHandler = function(view) {
        if(view.id == "table") {
            document.getElementById('table').style.display = "grid";
            document.getElementById('calendar').style.display = "none";
        }
        else {
            document.getElementById('table').style.display = "none";
            document.getElementById('calendar').style.display = "grid";
        }
    }

    this.pencilEditHoverHandler = function(pencil){
        if(document.getElementById(pencil).style.visibility == "visible") {
            document.getElementById(pencil).style.visibility = "hidden";
        }
        else {
            document.getElementById(pencil).style.visibility = "visible";
        }
    }

    this.blueCheckboxHandler = function(checkBox) {
        var box = document.getElementById(checkBox);
        if(box.classList.contains('checked')){
            box.src = "Images/check.png";    
        }
        else{
            box.src = "Images/tick-check.png";
        }
        box.classList.toggle('checked');
    }

    this.popupHandler = function(popup) {
        if(document.getElementById(popup).style.visibility == "visible") {
            document.getElementById(popup).style.visibility = "hidden";
        }
        else {
            document.getElementById(popup).style.visibility = "visible";
        }
    }

    this.nameFieldHandler = function(nameField, participantName) {
        document.getElementById(nameField).style.visibility = "visible";
        document.getElementById(participantName).style.visibility = "hidden";

    }
}

/* Fonction principale */
function main() {
    var model = new Model();
    var controller = new Controller(model);
    var tableView = new TableView(controller);
    var calendarView = new CalendarView(controller);
}

main();