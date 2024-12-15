import { MaterialService } from "/tienda-3D/service/MaterialService.js";
import { ShoeService } from "/tienda-3D/service/ShoeService.js";

export class ShoeController {

    #shoeService;
    #materialService;

    constructor() {
        this.#shoeService = new ShoeService();
        this.#materialService = new MaterialService();
    }

    async getAllShoes() {

        const shoes = await this.#shoeService.getAllShoes();

        const materials = await this.#materialService.loadAllMaterials();

        for (const shoe of shoes) {

            const materialsShoe = [];

            for (const material of materials) {

                if (material.getModel() === shoe.getID()) {

                    materialsShoe.push(material);

                }

            }

            shoe.setMaterials(materialsShoe);

        }

        return shoes;

    }

    async findAllShoesByType(shoeType) {

        const allShoes = await this.getAllShoes();

        return allShoes.filter(shoe => shoe.getType().toLowerCase() === shoeType.toLowerCase());

    }

}