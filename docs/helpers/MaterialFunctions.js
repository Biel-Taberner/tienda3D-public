import { MeshPhongMaterial, MeshStandardMaterial, FrontSide } from "three";
import { loadTextures } from "./TextureFunctions.js";
import { Texture } from "/tienda-3D/model/Texture.js";

export function loadMaterials(gltfModel, shoeModel) {
    // Funció per carregar i aplicar materials a un model GLTF basat en la configuració del model de sabata.

    gltfModel.traverse((model) => {
        // Recorre tots els nodes del model GLTF.

        if (model.material) {
            // Comprova si el node té un material associat.

            if (Array.isArray(model.material)) {
                // Si el material és un array (per exemple, múltiples materials aplicats a una malla).

                model.material.map(() => new MeshStandardMaterial({ color: 0x505050 }));
                // Substitueix cada material existent per un nou `MeshStandardMaterial` de color gris.

            } else {
                // Si el material no és un array (només un material aplicat).

                for (const shoeModelMaterial of shoeModel.getMaterials()) {
                    // Itera sobre els materials del model de sabata proporcionat.

                    if (shoeModelMaterial.getName() == model.material.name) {
                        // Comprova si el nom del material del model coincideix amb el nom del material de la sabata.

                        if (shoeModelMaterial.getTextures() instanceof Texture) {
                            // Si el material de la sabata té textures associades.

                            const textures = loadTextures(shoeModel.getName(), shoeModelMaterial.getTextures());
                            // Carrega les textures basades en el nom del model de sabata i les textures associades.

                            model.material = new MeshPhongMaterial({
                                // Assigna un nou material `MeshPhongMaterial` amb les següents propietats:
                                color: shoeModelMaterial.getColor(),
                                // El color definit pel material de la sabata.

                                map: textures[0],
                                // La textura principal (difusa).

                                normalMap: textures.length === 2 ? textures[1] : null,
                                // La textura normal (si n'hi ha dues, agafa la segona).

                                side: FrontSide
                                // Aplica el material només al costat frontal de la malla.
                            });

                        } else {
                            // Si el material de la sabata no té textures associades.

                            model.material = new MeshStandardMaterial({
                                // Assigna un material `MeshStandardMaterial` només amb el color.
                                color: shoeModelMaterial.getColor(),
                                side: FrontSide
                                // Aplica el material només al costat frontal de la malla.
                            });

                        }
                    }
                }
            }
        }
    });
    // Finalitza el recorregut i l'aplicació dels materials.
}