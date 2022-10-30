const formulario = document.getElementById("form");
const title = document.getElementById("title");
const date = document.getElementById("date");
const autor = document.getElementById("authorId");

title.addEventListener("input", function (event) {
  if (title.validity.tooShort) {
    title.setCustomValidity("Introduce titulo valido");
  } else {
    title.setCustomValidity("");
  }
});

date.addEventListener("input", function (event) {
  if (date.validity.tooShort) {
    date.setCustomValidity("Introduce titulo valido");
  } else {
    date.setCustomValidity("");
  }
});

autor.addEventListener("input", function (event) {
  if (autor.validity.tooShort) {
    autor.setCustomValidity("Introduce titulo valido");
  } else {
    autor.setCustomValidity("");
  }
});
