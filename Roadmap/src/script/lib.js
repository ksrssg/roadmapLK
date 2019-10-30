/*** Variablen ***/
var rgb = [255, 0, 0]; //Array mit RGB-Werten für animierten Gradient
var indexColor = 1; //Index für den Algorithmus des animierten Gradients
var add = true; //Anweisung für den Algorithmus des animierten Gradients
var timer = 1; //Timer des animierten Gradients



/*** Animierter Gradient ***/
var animatedGradient; //Animierter Gradient

function startAnimatedGradient() {
  /*
   * Berechnet die Farbwerte des Gradients
   * Funktion wird durch das Interval {timer} neu aufgerufen
   * 
   * -> Starten: startAnimatedGradient()
   * -> Beenden: clearTimeout(animatedGradient)
   */

  if (add) {
    rgb[indexColor]++;
    if (rgb[indexColor] === 255) {
      add = false;
      switch (indexColor) {
        case 0: indexColor = 2; break;
        case 1: indexColor = 0; break;
        case 2: indexColor = 1; break;
      }
    }
  } else {
    rgb[indexColor]--;
    if (rgb[indexColor] === 0) {
      add = true;
      switch (indexColor) {
        case 0: indexColor = 2; break;
        case 1: indexColor = 0; break;
        case 2: indexColor = 1; break;
      }
    }
  }

  function rgbToHex(colorValues) {
    /*
     * Konvertiert RGB Werte zu einem Hexcode
     *
     * @parameter {Array}: Beinhaltet die RGB Werte
     * @return {String}: Hexcode der in CSS eingesetzt werden kann
     */

    function toHex(value) {
      /*
       * Konvertiert einen dezimalen Wert zu einer zweistelligen Hexadezimalzahl
       *
       * @parameter {Number}: Dezimalwert
       * @return {String}: Hexadezimalwert
       */
      let hex = value.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    return "#" + toHex(colorValues[0]) + toHex(colorValues[1]) + toHex(colorValues[2]);
  }

  document.documentElement.style.setProperty('--AnimatedNeoncolor', rgbToHex(rgb));
  
  animatedGradient = setTimeout(startAnimatedGradient, timer);
}

/*** PAGE INTERAKTIVITY ***/
function openRoadmap(id) {
  /* 
   * open roadmap suppage and safes the SemesterID in local storage
   *
   * @parameter {String}: ID of Semester
   */
  localStorage.setItem("semesterID", id);
  console.log(id);
  window.open("roadmap.html");
}

/*** Dropdown-Menü ***/
function myFunction() {
  /*
   * Zeigt und versteckt den Inhalt des Dropdown-Menüs
   */
  console.log("TEST");
  
  document.getElementById("myDropdown").classList.toggle("show");
}
  
window.onclick = (event) => {
  /*
   * Schließt das Dropdown Menü
   *
   * @event: Click auf Dropdown Button
   */
  if (event.target.matches('.dropbutton')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/*** Formulardaten ***/
function addNewEvent() {
  /*
   * Kontrolliert die eingegebenen Formulardaten und ruft
   * weitere Funktionen zur Erstellung eines Events auf
   */
  var name = document.forms["input"]["name"].value;
  var date = document.forms["input"]["date"].value;
  var text = document.forms["input"]["text"].value;

  function validateInput(name, date) {

    if (name == "") {
      console.warn("name missing");
      return false;
    }

    if (date == "") {
      console.warn("date missing");
      return false;
    }

    return true;
  }

  if (!(validateInput(name, date))) {
    console.error("could not process data");
    return;
  }

  console.log(name, new Date(date), text);
}


/*** Variablen ***/
//*********************************************************/
var userdata; //Daten des Users


var key = "e11b8d8fbab8d6397852f6beae012799";

var userliste = "5db5d0845b5b370017bc1c02";

var item = {
  "name":"neues Item"
}
//*********************************************************/

/*** Ereignisse ***/
function generateEreignis(titel, kategorie, datum, bemerkung) {
  /*
   * Erstellt ein JSON Object das die Eigenschaften eines Ereignisses definiert
   *
   * @parameter {Strings}: Eigenschaften des JSON Objects
   * @return {JSON Object}: Ereignis, das der Liste hinzugefügt werden kann
   */
  var name = {
    "titel" : titel,
    "kategorie" : kategorie,
    "datum" : datum,
    "text" : text
  }

  var ereignis = {
    "name" : JSON.stringify(name),
    "bought" : false
  }

  return ereignis;
}


/*** HTTP-Anfragen ***/
function getData(id, callback) {
  /*
   * Sendet eine HTTP Anfrage an das Backend und fordert eine aktuelle Liste an
   *
   * !Asynchrone Funktion, es kann ein Callback übergeben werden
   * !Funktion hat kein Error Handling bei fehlerhaften Anfragen
   *
   * @parameter {String}: ID der Liste, die im Backend hinterlegt ist
   * @callback {Function oder Boolean}
   * @return {}: die Methode aktualisiert "userdata"
   */
  const Http = new XMLHttpRequest();
  let url = 'https://shopping-lists-api.herokuapp.com/api/v1/lists/' + id;
  Http.open("GET", url);

  Http.onreadystatechange = () => {
    if (Http.readyState == 4 && Http.status == 200) {
      userdata =JSON.parse(Http.responseText);
      if (callback) {
        callback();
      }
    }
  }

  Http.onerror = () => {
    console.error("HttpRequest fehlgeschlagen");
  }

  Http.send();
}

function addItem(id, item, callback) {
  /*
   * Sendet eine HTTP Anfrage an das Backend und fügt ein Item zu der Liste hinzu
   *
   * !Asynchrone Funktion, es kann ein Callback übergeben werden
   * !Funktion hat kein Error Handling bei fehlerhaften Anfragen
   *
   * @parameter {String}: ID der Liste, die im Backend hinterlegt ist
   * @parameter {JSON Object}: Item, das der Liste hinzugefügt werden soll
   * @callback {Function oder Boolean}
   * @return {}: die Methode aktualisiert "userdata"
   */
  const Http = new XMLHttpRequest();
  let url = 'https://shopping-lists-api.herokuapp.com/api/v1/lists/' + id + "/items";
  Http.open("POST", url, true);
  Http.setRequestHeader("Content-type", "application/json");
  var data = JSON.stringify(item);

  Http.onreadystatechange = () => {
    if (Http.readyState == 4 && Http.status == 200) {
      userdata =JSON.parse(Http.responseText);
      if (callback) {
        callback();
      }
    }
  }

  Http.onerror = () => {
    console.error("HttpRequest fehlgeschlagen");
  }

  Http.send(data);
}

function deleteItem(id, itemid, callback) {
  /*
   * Sendet eine HTTP Anfrage an das Backend und fügt ein Item zu der Liste hinzu
   *
   * !Asynchrone Funktion, es kann ein Callback übergeben werden
   * !Funktion hat kein Error Handling bei fehlerhaften Anfragen
   *
   * @parameter {String}: ID der Liste, die im Backend hinterlegt ist
   * @parameter {String}: ID des Items, das aus der Liste gelöscht werden soll
   * @callback {Function oder Boolean}
   * @return {}: die Methode aktualisiert "userdata"
   */
  const Http = new XMLHttpRequest();
  let url = 'https://shopping-lists-api.herokuapp.com/api/v1/lists/' + id + "/items/" + itemid;
  Http.open("DELETE", url);

  Http.onreadystatechange = () => {
    if (Http.readyState == 4 && Http.status == 200) {
      userdata =JSON.parse(Http.responseText);
      if (callback) {
        callback();
      }
    }
  }

  Http.onerror = () => {
    console.warn("HttpRequest fehlgeschlagen");
  }

  Http.error();
}