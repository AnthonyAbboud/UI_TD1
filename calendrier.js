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

    // var list = document.getElementById("firstLine")
    // fetch("calendrier.json")
    // .then(function(response) { return response.json(); })
    // .then(function(json) {
    // for(var i = 0; i < json.Calendrier.length; i++) {
    //     var listItem = document.createElement('li');
    //     listItem.innerHTML = json.Calendrier[i] ;
    //     list.appendChild(listItem);
    //   }
    // });
    