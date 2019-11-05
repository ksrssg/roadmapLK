
var alienArray = ["../src/images/alien.png", "../src/images/alien_red.png", "../src/images/alien_yellow.png", "../src/images/alien_hpe.png", "../src/images/alien_blue.png", "../src/images/alien_lila.png" ];
var index = 0; 






function login() {
    key = document.forms["login"]["key"].value;
    validate();
}



function validateAccount() {
    console.log(listIDs);

    for (let i = 0; i < listIDs.length; i++) {
        console.log(getNumber(listIDs[i]["name"]));
        
    }
    
}



















function switchforeward() {

    if(index <=5) {

    var element = document.getElementById('avatar');
    element.src = alienArray[++index];
}

if(index == 6) {
    index = 0;
    var element = document.getElementById('avatar');
    element.src = alienArray[index];
}
}

function switchback() {

    if(index >=1) {

    var element = document.getElementById('avatar');
    element.src = alienArray[--index];
}

if(index == 0) {
    index = 5;
    var element = document.getElementById('avatar');
    element.src = alienArray[index];
}
}