import {Application, RenderLayer} from "pixi.js";
import {DeviceRendererAssets} from "./device-renderer-assets.ts";
import {DeviceText} from "./device-text.ts";
import {DeviceDepths} from "./device-depths.ts";
import {TextAlignment} from "./text-alignment.ts";
import {IDeviceRenderer} from "./i-device-renderer.ts";
import { IDeviceText } from "./i-device-text.ts";
import {TextStyle} from "./text-style.ts";

export class PixiJsDeviceRenderer implements IDeviceRenderer {
    private readonly app: Application;
    private readonly assets: DeviceRendererAssets;

    private readonly backgroundLayer: RenderLayer;
    private readonly textLayer: RenderLayer;

    private background?: DeviceDepths;

    constructor(app: Application, assets: DeviceRendererAssets) {
        this.app = app;
        this.assets = assets;

        this.backgroundLayer = new RenderLayer();
        this.app.stage.addChild(this.backgroundLayer);

        this.textLayer = new RenderLayer();
        this.app.stage.addChild(this.textLayer);

        this.app.ticker.maxFPS = 30;
    }
    
    public createText(): IDeviceText {
        const text = new DeviceText(this.assets.font);
        text.position.set(this.app.canvas.width / 2, this.app.canvas.height / 2);
        text.scale.set(2);
        text.alignment = TextAlignment.Center;
        text.shownCharacters = undefined;
        text.visible = true;
        text.applyStyle(TextStyle.Normal);
        this.textLayer.attach(text);
        this.app.stage.addChild(text);
        this.app.ticker.add((timer) => text.tick(timer))
        
        return text;
    }
    
    public hideBackground(): void {
        if (this.background === undefined) {
            return;
        }
        
        this.app.stage.removeChild(this.background);
        this.background = undefined;
    }
    
    public showBackground(): void {
        if (this.background === undefined) {
            this.background = this.createBackground();
        }
    }
    
    private createBackground(): DeviceDepths {
        const depths = new DeviceDepths(this.assets.depthsTexture);
        depths.scale.set(4);
        depths.position.set(this.app.canvas.width / 2, this.app.canvas.height / 2);
        depths.alpha = 0.5;
        this.backgroundLayer.attach(depths);
        this.app.stage.addChild(depths);
        this.app.ticker.add((timer) => depths.tick(timer))
        
        return depths;
    }
}