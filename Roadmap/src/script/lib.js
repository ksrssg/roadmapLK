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