/*** VARIABLES ***/
var index = 0;

/*** ONLOAD ***/
window.onload = () => {
    /*
     * get API Key
     */
    getKey();
    getAllLists(false);

}

/*** USER INTERACTIVITY ***/
function switchforeward() {

    if(index <= alienArray.length-1) {
    var element = document.getElementById('alien');
    element.src = alienArray[++index];
}

if(index == alienArray.length) {
    index = 0;
    var element = document.getElementById('alien');
    element.src = alienArray[index];
}
}

function switchback() {

    if(index >=0) {

    var element = document.getElementById('alien');
    element.src = alienArray[--index];
}

if(index == -1) {
    index = alienArray.length-1;
    var element = document.getElementById('alien');
    element.src = alienArray[index];
}
}

function safe() {
  safeColorway(index, false);
}
