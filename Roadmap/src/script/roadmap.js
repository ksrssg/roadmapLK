﻿﻿/*** VARIABLES ***/
var semesterListID; //ID of current list
var activeItem; //Item, which is edited


/*** ONLOAD ***/
window.onload = () => {
  /*
   * display data according to semester number
   */
  getKey();
  getAllLists(false);

  var id = new URLSearchParams(window.location.search).get("semester");
  semesterListID = new URLSearchParams(window.location.search).get("listid");
  var lastSemester = new URLSearchParams(window.location.search).get("last");
  
  document.getElementById("headline").innerHTML = "Semester <span>" + getNumber(id) + "</span>";
  getData(semesterListID, printList);
  
  if (lastSemester == "true") {
    document.getElementById("removeButton").style.display = "block";
  } else {
    document.getElementById("removeButton").style.display = "none";
  }
}


/*** USER INTERACTIVITY ***/
function cancel() {
  /*
   * cancel editing
   *
   * @return {}
   */
  document.getElementById("addButton").style.display = "block";
  document.getElementById("interface").style.display = "none";
}

function edit(id) {
  /*
   * opens edit-window
   *
   * @parameter {string}: id of event, which is to be edited
   * @return {}
   */
  for(var i = 0; i < semesterData.length; i++) {
    if (semesterData[i]["id"] == id) {
      activeItem = semesterData[i];
      break; //leave loop if item is found
    }
  }

  document.getElementById("addButton").style.display = "none";
  document.getElementById("interface").style.display = "block";
  document.getElementById("addEvent").style.display = "none";
  document.getElementById("editEvent").style.display = "block";
  document.forms["editEvent"]["name"].value = activeItem["name"];
  document.forms["editEvent"]["date"].value = activeItem["date"];
  document.forms["editEvent"]["text"].value = activeItem["text"];

  if (activeItem["done"]) {
    document.forms["editEvent"]["doneButton"].style.display = "none";
  } else {
    document.forms["editEvent"]["doneButton"].style.display = "block";
  }
}

function safeChanges() {
  /*
   * verifies input data and calls functions to add changes to an existing event
   *
   * @return {}
   */
  var name = document.forms["editEvent"]["name"].value;
  var date = document.forms["editEvent"]["date"].value;
  var text = document.forms["editEvent"]["text"].value;

  if (!(validateInput(name, date))) {
    console.error("could not process data");
    return; //leave function if input is not valid
  }

  var item = (generateEvent(name, date, text, activeItem["done"]));
  updateItemInList(semesterListID, item, activeItem["id"], printList);

  document.getElementById("addButton").style.display = "block";
  document.getElementById("interface").style.display = "none";
}

function markAsDone() {
  /*
   * marks an event as done
   *
   * @return {}
   */
  var item = generateEvent(activeItem["name"], activeItem["date"], activeItem["text"], true);
  updateItemInList(semesterListID, item, activeItem["id"], printList);

  document.getElementById(activeItem["id"]).className += "done";
  document.getElementById("addButton").style.display = "block";
  document.getElementById("interface").style.display = "none";
}

function deleteEvent() {
  /*
   * deletes an existing event
   *
   * @return {}
   */
   function hide() {
     if (semesterData == 0) {
       document.getElementById("roadmap").style.visibility = "hidden";
       document.getElementById("speechbubble").style.visibility = "visible";
        document.getElementById("alien").style.visibility = "visible";
     }
   }

  deleteItemFromList(semesterListID, activeItem["id"], hide);
  document.getElementById(activeItem["id"]).remove();
  document.getElementById("addButton").style.display = "block";
  document.getElementById("interface").style.display = "none";
}

function addEvent() {
  /*
   * adds a new event
   *
   * @return {}
   */
  document.getElementById("addButton").style.display = "none";
  document.getElementById("interface").style.display = "block";
  document.getElementById("addEvent").style.display = "block";
  document.getElementById("editEvent").style.display = "none";
  document.forms["addEvent"]["name"].value = "";
  document.forms["addEvent"]["date"].value = "";
  document.forms["addEvent"]["text"].value = "";
}

function addNewEvent() {
  /*
   * verifies input data and calls functions to add a new event to the page
   *
   * @return {}
   */
  var name = document.forms["addEvent"]["name"].value;
  var date = document.forms["addEvent"]["date"].value;
  var text = document.forms["addEvent"]["text"].value

  document.getElementById("roadmap").style.visibility = "visible";

  if (!(validateInput(name, date))) {
    console.error("could not process data");
    return; //leave function if input is not valid
  }

  var item = (generateEvent(name, date, text, false));
  addItemToList(semesterListID, item, printList);

  document.getElementById("addButton").style.display = "block";
  document.getElementById("interface").style.display = "none";
  document.getElementById("speechbubble").style.visibility = "hidden";
  document.getElementById("alien").style.visibility = "hidden";
}

function removeSemester() {
  if (confirm("Möchtest du dieses Semester wirklich löschen?")) {
    deleteList(semesterListID, goToHome);
  }
}


/*** SUPPORTIVE FUNCTIONS ***/
function printList() {
  /*
   * adds events on document
   */
  var htmlList = document.getElementById("roadmap");
  htmlList.innerHTML = ""; //refresh list

  function formatDate(date) {
    /*
     * converts js date objects to strings with proper date format
     *
     * @parameter {string}: date object or string, which can be parsed by calling new Date()
     * @return {string}: date in european format (dd.mm.yyyy)
     */
    var date = new Date(date);

    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    if (dd < 10){
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    date = dd + '.' + mm + '.' + yyyy;
    return(date);
  }

  if (semesterData.length == 0) {
    document.getElementById("roadmap").style.visibility = "hidden";
    document.getElementById("speechbubble").style.visibility = "visible";
    document.getElementById("alien").style.visibility = "visible";
  } else {
    for (let i = 0; i < semesterData.length; i++) {
      document.getElementById("speechbubble").style.visibility = "hidden";
      document.getElementById("alien").style.visibility = "hidden";

      var entry = document.createElement("li");
      entry.id = semesterData[i]["id"];
      var date = formatDate(semesterData[i]["date"]);
      entry.innerHTML = '<span class="eventHeader">' + date + ': ' + semesterData[i]["name"] + ' </span><span class="editArea">[<span class="interactive" onclick="edit(this.closest(' + "'li')" + '.id)">EDIT</span>]</span><br><span class="eventText">' + semesterData[i]["text"] + '</span>';

      if (semesterData[i]["done"]) {
        entry.className = "done";
      }

      htmlList.appendChild(entry);
    }
  }

}

function validateInput(name, date) {
  /*
   * verifies input datas
   *
   * @parameter {String}: name input of form
   * @parameter {String}: date input of form
   * @return {Boolean}: input validity
   */

  if (name == "") {
    console.warn("name is missing");
    return false;
  }

  if (date == "") {
    console.warn("date is missing");
    return false;
  }

  return true;
}
