import { Container, Point, Sprite, Texture, Ticker } from "pixi.js";

class DepthsLayer extends Container<Sprite> {
    private static readonly partScaleFactors: Point[] = [
        new Point(1, 1),
        new Point(-1, 1),
        new Point(-1, -1),
        new Point(1, -1),
    ];

    public depth: number = 4;
    public OBSPEED: number = 0.02;

    private siner: number = 0;
    private ystretch: number = 1;
    private o_insurance: number = 0;
    private b_insurance: number = -0.2;
    private alphaInternal: number = 0.2;

    constructor(texture: Texture) {
        super();

        for (let i = 0; i < 4; i++) {
            const sprite = new Sprite(texture);
            sprite.scale = DepthsLayer.partScaleFactors[i];
            sprite.position.set(sprite.width, sprite.height);

            this.addChild(sprite);
        }

        this.pivot.set(this.width / 2, this.height / 2);
        this.alpha = 0.2;
    }

    public tick(time: Ticker) {
        this.siner += time.deltaTime * 0.5;

        if (this.OBSPEED > 0) this.alphaInternal = Math.sin(this.siner / 34) * 0.2;

        this.ystretch += this.OBSPEED * time.deltaTime * 0.5 * 0.5;

        if (this.b_insurance < 0) this.b_insurance += 0.01 * time.deltaTime * 0.5;

        if (this.ystretch > 1.5) {
            this.o_insurance += 0.01 * time.deltaTime * 0.5;

            if (this.o_insurance >= 0.5) {
                this.destroy();
                return;
            }
        }

        this.scale.set(this.ystretch);
        this.alpha = 0.2 + this.alphaInternal - this.o_insurance + this.b_insurance;
        this.visible = this.siner > 2;
    }
}

export class DeviceDepths extends Container<DepthsLayer> {
    private readonly texture: Texture;
    private obacktimer: number = 0;
    private OB_DEPTH: number = 0;
    private OBM: number = 0.5;

    constructor(texture: Texture) {
        super();
        this.texture = texture;
    }

    public tick(time: Ticker) {
        this.OB_DEPTH += time.deltaTime * 0.5;
        this.obacktimer += this.OBM * time.deltaTime * 0.5;

        if (this.obacktimer >= 20) {
            const DV = new DepthsLayer(this.texture);
            DV.depth = 5 + this.OB_DEPTH;
            DV.OBSPEED = 0.01 * this.OBM;
            this.addChildAt(DV, 0);

            if (this.OB_DEPTH >= 60000) {
                this.OB_DEPTH = 0;
            }

            this.obacktimer = 0;
        }

        this.children.forEach((layer) => layer.tick(time));
    }
}
