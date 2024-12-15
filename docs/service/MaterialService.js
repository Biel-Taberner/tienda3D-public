import { Material } from "/tienda-3D/model/Material.js";
import { Texture } from "/tienda-3D/model/Texture.js";

export class MaterialService {

    async loadAllMaterials() {

        const fetchedMaterials = await fetch("materials.json");

        const materialsJSON = await fetchedMaterials.json();

        return materialsJSON.flatMap(materialJSON => this.#jsonToObject(materialJSON));
    }

    #jsonToObject(materialJSON) {

        const materials = [];

        for (const material of materialJSON.materials) {

            const mappedMaterial = new Material(material.uuid, material.name, material.type, material.color);

            let textureMaterial = {};

            if (Object.keys(material.textures).length > 0) {

                textureMaterial = new Texture(material.textures.diff_texture, material.textures.normal_texture);

            }

            mappedMaterial.setTextures(textureMaterial);

            mappedMaterial.setModel(materialJSON.model_id);

            materials.push(mappedMaterial);

        }

        return materials;

    }

}