/* ------- Bulle d'information -----*/

// function BulleMouseOver(elem) { /* doit récupérer info du fichier json de la colonne i */
  

//   myJson.Calendrier[i]

//   elem.style.color = "white";
// }

// function MouseOut(elem) {
//   elem.style.color = "black";
// }

// function infoBulle(){}

// var json = '{"Calendrier": ["Mon Aug 27 2018 10:00:00 GMT-0400 (EDT)", 120], "Participant":"Julie" }';

// obj = JSON.parse(json);

// return obj.Calendrier ;
// //console.log(obj.Calendrier); // sortie attendue : "Mon Aug 27 2018 10:00:00 GMT-0400 (EDT)", 120"
// }





/* ----- Afficher un popup ----- */

var e = document.getElementById('parent');

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

  /*-------------- Séléction des dates ----------------- */
   
   /* ----- Pour changer d'image quand on coche ----- */ 
   // On définit l'image check de chaque case dans la ligne 3 (Michel)
    
   let img = document.getElementById('imgClickAndChange');
   img.addEventListener('click', changeImage());

   let img2 = document.getElementById('imgClickAndChange2');
    img2.addEventListener('click', changeImage2());

    let img3 = document.getElementById('imgClickAndChange3');
    img3.addEventListener('click', changeImage3());

    let img4 = document.getElementById('imgClickAndChange4');
    img4.addEventListener('click', changeImage4());

    let img5 = document.getElementById('imgClickAndChange5');
    img5.addEventListener('click', changeImage5());

    let img6 = document.getElementById('imgClickAndChange6');
    img6.addEventListener('click', changeImage6());

    let img7 = document.getElementById('imgClickAndChange7');
    img7.addEventListener('click', changeImage7());

    let img8 = document.getElementById('imgClickAndChange8');
    img8.addEventListener('click', changeImage8());

    let img9 = document.getElementById('imgClickAndChange9');
    img9.addEventListener('click', changeImage9());

   
   /* ----- Fonction changeImage() -----  */

   //// Première case ////

 function changeImage()  {
   console.log('dedede') //Console : print dedede pour vérifier qu'on rentre dans la fonction;
   
   if(img.classList.contains('checked')){
     document.getElementById("imgClickAndChange").src = "tick-check.png";
   }
   else{
     document.getElementById("imgClickAndChange").src = "check.png";
   }
   img.classList.toggle('checked')
}

 //// Deuxième case ////

function changeImage2()  {
    console.log('dedede') //Console : print dedede pour vérifier qu'on rentre dans la fonction;
    
    if(img.classList.contains('checked')){
      document.getElementById("imgClickAndChange2").src = "tick-check.png";
    }
    else{
      document.getElementById("imgClickAndChange2").src = "check.png";
    }
    img.classList.toggle('checked')
  }

   //// Troisième case ////

  function changeImage3()  {
    console.log('dedede') //Console : print dedede pour vérifier qu'on rentre dans la fonction;
    
    if(img.classList.contains('checked')){
      document.getElementById("imgClickAndChange3").src = "tick-check.png";
    }
    else{
      document.getElementById("imgClickAndChange3").src = "check.png";
    }
    img.classList.toggle('checked')
  }

   //// Quatrième case ////

  function changeImage4()  {
    console.log('dedede') //Console : print dedede pour vérifier qu'on rentre dans la fonction;
    
    if(img.classList.contains('checked')){
      document.getElementById("imgClickAndChange4").src = "tick-check.png";
    }
    else{
      document.getElementById("imgClickAndChange4").src = "check.png";
    }
    img.classList.toggle('checked')
  }

   //// Cinquième case ////

   function changeImage5()  {
    console.log('dedede') //Console : print dedede pour vérifier qu'on rentre dans la fonction;
    
    if(img.classList.contains('checked')){
      document.getElementById("imgClickAndChange5").src = "tick-check.png";
    }
    else{
      document.getElementById("imgClickAndChange5").src = "check.png";
    }
    img.classList.toggle('checked')
  }

   //// Sixième case ////

    function changeImage6()  {
    console.log('dedede') //Console : print dedede pour vérifier qu'on rentre dans la fonction;
    
    if(img.classList.contains('checked')){
      document.getElementById("imgClickAndChange6").src = "tick-check.png";
    }
    else{
      document.getElementById("imgClickAndChange6").src = "check.png";
    }
    img.classList.toggle('checked')
  }

   //// Septième case ////

    function changeImage7()  {
    console.log('dedede') //Console : print dedede pour vérifier qu'on rentre dans la fonction;
    
    if(img.classList.contains('checked')){
      document.getElementById("imgClickAndChange7").src = "tick-check.png";
    }
    else{
      document.getElementById("imgClickAndChange7").src = "check.png";
    }
    img.classList.toggle('checked')
  }

   //// Huitième case ////


    function changeImage8()  {
    console.log('dedede') //Console : print dedede pour vérifier qu'on rentre dans la fonction;
    
    if(img.classList.contains('checked')){
      document.getElementById("imgClickAndChange8").src = "tick-check.png";
    }
    else{
      document.getElementById("imgClickAndChange8").src = "check.png";
    }
    img.classList.toggle('checked')
  }

   //// Neuvième case ////

    function changeImage9()  {
    console.log('dedede') //Console : print dedede pour vérifier qu'on rentre dans la fonction;
    
    if(img.classList.contains('checked')){
      document.getElementById("imgClickAndChange9").src = "tick-check.png";
    }
    else{
      document.getElementById("imgClickAndChange9").src = "check.png";
    }
    img.classList.toggle('checked')
  }

  /*-------------- Fin de Séléction des dates ----------------- */

