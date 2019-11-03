function openRoadmap(id) {
        /* 
         * open roadmap suppage and adds the SemesterID and ListID as parameters in URL
         *
         * @parameter {String}: ID of Semester
         * @return {}
         */
        //window.open("roadmap.html?semester=" + id + "&listid=" + listIDs[id.charAt(id.length-1)]);
        window.open("roadmap.html?id=" + id);
    } 

    window.onload = () => {
            /*
             * update listIDs
             */
            getAllLists(false);
        } 

      
    function changesemestertext(id) {

        document.getElementById("speechbubble").innerHTML = "Semester " + id.charAt(id.length-1);
    }

    function changetextback() {
        document.getElementById("speechbubble").innerHTML = "Wähle ein Semester aus!"
    }

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
    }
    else{
        clearInterval(intervalId);
    }
}

   function hideSb() {
       var img = document.getElementById("speechbubble");
       opacity = Number(window.getComputedStyle(img).getPropertyValue("opacity"));
       if(opacity>0){
           opacity=opacity-0.1;
           img.style.opacity=opacity;
       }
       else{
           clearInterval(intervalId);
       }
   }


 //Auto-play von spaceaudio nach einer Sekunde 
 /*window.setInterval(function() {
    var myaudio = document.getElementById("playAudio").play();
  }, 1000);
    */
  window.setInterval(function() {

  
  var textArray = ["Mein Name ist Ali!", "Wähle ein Semester aus!", "Halloooo! Na, du?", "Jetzt drück endlich was...", "Nur noch ... Tage bis zu dein Studium zu Ende ist!"];
  var randomIndex = Math.floor(Math.random() * textArray.length); 
  var randomElement = textArray[randomIndex];
  document.getElementById("speechbubble").innerHTML = randomElement;
  }, 5000);