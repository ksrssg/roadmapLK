/*** Variablen ***/
var userdata; //Daten des Users


var key = "e11b8d8fbab8d6397852f6beae012799";

var userliste = "5db5d0845b5b370017bc1c02";

var item = {
  "name":"neues Item"
}


/*** Ereignisse ***/
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
    "text" : text
  }

  var ereignis = {
    "name" : JSON.stringify(name),
    "bought" : false
  }

  return ereignis;
}


/*** HTTP-Anfragen ***/
function getData(id, callback) {
  /*
   * Sendet eine HTTP Anfrage an das Backend und fordert eine aktuelle Liste an
   *
   * !Asynchrone Funktion, es kann ein Callback übergeben werden
   * !Funktion hat kein Error Handling bei fehlerhaften Anfragen
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

  Http.onerror = () => {
    console.error("HttpRequest fehlgeschlagen");
  }

  Http.send();
}

function addItem(id, item, callback) {
  /*
   * Sendet eine HTTP Anfrage an das Backend und fügt ein Item zu der Liste hinzu
   *
   * !Asynchrone Funktion, es kann ein Callback übergeben werden
   * !Funktion hat kein Error Handling bei fehlerhaften Anfragen
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

  Http.onerror = () => {
    console.error("HttpRequest fehlgeschlagen");
  }

  Http.send(data);
}

function deleteItem(id, itemid, callback) {
  /*
   * Sendet eine HTTP Anfrage an das Backend und fügt ein Item zu der Liste hinzu
   *
   * !Asynchrone Funktion, es kann ein Callback übergeben werden
   * !Funktion hat kein Error Handling bei fehlerhaften Anfragen
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

  Http.onerror = () => {
    console.warn("HttpRequest fehlgeschlagen");
  }

  Http.error();
}