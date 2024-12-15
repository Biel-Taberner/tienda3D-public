export class Texture {

    #diff_texture;
    #normal_texture;

    constructor(diff_texture, normal_texture) {
        this.#diff_texture = diff_texture;
        this.#normal_texture = normal_texture;
    }

    getDiffTexture() {
        return this.#diff_texture;
    }

    setDiffTexture(diff_texture) {
        this.#diff_texture = diff_texture;
    }

    getNormalTexture() {
        return this.#normal_texture;
    }

    setNormalTexture(normal_texture) {
        this.#normal_texture = normal_texture;
    }

}