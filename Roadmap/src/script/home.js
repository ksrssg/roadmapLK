/*** VARIABLES ***/
var planets = ["../src/images/planet1.png",
                "../src/images/planet2.png",
                "../src/images/planet3.png",
                "../src/images/planet4.png",
                "../src/images/planet5.png",
                "../src/images/planet6.png"]; //source paths of planet images

var textArray = ["Mein Name ist Alley!",
                    "Wähle ein Semester aus!",
                    "Halloooo! Na, du?",
                    "Jetzt drück endlich was..."]; //random alien messages


/*** ONLOAD ***/
window.onload = () => {
    /*
     * basic setup and random alien messages
     */
    getKey();
    getAllLists(printLists);
}

window.setInterval(function() {
    var randomIndex = Math.floor(Math.random() * textArray.length);
    var randomElement = textArray[randomIndex];
    document.getElementById("speechbubble").innerHTML = randomElement;
}, 8000);


/*** USER INTERACTIVITY ***/
function addSemester() {
    /*
     * adds a new semester to profile
     *
     * @ return {}
     */
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
    var index, lastSemester;
    var a = id.charAt(id.length-2);
    var b = id.charAt(id.length-1);

    if (a == 0) {
        index = b;
    } else {
        index = a + b;
    }

    if (index == listIDs.length-1) {
      lastSemester = true;
    } else {
      lastSemester = false;
    }

    window.open("roadmap.html?semester=" + id + "&listid=" + listIDs[index] + "&key=" + key + "&last=" + lastSemester, "_self");
}


/*** SUPPORTIVE FUNCTIONS ***/
function printLists() {
    /*
     * display semester list
     *
     * @ return {}
     */
    var index = 0;
    var odd = document.getElementById("odd");
    var even = document.getElementById("even");
    odd.innerHTML = "";
    even.innerHTML = "";

    for (let i = 1; i < listIDs.length; i++) {
        var number;

        if (i < 10) {
            number = "0" + i;
        } else {
            number = i;
        }

        if (i % 2) { //odd number
            var td = document.createElement("td");
            td.innerHTML = '<img title="Semester ' + getNumber(number) + '"  id="semester' + number + '" class="planets interactiveElement" src="' + planets[index++] + '" onclick="openRoadmap(id)" onmouseover ="changesemestertext(id)" onmouseout = "changetextback()" alt="planet1">';
            odd.appendChild(td);
            even.appendChild(document.createElement("td"));
        } else { //even number
            var td = document.createElement("td");
            td.innerHTML = '<img title="Semester ' + getNumber(number) + '"  id="semester' + number + '" class="planetsRing interactiveElement" src="' + planets[index++] + '" onclick="openRoadmap(id)" onmouseover ="changesemestertext(id)" onmouseout = "changetextback()" alt="planet1">';
            even.appendChild(td);
            odd.appendChild(document.createElement("td"));
        }

        if (index == 6) {
            index = 0;
        }
    }

    var td = document.createElement("td");
    td.innerHTML = '<img title="füge ein Semester hinzu" alt="add Semester" id="semesterAdd" class="planets interactiveElement" src="../src/images/planetAdd.png" onclick="addSemester()" onmouseover ="changesemestertext(id)" onmouseout = "changetextback()" alt="Add Planet">';

    if (listIDs.length % 2) { //odd number
        odd.appendChild(td);
        even.appendChild(document.createElement("td"));
    } else { //even number
        even.appendChild(td);
        odd.appendChild(document.createElement("td"));
    }
}

function changesemestertext(id) {
    /*
     * changes text of speechbubble according to Semester Number
     *
     * @ parameter {string}: id of planet
     * @ return {}
     */
    if (getNumber(id) == "dd") {
      document.getElementById("speechbubble").innerHTML = "Semester hinzufügen";
    } else {
      document.getElementById("speechbubble").innerHTML = "Semester " + getNumber(id);
    }
}

function changetextback() {
    /*
     * changes text of speechbubble
     *
     * @ return {}
     */
    document.getElementById("speechbubble").innerHTML = "Wähle ein Semester aus!"
}
