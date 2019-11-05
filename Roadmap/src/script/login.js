

function login() {
    key = document.forms["login"]["key"].value;
    validate();
}

startAnimatedGradient();

function validateAccount() {
    console.log(listIDs);

    for (let i = 0; i < listIDs.length; i++) {
        console.log(getNumber(listIDs[i]["name"]));
        
    }
    
}
