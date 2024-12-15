import { TextureLoader } from "three";

const textureLoader = new TextureLoader();

export function loadTextures(textureFolder, texture) {

    // Aquesta funció s'encarregará de carregar textures,
    // mitjançant si hi ha una textura normal, retornará aquesta i amb la seva diff

    return texture.getNormalTexture() === null
        ? [ 
            textureLoader.load(`/Textures/${textureFolder}/${texture.getDiffTexture()}`), 
            textureLoader.load(`/Textures/${textureFolder}/${texture.getNormalTexture()}`), 
        ]
        : [
            textureLoader.load(`/Textures/${textureFolder}/${texture.getDiffTexture()}`), 
        ];
}