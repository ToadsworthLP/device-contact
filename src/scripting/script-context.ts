import {IDeviceRenderer} from "../renderer/i-device-renderer.ts";
import {IDeviceText} from "../renderer/i-device-text.ts";

export class ScriptContext {
    public readonly renderer: IDeviceRenderer;
    public readonly defaultText: IDeviceText;
    
    public sleepTimeInSeconds: number = 0;

    constructor(renderer: IDeviceRenderer, defaultText: IDeviceText) {
        this.renderer = renderer;
        this.defaultText = defaultText;
    }
}