import Position from "/tienda-3D/model/Position.js";

export default class VectorPointsService {

    async getAllVectorPoints() {

        const fetchedVectorPoints = await fetch("vector_points.json");

        const vectorPointsJSON = await fetchedVectorPoints.json();

        return vectorPointsJSON.map(vectorPointJSON => this.#jsonToObject(vectorPointJSON));

    }

    #jsonToObject(vectorPointJSON) {

        const vectorPosition = vectorPointJSON.position;

        const position = new Position(vectorPosition.x, vectorPosition.y, vectorPosition.z);

        position.setText(vectorPointJSON.text);

        position.setElement(vectorPointJSON.element);

        position.setModelID(vectorPointJSON.model_id);

        return position;

    }

}