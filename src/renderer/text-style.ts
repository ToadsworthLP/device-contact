import {Color} from "./color.ts";

export class TextStyle {
    public static readonly Normal = new TextStyle(new Color(1, 1, 1, 1), new Color(0, 0, 0, 0), 0, 8);
    public static readonly Gaster = new TextStyle(new Color(1, 1, 1, 1), new Color(1, 1, 1, 1), 4, 8);
    
    public readonly mainColor: Color;
    public readonly outlineColor: Color;
    public readonly characterSpacing: number;
    public readonly lineSpacing: number;


    constructor(mainColor: Color, outlineColor: Color, characterSpacing: number, lineSpacing: number) {
        this.mainColor = mainColor;
        this.outlineColor = outlineColor;
        this.characterSpacing = characterSpacing;
        this.lineSpacing = lineSpacing;
    }
}