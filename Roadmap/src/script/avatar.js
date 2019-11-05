/*** VARIABLES ***/
var index = 0;

/*** ONLOAD ***/
window.onload = () => {
    /*
     * basic setup
     */
    getKey();
    getAllLists(false);
}

/*** USER INTERACTIVITY ***/
function switchforeward() {
    /*
     * show next avatar
     *
     * @return {}
     */
    if (index <= alienArray.length-1) {
        var element = document.getElementById('alien');
        element.src = alienArray[++index];
    }
    
    if (index == alienArray.length) {
        index = 0;
        var element = document.getElementById('alien');
        element.src = alienArray[index];
    }
}

function switchback() {
    /*
     * show previous avatar
     *
     * @return {}
     */
    if (index >= 0) {
        var element = document.getElementById('alien');
        element.src = alienArray[--index];
    }
    
    if (index == -1) {
        index = alienArray.length-1;
        var element = document.getElementById('alien');
        element.src = alienArray[index];
    }
}

function safe() {
    /*
     * safe current avatar selection
     *
     * @return {}
     */
    safeColorway(index, false);
}