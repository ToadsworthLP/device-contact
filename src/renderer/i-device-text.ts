import {TextAlignment} from "./text-alignment.ts";
import {TextStyle} from "./text-style.ts";

export interface IDeviceText {
    text: string;
    shownCharacters?: number;
    position: {x: number, y: number};
    alignment: TextAlignment;
    
    applyStyle(style: TextStyle): void;
    fade(targetAlpha: number, durationInSeconds: number): void;
    destroy(): void;
}