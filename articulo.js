//Consigo el id que me han mandado en el parametro
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let id = urlParams.get("id");
console.log(id);

//Mando la peticion al post exacto del id
const peticion = new XMLHttpRequest();
peticion.open("GET", `http://localhost:3000/posts/${id}`);
peticion.send();

peticion.addEventListener("readystatechange", function () {
  console.log("Estado de la petición: " + peticion.readyState);
  if (peticion.readyState === 4) {
    if (peticion.status === 200) {
      console.log("Datos recibidos:");
      //Parseo para trabajar con el post
      let postSelec = JSON.parse(peticion.responseText);
      let cabecera = document.querySelector("header");
      cabecera.innerText = `Artículo: ${postSelec.tittle}`;
      const peticionAutor = new XMLHttpRequest();
      //Mando una peticion a users al user que tiene el userid que tengo en mi post
      peticionAutor.open(
        "GET",
        `http://localhost:3000/users/${postSelec.authorId}`
      );
      peticionAutor.send();
      peticionAutor.addEventListener("load", function () {
        if (peticionAutor.status === 200) {
          //Parseo
          let autorId = JSON.parse(peticionAutor.responseText);
          let etiquetAutor = document.querySelector("#autor");
          etiquetAutor.innerText = `Nick del autor: ${autorId.nick}`;
        }
      });
      const peticionComment = new XMLHttpRequest();
      //Mando una peticion a comments al comment que tiene el id que tengo en mi post
      peticionComment.open(
        "GET",
        `http://localhost:3000/comments?postId=${postSelec.id}`
      );
      peticionComment.send();
      peticionComment.addEventListener("load", function () {
        if (peticionComment.status === 200) {
          //Parseo
          let commentId = JSON.parse(peticionComment.responseText);
          for (let i = 0; i < commentId.length; i++) {
            let etiquetaComment = document.querySelector("#comment");
            let item = document.createElement("li");
            let contenido = document.createTextNode(`Comentario:
              ${commentId[i].content} ${commentId[i].dateStamp}`);
            item.appendChild(contenido);
            etiquetaComment.appendChild(item);
          }
        }
      });
      const peticionDate = new XMLHttpRequest();
      //Mando una peticion a posts al posts que tiene el id que tengo en mi post
      peticionDate.open("GET", `http://localhost:3000/posts/${postSelec.id}`);
      peticionDate.send();
      peticionDate.addEventListener("load", function () {
        if (peticionDate.status === 200) {
          //Parseo
          let fecha = JSON.parse(peticionDate.responseText);
          let etiquetaDate = document.querySelector("#date");
          etiquetaDate.innerText = `Fecha: ${fecha.date}`;
        }
      });
    }
  } else {
    console.log(
      "Error " +
        peticion.status +
        " (" +
        peticion.statusText +
        ") en la petición"
    );
  }
});

const peticionAutores = new XMLHttpRequest();
peticionAutores.open("GET", `http://localhost:3000/users`);
peticionAutores.send();
//Creo, abro y mando la petición

//Añado un evento para que cuando me conteste ees cuando lo hago
peticionAutores.addEventListener("load", function () {
  if (peticionAutores.status === 200) {
    //Parseo
    let authors = JSON.parse(peticionAutores.responseText);
    let select = document.querySelector("#select");
    for (let i = 0; i < authors.length; i++) {
      let option = document.createElement("option");
      option.textContent = authors[i].name;
      option.value = authors[i].id;
      select.appendChild(option);
    }
  }
});


//Le pongo al atributo hidden del form el id del post
let inputId = document.querySelector("#idPost");
inputId.value = id;

//Le pongo al atributo hidden del form el dateStamp
let timeStamp = document.querySelector("#dateStamp");
let date = new Date();
let dias = date.getDay();
let mes = date.getMonth();
let anno = date.getFullYear();
timeStamp.value = date;
timeStamp.textContent = dias + mes + anno;

//Selecciono el elemento form
let form = document.querySelector("#formComment");
form.addEventListener("submit", (event) => {
  //Le hago el evenPreventDefault y llamo a la función que crea el comentario
  event.preventDefault();
  addComment();
});

function addComment() {
  //Declaro la petición
  const peticionAdd = new XMLHttpRequest();
  //Creo el objeto json con los campos que me mande el form
  const newPost = {
    content: document.getElementById("contentComment").value,
    authorId: document.getElementById("select").value,
    postId: document.getElementById("idPost").value,
    dateStamp: document.getElementById("dateStamp").value,
  };
  //Abro la petición al
  peticionAdd.open("POST", `http://localhost:3000/comments`);
  //Le pongo cabecera
  peticionAdd.setRequestHeader('Content-type', 'application/json');
  //Lo parseo a json el objeto 
  peticionAdd.send(JSON.stringify(newPost));
  peticionAdd.addEventListener("load", function () {
    console.log("Estado de la petición: " + peticion.readyState);
  });
}
