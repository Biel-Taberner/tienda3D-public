import Transform from "/tienda-3D/model/Transform";

export default class Position extends Transform {

    #text;
    #element;
    #model_id;

    getText() {
        return this.#text;
    }

    setText(text) {
        this.#text = text;
    }

    getElement() {
        return this.#element;
    }

    setElement(element) {
        this.#element = element;
    }

    getModelID() {
        return this.#model_id;
    }

    setModelID(model_id) {
        this.#model_id = model_id;
    }

}