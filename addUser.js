const formulario = document.getElementById("form");
const nombre = document.getElementById("name");
const nick = document.getElementById("nick");

nombre.addEventListener("input", function (event) {
  if (nombre.validity.tooShort) {
    nombre.setCustomValidity("Introduce nombre más largo");
  } else {
    nombre.setCustomValidity("");
  }
});

nick.addEventListener("input", function (event) {
  if (nick.validity.tooShort) {
    nick.setCustomValidity("Introduce nick más largo");
  } else {
    nick.setCustomValidity("");
  }
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const newUser = {
    name: document.getElementById("name").value,
    nick: document.getElementById("nick").value,
  };

  const peticion = new XMLHttpRequest();
  peticion.open("POST", "http://localhost:3000/users");
  peticion.setRequestHeader("Content-type", "application/json");
  peticion.send(JSON.stringify(newUser));

  peticion.addEventListener("load", function () {
    if (peticion.status === 201 || peticion.status === 200) {
      alert("Creado con exito");
    } else {
      alert("No se puedo crear");
    }
  });
});
