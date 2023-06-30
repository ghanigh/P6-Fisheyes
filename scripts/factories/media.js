/* eslint-disable no-unused-vars */
function mediaFactory(data) {
    let type = data.video ? "video" : "image";
  
    function createElement() {
      let element;
      if (type == "image") {
        element = `<img src=assets/media/${data.photographerId}/${data.image} alt="${data.title}" data-id=${data.id}></img>`;
      } else if (type == "video") {
        element = `<video src=assets/media/${data.photographerId}/${data.video}#t=0.1 alt="${data.title}" data-id=${data.id} preload="metadata"></video>`;
        //#t=0.1 et preload="metadata" pour que l'image de la video s'affiche sur safari
      }
  
      const li = `
                <li class="media" data-date=${data.date} data-likes=${data.likes} data-title=${data.title}>
                  <a href="#" class="media__link" onclick="openLightbox('${data.id}')">
                    ${element}
                  </a>
                  <div class="media__info">
                    <p>${data.title}</p>
                    <button class="like" onclick="likeEvent(this)" >
                      <p>${data.likes}</p>
                      <img src="assets/icons/heart-vide.svg" id="coeurVide" alt="coeur-vide"/> 
                      <img src="assets/icons/heart.svg" id="coeur" alt="coeur"/>   
                    </button>
                  </div>
                </li>
              `;
      return li;
    }
    return { type, createElement };
  }
  