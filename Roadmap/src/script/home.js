window.onload = () => {
     /*
      * update listIDs
      */
    getAllLists(printLists);
  }
  
  function printLists() {
      var index = 0; 
      var planets = ["../src/images/planet1.png", "../src/images/planet2.png", "../src/images/planet3.png", "../src/images/planet4.png", "../src/images/planet5.png", "../src/images/planet6.png"];
      var odd = document.getElementById("odd");
      var even = document.getElementById("even");
      odd.innerHTML = "";
      even.innerHTML = "";
      for (let i = 1; i < listIDs.length; i++) {
            var number;
            if (i < 10) {
                number = "0" + i;
            }
          if (i % 2) { //odd number
              var td = document.createElement("td");
              td.innerHTML = '<img id="semester' + number + '" class="planets interactiveElement" src="' + planets[index++] + '" onclick="openRoadmap(id)" onmouseover ="changesemestertext(id)" onmouseout = "changetextback()" alt="planet1">';
              odd.appendChild(td);
              even.appendChild(document.createElement("td"));
          } else { //even number
              var td = document.createElement("td");
              td.innerHTML = '<img id="semester' + i + '" class="planetsRing interactiveElement" src="' + planets[index++] + '" onclick="openRoadmap(id)" onmouseover ="changesemestertext(id)" onmouseout = "changetextback()" alt="planet1">';
              even.appendChild(td);
              odd.appendChild(document.createElement("td"));
          }
      
          if (index == 6) {
              index = 0;
          }
      }
      
      if (listIDs.length % 2) { //odd number
          var td = document.createElement("td");
          td.innerHTML = '<img id="semesterAdd" class="planets interactiveElement" src="../src/images/planetAdd.png" onclick="addSemester()" onmouseover ="changesemestertext(id)" onmouseout = "changetextback()" alt="Add Planet">';
          odd.appendChild(td);
          even.appendChild(document.createElement("td"));
      } else { //even number
          var td = document.createElement("td");
          td.innerHTML = '<img id="semesterAdd" class="planets interactiveElement" src="../src/images/planetAdd.png" onclick="addSemester()" onmouseover ="changesemestertext(id)" onmouseout = "changetextback()" alt="Add Planet">';
          even.appendChild(td);
          odd.appendChild(document.createElement("td"));
      }
  }
  
  function addSemester() {
      var number;
      if (listIDs.length < 10) {
          number = "0" + listIDs.length;
      } else {
          number = listIDs.length
      }
      let name = "Semester" + number;
      createNewList(name, printLists);
  }
  
  function openRoadmap(id) {
    /* 
     * open roadmap suppage and adds the SemesterID and ListID as parameters in URL
     *
     * @parameter {String}: ID of Semester
     * @return {}
     */
    var index;
    var a = id.charAt(id.length-2);
    var b = id.charAt(id.length-1);
    if (a == 0) {
        index = b;
    } else {
        index = a + b;
    }
    window.open("roadmap.html?semester=" + id + "&listid=" + listIDs[index],"_self");
  }
  
  function changesemestertext(id) {
      document.getElementById("speechbubble").innerHTML = "Semester " + id.charAt(id.length-2) + id.charAt(id.length-1);
  }
  
  function changetextback() {
      document.getElementById("speechbubble").innerHTML = "Wähle ein Semester aus!"
  }
  
  /*
  var opacity = 0;
  var intervalId = 0;
  
  function fadeOut() {
      intervalId=setInterval(hide,20);
  }
  
  function fadeIn() {
      intervalId=setInterval(show,20);
  }
  
  function showSb() {
      var img = document.getElementById("speechbubble");
      opacity = Number(window.getComputedStyle(img).getPropertyValue("opacity"));
  
      if(opacity<1){
          opacity=opacity+0.1;
          img.style.opacity=opacity;
      } else {
          clearInterval(intervalId);
      }
  }
  
  function hideSb() {
      var img = document.getElementById("speechbubble");
      opacity = Number(window.getComputedStyle(img).getPropertyValue("opacity"));
      if(opacity>0){
          opacity=opacity-0.1;
          img.style.opacity=opacity;
      } else {
          clearInterval(intervalId);
      }
  }
  */
  
  //Auto-play von spaceaudio nach einer Sekunde
  var myVar = setInterval(myTimer, 1000);
  function myTimer() {
      document.getElementById("playAudio").play();
  }
  
  window.setInterval(function() {
      var textArray = ["Mein Name ist Alley!", "Wähle ein Semester aus!", "Halloooo! Na, du?", "Jetzt drück endlich was...", "Nur noch ... Tage bis zu dein Studium zu Ende ist!"];
      var randomIndex = Math.floor(Math.random() * textArray.length);
      var randomElement = textArray[randomIndex];
      document.getElementById("speechbubble").innerHTML = randomElement;
  }, 8000);
  
  function audioPlaying() {
      var myAudio = document.getElementById('playAudio');
      
      if (myAudio.duration > 0 && !myAudio.paused) {
          clearInterval(myVar);
          document.getElementById("playAudio").pause();
      } else {
          document.getElementById("playAudio").play();
      }
  }
  