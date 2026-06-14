import {IDeviceText} from "./i-device-text.ts";

export interface IDeviceRenderer {
    createText(): IDeviceText;
    showBackground(): void;
    hideBackground(): void;
}