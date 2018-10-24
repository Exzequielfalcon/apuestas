"use strict";
document.addEventListener("DOMContentLoaded", Home);
let bhome = document.querySelector(".home").addEventListener("click", Home);
let bnosotros = document.querySelector(".nosotros").addEventListener("click", nosotros);
let bcontactenos = document.querySelector(".contactenos").addEventListener("click", contactenos);
let baseURL = 'https://web-unicen.herokuapp.com/api/groups/';
let groupID = 'truequelibre';
let collectionID = 'contacto';
let ids=[];
var MAXf;

function Home(event) {
    event.preventDefault();
    console.log("Loading...")
    document.querySelector(".bodycon").innerHTML = "<p>Loading...</p>"
    fetch("home.html").then(function(response) {
        console.log("ok");
        console.log(response);
        response.text().then(t => document.querySelector(".bodycon").innerHTML = t)
    });
}

function nosotros(event) {
    event.preventDefault();
    console.log("Loading...")
    document.querySelector(".bodycon").innerHTML = "<p>Loading...</p>"
    fetch("nosotros.html").then(function(response) {
        console.log("ok");
        console.log(response);
        response.text().then(t => document.querySelector(".bodycon").innerHTML = t)
    });
}

function contactenos(event) {
    console.log("Loading...")
    document.querySelector(".bodycon").innerHTML = "<p>Loading...</p>"
    fetch("contactenos.html").then(function(response) {
        console.log("ok");
        console.log(response);
        response.text().then(t => document.querySelector(".bodycon").innerHTML = t)
    });
    getInformationByGroup();
    setTimeout(addButtons,2000);
}

function addButtons(){
  let button = document.querySelector(".sendbutton");
  if (button) {
      button.addEventListener('click', sendData);
  }
  let cellbutton = document.querySelector(".deletebutton");
  if (cellbutton) {
      cellbutton.addEventListener('click', deleteData);
  }
  let send = document.querySelector(".addbutton")
  if (send) {
      send.addEventListener('click', sendDatax3);
  }
  let editbut = document.querySelector(".editbutton")
  if (editbut) {
    editbut.addEventListener('click',EditData)
  }
}

function sendData() {
    let name = document.querySelector(".firstname").value;
    let lastname = document.querySelector(".lastname").value;
    let email = document.querySelector(".email").value;
    let data = {
        "thing": {
            "nombre": name,
            "apellido": lastname,
            "email": email
        }
    };
    fetch(baseURL + groupID + "/" + collectionID, {
            "method": "POST",
            "mode": 'cors',
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        }).then(function(r) {
            if (!r.ok) {
                console.log("error")
            }
            return r.json()
        })
        .catch(function(e) {
            console.log(e)
        })
        setTimeout(contactenos,1000);
}

function sendDatax3() {
  sendData();
  sendData();
  sendData();
}



function deleteById(id) {
    fetch(baseURL + groupID + "/" + collectionID + "/" + id, {
            "method": "DELETE"
        }).then(function(r) {
            if (!r.ok) {
                console.log("error")
            }
            return r.json()
        })
        .catch(function(e) {
            console.log(e)
        })
}

function deleteData(){
  let aux=MAXf;
  let table = document.getElementById("contact");
  console.log(MAXf);
  for (let i = MAXf-1; i >= 0; i--) {
    console.log(i);
      if (document.getElementById(i).checked){
          console.log("entro");
          deleteById(ids[i]);
          aux--;
        }
    }
    MAXf=aux;
    setTimeout(contactenos,1000);
}




function addCell(nombre,apellido,email, i) {
      let table = document.getElementById("contact");
      let row = table.insertRow(i);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      cell1.innerHTML = nombre;
      cell2.innerHTML = apellido;
      cell3.innerHTML = email;
      cell4.innerHTML = "<td><input type=checkbox id='"+i+"' value='"+ids+"'></td>";
}



function getInformationByGroup() {

    fetch(baseURL + groupID + "/" + collectionID, {
            method: "GET",
            mode: "cors"
        })
        .then(function(response) {
            if (!response.ok) {
                console.log("Error: " + response.status);
            } else {
                return response.json();
            }
        }).then(function(resultData) {
          let nombres=[];
          let apellidos=[];
          let emails=[];
          for (let i = 0; i < resultData[collectionID].length; i++) {

            nombres[i] = resultData[collectionID][i]['thing']["nombre"];
            apellidos[i] = resultData[collectionID][i]['thing']["apellido"];
            emails[i] = resultData[collectionID][i]['thing']["email"];
            ids[i]= resultData[collectionID][i]["_id"];

            MAXf= resultData[collectionID].length;
          }
          for (let i = 0; i < resultData[collectionID].length; i++){
            addCell(nombres[i], apellidos[i], emails[i], i);
          }

        })

        .catch(function(e) {
            console.log(e);
        })
}

function EditData(){
  console.log("asd");
  let name = document.querySelector(".firstname").value;
  let lastname = document.querySelector(".lastname").value;
  let email = document.querySelector(".email").value;
  let data = {
      "thing": {
          "nombre": name,
          "apellido": lastname,
          "email": email
      }
  };

  for (let i = MAXf-1; i >= 0; i--) {
    console.log(i);
      if (document.getElementById(i).checked){
          editById(ids[i], data);
        }
    }
    setTimeout(contactenos,1000);


}

function editById(id, data){
  fetch(baseURL + groupID + "/" + collectionID + "/" + id, {
    "method": "PUT",
    "mode": 'cors',
    "headers": { "Content-Type": "application/json" },
    "body": JSON.stringify(data)
  }).then(function(r){
    if(!r.ok){
      console.log("Error")
    }
    return r.json()
  })
  .then(function(json) {
  })
  .catch(function(e){
    console.log(e)
  })
}

function getMAXf() {

    fetch(baseURL + groupID + "/" + collectionID, {
            method: "GET",
            mode: "cors"
        })
        .then(function(response) {
            if (!response.ok) {
                console.log("Error: " + response.status);
            } else {
                return response.json();
            }
        }).then(function(resultData) {
            MAXf= resultData[collectionID].length;
        })

        .catch(function(e) {
            console.log(e);
        })
        return MAXf;
}
