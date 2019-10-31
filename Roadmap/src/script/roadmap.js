window.onload = () => {
  var id = new URLSearchParams(window.location.search).get("id");
  var semesterNumber = id.charAt(id.length-1);
  document.getElementById("headline").innerHTML = "Semester <span>" + semesterNumber + "</span>";
}
