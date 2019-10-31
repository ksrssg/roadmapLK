window.onload = () => {
  var id = new URLSearchParams(window.location.search).get("id");
  var semesterNumber = id.charAt(id.length-1);
  document.getElementById("headline").innerHTML = "Semester <span>" + semesterNumber + "</span>";
}

function edit(id) {
  id; 
  //lelelele
}

function safeChanges() {

}

function deleteEvent() {

}

function addEvent() {
  document.getElementById("addButton").style.display = "none";
  document.getElementById("addEvent").style.display = "visable";
}