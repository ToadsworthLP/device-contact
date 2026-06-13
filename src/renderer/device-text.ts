import {BitmapFont, Container, Point, Ticker} from "pixi.js";
import {DeviceGlyph} from "./device-glyph.ts";
import "pixi.js/math-extras";
import {TextAlignment} from "./text-alignment.ts";
import {Color} from "./color.ts";
import {TextStyle} from "./text-style.ts";

export class DeviceText extends Container<DeviceGlyph> {
    public characterWidth: number = 8;
    public characterHeight: number = 12;
    public characterSpacing: number = 4;
    public lineSpacing: number = 8;

    private alignmentInternal: TextAlignment = TextAlignment.TopLeft;
    private typeInternal: TextStyle = TextStyle.Gaster;
    private mainColorInternal: Color = new Color(1, 1, 1, 1);
    private outlineColorInternal: Color = new Color(1, 1, 1, 1);
    private shownCharactersInternal: number | null = null;
    private font: BitmapFont;
    private originalString: string = "";
    private lines: string[] = [];
    private glyphsByLines: DeviceGlyph[][] = [];

    public get alignment(): TextAlignment {
        return this.alignmentInternal;
    }

    public set alignment(value: TextAlignment) {
        if (value !== this.alignmentInternal) {
            this.alignmentInternal = value;
            this.updateLayout();
        }
    }

    public get type(): TextStyle {
        return this.typeInternal;
    }

    public set type(value: TextStyle) {
        if (value !== this.typeInternal) {
            this.typeInternal = value;

            this.mainColor = this.typeInternal.mainColor;
            this.outlineColor = this.typeInternal.outlineColor;
        }
    }

    public get mainColor(): Color {
        return this.mainColorInternal;
    }

    public set mainColor(value: Color) {
        if(value !== this.mainColorInternal) {
            this.mainColorInternal = value;

            this.children?.forEach((child: DeviceGlyph) => {
                child.mainColor = this.typeInternal.mainColor;
            });
        }
    }

    public get outlineColor(): Color {
        return this.outlineColorInternal;
    }

    public set outlineColor(value: Color) {
        if(value !== this.outlineColorInternal) {
            this.outlineColorInternal = value;

            this.children?.forEach((child: DeviceGlyph) => {
                child.outlineColor = this.typeInternal.outlineColor;
            });
        }
    }

    public get shownCharacters(): number | null {
        return this.shownCharactersInternal;
    }

    public set shownCharacters(value: number | null) {
        this.shownCharactersInternal = value;

        if (value !== null) {
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
        this.isRenderGroup = true;
    }

    public tick(time: Ticker) {
        this.children.forEach((glyph) => {
            glyph.tick(time);
        });
    }

    private updateLayout() {
        const lineHeight = this.characterHeight + this.lineSpacing;
        const totalTextHeight = lineHeight * this.glyphsByLines.length - this.lineSpacing;

        for (let lineIndex = 0; lineIndex < this.glyphsByLines.length; lineIndex++) {
            const line = this.glyphsByLines[lineIndex];
            const lineWidth = line.length * (this.characterWidth + this.characterSpacing) - this.characterSpacing / 2;
            const lineBasePosition = new Point(-lineWidth / 2, -totalTextHeight / 2 + lineHeight * lineIndex);

            for (let charIndex = 0; charIndex < line.length; charIndex++) {
                const glyph = line[charIndex];

                if (this.alignment == TextAlignment.TopLeft) {
                    glyph.position = new Point(
                        (this.characterWidth + this.characterSpacing) * charIndex,
                        lineHeight * lineIndex,
                    );
                } else if (this.alignment == TextAlignment.Center) {
                    glyph.position = lineBasePosition.add(
                        new Point(
                            (this.characterWidth + this.characterSpacing) * charIndex + this.characterSpacing / 2,
                            0,
                        ),
                    );
                } else {
                    throw "Invalid alignment: " + this.alignment;
                }
            }
        }
    }
}
