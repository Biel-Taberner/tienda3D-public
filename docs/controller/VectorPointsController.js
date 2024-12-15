import VectorPointsService from "/tienda-3D/service/VectorPointsService.js";

export default class VectorPointsController {

    #vectorPointsService;

    constructor() {
        this.#vectorPointsService = new VectorPointsService();
    }

    async getAllVectorPoints() {
        return this.#vectorPointsService.getAllVectorPoints();
    }

}