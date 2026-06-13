import {Application, Assets, BitmapFont, Texture} from "pixi.js";
import {DeviceRendererAssets} from "./device-renderer-assets.ts";
import {PixiJsDeviceRenderer} from "./pixi-js-device-renderer.ts";
import {IDeviceRenderer} from "./device-renderer.ts";

export class DeviceRendererFactory {
    public async createPixiJsRenderer(canvas: HTMLCanvasElement) : Promise<IDeviceRenderer> {
        const app = new Application();
        
        await app.init({
            canvas: canvas,
            background: "#000000",
            width: 640,
            height: 480,
            antialias: false,
        });

        const depthsTexture = (await Assets.load("/assets/images/depths.png")) as Texture;
        depthsTexture.source.scaleMode = "nearest";

        const font = (await Assets.load("/assets/fonts/bitmap/eightbitoperator.fnt")) as BitmapFont;
        font.pages.forEach((texture) => (texture.texture.source.scaleMode = "nearest"));
        
        const assets = new DeviceRendererAssets(depthsTexture, font);
        return new PixiJsDeviceRenderer(app, assets);
    }
}