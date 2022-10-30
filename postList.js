const peticion= new XMLHttpRequest();
peticion.open('GET','http://localhost:3000/posts');
peticion.send();


peticion.addEventListener('readystatechange', function() {
    console.log("Estado de la petición: " + peticion.readyState);
    if (peticion.readyState === 4) {
        if (peticion.status === 200) {
            console.log("Datos recibidos:");
            let posts = JSON.parse(peticion.responseText);  // Convertirmos los datos JSON a un objeto
            for(let i=0;i<posts.length;i++){
              let ul=document.querySelector('ul');
              let item=document.createElement('li');
              let contenido=document.createTextNode(posts[i].id+" "+posts[i].tittle);
              let enlace = document.createElement('a');
              enlace.setAttribute('href', `articulo.html?id=${i+1}`);
              enlace.appendChild(contenido); 
              item.appendChild(enlace);
              ul.appendChild(item);
               
            }
        } else {
            console.log("Error " + peticion.status + " (" + peticion.statusText + ") en la petición");
        }
    }
})


