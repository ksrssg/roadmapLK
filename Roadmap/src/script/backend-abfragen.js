var userdata;
var userliste = "5d9475ff18b9d60017f1de61";



//*******************************************************

var item = {
  "name":"neues Item",
  "bought":true //true = erledigt
}




function generateEreignis(titel, kategorie, datum, bemerkung) {
  /*
   * Erstellt ein JSON Object das die Eigenschaften eines Ereignisses definiert
   *
   * @parameter {Strings}: Eigenschaften des JSON Objects
   * @return {JSON Object}: Ereignis, das der Liste hinzugefügt werden kann
   */
  var name = {
    "titel" : titel,
    "kategorie" : kategorie,
    "datum" : datum,
    "bemerkung" : bemerkung
  }

  var ereignis = {
    "name" : JSON.stringify(name),
    "bought" : false
  }

  return ereignis;
}

var ereignis1 = generateEreignis("Ereignis1", "Keine", "Heute", "lelele");
console.log(ereignis1);


var inhalt = JSON.parse(ereignis1[name]);
console.log(inhalt[titel]);


/****AUFGABE*****/

var a = [1,2,3,11,12,4,1,14,16];

a.forEach((i) => {
  if (i >= 10) {
    console.log(i);
  }
});





//**********************************



document.cookie = "username=<>; password=<>;";


/* ////Errorhandling ***********************************

Http.onreadystatechange = () => {
  if (Http.readyState == 4 && Http.status == 200) {
    userdata =JSON.parse(Http.responseText);
    if (callback) {
      callback();
    }
  }
}

Http.onreadystatechange = () => {
  if (Http.readyState == 4) { //Abgeschlossen
    if (Http.status == 200) { //Erfolgreich
      userdata = JSON.parse(Http.responseText);
      if (callback) {
        callback();
      }
    } else {
      console.error("Http Anfrage konnte nicht bearbeitet werden");
    }
  }
}

*/





getUserdata(userliste, false);
//addItem(userliste, item);
//console.log(userdata["items"][0]["name"]);




//************** Fertige Funktionen*****************//


function getUserdata(id, callback) {
  /*
   * Sendet eine HTTP Anfrage an das Backend und fordert eine aktuelle Liste an
   *
   * !Asynchrone Funktion, es kann ein Callback übergeben werden
   * !Funktion hat kein Error Handling
   *
   * @parameter {String}: ID der Liste, die im Backend hinterlegt ist
   * @callback {Function oder Boolean}
   * @return {}: die Methode aktualisiert "userdata"
   */
  const Http = new XMLHttpRequest();
  let url = 'https://shopping-lists-api.herokuapp.com/api/v1/lists/' + id;
  Http.open("GET", url);

  Http.onreadystatechange = () => {
    if (Http.readyState == 4 && Http.status == 200) {
      userdata =JSON.parse(Http.responseText);
      if (callback) {
        callback();
      }
    }
  }

  Http.send();
}


function addItem(id, item, callback) {
  /*
   * Sendet eine HTTP Anfrage an das Backend und fügt ein Item zu der Liste hinzu
   *
   * !Asynchrone Funktion, es kann ein Callback übergeben werden
   * !Funktion hat kein Error Handling
   *
   * @parameter {String}: ID der Liste, die im Backend hinterlegt ist
   * @parameter {JSON Object}: Item, das der Liste hinzugefügt werden soll
   * @callback {Function oder Boolean}
   * @return {}: die Methode aktualisiert "userdata"
   */
  const Http = new XMLHttpRequest();
  let url = 'https://shopping-lists-api.herokuapp.com/api/v1/lists/' + id + "/items";
  Http.open("POST", url, true);
  Http.setRequestHeader("Content-type", "application/json");
  var data = JSON.stringify(item);

  Http.onreadystatechange = () => {
    if (Http.readyState == 4 && Http.status == 200) {
      userdata =JSON.parse(Http.responseText);
      if (callback) {
        callback();
      }
    }
  }

  Http.send(data);
}


function deleteItem(id, itemid, callback) {
  /*
   * Sendet eine HTTP Anfrage an das Backend und fügt ein Item zu der Liste hinzu
   *
   * !Asynchrone Funktion, es kann ein Callback übergeben werden
   * !Funktion hat kein Error Handling
   *
   * @parameter {String}: ID der Liste, die im Backend hinterlegt ist
   * @parameter {String}: ID des Items, das aus der Liste gelöscht werden soll
   * @callback {Function oder Boolean}
   * @return {}: die Methode aktualisiert "userdata"
   */
  const Http = new XMLHttpRequest();
  let url = 'https://shopping-lists-api.herokuapp.com/api/v1/lists/' + id + "/items/" + itemid;
  Http.open("DELETE", url);

  Http.onreadystatechange = () => {
    if (Http.readyState == 4 && Http.status == 200) {
      userdata =JSON.parse(Http.responseText);
      if (callback) {
        callback();
      }
    }
  }

  Http.send();
}
