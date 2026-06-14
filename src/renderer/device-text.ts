import {BitmapFont, Container, Point, Ticker} from "pixi.js";
import {DeviceGlyph} from "./device-glyph.ts";
import "pixi.js/math-extras";
import {TextAlignment} from "./text-alignment.ts";
import {TextStyle} from "./text-style.ts";
import {IDeviceText} from "./i-device-text.ts";

export class DeviceText extends Container<DeviceGlyph> implements IDeviceText {
    private readonly characterWidth: number = 8;
    private readonly characterHeight: number = 12;
    private readonly font: BitmapFont;

    private styleInternal: TextStyle;
    private alignmentInternal: TextAlignment = TextAlignment.Center;
    private shownCharactersInternal?: number = undefined;
    private originalString: string = "";
    private lines: string[] = [];
    private glyphsByLines: DeviceGlyph[][] = [];
    private totalTimeInSeconds: number = 0;
    private fadeStartAlpha: number = 1;
    private fadeEndAlpha: number = 1;
    private fadeStartTime: number = 0;
    private fadeEndTime: number = 0;
    
    public get alignment(): TextAlignment {
        return this.alignmentInternal;
    }

    public set alignment(value: TextAlignment) {
        if (value !== this.alignmentInternal) {
            this.alignmentInternal = value;
            this.updateLayout();
        }
    }

    public get shownCharacters(): number | undefined {
        return this.shownCharactersInternal;
    }

    public set shownCharacters(value: number | undefined) {
        this.shownCharactersInternal = value;

        if (value !== undefined) {
            this.children?.forEach((child: DeviceGlyph, index: number) => {
                child.visible = index < value;
            });
        } else {
            this.children?.forEach((child: DeviceGlyph) => {
                child.visible = true;
            });
        }
    }

    public get text(): string {
        return this.originalString;
    }

    public set text(text: string) {
        this.glyphsByLines = [];
        
        const children =  this.children;
        if(children !== null) {
            this.removeChildren();
            children.forEach((child) => child.destroy(true));
        }
        
        this.originalString = text;
        this.lines = text.split("\n");

        const newGlyphs: DeviceGlyph[][] = [];
        for (let lineIndex = 0; lineIndex < this.lines.length; lineIndex++) {
            const line = this.lines[lineIndex];
            const lineGlyphs: DeviceGlyph[] = [];

            for (let charIndex = 0; charIndex < line.length; charIndex++) {
                const glyph = new DeviceGlyph(this.font);
                glyph.text = line[charIndex];
                glyph.mainColor = this.styleInternal.mainColor;
                glyph.outlineColor = this.styleInternal.outlineColor;

                lineGlyphs.push(glyph);
                this.addChild(glyph);
            }

            newGlyphs.push(lineGlyphs);
        }

        this.glyphsByLines = newGlyphs;
        this.updateLayout();
    }

    constructor(font: BitmapFont) {
        super();

        this.font = font;
        this.styleInternal = TextStyle.Normal;
    }

    public tick(time: Ticker) {
        this.totalTimeInSeconds += time.deltaMS / 1000;
        
        this.children.forEach((glyph) => {
            glyph.tick(time);
        });
        
        if (this.fadeEndTime >= this.totalTimeInSeconds) {
            const t = 1 - ((this.fadeEndTime - this.totalTimeInSeconds) / (this.fadeEndTime - this.fadeStartTime));
            this.alpha = DeviceText.lerp(this.fadeStartAlpha, this.fadeEndAlpha, t);
        } else if (this.alpha !== this.fadeEndAlpha) {
            this.alpha = this.fadeEndAlpha;
        }
    }

    public applyStyle(value: TextStyle): void {
        if(value !== this.styleInternal) {
            this.styleInternal = value;

            this.children?.forEach((child: DeviceGlyph) => {
                child.mainColor = this.styleInternal.mainColor;
                child.outlineColor = this.styleInternal.outlineColor;
            });

            this.updateLayout();
        }
    }

    public fade(targetAlpha: number, durationInSeconds: number): void {
        this.fadeStartAlpha = this.alpha;
        this.fadeEndAlpha = targetAlpha;
        this.fadeStartTime = this.totalTimeInSeconds;
        this.fadeEndTime = this.fadeStartTime + durationInSeconds;
    }
    
    public destroy(): void {
        const children =  this.children;
        if(children !== null) {
            this.removeChildren();
            children.forEach((child) => child.destroy(true));
        }
        
        super.destroy();
    }

    private updateLayout() {
        const lineHeight = this.characterHeight + this.styleInternal.lineSpacing;
        const totalTextHeight = lineHeight * this.glyphsByLines.length - this.styleInternal.lineSpacing;

        for (let lineIndex = 0; lineIndex < this.glyphsByLines.length; lineIndex++) {
            const line = this.glyphsByLines[lineIndex];
            const lineWidth = line.length * (this.characterWidth + this.styleInternal.characterSpacing) - this.styleInternal.characterSpacing / 2;
            const lineBasePosition = new Point(-lineWidth / 2, -totalTextHeight / 2 + lineHeight * lineIndex);

            for (let charIndex = 0; charIndex < line.length; charIndex++) {
                const glyph = line[charIndex];

                if (this.alignmentInternal == TextAlignment.TopLeft) {
                    glyph.position = new Point(
                        (this.characterWidth + this.styleInternal.characterSpacing) * charIndex,
                        lineHeight * lineIndex,
                    );
                } else if (this.alignmentInternal == TextAlignment.Center) {
                    glyph.position = lineBasePosition.add(
                        new Point(
                            (this.characterWidth + this.styleInternal.characterSpacing) * charIndex + this.styleInternal.characterSpacing / 2,
                            0,
                        ),
                    );
                } else {
                    throw "Invalid alignment: " + this.alignmentInternal;
                }
            }
        }
    }
    
    private static lerp(a: number, b: number, t: number): number {
        return t * (b - a) + a;
    }
}
