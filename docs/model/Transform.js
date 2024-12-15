import { Vector3 } from "three";

export default class Transform {

    #x;
    #y;
    #z;

    constructor(x, y, z) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    getX() {
        return this.#x
    }

    setX(x) {
        this.#x = x;
    }

    getY() {
        return this.#y
    }

    setY(y) {
        this.#y = y;
    }

    getZ() {
        return this.#z
    }

    setZ(z) {
        this.#z = z;
    }

}