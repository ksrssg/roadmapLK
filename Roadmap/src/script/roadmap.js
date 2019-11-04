/*** VARIABLES ***/
var semesterListID;
var activeItem;

window.onload = () => {
  /*
   * display data according to semester number
   */
  var id = new URLSearchParams(window.location.search).get("semester");
  semesterListID = new URLSearchParams(window.location.search).get("listid");
  var semesterNumber;
  var a = id.charAt(id.length-2);
  var b = id.charAt(id.length-1);
  if (a == 0) {
    semesterNumber = b;
  } else {
    semesterNumber = a + b;
  }
  document.getElementById("headline").innerHTML = "Semester <span>" + semesterNumber + "</span>";
  getData(semesterListID, printList);
}

function printList() {
  var htmlList = document.getElementById("roadmap");
  htmlList.innerHTML = "";
  
  for (let i = 0; i < semesterData.length; i++) {
    var entry = document.createElement("li");
    entry.id = semesterData[i]["id"];
    entry.innerHTML = '<span class="eventHeader">' + semesterData[i]["date"] + ': ' + semesterData[i]["name"] + ' </span><span class="editArea">[<span class="interactive" onclick="edit(this.closest(' + "'li')" + '.id)">EDIT</span>]</span><br><span class="eventText">' + semesterData[i]["text"] + '</span>';
    if (semesterData[i]["done"]) {
      entry.className = "done";
    }
    htmlList.appendChild(entry);
  }

}

function cancel() {
  document.getElementById("addButton").style.display = "block";
  document.getElementById("interface").style.display = "none";
}



function edit(id) {
    for(var i = 0; i < semesterData.length; i++) {
    if(semesterData[i]["id"] == id) {
      activeItem = semesterData[i];
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
   * verifies input data and calls functions to add a change an existing event
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

  var item = generateEvent(activeItem["name"], activeItem["date"], activeItem["text"], true);
  updateItemInList(semesterListID, item, activeItem["id"], printList);

  document.getElementById(activeItem["id"]).className += "done";

  document.getElementById("addButton").style.display = "block";
  document.getElementById("interface").style.display = "none";
}

function deleteEvent() {
  deleteItemFromList(semesterListID, activeItem["id"], false);
  document.getElementById(activeItem["id"]).remove();
  document.getElementById("addButton").style.display = "block";
  document.getElementById("interface").style.display = "none";
}

function addEvent() {
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
   */
  var name = document.forms["addEvent"]["name"].value;
  var date = document.forms["addEvent"]["date"].value;
  var text = document.forms["addEvent"]["text"].value;

  if (!(validateInput(name, date))) {
    console.error("could not process data");
    return; //leave function if input is not valid
  }

  console.log(name, new Date(date), text);

  var item = (generateEvent(name, date, text, false));
  addItemToList(semesterListID, item, printList);

  document.getElementById("addButton").style.display = "block";
  document.getElementById("interface").style.display = "none";
}

function validateInput(name, date) {
  /*
   * verifies input datas 
   *
   * @parameter {String}: name input of form
   * @parameter {String}: date input of form
   * @return {Boolean}: input valid
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

