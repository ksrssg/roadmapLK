﻿/*** VARIABLES ***/
var rgb = [255, 0, 0]; //Array mit RGB-Werten für animierten Gradient
var indexColor = 1; //Index für den Algorithmus des animierten Gradients
var add = true; //Anweisung für den Algorithmus des animierten Gradients
var timer = 1; //Timer des animierten Gradients

var listIDs = []; //array with IDs to all lists in backend
var semesterData; //userdata of specific semester


var key;





/*** ANIMATED GRADIENT ***/
var animatedGradient; //animated gradient

function startAnimatedGradient() {
  /*
   * calculates color values
   * function is getting called continually due to a {timer}
   *
   * -> start gradient: startAnimatedGradient()
   * -> terminate gradient: clearTimeout(animatedGradient)
   * 
   * @return {}
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
     * convertes rgb values to hexcode
     *
     * @parameter {array}: rgb values
     * @return {string}: hexcode, which can be placed in CSS property
     */

    function toHex(value) {
      /*
       * convertes decimal to hex with two digits
       *
       * @parameter {number}: decimal
       * @return {string}: hex
       */
      let hex = value.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    return "#" + toHex(colorValues[0]) + toHex(colorValues[1]) + toHex(colorValues[2]);
  }

  document.documentElement.style.setProperty('--AnimatedNeoncolor', rgbToHex(rgb)); //changes color in CSS file style.css

  animatedGradient = setTimeout(startAnimatedGradient, timer);
}


/*** DROPDOWN MENUE ***/
function openDropdown() {
  /*
   * shows and hides dropdown 
   *
   * @return {}
   */
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = (event) => {
  /*
   * closes dropdown menue
   *
   * @event: click on dropdown button
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


/*** EVENTS ***/
function generateEvent(titel, date, text, done) {
  /*
   * creates a JSON object, which can be stored in backend
   *
   * @parameter {strings}: properties of JSON object
   * @return {JSON Object}: result, which can be attached to list
   */
  var name = {
    "titel" : titel,
    "date" : date,
    "text" : text
  }

  var event = { //necessary formating, can be processed in backend
    "name" : JSON.stringify(name),
    "bought" : false 
  }

  if (done) {
    event["bought"] = true; 
  }

  return event;
}

function sortItems(items) {
  /*
   * sorts event items according to date
   *
   * @parameter {array}: JSON objects
   * @return {array}: events in JSON fomat in chronological order
   */
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

/*** HTTP-REQUESTS ***/
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
      var a = list["name"].charAt(list["name"].length-2);
      var b = list["name"].charAt(list["name"].length-1);
      
      if (a == 0) {
        if (b == 0) {
          sortedListIDs[0] = list["_id"];
        } else {
          sortedListIDs[b] = list["_id"];
        }
      } else {
        let x = a + b;
        sortedListIDs[x] = list["_id"];
      }
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

function createNewList(name, callback) {
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
  let url = 'https://shopping-lists-api.herokuapp.com/api/v1/lists';
  request.open("POST", url);
  request.setRequestHeader("Authorization", key);
  request.setRequestHeader("Content-type", "application/json");
  var item = { 
    "name" : name
  };
  var data = JSON.stringify(item);

  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      if (callback) {
        getAllLists(callback);
      } else {
        getAllLists(false);
      }
    }
  }

  request.onerror = () => {
    console.warn("HTTP request failed");
  }

  request.send(data);
}

function deleteList(id, callback) {
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
  request.open("DELETE", url);
  request.setRequestHeader("Authorization", key);

  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      getAllLists(false);
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







function validate() {
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

  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      var answer = JSON.parse(request.responseText);
      
      answer.forEach(list => {
        if (isNaN(getNumber(list["name"]))) {
          console.log(getNumber(list["name"]));
          alert("KEY ungültig!");
          return;
        }
      });

      if (answer.length = 1) {
        //open first page
      }

      window.open("home.html?key=" + key, "_self");

    }
  }

  request.onerror = () => {
    console.warn("HTTP request failed");
  }

  request.send();
}


function getKey() {
  if (document.title != "LogIn") {
    key = new URLSearchParams(window.location.search).get("key");
  }
}




function getNumber(string) {
  var a = string.charAt(string.length-2);
  var b = string.charAt(string.length-1);

    if (a == 0) {
        return b;
    } else {
        return a + b;
    }
}



/*** AUTOPLAY ***/
/*
 * Google prevents autoplay
 * this code snipped bypasses this restriction
 */
var myVar = setInterval(myTimer, 1000);
function myTimer() {
    document.getElementById("playAudio").play();
}

function audioPlaying() {
    var myAudio = document.getElementById('playAudio');
    
    if (myAudio.duration > 0 && !myAudio.paused) {
        clearInterval(myVar);
        document.getElementById("playAudio").pause();
    } else {
        document.getElementById("playAudio").play();
    }
}

function goToHome() {
  window.open("home.html?key=" + key, "_self");
}

function goToImpressum() {
  window.open("impressum.html?key=" + key, "_self");
}

function goToSettings() {
  window.open("avatar.html?key=" + key, "_self");
}