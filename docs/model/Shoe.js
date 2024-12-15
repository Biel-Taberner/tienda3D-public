export class Shoe {

    #id;
    #type;
    #name;
    #mesh;
    #description;
    #materials;

    constructor(id, type, name, description, mesh) {
        this.#id = id;
        this.#type = type;
        this.#name = name;
        this.#description = description;
        this.#mesh = mesh;
    }

    getID() {
        return this.#id;
    }

    setID(id) {
        this.#id = id;
    }

    getType() {
        return this.#type;
    }

    setType(type) {
        this.#type = type;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(description) {
        this.#description = description;
    }

    getMesh() {
        return this.#mesh;
    }

    setMesh(mesh) {
        this.#mesh = mesh;
    }

    getMaterials() {
        return this.#materials;
    }

    setMaterials(materials) {
        this.#materials = materials;
    }
}