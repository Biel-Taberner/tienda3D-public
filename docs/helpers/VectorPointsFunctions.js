import { Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Object3D } from "three";
import { Timer } from 'three/addons/misc/Timer.js';
import { loadMaterials } from "./MaterialFunctions.js";

export function updateVectorPoints(points = [], camera, renderer) {

  // Recorrer cada punt de l’array points
  for(const point of points) {

    const position = new Vector3(point.getX(), point.getY(), point.getZ());

    const screenPosition = position.clone();
    screenPosition.project(camera);

    const translateX = screenPosition.x * renderer.domElement.width * 0.5
    const translateY = -screenPosition.y * renderer.domElement.height * 0.5

    const domElement = document.querySelector(`.${point.getElement()}`);
    domElement.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;

  }

}

export function drawVectorsToHTML(vectorPoints = []) {

    for (const vectorPoint of vectorPoints) {

        // Cream el div pare amb les classes: "point", "point-0" i "visible"
        const divPointTag = document.createElement("div");
        divPointTag.classList.add("point", `${vectorPoint.getElement()}`, "visible");

        divPointTag.id = "shoe_model_" + vectorPoint.getModelID();

        // Ara, crearem altres dos divs fills, un tindrà la classe "label" i l'altre la classe "text",
        // en aquest darrer, afeguirem el contingut que volem mostrar quan es passi amb el ratolí per damunt
        const divLabelTag = document.createElement("div");
        divLabelTag.classList.add("label");

        const divTextTag = document.createElement("div");
        divTextTag.classList.add("text");
        divTextTag.innerHTML = vectorPoint.getText();

        
        // Per acabar, afeguirem els dos divs fills al div pare i aquest, l'afeguirem al "body" del html
        divPointTag.appendChild(divLabelTag);
        divPointTag.appendChild(divTextTag);

        document.querySelector("#expositor").appendChild(divPointTag)

    }

}

export function displayShoeWhenClickedPoint(vectorPoints = [], shoes = [], scene, camera, renderer) {
  // Funció per mostrar un model de sabata quan es fa clic a un punt específic.
  // Accepta punts vectorials, una llista de sabates, una escena, una càmera i un renderer.

  const loader = new GLTFLoader();
  // Inicialitza un carregador per models GLTF.

  let shoeGFXObject = new Object3D();
  // Crea un objecte 3D per contenir el model de la sabata seleccionada.

  const timer = new Timer();
  // Crea un temporitzador per gestionar les actualitzacions del renderitzat.

  for (const vectorPoint of vectorPoints) {
      // Itera sobre cada punt vectorial.

      document.getElementById(`shoe_model_${vectorPoint.getModelID()}`).addEventListener("click", (e) => {
          // Afegeix un esdeveniment de clic per a cada punt amb ID corresponent a `shoe_model_`.

          document.getElementById("go-back").style.visibility = "visible";
          // Mostra el botó "Tornar".

          const idNumber = Number(getIDNumber(e.currentTarget.id));
          // Obté el número d'ID del model clicat.

          const modelToDisplay = findShoeByID(shoes, idNumber);
          // Troba el model de sabata a partir de l'ID.

          document.getElementById("canvas-model-shoe-expositor-renderer-info").style.display = "block";
          // Mostra el contenidor d'informació de la sabata seleccionada.

          document.getElementById("canvas-model-shoe-expositor-renderer-info").innerHTML = `
              <div class="slide-canvas-info-subcontainer">
                  <div class="slide-canvas-info-title-content">
                      <h2>${modelToDisplay.getName()}</h2>
                  </div>
                  <div class="slide-canvas-info-subcontent">
                      <p>${modelToDisplay.getDescription()}</p>
                  </div>
                  <div class="slide-canvas-second-info-subcontent">
                      <div class="slide-canvas-info-button" style="color: white">Ver producto</div>
                  </div>
              </div>`;
          // Actualitza el HTML per mostrar el nom i la descripció del model de sabata seleccionat.

          loader.load(`/Models/${modelToDisplay.getName()}/${modelToDisplay.getMesh()}`, (gltf) => {
              // Carrega el model GLTF associat al model seleccionat.

              const existingModel = shoeGFXObject.getObjectByName('shoe_to_display');
              // Busca si ja existeix un model de sabata renderitzat amb el nom 'shoe_to_display'.

              if (existingModel) {
                  // Si existeix, l'elimina del contenidor i de l'escena.
                  shoeGFXObject.remove(existingModel);
                  scene.remove(existingModel);
              }

              const model = gltf.scene;
              // Obté l'escena del model carregat.

              model.renderOrder = 0;
              // Defineix l'ordre de renderització per defecte.

              model.name = 'shoe_to_display';
              // Assigna un nom únic al model per identificar-lo.

              loadMaterials(model, modelToDisplay);
              // Aplica els materials personalitzats al model carregat.

              shoeGFXObject.add(model);
              // Afegeix el model al contenidor de l'objecte 3D.

              shoeGFXObject.position.set(0, 10, -0.5);
              // Posiciona l'objecte de la sabata en l'escena.

              shoeGFXObject.scale.set(1, 1, 1);
              // Configura l'escala del model.

              scene.add(shoeGFXObject);
              // Afegeix l'objecte 3D de la sabata a l'escena.

          });

          camera.position.set(0, 10, 1.665);
          // Reposiciona la càmera per enfocar el model seleccionat.

      });

  }

  const animate = (timestamp) => {
      // Defineix la funció d'animació per actualitzar el renderitzat.

      const delta = timer.getDelta();
      // Calcula el temps transcorregut des de l'última actualització.

      renderer.render(scene, camera);
      // Renderitza l'escena i la càmera.

      requestAnimationFrame(animate);
      // Sol·licita el següent fotograma.

      timer.update(timestamp);
      // Actualitza el temporitzador amb el temps actual.

      shoeGFXObject.rotateY(delta * 0.35);
      // Rota el model de la sabata al voltant de l'eix Y segons el temps transcorregut.
  };

  animate();
  // Inicia el bucle d'animació.

}

function findShoeByID(shoes = [], id) {
  // Cerca una sabata a la llista `shoes` amb l'ID especificat.
  return shoes.find(shoe => shoe.getID() === id);
}

function getIDNumber(idText) {
  // Extreu el número d'ID del text de l'ID del punt vectorial.
  return idText.split("shoe_model_")[1];
}