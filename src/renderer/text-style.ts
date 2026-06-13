import {Color} from "./color.ts";

export class TextStyle {
    public static readonly Normal = new TextStyle(new Color(1, 1, 1, 1), new Color(0, 0, 0, 0));
    public static readonly Gaster = new TextStyle(new Color(1, 1, 1, 1), new Color(1, 1, 1, 1));
    
    public readonly mainColor: Color;
    public readonly outlineColor: Color;

    constructor(mainColor: Color, outlineColor: Color) {
        this.mainColor = mainColor;
        this.outlineColor = outlineColor;
    }
}