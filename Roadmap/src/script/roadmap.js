window.onload = () => {
  var id = localStorage.getItem("semesterID");
  var semesterNumber = id.charAt(id.length-1);
  document.getElementById("headline").innerHTML = "Semester <span>" + semesterNumber + "</span>";
}
