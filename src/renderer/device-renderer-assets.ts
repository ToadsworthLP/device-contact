import {BitmapFont, Texture} from "pixi.js";

export class DeviceRendererAssets {
    public readonly depthsTexture: Texture;
    public readonly font: BitmapFont;

    constructor(depthsTexture: Texture, font: BitmapFont) {
        this.depthsTexture = depthsTexture;
        this.font = font;
    }
}