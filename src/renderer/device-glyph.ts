import { BitmapFont, BitmapText, Container, Ticker } from "pixi.js";
import {Color} from "./color.ts";

class DeviceGlyphPartDefinition {
    public readonly xOffset: number;
    public readonly yOffset: number;
    public readonly opacity: (time: number) => number;

    constructor(xOffset: number, yOffset: number, opacity: (time: number) => number) {
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.opacity = opacity;
    }
}

export class DeviceGlyph extends Container<BitmapText> {
    private static readonly glyphPartDefinitions: DeviceGlyphPartDefinition[] = [
        new DeviceGlyphPartDefinition(1, 0, DeviceGlyph.getPrimaryOutlineOpacity),
        new DeviceGlyphPartDefinition(-1, 0, DeviceGlyph.getPrimaryOutlineOpacity),
        new DeviceGlyphPartDefinition(0, 1, DeviceGlyph.getPrimaryOutlineOpacity),
        new DeviceGlyphPartDefinition(0, -1, DeviceGlyph.getPrimaryOutlineOpacity),
        new DeviceGlyphPartDefinition(1, 1, DeviceGlyph.getSecondaryOutlineOpacity),
        new DeviceGlyphPartDefinition(-1, -1, DeviceGlyph.getSecondaryOutlineOpacity),
        new DeviceGlyphPartDefinition(1, -1, DeviceGlyph.getSecondaryOutlineOpacity),
        new DeviceGlyphPartDefinition(-1, 1, DeviceGlyph.getSecondaryOutlineOpacity),
        new DeviceGlyphPartDefinition(0, 0, () => 1),
    ];

    private textInternal: string = "";
    private totalTime: number = 0;
    private mainColorInternal: Color = new Color(1, 1, 1, 1);
    private outlineColorInternal: Color = new Color(1, 1, 1, 1);

    public get text(): string {
        return this.textInternal;
    }

    public set text(value: string) {
        this.textInternal = value;
        this.children.forEach((glyph) => {
            glyph.text = value;
        });
    }
    
    public get mainColor(): Color {
        return this.mainColorInternal;
    }
    
    public set mainColor(value: Color) {
        if(value !== this.mainColorInternal) {
            this.mainColorInternal = value;

            this.children.forEach((glyphPart, index) => {
                if(index === DeviceGlyph.glyphPartDefinitions.length - 1) glyphPart.style.fill = this.mainColorInternal.toHexRgb();
            });
        }
    }

    public get outlineColor(): Color {
        return this.outlineColorInternal;
    }

    public set outlineColor(value: Color) {
        if(value !== this.outlineColorInternal) {
            this.outlineColorInternal = value;

            this.children.forEach((glyphPart, index) => {
                if(index < DeviceGlyph.glyphPartDefinitions.length - 1) glyphPart.style.fill = this.outlineColorInternal.toHexRgb();
            });
        }
    }
    
    constructor(font: BitmapFont) {
        super();

        DeviceGlyph.glyphPartDefinitions.forEach((definition) => {
            const glyph = new BitmapText({
                style: {
                    fontFamily: font.fontFamily,
                    fontSize: 16,
                    fill: "#ffffff",
                },
            });

            glyph.text = this.textInternal;
            glyph.position.set(definition.xOffset + 1, definition.yOffset - 6);
            this.addChild(glyph);
        });
    }

    public tick(time: Ticker) {
        this.totalTime += time.deltaTime;
        this.children.forEach((glyphPart, index) => {
            if (index < DeviceGlyph.glyphPartDefinitions.length - 1) {
                glyphPart.alpha = DeviceGlyph.glyphPartDefinitions[index].opacity(this.totalTime) * this.outlineColor.alpha;
            } else {
                glyphPart.alpha = DeviceGlyph.glyphPartDefinitions[index].opacity(this.totalTime) * this.mainColor.alpha;
            }
        });
    }

    private static getPrimaryOutlineOpacity(time: number) {
        const timer = time / 2;
        return 0.3 + Math.sin(timer / 14) * 0.1;
    }

    private static getSecondaryOutlineOpacity(time: number) {
        const timer = time / 2;
        return 0.08 + Math.sin(timer / 14) * 0.04;
    }
}
