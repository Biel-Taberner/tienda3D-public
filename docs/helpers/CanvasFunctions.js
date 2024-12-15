import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Timer } from 'three/addons/misc/Timer.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadMaterials } from "./MaterialFunctions.js";

export function setupCanvasScenesByNumberOfShoes(shoes = [], canvasToTarget, setCanvasPositionToAbsolute = false) {
    // Defineix una funció per configurar escenes de canvas segons el nombre de sabates.
    // Accepta una matriu de sabates, un selector de canvas i una opció per configurar la posició absoluta.

    const width = window.innerWidth;
    const height = window.innerHeight;
    // Obté l'amplada i l'alçada de la finestra del navegador.

    const loader = new GLTFLoader();
    // Crea un carregador per importar models GLTF.

    for (let i = 0; i < shoes.length; i++) {
        // Itera sobre cada sabata a la matriu.

        const renderer = new THREE.WebGLRenderer({
            alpha: true
        });
        // Crea un renderer WebGL amb transparència activada.

        renderer.setSize(width, height);
        // Estableix la mida del renderer segons les dimensions de la finestra.

        const scene = new THREE.Scene();
        // Crea una nova escena de Three.js.

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        // Configura una càmera amb perspectiva (75° de FOV, proporció de la finestra, plànols pròxim i llunyà).

        const canvasElement = document.querySelector(`${canvasToTarget}-${i}`);
        // Cerca el canvas específic amb un identificador basat en l'índex actual.

        if (canvasElement && canvasElement.parentNode) {
            // Comprova que el canvas i el seu node pare existeixin.

            canvasElement.parentNode.replaceChild(renderer.domElement, canvasElement);
            // Reemplaça el canvas existent pel nou renderer.

            renderer.domElement.style.width = "100%";
            renderer.domElement.style.height = "100%";
            // Estableix el renderer perquè ocupi el 100% de l'espai disponible.

            if (setCanvasPositionToAbsolute) {
                renderer.domElement.style.position = "absolute";
                // Opcionalment, assigna al renderer la posició CSS `absolute`.
            }
        }

        scene.add(camera);
        // Afegeix la càmera a l'escena.

        camera.position.z = 1.665;
        // Posiciona la càmera a una distància predeterminada en l'eix Z.

        const shoeGFXObject = new THREE.Object3D();
        // Crea un objecte 3D per representar la sabata.

        loader.load(`/Models/${shoes[i].getName()}/${shoes[i].getMesh()}`, (gltf) => {
            // Carrega un model GLTF per a la sabata actual.

            const model = gltf.scene;
            // Obté l'escena del model carregat.

            model.renderOrder = 0;
            // Assigna la prioritat de renderització del model.

            loadMaterials(model, shoes[i]);
            // Aplica materials al model segons la configuració de la sabata.

            shoeGFXObject.add(model);
            // Afegeix el model al contenidor de l'objecte de la sabata.
        });

        shoeGFXObject.scale.set(1, 1, 1);
        // Estableix l'escala del model a 1 en tots els eixos.

        scene.add(shoeGFXObject);
        // Afegeix l'objecte 3D de la sabata a l'escena.

        const controls = new OrbitControls(camera, renderer.domElement);
        // Crea controls d'òrbita per a la càmera.

        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        // Configura els controls: activa l'amortiment, desactiva el zoom i el desplaçament.

        const ambientalLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientalLight);
        // Afegeix una llum ambiental blanca a l'escena.

        ambientalLight.position.y = 0;
        // Estableix la posició de la llum ambiental.

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.y = 1;
        scene.add(directionalLight);
        // Afegeix una llum direccional blanca i la posiciona en l'eix Y.

        const timer = new Timer();
        // Crea una instància d'un temporitzador personalitzat.

        // Render loop
        function animate(timestamp) {
            // Defineix una funció d'animació que es crida en bucle.

            const delta = timer.getDelta();
            // Calcula el temps transcorregut des de l'últim fotograma.

            controls.update();
            // Actualitza els controls de la càmera.

            renderer.render(scene, camera);
            // Renderitza l'escena i la càmera.

            requestAnimationFrame(animate);
            // Sol·licita el següent fotograma d'animació.

            timer.update(timestamp);
            // Actualitza el temporitzador amb el temps actual.

            shoeGFXObject.rotateY(delta * 0.35);
            // Rota l'objecte de la sabata al voltant de l'eix Y segons el temps transcorregut.
        }

        animate();
        // Inicia el bucle d'animació.
    }
}