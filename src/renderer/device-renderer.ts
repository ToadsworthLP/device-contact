import {TextAlignment} from "./text-alignment.ts";
import {TextStyle} from "./text-style.ts";
export interface IDeviceRenderer {
    setText(text: string): void;
    clearText(): void;
    setTextShownCharacters(characterCount: number): void;
    setTextPosition(x: number, y: number): void;
    setTextAlignment(alignment: TextAlignment): void;
    setTextStyle(style: TextStyle): void;
    showBackground(): void;
    hideBackground(): void;
}