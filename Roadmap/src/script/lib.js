/*** Variables ***/
var rgb = [255, 0, 0]; //Array mit RGB-Werten für animierten Gradient
var indexColor = 1; //Index für den Algorithmus des animierten Gradients
var add = true; //Anweisung für den Algorithmus des animierten Gradients
var timer = 1; //Timer des animierten Gradients

var listIDs = []; //array with IDs to all lists in backend
var semesterData; //userdata of specific semester


//*********************************************************/
var key = "e11b8d8fbab8d6397852f6beae012799";
//*********************************************************/

/*** Animierter Gradient ***/
var animatedGradient; //Animierter Gradient

function startAnimatedGradient() {
  /*
   * Berechnet die Farbwerte des Gradients
   * Funktion wird durch das Interval {timer} neu aufgerufen
   *
   * -> start: startAnimatedGradient()
   * -> terminate: clearTimeout(animatedGradient)
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



/*** dropdown menues ***/
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






/*** events ***/
function generateEvent(titel, date, text, done) {
  /*
   * Erstellt ein JSON Object das die Eigenschaften eines Ereignisses definiert
   *
   * @parameter {Strings}: Eigenschaften des JSON Objects
   * @return {JSON Object}: Ereignis, das der Liste hinzugefügt werden kann
   */
  var name = {
    "titel" : titel,
    "date" : date,
    "text" : text
  }

  var event = {
    "name" : JSON.stringify(name),
    "bought" : false 
  }

  if (done) {
    event["bought"] = true; 
  }

  return event;
}

function sortItems(items) {
  var eventList = [];
  
  items["items"].forEach(item => {
    let details = JSON.parse(item["name"]);
    let newItem = {
      "name" : details["titel"],
      "date" : details["date"],
      "text" : details["text"],
      "done" : item["bought"],
      "id" : item["_id"]
    };
    eventList.push(newItem);
  });

  eventList.sort(function(a, b) {
    let dateA = Date(a["date"]);
    let dateB = Date(b["date"]);
    return new Date(a["date"]).getTime() - new Date(b["date"]).getTime();
  });
  
  return eventList;
}

/*** HTTP-requests ***/
function getData(id, callback) {
  /*
   * Sendet eine HTTP Anfrage an das Backend und fordert eine Liste an
   *
   * !Asynchrone Funktion, es kann ein Callback übergeben werden
   * !Funktion hat kein Error Handling bei fehlerhaften Anfragen
   *
   * @parameter {String}: ID der Liste, die im Backend hinterlegt ist
   * @callback {Function oder Boolean}
   * @return {}: die Methode aktualisiert "semesterData"
   */
  var request = new XMLHttpRequest();
  let url = 'https://shopping-lists-api.herokuapp.com/api/v1/lists/' + id;
  request.open("GET", url);

  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      let answer = JSON.parse(request.responseText);
      semesterData = sortItems(answer);
      if (callback) {
        callback();
      }
    }
  }

  request.onerror = () => {
    console.warn("HTTP request failed");
  }

  request.send();
}

function addItemToList(id, item, callback) {
  /*
   * sends HTTP request to backend and adds an item to the list
   *
   * !asynchronous function, callbacks may be passed
   *
   * @parameter {String}: ID of List
   * @parameter {JSON Object}: Item, which is to be added
   * @callback {function or false}
   * @return {}: the function updates "semesterData"
   */
  var request = new XMLHttpRequest();
  let url = 'https://shopping-lists-api.herokuapp.com/api/v1/lists/' + id + "/items";
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json");
  var data = JSON.stringify(item);

  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      let answer = JSON.parse(request.responseText);
      semesterData = sortItems(answer);
      if (callback) {
        callback();
      }
    }
  }

  request.onerror = () => {
    console.error("HTTP Request fehlgeschlagen");
  }

  request.send(data);
}

function updateItemInList(id, item, itemId, callback) {
  /*
   * sends HTTP request to backend and adds an item to the list
   *
   * !asynchronous function, callbacks may be passed
   *
   * @parameter {String}: ID of List
   * @parameter {JSON Object}: Item, which is to be added
   * @callback {function or false}
   * @return {}: the function updates "semesterData"
   */
  var request = new XMLHttpRequest();
  let url = 'https://shopping-lists-api.herokuapp.com/api/v1/lists/' + id + "/items/" + itemId;
  request.open("PUT", url, true);
  request.setRequestHeader("Content-type", "application/json");
  var data = JSON.stringify(item);

  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      let answer = JSON.parse(request.responseText);
      semesterData = sortItems(answer);
      if (callback) {
        callback();
      }
    }
  }

  request.onerror = () => {
    console.error("HTTP Request fehlgeschlagen");
  }

  request.send(data);
}

function deleteItemFromList(id, itemid, callback) {
  /*
   * sends HTTP request to backend and delets a listitem
   *
   * !asynchronous function, callbacks may be passed
   *
   * @parameter {String}: ID of list
   * @parameter {String}: ID of item, which is to be deleted
   * @callback {function or false}
   * @return {}: function updates "semesterData"
   */
  var request = new XMLHttpRequest();
  let url = 'https://shopping-lists-api.herokuapp.com/api/v1/lists/' + id + "/items/" + itemid;
  request.open("DELETE", url);

  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      let answer = JSON.parse(request.responseText);
      semesterData = sortItems(answer);
      if (callback) {
        callback();
      }
    }
  }

  request.onerror = () => {
    console.warn("HTTP request failed");
  }

  request.send();
}

function getAllLists(callback) {
  /*
   * sends HTTP request to backend and gets all list information available
   *
   * !asynchronous function, callbacks may be passed
   *
   * @callback {function or false}
   * @return {}: function updates "listIDs"
   */
  var request = new XMLHttpRequest();
  let url = 'https://shopping-lists-api.herokuapp.com/api/v1/lists/';
  request.open("GET", url);
  request.setRequestHeader("Authorization", key);

  let sortSemester = (lists) => {
    /*
     * creats an array containing listIDs in ascending order
     *
     * @parameter {array}: lists with name and ID in JSON format
     * @return {array}: listIDs
     */
    var sortedListIDs = [];
  
    lists.forEach(list => {
      let x = list["name"].charAt(list["name"].length-1);
      sortedListIDs[x] = list["_id"];
    });
  
    return sortedListIDs; 
  };

  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      var answer = JSON.parse(request.responseText);
      listIDs = sortSemester(answer);
      if (callback) {
        callback();
      }
    }
  }

  request.onerror = () => {
    console.warn("HTTP request failed");
  }

  request.send();
}