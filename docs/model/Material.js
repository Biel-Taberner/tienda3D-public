export class Material {

    #uuid;
    #name;
    #type;
    #color;
    #model;
    #textures;

    constructor(uuid, name, type, color) {
        this.#uuid = uuid;
        this.#name = name;
        this.#type = type;
        this.#color = color;
    }

    getUUID() {
        return this.#uuid
    }

    setUUID(uuid) {
        this.#uuid = uuid
    }

    getName() {
        return this.#name
    }

    setName(name) {
        this.#name = name
    }

    getType() {
        return this.#type
    }

    setType(type) {
        this.#type = type
    }

    getColor() {
        return this.#color
    }

    setColor(color) {
        this.#color = color
    }

    getModel() {
        return this.#model
    }

    setModel(model) {
        this.#model = model
    }

    getTextures() {
        return this.#textures
    }

    setTextures(textures) {
        this.#textures = textures
    }

}