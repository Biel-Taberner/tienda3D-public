import { MaterialService } from "/tienda-3D/service/MaterialService.js";

export class MaterialController {

    #materialService;

    constructor() {
        this.#materialService = new MaterialService();
    }

    async getAllMaterials() {
        return this.#materialService.loadAllMaterials();
    }

}